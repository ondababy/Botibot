import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/inventory';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const pillService = {
  // Get all pills
  getAllPills: () => api.get('/pills'),
  
  // Get pill by ID
  getPillById: (id) => api.get(`/pills/${id}`),
  
  // Add new pill
  addPill: (pillData) => api.post('/pills', pillData),
  
  // Update pill schedule
  updateSchedule: (id, scheduleData) => api.put(`/pills/${id}/schedule`, scheduleData),
  
  // Remove pill
  removePill: (id, reason) => api.delete(`/pills/${id}`, { data: { reason } }),
  
  // Refill pills
  refillPills: (refillData) => api.post('/refill', refillData),
  
  // Adjust inventory
  adjustInventory: (adjustData) => api.post('/adjust', adjustData),
  
  // Get low stock pills
  getLowStockPills: () => api.get('/low-stock'),
  
  // Get inventory summary
  getInventorySummary: () => api.get('/summary'),
};

export default api;