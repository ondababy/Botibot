import sqlite3
import os
from contextlib import contextmanager

# Database will be created in the flask-server root directory
DATABASE_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 'pill_inventory.db')

def init_database():
    """Initialize the database with required tables"""
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    # Create pills table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS pills (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            max_capacity INTEGER NOT NULL,
            current_count INTEGER DEFAULT 0,
            low_stock_threshold INTEGER DEFAULT 10,
            description TEXT DEFAULT '',
            dosage TEXT DEFAULT '',
            frequency TEXT DEFAULT '',
            compartment_number INTEGER UNIQUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Create transactions table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pill_id INTEGER NOT NULL,
            transaction_type TEXT NOT NULL,
            quantity_change INTEGER NOT NULL,
            previous_count INTEGER NOT NULL,
            new_count INTEGER NOT NULL,
            notes TEXT DEFAULT '',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (pill_id) REFERENCES pills (id)
        )
    ''')
    
    conn.commit()
    conn.close()

@contextmanager
def get_db_connection():
    """Context manager for database connections"""
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row  # This allows dict-like access to rows
    try:
        yield conn
    finally:
        conn.close()