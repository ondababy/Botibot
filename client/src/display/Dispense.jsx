import React, { useState } from 'react';
import { ArrowLeft, Pill, Clock, Plus, Minus, Check, AlertCircle } from 'lucide-react';

const DispenseScreen = ({ onBack }) => {
  const [selectedPills, setSelectedPills] = useState({});
  const [dispensing, setDispensing] = useState(false);

  // Sample medication data - optimized for compact view
  const medications = [
    {
      id: 1,
      name: 'Aspirin',
      dosage: '100mg',
      color: '#FF6B6B',
      stock: 30,
      scheduledTimes: ['8:00 AM', '2:00 PM'],
      suggestedQuantity: 2,
      indication: 'Pain Relief'
    },
    {
      id: 2,
      name: 'Metformin',
      dosage: '500mg',
      color: '#4ECDC4',
      stock: 45,
      scheduledTimes: ['7:00 AM', '7:00 PM'],
      suggestedQuantity: 2,
      indication: 'Diabetes'
    },
    {
      id: 3,
      name: 'Lisinopril',
      dosage: '10mg',
      color: '#45B7D1',
      stock: 25,
      scheduledTimes: ['9:00 AM'],
      suggestedQuantity: 1,
      indication: 'Blood Pressure'
    }
  ];

  const updateQuantity = (medicationId, change) => {
    setSelectedPills(prev => {
      const currentQty = prev[medicationId] || 0;
      const newQty = Math.max(0, Math.min(currentQty + change, medications.find(m => m.id === medicationId).stock));
      
      if (newQty === 0) {
        const { [medicationId]: removed, ...rest } = prev;
        return rest;
      }
      
      return { ...prev, [medicationId]: newQty };
    });
  };

  const getTotalPills = () => {
    return Object.values(selectedPills).reduce((sum, qty) => sum + qty, 0);
  };

  const handleDispense = async () => {
    if (getTotalPills() === 0) return;
    
    setDispensing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setDispensing(false);
    onBack();
  };

  const handleQuickSelect = (medicationId) => {
    const medication = medications.find(m => m.id === medicationId);
    setSelectedPills(prev => ({
      ...prev,
      [medicationId]: medication.suggestedQuantity
    }));
  };

  return (
    <div className="dispense-container-compact">
      {/* Compact Header */}
      <div className="dispense-header-compact">
        <button 
          className="back-button-compact"
          onClick={onBack}
          disabled={dispensing}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        
        <div className="dispense-title-compact">
          <Pill className="w-5 h-5" style={{ color: 'var(--denim-blue)' }} />
          <h1>Dispense Medications</h1>
        </div>

        <div className="dispense-info-compact">
          <span>Total: {getTotalPills()} pills</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="dispense-content">
        {/* Medications List - Horizontal Layout */}
        <div className="medications-list-compact">
          {medications.map(medication => (
            <div key={medication.id} className="medication-card-compact">
              {/* Pill Visual */}
              <div className="pill-visual-compact">
                <div 
                  className="pill-shape-compact"
                  style={{ backgroundColor: medication.color }}
                />
                <div className="pill-info-compact">
                  <h3>{medication.name}</h3>
                  <p>{medication.dosage}</p>
                  <span className="indication-compact">{medication.indication}</span>
                </div>
              </div>

              {/* Schedule */}
              <div className="schedule-compact">
                <div className="schedule-times-compact">
                  {medication.scheduledTimes.map((time, index) => (
                    <span key={index} className="time-badge-compact">{time}</span>
                  ))}
                </div>
                <p className="suggested-compact">Suggested: {medication.suggestedQuantity}</p>
              </div>

              {/* Quantity Controls */}
              <div className="quantity-section-compact">
                <button 
                  className="quick-select-btn-compact"
                  onClick={() => handleQuickSelect(medication.id)}
                >
                  Quick ({medication.suggestedQuantity})
                </button>
                
                <div className="quantity-controls-compact">
                  <button 
                    className="qty-btn-compact"
                    onClick={() => updateQuantity(medication.id, -1)}
                    disabled={!selectedPills[medication.id]}
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  
                  <div className="quantity-display-compact">
                    <span className="qty-number-compact">{selectedPills[medication.id] || 0}</span>
                  </div>
                  
                  <button 
                    className="qty-btn-compact"
                    onClick={() => updateQuantity(medication.id, 1)}
                    disabled={selectedPills[medication.id] >= medication.stock}
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                
                <div className="stock-info-compact">
                  Stock: {medication.stock}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="dispense-actions-compact">
        <div className="action-summary-compact">
          <span>Selected: {Object.keys(selectedPills).length} medications</span>
          <span>Total: {getTotalPills()} pills</span>
        </div>

        <div className="action-buttons-compact">
          <button 
            className="cancel-btn-compact"
            onClick={onBack}
            disabled={dispensing}
          >
            Cancel
          </button>
          
          <button 
            className="dispense-btn-compact"
            onClick={handleDispense}
            disabled={getTotalPills() === 0 || dispensing}
          >
            {dispensing ? (
              <>
                <div className="loading-spinner-compact"></div>
                Dispensing...
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                Dispense {getTotalPills()} Pills
              </>
            )}
          </button>
        </div>
      </div>

      {/* Dispensing Overlay */}
      {dispensing && (
        <div className="dispensing-overlay-compact">
          <div className="dispensing-modal-compact">
            <div className="dispensing-animation-compact">
              <Pill className="w-8 h-8 dispensing-pill-compact" />
            </div>
            <h3>Dispensing Medications</h3>
            <p>Please wait...</p>
            <div className="progress-bar-compact">
              <div className="progress-fill-compact"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DispenseScreen;