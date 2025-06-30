from typing import List, Dict, Optional
from app.models.pill import Pill
from app.models.transaction import Transaction
from app.utils.exceptions import ValidationError, DatabaseError

class InventoryService:
    
    def get_all_pills(self) -> List[Pill]:
        try:
            return Pill.get_all()
        except Exception as e:
            raise DatabaseError(f"Failed to retrieve pills: {str(e)}")
    
    def get_pill_by_id(self, pill_id: int) -> Pill:
        try:
            return Pill.get_by_id(pill_id)
        except Exception as e:
            raise DatabaseError(f"Failed to retrieve pill: {str(e)}")
    
    def add_new_pill(self, 
                     name: str, 
                     max_capacity: int, 
                     initial_count: int = 0,
                     low_stock_threshold: Optional[int] = None,
                     description: str = "",
                     dosage: str = "",
                     frequency: str = "",
                     compartment_number: Optional[int] = None) -> Dict:
        """
        Add a new pill to the inventory system
        
        Args:
            name: Name of the medication
            max_capacity: Maximum number of pills this compartment can hold
            initial_count: Initial number of pills (default: 0)
            low_stock_threshold: When to consider stock low (default: 10% of max_capacity)
            description: Optional description of the medication
            dosage: Dosage information (e.g., "500mg")
            frequency: How often to take (e.g., "twice daily")
            compartment_number: Specific compartment number (optional)
        """
        
        # Validation
        if not name or not name.strip():
            raise ValidationError("Pill name is required")
        
        if max_capacity <= 0:
            raise ValidationError("Max capacity must be positive")
        
        if initial_count < 0:
            raise ValidationError("Initial count cannot be negative")
        
        if initial_count > max_capacity:
            raise ValidationError(f"Initial count cannot exceed max capacity of {max_capacity}")
        
        # Set default low stock threshold if not provided
        if low_stock_threshold is None:
            low_stock_threshold = max(1, int(max_capacity * 0.1))  # 10% of max capacity
        
        # Check if compartment number is already in use (if specified)
        if compartment_number is not None:
            existing_pill = self._get_pill_by_compartment(compartment_number)
            if existing_pill:
                raise ValidationError(f"Compartment {compartment_number} is already in use")
        
        # Create new pill instance
        try:
            new_pill = Pill(
                name=name.strip(),
                max_capacity=max_capacity,
                current_count=initial_count,
                low_stock_threshold=low_stock_threshold,
                description=description.strip(),
                dosage=dosage.strip(),
                frequency=frequency.strip(),
                compartment_number=compartment_number
            )
            
            # Save the new pill
            if not new_pill.save():
                raise DatabaseError("Failed to save new pill")
            
            # Create initial transaction record if there's an initial count
            if initial_count > 0:
                initial_transaction = Transaction(
                    pill_id=new_pill.id,
                    transaction_type='initial_stock',
                    quantity_change=initial_count,
                    previous_count=0,
                    new_count=initial_count,
                    notes=f"Initial stock for new pill: {name}"
                )
                
                if not initial_transaction.save():
                    # Log warning but don't fail the entire operation
                    print(f"Warning: Failed to create initial transaction for pill {new_pill.id}")
            
            return {
                'success': True,
                'message': f'Successfully added new pill: {name}',
                'pill_id': new_pill.id,
                'compartment_number': new_pill.compartment_number,
                'initial_count': initial_count,
                'max_capacity': max_capacity
            }
            
        except Exception as e:
            raise DatabaseError(f"Failed to add new pill: {str(e)}")
    
    def _get_pill_by_compartment(self, compartment_number: int) -> Optional[Pill]:
        """Helper method to check if a compartment number is already in use"""
        try:
            pills = self.get_all_pills()
            for pill in pills:
                if hasattr(pill, 'compartment_number') and pill.compartment_number == compartment_number:
                    return pill
            return None
        except Exception:
            return None
    
    def update_pill_schedule(self, pill_id: int, frequency: str, dosage: str = "", notes: str = "") -> Dict:
        """
        Update the schedule/dosage information for an existing pill
        """
        if not frequency or not frequency.strip():
            raise ValidationError("Frequency is required")
        
        pill = self.get_pill_by_id(pill_id)
        if not pill:
            raise ValidationError("Pill not found")
        
        try:
            # Update pill schedule information
            pill.frequency = frequency.strip()
            if dosage:
                pill.dosage = dosage.strip()
            
            if pill.save():
                # Create transaction record for schedule update
                schedule_transaction = Transaction(
                    pill_id=pill_id,
                    transaction_type='schedule_update',
                    quantity_change=0,
                    previous_count=pill.current_count,
                    new_count=pill.current_count,
                    notes=f"Schedule updated - Frequency: {frequency}, Dosage: {dosage}. {notes}".strip()
                )
                schedule_transaction.save()  # Don't fail if this doesn't save
                
                return {
                    'success': True,
                    'message': f'Successfully updated schedule for {pill.name}',
                    'frequency': frequency,
                    'dosage': dosage
                }
            else:
                raise DatabaseError("Failed to save schedule update")
                
        except Exception as e:
            raise DatabaseError(f"Failed to update pill schedule: {str(e)}")
    
    def refill_pills(self, pill_id: int, quantity: int, notes: str = "") -> Dict:
        if quantity <= 0:
            raise ValidationError("Refill quantity must be positive")
        
        pill = self.get_pill_by_id(pill_id)
        if not pill:
            raise ValidationError("Pill not found")

        new_count = pill.current_count + quantity
        if new_count > pill.max_capacity:
            raise ValidationError(f"Refill would exceed max capacity of {pill.max_capacity}")
        
        transaction = Transaction(
            pill_id=pill_id,
            transaction_type='refill',
            quantity_change=quantity,
            previous_count=pill.current_count,
            new_count=new_count,
            notes=notes
        )

        pill.current_count = new_count
        
        try:
            if pill.save() and transaction.save():
                return {
                    'success': True,
                    'message': f'Successfully refilled {quantity} pills',
                    'new_count': new_count
                }
            else:
                raise DatabaseError("Failed to save refill transaction")
        except Exception as e:
            raise DatabaseError(f"Refill operation failed: {str(e)}")
    
    def remove_pill(self, pill_id: int, reason: str = "") -> Dict:
        """
        Remove a pill from the inventory system
        """
        pill = self.get_pill_by_id(pill_id)
        if not pill:
            raise ValidationError("Pill not found")
        
        try:
            # Create final transaction record
            removal_transaction = Transaction(
                pill_id=pill_id,
                transaction_type='removal',
                quantity_change=-pill.current_count,
                previous_count=pill.current_count,
                new_count=0,
                notes=f"Pill removed from system. Reason: {reason}".strip()
            )
            removal_transaction.save()
            
            # Remove the pill (assuming soft delete or actual deletion)
            if pill.delete():
                return {
                    'success': True,
                    'message': f'Successfully removed pill: {pill.name}',
                    'pill_name': pill.name
                }
            else:
                raise DatabaseError("Failed to remove pill from database")
                
        except Exception as e:
            raise DatabaseError(f"Failed to remove pill: {str(e)}")
    
    def get_low_stock_pills(self) -> List[Pill]:
        pills = self.get_all_pills()
        return [pill for pill in pills if pill.is_low_stock]
    
    def get_inventory_summary(self) -> Dict:
        pills = self.get_all_pills()
        
        total_pills = sum(pill.current_count for pill in pills)
        empty_compartments = sum(1 for pill in pills if pill.is_empty)
        low_stock_compartments = sum(1 for pill in pills if pill.is_low_stock and not pill.is_empty)
        
        return {
            'total_pills': total_pills,
            'total_compartments': len(pills),
            'empty_compartments': empty_compartments,
            'low_stock_compartments': low_stock_compartments,
            'healthy_compartments': len(pills) - empty_compartments - low_stock_compartments
        }
    
    def adjust_inventory(self, pill_id: int, new_count: int, notes: str = "Manual adjustment") -> Dict:
        if new_count < 0:
            raise ValidationError("New count cannot be negative")
        
        pill = self.get_pill_by_id(pill_id)
        if not pill:
            raise ValidationError("Pill not found")
        
        if new_count > pill.max_capacity:
            raise ValidationError(f"New count cannot exceed max capacity of {pill.max_capacity}")
        
        previous_count = pill.current_count
        quantity_change = new_count - previous_count
        
        transaction = Transaction(
            pill_id=pill_id,
            transaction_type='adjustment',
            quantity_change=quantity_change,
            previous_count=previous_count,
            new_count=new_count,
            notes=notes
        )
        
        pill.current_count = new_count
        
        try:
            if pill.save() and transaction.save():
                return {
                    'success': True,
                    'message': f'Successfully adjusted inventory to {new_count} pills',
                    'previous_count': previous_count,
                    'new_count': new_count,
                    'change': quantity_change
                }
            else:
                raise DatabaseError("Failed to save adjustment transaction")
        except Exception as e:
            raise DatabaseError(f"Adjustment operation failed: {str(e)}")