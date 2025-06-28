
import sqlite3
from typing import List, Optional, Dict
from app.database.connection import get_db_connection

class Pill:
    def __init__(self, id=None, name=None, compartment=None, current_count=0, 
                 max_capacity=30, low_stock_threshold=5, pill_color='#FFFFFF'):
        self.id = id
        self.name = name
        self.compartment = compartment
        self.current_count = current_count
        self.max_capacity = max_capacity
        self.low_stock_threshold = low_stock_threshold
        self.pill_color = pill_color
    
    @property
    def is_low_stock(self) -> bool:
        return self.current_count <= self.low_stock_threshold
    
    @property
    def is_empty(self) -> bool:
        return self.current_count == 0
    
    @property
    def fill_percentage(self) -> float:
        if self.max_capacity == 0:
            return 0
        return (self.current_count / self.max_capacity) * 100
    
    def to_dict(self) -> Dict:
        return {
            'id': self.id,
            'name': self.name,
            'compartment': self.compartment,
            'current_count': self.current_count,
            'max_capacity': self.max_capacity,
            'low_stock_threshold': self.low_stock_threshold,
            'pill_color': self.pill_color,
            'is_low_stock': self.is_low_stock,
            'is_empty': self.is_empty,
            'fill_percentage': self.fill_percentage
        }
    
    @classmethod
    def get_all(cls) -> List['Pill']:
        """Get all pills from database"""
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, name, compartment, current_count, max_capacity, 
                   low_stock_threshold, pill_color 
            FROM pills ORDER BY compartment
        ''')
        
        pills = []
        for row in cursor.fetchall():
            pill = cls(*row)
            pills.append(pill)
        
        conn.close()
        return pills
    
    @classmethod
    def get_by_id(cls, pill_id: int) -> Optional['Pill']:
        """Get pill by ID"""
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, name, compartment, current_count, max_capacity, 
                   low_stock_threshold, pill_color 
            FROM pills WHERE id = ?
        ''', (pill_id,))
        
        row = cursor.fetchone()
        conn.close()
        
        if row:
            return cls(*row)
        return None
    
    def save(self) -> bool:
        """Save pill to database"""
        conn = get_db_connection()
        cursor = conn.cursor()
        
        try:
            if self.id:
                # Update existing pill
                cursor.execute('''
                    UPDATE pills SET name=?, compartment=?, current_count=?, 
                           max_capacity=?, low_stock_threshold=?, pill_color=?
                    WHERE id=?
                ''', (self.name, self.compartment, self.current_count,
                      self.max_capacity, self.low_stock_threshold, 
                      self.pill_color, self.id))
            else:
                # Insert new pill
                cursor.execute('''
                    INSERT INTO pills (name, compartment, current_count, 
                                     max_capacity, low_stock_threshold, pill_color)
                    VALUES (?, ?, ?, ?, ?, ?)
                ''', (self.name, self.compartment, self.current_count,
                      self.max_capacity, self.low_stock_threshold, self.pill_color))
                self.id = cursor.lastrowid
            
            conn.commit()
            return True
            
        except sqlite3.Error as e:
            print(f"Database error: {e}")
            return False
        finally:
            conn.close()