import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.VITE_KEY': JSON.stringify(process.env.VITE_KEY),
    // Add other environment variables as needed
  },
});


