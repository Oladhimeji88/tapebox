import { BrowserRouter, Routes, Route, ScrollRestoration } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import DropBoxPage from './pages/DropBoxPage'
import TrackingPage from './pages/TrackingPage'
import TestimonialsPage from './pages/TestimonialsPage'
import DroneDeliveryPage from './pages/DroneDeliveryPage'
import DroneRequestPage from './pages/DroneRequestPage'
import DroneTrackingPage from './pages/DroneTrackingPage'

function ScrollToTop() {
  if (typeof ScrollRestoration !== 'undefined') return <ScrollRestoration />
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen w-full flex flex-col font-sans">
        <Header />
        <div className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/dropbox" element={<DropBoxPage />} />
            <Route path="/tracking" element={<TrackingPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/drone-delivery" element={<DroneDeliveryPage />} />
            <Route path="/drone-request" element={<DroneRequestPage />} />
            <Route path="/drone-tracking" element={<DroneTrackingPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
