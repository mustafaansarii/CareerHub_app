import axios from 'axios';
import config from  "../config"

const API_URL = config.Backend_Api + '/api/auth';

// Send OTP
const sendOTP = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/send-otp/`, { email });
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        throw { status: 400, message: error.response.data.error };
      }
      throw new Error(error.response.data.error || 'Failed to send OTP');
    }
    throw new Error('Error sending OTP');
  }
};

// Signup with OTP
const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup/`, userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        throw { status: 400, message: error.response.data.error };
      }
      throw new Error(error.response.data.error || 'Signup failed');
    }
    throw new Error('Error during signup');
  }
};

// Helper function to set cookies
const setAuthCookies = (accessToken, refreshToken) => {
  document.cookie = `access_token=${accessToken}; path=/; max-age=${60 * 60}; SameSite=Strict; Secure`;
  document.cookie = `refresh_token=${refreshToken}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Strict; Secure`;
};

// Helper function to get cookie
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

// Helper function to clear cookies
const clearAuthCookies = () => {
  document.cookie = 'access_token=; path=/; max-age=0; SameSite=Strict; Secure';
  document.cookie = 'refresh_token=; path=/; max-age=0; SameSite=Strict; Secure';
};

// Refresh token
const refreshToken = async () => {
  try {
    const refresh = getCookie('refresh_token');
    if (!refresh) throw new Error('No refresh token found');
    
    const response = await axios.post(`${API_URL}/token/refresh/`, { refresh });
    setAuthCookies(response.data.access, refresh);
    return response.data.access;
  } catch (error) {
    clearAuthCookies();
    throw new Error('Token refresh failed');
  }
};

// Login
const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login/`, credentials);
    if (response.data) {
      setAuthCookies(response.data.access, response.data.refresh);
    }
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 410) {
        throw { status: 410, message: 'Invalid credentials' };
      }
      throw new Error(error.response.data.error || 'Login failed');
    }
    throw new Error('Login failed. Please try again');
  }
};

// Send OTP for forgot password
const sendOTPForgetPass = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/send-otp-forgetpass/`, { email });
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        throw { status: 401, message: error.response.data.error };
      }
      throw new Error(error.response.data.error || 'Failed to send OTP');
    }
    throw new Error('Error sending OTP');
  }
};

// Reset password
const resetPassword = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/forget-password/`, data);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        throw { status: 401, message: error.response.data.error };
      }
      throw new Error(error.response.data.error || 'Password reset failed');
    }
    throw new Error('Error resetting password');
  }
};

// Google OAuth Login
const googleLogin = async (code) => {
  try {
    const response = await axios.post(`${API_URL}/google/login/`, { code });
    if (response.data) {
      setAuthCookies(response.data.access, response.data.refresh);
    }
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || 'Google login failed');
    }
    throw new Error('Error during Google login');
  }
};

// Google OAuth Signup
const googleSignup = async (code) => {
  try {
    const response = await axios.post(`${API_URL}/google/signup/`, { code });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || 'Google signup failed');
    }
    throw new Error('Error during Google signup');
  }
};

// Update logout function to clear both cookies and localStorage
const logout = () => {
  try {
    // Clear cookies
    document.cookie = 'access_token=; path=/; max-age=0; SameSite=Strict; Secure';
    document.cookie = 'refresh_token=; path=/; max-age=0; SameSite=Strict; Secure';
    
    // Clear localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};

export { 
  sendOTP, 
  signup, 
  login, 
  logout,
  sendOTPForgetPass, 
  resetPassword, 
  googleLogin, 
  googleSignup,
  refreshToken,
  getCookie
};
