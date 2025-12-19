// API Configuration
export const API_BASE_URL = 'https://serversense-server.onrender.com';

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    LOGOUT: `${API_BASE_URL}/api/auth/logout`,
  },
  SERVERS: {
    LIST: `${API_BASE_URL}/api/servers`,
    DETAIL: (id) => `${API_BASE_URL}/api/servers/${id}`,
    CREATE: `${API_BASE_URL}/api/servers`,
    UPDATE: (id) => `${API_BASE_URL}/api/servers/${id}`,
    DELETE: (id) => `${API_BASE_URL}/api/servers/${id}`,
  },
  METRICS: {
    DASHBOARD: `${API_BASE_URL}/api/metrics/dashboard`,
    SERVER: (id) => `${API_BASE_URL}/api/metrics/server/${id}`,
  },
  ALERTS: {
    LIST: `${API_BASE_URL}/api/alerts`,
    CREATE: `${API_BASE_URL}/api/alerts`,
    UPDATE: (id) => `${API_BASE_URL}/api/alerts/${id}`,
  },
  USERS: {
    LIST: `${API_BASE_URL}/api/users`,
    PROFILE: `${API_BASE_URL}/api/users/profile`,
  }
};