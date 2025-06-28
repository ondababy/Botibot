from typing import List, Dict
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