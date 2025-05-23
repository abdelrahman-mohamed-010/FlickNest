import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as mockAuthApi from '../util/mockAuthApi';
import { loadUserWatchlist } from './watchlistslice'; // Import the action

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

// Async Thunk for Login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await mockAuthApi.login(email, password);
      return response; // { user: { email } }
    } catch (error) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

// Async Thunk for Signup
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await mockAuthApi.signup(email, password);
      return response; // { user: { email } }
    } catch (error) {
      return rejectWithValue(error.message || 'Signup failed');
    }
  }
);

// Async Thunk for Logout (optional, but good for consistency)
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await mockAuthApi.logout();
      return;
    } catch (error) {
      // This is unlikely to fail in the mock, but good for pattern
      return rejectWithValue(error.message || 'Logout failed');
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Kept the synchronous logout action for immediate state change in Navbar,
    // but also added logoutUser thunk for potential async cleanup or API calls in a real app.
    // If logoutUser thunk is preferred everywhere, this manual 'logout' reducer can be removed
    // and components can dispatch logoutUser.
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login Thunk
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = null;
        // Dispatch is not available directly in reducer, so this needs to be handled in the component
        // or by making loginUser thunk dispatch loadUserWatchlist.
        // For now, we'll assume it's handled where loginUser is dispatched, or we'll adjust loginUser thunk.
        // Ideally, loginUser thunk should dispatch loadUserWatchlist(action.payload.user.email)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload; // Error message from rejectWithValue
      })
      // Signup Thunk
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        // User is not authenticated immediately after signup in this flow.
        // They are redirected to login.
        // state.isAuthenticated = true; // If auto-login desired
        // state.user = action.payload.user; // If auto-login desired
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload; // Error message from rejectWithValue
      })
      // Logout Thunk (handles state similarly to synchronous logout)
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
        state.loading = false;
      })
      .addCase(logoutUser.pending, (state) => { // Optional: handle pending for logout
        state.loading = true;
      })
      .addCase(logoutUser.rejected, (state, action) => { // Optional: handle rejected for logout
        state.loading = false;
        // state.error = action.payload; // Decide if logout failure should set an error
        // Forcing logout on frontend even if API call fails might be a strategy
        state.isAuthenticated = false; 
        state.user = null;
      });
  },
});

// Export the synchronous logout action if still needed directly by components
// Otherwise, components should dispatch logoutUser thunk.
export const { logout } = authSlice.actions;

// The old actions (loginRequest, loginSuccess, etc.) are no longer needed
// as the thunks (loginUser, signupUser) handle these states.

// Updated loginUser thunk to dispatch loadUserWatchlist
export const loginUserAndLoadWatchlist = createAsyncThunk(
  'auth/loginUserAndLoadWatchlist',
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const response = await mockAuthApi.login(email, password);
      if (response.user && response.user.email) {
        await dispatch(loadUserWatchlist(response.user.email)); // Load watchlist after successful login
      }
      return response; // { user: { email } }
    } catch (error) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);


export default authSlice.reducer;

// We need to replace the existing loginUser export with loginUserAndLoadWatchlist
// or update the loginUser thunk directly. Let's update loginUser directly for simplicity.

// Re-defining loginUser to include dispatching loadUserWatchlist
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const response = await mockAuthApi.login(email, password);
      if (response.user && response.user.email) {
        // Non-serializable value being dispatched if loadUserWatchlist itself returns a promise that isn't handled properly by the middleware chain before it hits the reducer.
        // loadUserWatchlist should ideally not return a promise to the dispatch here, or it should be handled as such.
        // Since loadUserWatchlist is a thunk, dispatching it is fine.
        await dispatch(loadUserWatchlist(response.user.email)); 
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);
