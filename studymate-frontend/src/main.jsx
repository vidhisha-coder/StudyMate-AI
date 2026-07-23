import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx' // 👈 1. Import AuthProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> {/* 👈 2. Wrap App inside AuthProvider */}
      <App />
    </AuthProvider>
  </StrictMode>,
)