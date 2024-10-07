import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/auth/authSlice';
 // Ensure correct path to authSlice

const store = configureStore({
  reducer: {
    auth: authSlice.reducer, // Accessing the reducer from authSlice
  },
});

export default store; // Exporting the store as default
