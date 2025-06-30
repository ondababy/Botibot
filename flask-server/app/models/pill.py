import sqlite3
from typing import List, Optional
from app.database.database import get_db_connection

class Pill:
    def __init__(self, name: str, max_capacity: int, current_count: int = 0, 
                 low_stock_threshold: int = 10, description: str = "",
                 dosage: str = "", frequency: str = "", 
                 compartment_number: Optional[int] = None, pill_id: Optional[int] = None):
        self.id = pill_id
        self.name = name
        self.max_capacity = max_capacity
        self.current_count = current_count
        self.low_stock_threshold = low_stock_threshold
        self.description = description
        self.dosage = dosage
        self.frequency = frequency
        self.compartment_number = compartment_number
    
    @property
    def is_empty(self) -> bool:
        return self.current_count == 0
    
    @property
    def is_low_stock(self) -> bool:
        return self.current_count <= self.low_stock_threshold and not self.is_empty
    
    def save(self) -> bool:
        """Save pill to database"""
        try:
            with get_db_connection() as conn:
                cursor = conn.cursor()
                
                if self.id is None:  # New pill
                    cursor.execute('''
                        INSERT INTO pills (name, max_capacity, current_count, low_stock_threshold,
                                         description, dosage, frequency, compartment_number)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                    ''', (self.name, self.max_capacity, self.current_count, self.low_stock_threshold,
                          self.description, self.dosage, self.frequency, self.compartment_number))
                    self.id = cursor.lastrowid
                else:  # Update existing
                    cursor.execute('''
                        UPDATE pills SET name=?, max_capacity=?, current_count=?, low_stock_threshold=?,
                                       description=?, dosage=?, frequency=?, compartment_number=?,
                                       updated_at=CURRENT_TIMESTAMP
                        WHERE id=?
                    ''', (self.name, self.max_capacity, self.current_count, self.low_stock_threshold,
                          self.description, self.dosage, self.frequency, self.compartment_number, self.id))
                
                conn.commit()
                return True
        except Exception as e:
            print(f"Error saving pill: {e}")
            return False
    
    def delete(self) -> bool:
        """Delete pill from database"""
        try:
            with get_db_connection() as conn:
                cursor = conn.cursor()
                cursor.execute('DELETE FROM pills WHERE id=?', (self.id,))
                conn.commit()
                return True
        except Exception:
            return False
    
    @classmethod
    def get_all(cls) -> List['Pill']:
        """Get all pills from database"""
        pills = []
        try:
            with get_db_connection() as conn:
                cursor = conn.cursor()
                cursor.execute('SELECT * FROM pills ORDER BY name')
                rows = cursor.fetchall()
                
                for row in rows:
                    pill = cls(
                        name=row['name'],
                        max_capacity=row['max_capacity'],
                        current_count=row['current_count'],
                        low_stock_threshold=row['low_stock_threshold'],
                        description=row['description'],
                        dosage=row['dosage'],
                        frequency=row['frequency'],
                        compartment_number=row['compartment_number'],
                        pill_id=row['id']
                    )
                    pills.append(pill)
        except Exception as e:
            print(f"Error getting pills: {e}")
        
        return pills
    
    @classmethod
    def get_by_id(cls, pill_id: int) -> Optional['Pill']:
        """Get pill by ID"""
        try:
            with get_db_connection() as conn:
                cursor = conn.cursor()
                cursor.execute('SELECT * FROM pills WHERE id=?', (pill_id,))
                row = cursor.fetchone()
                
                if row:
                    return cls(
                        name=row['name'],
                        max_capacity=row['max_capacity'],
                        current_count=row['current_count'],
                        low_stock_threshold=row['low_stock_threshold'],
                        description=row['description'],
                        dosage=row['dosage'],
                        frequency=row['frequency'],
                        compartment_number=row['compartment_number'],
                        pill_id=row['id']
                    )
        except Exception as e:
            print(f"Error getting pill by ID: {e}")
        
        return None
    
    def to_dict(self) -> dict:
        """Convert pill to dictionary"""
        return {
            'id': self.id,
            'name': self.name,
            'max_capacity': self.max_capacity,
            'current_count': self.current_count,
            'low_stock_threshold': self.low_stock_threshold,
            'description': self.description,
            'dosage': self.dosage,
            'frequency': self.frequency,
            'compartment_number': self.compartment_number,
            'is_empty': self.is_empty,
            'is_low_stock': self.is_low_stock
        }