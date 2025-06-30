import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventory } from '../context/InventoryContext';
import { ArrowLeft } from 'lucide-react';

const AddPill = () => {
  const navigate = useNavigate();
  const { addPill } = useInventory();
  const [formData, setFormData] = useState({
    name: '',
    max_capacity: '',
    initial_count: '',
    low_stock_threshold: '',
    description: '',
    dosage: '',
    frequency: '',
    compartment_number: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const pillData = {
        ...formData,
        max_capacity: parseInt(formData.max_capacity),
        initial_count: parseInt(formData.initial_count) || 0,
        low_stock_threshold: formData.low_stock_threshold ? parseInt(formData.low_stock_threshold) : null,
        compartment_number: formData.compartment_number ? parseInt(formData.compartment_number) : null
      };

      await addPill(pillData);
      navigate('/pills');
    } catch (error) {
      alert('Failed to add pill. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-pill-page">
      <div className="page-header">
        <button className="btn btn-secondary" onClick={() => navigate('/pills')}>
          <ArrowLeft size={20} />
          Back to Pills
        </button>
        <h1>Add New Pill</h1>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="pill-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g., Vitamin D3"
              />
            </div>

            <div className="form-group">
              <label>Max Capacity *</label>
              <input
                type="number"
                name="max_capacity"
                value={formData.max_capacity}
                onChange={handleChange}
                required
                min="1"
                placeholder="Maximum pills this compartment can hold"
              />
            </div>

            <div className="form-group">
              <label>Initial Count</label>
              <input
                type="number"
                name="initial_count"
                value={formData.initial_count}
                onChange={handleChange}
                min="0"
                placeholder="Current number of pills"
              />
            </div>

            <div className="form-group">
              <label>Low Stock Threshold</label>
              <input
                type="number"
                name="low_stock_threshold"
                value={formData.low_stock_threshold}
                onChange={handleChange}
                min="1"
                placeholder="Alert when stock falls below this number"
              />
            </div>

            <div className="form-group">
              <label>Dosage</label>
              <input
                type="text"
                name="dosage"
                value={formData.dosage}
                onChange={handleChange}
                placeholder="e.g., 500mg, 1000 IU"
              />
            </div>

            <div className="form-group">
              <label>Frequency</label>
              <input
                type="text"
                name="frequency"
                value={formData.frequency}
                onChange={handleChange}
                placeholder="e.g., once daily, twice daily"
              />
            </div>

            <div className="form-group">
              <label>Compartment Number</label>
              <input
                type="number"
                name="compartment_number"
                value={formData.compartment_number}
                onChange={handleChange}
                min="1"
                placeholder="Physical compartment number"
              />
            </div>

            <div className="form-group full-width">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                placeholder="Additional notes about this medication..."
              />
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => navigate('/pills')}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Pill'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPill;