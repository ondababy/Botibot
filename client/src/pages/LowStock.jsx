import React from 'react';
import { useInventory } from '../context/InventoryContext';
import PillCard from '../components/Pills/PillCard';
import { AlertTriangle } from 'lucide-react';

const LowStock = () => {
  const { lowStockPills, loading } = useInventory();

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="low-stock-page">
      <div className="page-header">
        <h1>
          <AlertTriangle />
          Low Stock Pills ({lowStockPills.length})
        </h1>
      </div>

      {lowStockPills.length > 0 ? (
        <div className="pills-grid">
          {lowStockPills.map(pill => (
            <PillCard key={pill.id} pill={pill} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <AlertTriangle size={48} />
          <h3>No low stock items</h3>
          <p>All your pills are well stocked!</p>
        </div>
      )}
    </div>
  );
};

export default LowStock;