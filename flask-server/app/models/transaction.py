from app.database.database import get_db_connection

class Transaction:
    def __init__(self, pill_id: int, transaction_type: str, quantity_change: int,
                 previous_count: int, new_count: int, notes: str = ""):
        self.pill_id = pill_id
        self.transaction_type = transaction_type
        self.quantity_change = quantity_change
        self.previous_count = previous_count
        self.new_count = new_count
        self.notes = notes
    
    def save(self) -> bool:
        """Save transaction to database"""
        try:
            with get_db_connection() as conn:
                cursor = conn.cursor()
                cursor.execute('''
                    INSERT INTO transactions (pill_id, transaction_type, quantity_change,
                                            previous_count, new_count, notes)
                    VALUES (?, ?, ?, ?, ?, ?)
                ''', (self.pill_id, self.transaction_type, self.quantity_change,
                      self.previous_count, self.new_count, self.notes))
                conn.commit()
                return True
        except Exception as e:
            print(f"Error saving transaction: {e}")
            return False