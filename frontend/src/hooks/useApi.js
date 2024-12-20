import { useState } from 'react';
import api from '../utils/axios';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiCall = async (method, url, data = null) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api[method](url, data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, apiCall };
}; 