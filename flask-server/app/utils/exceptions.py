class ValidationError(Exception):
    """Exception raised for validation errors"""
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)

class DatabaseError(Exception):
    """Exception raised for database errors"""
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)