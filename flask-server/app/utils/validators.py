from .exceptions import ValidationError

def validate_pill_data(data, required_fields):
    """
    Validate pill data and ensure required fields are present
    
    Args:
        data (dict): The data to validate
        required_fields (list): List of required field names
    
    Raises:
        ValidationError: If validation fails
    """
    if not data:
        raise ValidationError("No data provided")
    
    # Check for required fields
    missing_fields = []
    for field in required_fields:
        if field not in data or data[field] is None or data[field] == '':
            missing_fields.append(field)
    
    if missing_fields:
        raise ValidationError(f"Missing required fields: {', '.join(missing_fields)}")
    
    # Validate specific field types
    if 'pill_id' in data:
        try:
            int(data['pill_id'])
        except (ValueError, TypeError):
            raise ValidationError("pill_id must be a valid integer")
    
    if 'quantity' in data:
        try:
            quantity = int(data['quantity'])
            if quantity <= 0:
                raise ValidationError("quantity must be a positive integer")
        except (ValueError, TypeError):
            raise ValidationError("quantity must be a valid integer")
    
    if 'new_count' in data:
        try:
            new_count = int(data['new_count'])
            if new_count < 0:
                raise ValidationError("new_count cannot be negative")
        except (ValueError, TypeError):
            raise ValidationError("new_count must be a valid integer")
    
    if 'max_capacity' in data:
        try:
            max_capacity = int(data['max_capacity'])
            if max_capacity <= 0:
                raise ValidationError("max_capacity must be a positive integer")
        except (ValueError, TypeError):
            raise ValidationError("max_capacity must be a valid integer")

def validate_pill_creation_data(data):
    """
    Specific validation for pill creation
    """
    validate_pill_data(data, ['name', 'max_capacity'])
    
    # Additional validations for pill creation
    if len(data['name'].strip()) < 2:
        raise ValidationError("Pill name must be at least 2 characters long")
    
    if 'initial_count' in data and data['initial_count']:
        try:
            initial_count = int(data['initial_count'])
            max_capacity = int(data['max_capacity'])
            if initial_count > max_capacity:
                raise ValidationError("Initial count cannot exceed max capacity")
        except (ValueError, TypeError):
            raise ValidationError("initial_count must be a valid integer")