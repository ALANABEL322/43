import { BrowserRouter } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import Router from '@/routes'
import { AuthProvider } from './auth/AuthContext' 

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-background">
          <Toaster richColors position="top-center" />
    
          <Router />
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App