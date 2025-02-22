import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   define: {
//     'import.meta.env.VITE_API_URL': JSON.stringify(
//       process.env.NODE_ENV === 'production'
//         ? 'https://flightmate-hn8i.onrender.com' // ✅ Use deployed API in production
//         : 'http://localhost:5000' // ✅ Use local API in development
//     )
//   }
// });
