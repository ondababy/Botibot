import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventory } from '../context/InventoryContext';
import { Package, AlertTriangle, CheckCircle, Plus } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { summary, lowStockPills, loading } = useInventory();

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Inventory Dashboard</h1>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/pills/add')}
        >
          <Plus size={20} />
          Add New Pill
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Package />
          </div>
          <div className="stat-content">
            <h3>{summary.total_pills || 0}</h3>
            <p>Total Pills</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <CheckCircle />
          </div>
          <div className="stat-content">
            <h3>{summary.healthy_compartments || 0}</h3>
            <p>Healthy Stock</p>
          </div>
        </div>
        
        <div className="stat-card warning">
          <div className="stat-icon">
            <AlertTriangle />
          </div>
          <div className="stat-content">
            <h3>{summary.low_stock_compartments || 0}</h3>
            <p>Low Stock</p>
          </div>
        </div>
        
        <div className="stat-card danger">
          <div className="stat-icon">
            <Package />
          </div>
          <div className="stat-content">
            <h3>{summary.empty_compartments || 0}</h3>
            <p>Empty</p>
          </div>
        </div>
      </div>

      {lowStockPills.length > 0 && (
        <div className="low-stock-alert">
          <h2>
            <AlertTriangle />
            Low Stock Alert ({lowStockPills.length} items)
          </h2>
          <div className="low-stock-list">
            {lowStockPills.map(pill => (
              <div key={pill.id} className="low-stock-item">
                <span className="pill-name">{pill.name}</span>
                <span className="pill-count">
                  {pill.current_count}/{pill.max_capacity}
                </span>
                <button 
                  className="btn btn-sm btn-primary"
                  onClick={() => navigate(`/pills/${pill.id}`)}
                >
                  Refill
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;