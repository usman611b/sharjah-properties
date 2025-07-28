import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'
import Properties from './pages/Properties'
import Properties3To4Marla from './pages/Properties3To4Marla'
import Properties5To7Marla from './pages/Properties5To7Marla'
import Properties10Marla from './pages/Properties10Marla'
import Properties1Canal from './pages/Properties1Canal'
import PropertyDetail from './pages/PropertyDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import Services from './pages/Services'

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/properties" element={<Properties />} />
                <Route path="/properties/3-4-marla" element={<Properties3To4Marla />} />
                <Route path="/properties/5-7-marla" element={<Properties5To7Marla />} />
                <Route path="/properties/10-marla" element={<Properties10Marla />} />
                <Route path="/properties/1-canal" element={<Properties1Canal />} />
                <Route path="/properties/:id" element={<PropertyDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </AnimatePresence>
            <Footer />
            <WhatsAppButton />
          </div>
        </Router>
      </ToastProvider>
    </AuthProvider>
  )
}

export default App 