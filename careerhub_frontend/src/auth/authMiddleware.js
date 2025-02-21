import { refreshAccessToken } from './authSlice';
import { getCookie } from './authService';

const authMiddleware = store => next => action => {
  const state = store.getState();
  const accessToken = getCookie('access_token');
  
  // Check if token needs refresh (every 40 minutes)
  if (accessToken && state.auth.lastRefresh && 
      Date.now() - state.auth.lastRefresh > 40 * 60 * 1000) {
    store.dispatch(refreshAccessToken());
  }

  return next(action);
};

export default authMiddleware; 