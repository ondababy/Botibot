import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, RefreshCw, AlertTriangle, Package } from 'lucide-react';
import { useInventory } from '../../context/InventoryContext';

const PillCard = ({ pill }) => {
  const navigate = useNavigate();
  const { refillPill } = useInventory();
  const [showRefillModal, setShowRefillModal] = useState(false);
  const [refillAmount, setRefillAmount] = useState('');
  const [notes, setNotes] = useState('');

  const getStockStatus = () => {
    if (pill.is_empty) return { status: 'empty', color: '#ef4444' };
    if (pill.is_low_stock) return { status: 'low', color: '#f59e0b' };
    return { status: 'good', color: '#10b981' };
  };

  const stockStatus = getStockStatus();
  const fillPercentage = (pill.current_count / pill.max_capacity) * 100;

  const handleRefill = async (e) => {
    e.preventDefault();
    try {
      await refillPill({
        pill_id: pill.id,
        quantity: parseInt(refillAmount),
        notes
      });
      setShowRefillModal(false);
      setRefillAmount('');
      setNotes('');
    } catch (error) {
      alert('Failed to refill pill');
    }
  };

  return (
    <>
      <div className="pill-card">
        <div className="pill-card-header">
          <h3>{pill.name}</h3>
          <span className={`status-badge ${stockStatus.status}`}>
            {stockStatus.status === 'empty' && <AlertTriangle size={16} />}
            {stockStatus.status === 'low' && <Package size={16} />}
            {pill.current_count}/{pill.max_capacity}
          </span>
        </div>
        
        <div className="pill-info">
          <p><strong>Dosage:</strong> {pill.dosage || 'Not specified'}</p>
          <p><strong>Frequency:</strong> {pill.frequency || 'Not specified'}</p>
          {pill.compartment_number && (
            <p><strong>Compartment:</strong> {pill.compartment_number}</p>
          )}
        </div>

        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ 
              width: `${fillPercentage}%`, 
              backgroundColor: stockStatus.color 
            }}
          />
        </div>

        <div className="pill-card-actions">
          <button 
            className="btn btn-secondary"
            onClick={() => navigate(`/pills/${pill.id}`)}
          >
            <Edit size={16} />
            Edit
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => setShowRefillModal(true)}
          >
            <RefreshCw size={16} />
            Refill
          </button>
        </div>
      </div>

      {showRefillModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Refill {pill.name}</h3>
            <form onSubmit={handleRefill}>
              <div className="form-group">
                <label>Amount to Add:</label>
                <input
                  type="number"
                  value={refillAmount}
                  onChange={(e) => setRefillAmount(e.target.value)}
                  min="1"
                  max={pill.max_capacity - pill.current_count}
                  required
                />
                <small>Max: {pill.max_capacity - pill.current_count}</small>
              </div>
              <div className="form-group">
                <label>Notes (optional):</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any notes about this refill..."
                />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowRefillModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Refill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PillCard;