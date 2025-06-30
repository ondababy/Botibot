import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { InventoryProvider } from './context/InventoryContext';
import Navbar from './components/Layout/Navbar';
import Dashboard from './pages/Dashboard';
import PillList from './pages/PillList';
import AddPill from './pages/AddPill';
import PillDetails from './pages/PillDetails';
import LowStock from './pages/LowStock';
import './App.css';

function App() {
  return (
    <InventoryProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/pills" element={<PillList />} />
              <Route path="/pills/add" element={<AddPill />} />
              <Route path="/pills/:id" element={<PillDetails />} />
              <Route path="/low-stock" element={<LowStock />} />
            </Routes>
          </main>
        </div>
      </Router>
    </InventoryProvider>
  );
}

export default App;