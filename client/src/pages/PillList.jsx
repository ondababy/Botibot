import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import PillCard from '../components/Pills/PillCard';
import { Search, Filter } from 'lucide-react';

const PillList = () => {
  const { pills, loading } = useInventory();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredPills = pills.filter(pill => {
    const matchesSearch = pill.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === 'all') return matchesSearch;
    if (filterStatus === 'low') return matchesSearch && pill.is_low_stock;
    if (filterStatus === 'empty') return matchesSearch && pill.is_empty;
    if (filterStatus === 'good') return matchesSearch && !pill.is_low_stock && !pill.is_empty;
    
    return matchesSearch;
  });

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="pill-list-page">
      <div className="page-header">
        <h1>All Pills ({pills.length})</h1>
        
        <div className="filters">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search pills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-select">
            <Filter size={20} />
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="good">Good Stock</option>
              <option value="low">Low Stock</option>
              <option value="empty">Empty</option>
            </select>
          </div>
        </div>
      </div>

      <div className="pills-grid">
        {filteredPills.map(pill => (
          <PillCard key={pill.id} pill={pill} />
        ))}
      </div>

      {filteredPills.length === 0 && (
        <div className="empty-state">
          <Package size={48} />
          <h3>No pills found</h3>
          <p>Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default PillList;