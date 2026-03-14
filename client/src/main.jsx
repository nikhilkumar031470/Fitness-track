import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import { GooeyToaster } from 'goey-toast'
import "goey-toast/styles.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
   <GooeyToaster position="top-center" />
    
  </StrictMode>,
)
