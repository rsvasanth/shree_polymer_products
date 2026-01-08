import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { FrappeProvider } from 'frappe-react-sdk'
import { ThemeProvider } from './components/theme-provider'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FrappeProvider
      siteName={import.meta.env.VITE_SITE_NAME}
      socketPort={import.meta.env.VITE_SOCKET_PORT}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        storageKey="spp-theme"
      >
        <App />
      </ThemeProvider>
    </FrappeProvider>
  </StrictMode>,
)
