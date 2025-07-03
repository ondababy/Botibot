import axios from 'axios';

const getApiBaseUrl = () => {
  // For web development
  if (import.meta.env.DEV) {
    return import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/inventory';
  }
  
  // Production URL - Uses environment variable or fallback
  return import.meta.env.VITE_API_BASE_URL_PROD || '/api/inventory';
};

const API_BASE_URL = getApiBaseUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor (for adding auth tokens if needed)
api.interceptors.request.use(
  (config) => {
    // You can add authentication tokens here if needed
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    
    console.log('Making request to:', config.baseURL + config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error status (4xx, 5xx)
      console.error('API Error Response:', {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url
      });
    } else if (error.request) {
      // Request was made but no response received (network issues)
      console.error('Network Error:', {
        message: error.message,
        url: error.config?.url,
        baseURL: error.config?.baseURL
      });
    } else {
      // Something else happened
      console.error('Request Setup Error:', error.message);
    }
    return Promise.reject(error);
  }
);

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

// Test connection function (optional but helpful for debugging)
export const testConnection = async () => {
  try {
    console.log('Testing connection to:', API_BASE_URL);
    const response = await api.get('/summary');
    return { 
      success: true, 
      message: 'Connected successfully',
      baseURL: API_BASE_URL 
    };
  } catch (error) {
    return { 
      success: false, 
      message: error.message,
      baseURL: API_BASE_URL,
      isNetworkError: !error.response 
    };
  }
};

export default api;