import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { pillService } from '../services/api';
import { useInventory } from '../context/InventoryContext';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';

const PillDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { refillPill, adjustInventory } = useInventory();
  const [pill, setPill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchPillDetails();
  }, [id]);

  const fetchPillDetails = async () => {
    try {
      const response = await pillService.getPillById(id);
      setPill(response.data.pill);
      setEditData(response.data.pill);
    } catch (error) {
      console.error('Failed to fetch pill details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSchedule = async (e) => {
    e.preventDefault();
    try {
      await pillService.updateSchedule(id, {
        frequency: editData.frequency,
        dosage: editData.dosage,
        notes: 'Updated via pill details page'
      });
      setShowEditModal(false);
      fetchPillDetails();
    } catch (error) {
      alert('Failed to update schedule');
    }
  };

  const handleRemovePill = async () => {
    if (window.confirm('Are you sure you want to remove this pill?')) {
      try {
        await pillService.removePill(id, 'Removed via pill details page');
        navigate('/pills');
      } catch (error) {
        alert('Failed to remove pill');
      }
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!pill) return <div className="empty-state">Pill not found</div>;

  const stockStatus = pill.is_empty ? 'empty' : pill.is_low_stock ? 'low' : 'good';
  const fillPercentage = (pill.current_count / pill.max_capacity) * 100;

  return (
    <div className="pill-details-page">
      <div className="page-header">
        <button className="btn btn-secondary" onClick={() => navigate('/pills')}>
          <ArrowLeft size={20} />
          Back to Pills
        </button>
        <div className="header-actions">
          <button 
            className="btn btn-secondary"
            onClick={() => setShowEditModal(true)}
          >
            <Edit size={16} />
            Edit Schedule
          </button>
          <button 
            className="btn btn-danger"
            onClick={handleRemovePill}
            style={{ background: '#ef4444', color: 'white' }}
          >
            <Trash2 size={16} />
            Remove
          </button>
        </div>
      </div>

      <div className="pill-details-content">
        <div className="pill-overview">
          <h1>{pill.name}</h1>
          <div className={`status-badge ${stockStatus}`}>
            {pill.current_count}/{pill.max_capacity} pills
          </div>
          
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ 
                width: `${fillPercentage}%`,
                backgroundColor: stockStatus === 'empty' ? '#ef4444' : 
                                stockStatus === 'low' ? '#f59e0b' : '#10b981'
              }}
            />
          </div>
        </div>

        <div className="pill-info-grid">
          <div className="info-card">
            <h3>Medication Details</h3>
            <p><strong>Dosage:</strong> {pill.dosage || 'Not specified'}</p>
            <p><strong>Frequency:</strong> {pill.frequency || 'Not specified'}</p>
            <p><strong>Description:</strong> {pill.description || 'No description'}</p>
            {pill.compartment_number && (
              <p><strong>Compartment:</strong> {pill.compartment_number}</p>
            )}
          </div>

          <div className="info-card">
            <h3>Stock Information</h3>
            <p><strong>Current Count:</strong> {pill.current_count}</p>
            <p><strong>Max Capacity:</strong> {pill.max_capacity}</p>
            <p><strong>Low Stock Threshold:</strong> {pill.low_stock_threshold}</p>
            <p><strong>Available Space:</strong> {pill.max_capacity - pill.current_count}</p>
          </div>
        </div>
      </div>

      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Schedule</h3>
            <form onSubmit={handleUpdateSchedule}>
              <div className="form-group">
                <label>Frequency:</label>
                <input
                  type="text"
                  value={editData.frequency}
                  onChange={(e) => setEditData({...editData, frequency: e.target.value})}
                  placeholder="e.g., twice daily"
                  required
                />
              </div>
              <div className="form-group">
                <label>Dosage:</label>
                <input
                  type="text"
                  value={editData.dosage}
                  onChange={(e) => setEditData({...editData, dosage: e.target.value})}
                  placeholder="e.g., 500mg"
                />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PillDetails;