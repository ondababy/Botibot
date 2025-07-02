import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, Pill, Printer, Download, Filter } from 'lucide-react';

const ScheduleScreen = ({ onBack }) => {
  const [selectedDay, setSelectedDay] = useState('today');
  const [printing, setPrinting] = useState(false);

  // Sample schedule data
  const scheduleData = {
    today: [
      { time: '7:00 AM', medications: [
        { name: 'Metformin', dosage: '500mg', color: '#4ECDC4', taken: true },
        { name: 'Vitamin D3', dosage: '1000 IU', color: '#FFA726', taken: true }
      ]},
      { time: '8:00 AM', medications: [
        { name: 'Aspirin', dosage: '100mg', color: '#FF6B6B', taken: true }
      ]},
      { time: '2:00 PM', medications: [
        { name: 'Aspirin', dosage: '100mg', color: '#FF6B6B', taken: false }
      ]},
      { time: '7:00 PM', medications: [
        { name: 'Metformin', dosage: '500mg', color: '#4ECDC4', taken: false }
      ]},
      { time: '8:00 PM', medications: [
        { name: 'Aspirin', dosage: '100mg', color: '#FF6B6B', taken: false }
      ]}
    ],
    tomorrow: [
      { time: '7:00 AM', medications: [
        { name: 'Metformin', dosage: '500mg', color: '#4ECDC4', taken: false },
        { name: 'Vitamin D3', dosage: '1000 IU', color: '#FFA726', taken: false }
      ]},
      { time: '8:00 AM', medications: [
        { name: 'Aspirin', dosage: '100mg', color: '#FF6B6B', taken: false }
      ]},
      { time: '2:00 PM', medications: [
        { name: 'Aspirin', dosage: '100mg', color: '#FF6B6B', taken: false }
      ]},
      { time: '7:00 PM', medications: [
        { name: 'Metformin', dosage: '500mg', color: '#4ECDC4', taken: false }
      ]},
      { time: '8:00 PM', medications: [
        { name: 'Aspirin', dosage: '100mg', color: '#FF6B6B', taken: false }
      ]}
    ],
    weekly: [
      { day: 'Monday', times: 5 },
      { day: 'Tuesday', times: 5 },
      { day: 'Wednesday', times: 5 },
      { day: 'Thursday', times: 5 },
      { day: 'Friday', times: 5 },
      { day: 'Saturday', times: 4 },
      { day: 'Sunday', times: 4 }
    ]
  };

  const handlePrint = async () => {
    setPrinting(true);
    
    // Simulate print preparation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Trigger browser print dialog
    window.print();
    
    setPrinting(false);
  };

  const currentSchedule = scheduleData[selectedDay] || [];

  return (
    <div className="schedule-container-compact">
      {/* Header */}
      <div className="schedule-header-compact">
        <button 
          className="back-button-compact"
          onClick={onBack}
          disabled={printing}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        
        <div className="schedule-title-compact">
          <Calendar className="w-5 h-5" style={{ color: 'var(--denim-blue)' }} />
          <h1>Medication Schedule</h1>
        </div>

        <button 
          className="print-button-compact"
          onClick={handlePrint}
          disabled={printing}
        >
          {printing ? (
            <>
              <div className="loading-spinner-compact"></div>
              Preparing...
            </>
          ) : (
            <>
              <Printer className="w-4 h-4" />
              Print
            </>
          )}
        </button>
      </div>

      {/* Day Selector */}
      <div className="day-selector-compact">
        <button 
          className={`day-btn-compact ${selectedDay === 'today' ? 'active' : ''}`}
          onClick={() => setSelectedDay('today')}
        >
          Today
        </button>
        <button 
          className={`day-btn-compact ${selectedDay === 'tomorrow' ? 'active' : ''}`}
          onClick={() => setSelectedDay('tomorrow')}
        >
          Tomorrow
        </button>
        <button 
          className={`day-btn-compact ${selectedDay === 'weekly' ? 'active' : ''}`}
          onClick={() => setSelectedDay('weekly')}
        >
          Weekly View
        </button>
      </div>

      {/* Schedule Content */}
      <div className="schedule-content-compact">
        {selectedDay === 'weekly' ? (
          /* Weekly View */
          <div className="weekly-view">
            <h3>Weekly Overview</h3>
            <div className="weekly-grid">
              {scheduleData.weekly.map((day, index) => (
                <div key={day.day} className="day-card">
                  <h4>{day.day}</h4>
                  <div className="day-stats">
                    <span className="times-count">{day.times}</span>
                    <span className="times-label">doses</span>
                  </div>
                  <div className="day-progress">
                    <div 
                      className="progress-bar-day"
                      style={{ 
                        width: selectedDay === 'today' && index === 3 ? '60%' : '0%',
                        background: 'var(--success-green)'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Daily View */
          <div className="daily-schedule">
            <div className="schedule-date">
              <Clock className="w-4 h-4" style={{ color: 'var(--denim-blue)' }} />
              <span>{selectedDay === 'today' ? 'Today\'s Schedule' : 'Tomorrow\'s Schedule'}</span>
            </div>

            <div className="timeline-compact">
              {currentSchedule.map((timeSlot, index) => (
                <div key={index} className="time-slot-compact">
                  <div className="time-marker-compact">
                    <div className={`time-dot-compact ${timeSlot.medications.some(m => m.taken) ? 'completed' : 'pending'}`}></div>
                    <span className="time-label-compact">{timeSlot.time}</span>
                  </div>
                  
                  <div className="medications-compact">
                    {timeSlot.medications.map((med, medIndex) => (
                      <div key={medIndex} className={`medication-item-compact ${med.taken ? 'taken' : 'pending'}`}>
                        <div 
                          className="med-pill-compact"
                          style={{ backgroundColor: med.color }}
                        ></div>
                        <div className="med-info-compact">
                          <span className="med-name-compact">{med.name}</span>
                          <span className="med-dosage-compact">{med.dosage}</span>
                        </div>
                        <div className={`status-badge-compact ${med.taken ? 'taken' : 'pending'}`}>
                          {med.taken ? 'Taken' : 'Pending'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Summary Footer */}
      <div className="schedule-summary-compact">
        {selectedDay !== 'weekly' && (
          <div className="summary-stats">
            <div className="stat-item">
              <span>Total Doses:</span>
              <span>{currentSchedule.reduce((acc, slot) => acc + slot.medications.length, 0)}</span>
            </div>
            <div className="stat-item">
              <span>Completed:</span>
              <span>{currentSchedule.reduce((acc, slot) => acc + slot.medications.filter(m => m.taken).length, 0)}</span>
            </div>
            <div className="stat-item">
              <span>Remaining:</span>
              <span>{currentSchedule.reduce((acc, slot) => acc + slot.medications.filter(m => !m.taken).length, 0)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Print Overlay */}
      {printing && (
        <div className="printing-overlay-compact">
          <div className="printing-modal-compact">
            <div className="printing-animation-compact">
              <Printer className="w-8 h-8 printing-icon-compact" />
            </div>
            <h3>Preparing Schedule</h3>
            <p>Generating printable version...</p>
            <div className="progress-bar-compact">
              <div className="progress-fill-compact"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleScreen;