const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get auth token from localStorage
const getToken = () => localStorage.getItem('kai_admin_token');

// API request helper
export const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Handle FormData (for file uploads)
  if (options.body instanceof FormData) {
    delete headers['Content-Type']; // Let browser set content type for FormData
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Request failed');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Auth API
export const authAPI = {
  login: (credentials) =>
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
  verify: () => apiRequest('/auth/verify'),
  changePassword: (passwords) =>
    apiRequest('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify(passwords),
    }),
};

// Case Studies API
export const caseStudiesAPI = {
  getAll: (published) => apiRequest(`/case-studies${published !== undefined ? `?published=${published}` : ''}`),
  getById: (id) => apiRequest(`/case-studies/${id}`),
  create: (formData) =>
    apiRequest('/case-studies', {
      method: 'POST',
      body: formData,
    }),
  update: (id, formData) =>
    apiRequest(`/case-studies/${id}`, {
      method: 'PUT',
      body: formData,
    }),
  delete: (id) =>
    apiRequest(`/case-studies/${id}`, {
      method: 'DELETE',
    }),
};

// Publications API
export const publicationsAPI = {
  getAll: (published) => apiRequest(`/publications${published !== undefined ? `?published=${published}` : ''}`),
  getById: (id) => apiRequest(`/publications/${id}`),
  create: (data) =>
    apiRequest('/publications', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id, data) =>
    apiRequest(`/publications/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id) =>
    apiRequest(`/publications/${id}`, {
      method: 'DELETE',
    }),
};

// Blog API
export const blogAPI = {
  getAll: (filters = {}) => {
    const query = new URLSearchParams();
    if (filters.published !== undefined) query.set('published', filters.published);
    if (filters.category) query.set('category', filters.category);
    return apiRequest(`/blog?${query.toString()}`);
  },
  getBySlug: (slug) => apiRequest(`/blog/slug/${slug}`),
  getById: (id) => apiRequest(`/blog/admin/${id}`),
  getCategories: () => apiRequest('/blog/categories'),
  create: (formData) =>
    apiRequest('/blog', {
      method: 'POST',
      body: formData,
    }),
  update: (id, formData) =>
    apiRequest(`/blog/${id}`, {
      method: 'PUT',
      body: formData,
    }),
  delete: (id) =>
    apiRequest(`/blog/${id}`, {
      method: 'DELETE',
    }),
};

// Profile API
export const profileAPI = {
  get: () => apiRequest('/profile'),
  update: (formData) =>
    apiRequest('/profile', {
      method: 'PUT',
      body: formData,
    }),
  uploadImage: (formData) =>
    apiRequest('/profile/upload-image', {
      method: 'POST',
      body: formData,
    }),
};
