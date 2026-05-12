import { useState, useEffect, useRef } from 'react'

const routeCoordinates = [
  [6.5244, 3.3792],
  [6.6018, 3.3515],
  [6.7825, 3.4722],
  [7.3775, 3.9470],
  [7.7956, 4.4420],
  [8.6753, 4.6798],
  [9.0765, 6.0158],
  [9.0765, 7.3986],
  [9.0579, 7.4951],
]

const updates = [
  { time: '2 minutes ago', message: 'Package is out for delivery in Abuja area', location: 'Abuja, Nigeria' },
  { time: '1 hour ago', message: 'Package arrived at Abuja sorting facility', location: 'Abuja, Nigeria' },
  { time: '3 hours ago', message: 'Package departed from Ilorin hub', location: 'Ilorin, Nigeria' },
  { time: '5 hours ago', message: 'Package scanned at Ilorin facility', location: 'Ilorin, Nigeria' },
  { time: '8 hours ago', message: 'Package in transit from Ibadan', location: 'Ibadan, Nigeria' },
  { time: '1 day ago', message: 'Package picked up from sender', location: 'Lagos, Nigeria' },
]

export default function TrackingPage() {
  const [tracked, setTracked] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('In Transit')
  const [eta, setEta] = useState('Today, 4:30 PM')
  const mapRef = useRef(null)
  const leafletMapRef = useRef(null)
  const markerRef = useRef(null)
  const posRef = useRef(0)

  const updateStatusText = (pct) => {
    if (pct < 25) { setStatus('Picked Up'); setEta('Tomorrow, 2:00 PM') }
    else if (pct < 50) { setStatus('In Transit'); setEta('Today, 6:00 PM') }
    else if (pct < 75) { setStatus('In Transit'); setEta('Today, 4:30 PM') }
    else if (pct < 100) { setStatus('Out for Delivery'); setEta('Today, 3:00 PM') }
    else { setStatus('Delivered'); setEta('—') }
  }

  const initMap = async () => {
    if (leafletMapRef.current) return
    if (typeof window === 'undefined') return

    try {
      const L = (await import('leaflet')).default
      await import('leaflet/dist/leaflet.css')

      const map = L.map(mapRef.current).setView([6.5244, 3.3792], 7)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map)

      const dot = (color) => L.divIcon({
        className: '',
        html: `<div style="background:${color};width:20px;height:20px;border-radius:50%;border:3px solid white;box-shadow:0 0 10px rgba(0,0,0,.3)"></div>`,
        iconSize: [20, 20], iconAnchor: [10, 10],
      })

      L.marker([9.0579, 7.4951], { icon: dot('#dc2626') }).addTo(map).bindPopup('Delivery Destination<br>Abuja, Nigeria')
      L.marker([6.5244, 3.3792], { icon: dot('#f97316') }).addTo(map).bindPopup('Pickup Location<br>Lagos, Nigeria')

      const truckIcon = L.divIcon({
        className: '',
        html: `<div style="background:#2563eb;width:24px;height:24px;border-radius:50%;border:3px solid white;box-shadow:0 0 15px rgba(37,99,235,.5);display:flex;align-items:center;justify-content:center;color:white;font-size:10px">🚚</div>`,
        iconSize: [24, 24], iconAnchor: [12, 12],
      })
      markerRef.current = L.marker(routeCoordinates[0], { icon: truckIcon }).addTo(map)

      L.polyline(routeCoordinates, { color: '#9ca3af', weight: 3, opacity: 0.6, dashArray: '10,10' }).addTo(map)
      leafletMapRef.current = map

      let pos = 0
      const interval = setInterval(() => {
        if (pos < routeCoordinates.length - 1) {
          pos++
          posRef.current = pos
          markerRef.current.setLatLng(routeCoordinates[pos])
          map.setView(routeCoordinates[pos], 7)
          const pct = ((pos + 1) / routeCoordinates.length) * 100
          setProgress(pct)
          updateStatusText(pct)
        } else {
          clearInterval(interval)
          setStatus('Delivered')
        }
      }, 3000)

      setTimeout(() => map.invalidateSize(), 100)
    } catch {
      if (mapRef.current) {
        mapRef.current.innerHTML = '<p style="padding:12px;color:#374151;text-align:center">Map failed to load. Check your internet connection.</p>'
      }
    }
  }

  const [mapLoading, setMapLoading] = useState(false)

  const handleTrack = (e) => {
    e.preventDefault()
    setTracked(true)
    setMapLoading(true)
    setTimeout(() => {
      initMap()
      setTimeout(() => setMapLoading(false), 800)
    }, 200)
  }

  return (
    <main className="flex-1 w-full">
      {/* Hero */}
      <section className="tracking-hero text-white px-6">
        <div className="max-w-4xl mx-auto text-center w-full">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6">Track Your Order</h1>
          <p className="text-base sm:text-lg leading-relaxed">Monitor your package in real-time with our advanced GPS tracking system.</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto p-8 my-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left panel */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-medium text-orange-600 mb-6">Enter Tracking Number</h2>
              <form onSubmit={handleTrack} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tracking Number</label>
                  <input type="text" placeholder="Enter your tracking number" required
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500" />
                </div>
                <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded hover:bg-orange-600 transition duration-300">
                  Track Package
                </button>
              </form>
            </div>

            {tracked && mapLoading && (
              <>
                <div className="bg-white p-6 rounded-lg shadow-md mb-6 space-y-4">
                  <div className="skeleton h-5 w-32 rounded" />
                  <div className="space-y-3">
                    <div className="flex justify-between"><div className="skeleton h-4 w-16 rounded" /><div className="skeleton h-4 w-20 rounded" /></div>
                    <div className="flex justify-between"><div className="skeleton h-4 w-28 rounded" /><div className="skeleton h-4 w-24 rounded" /></div>
                    <div className="flex justify-between"><div className="skeleton h-4 w-20 rounded" /><div className="skeleton h-4 w-14 rounded" /></div>
                  </div>
                  <div className="skeleton h-2 w-full rounded-full mt-4" />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md space-y-3">
                  <div className="skeleton h-5 w-36 rounded" />
                  {[1,2,3,4].map(i => (
                    <div key={i} className="flex justify-between"><div className="skeleton h-4 w-12 rounded" /><div className="skeleton h-4 w-28 rounded" /></div>
                  ))}
                </div>
              </>
            )}

            {tracked && !mapLoading && (
              <>
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                  <h3 className="text-lg font-medium text-orange-600 mb-4">Order Status</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Status:</span>
                      <span className="text-sm font-medium text-orange-500">{status}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Estimated Delivery:</span>
                      <span className="text-sm font-medium">{eta}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Last Update:</span>
                      <span className="text-sm font-medium">Just now</span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="flex justify-between text-xs text-gray-500 mb-2">
                      <span>Ordered</span><span>Picked Up</span><span>In Transit</span><span>Delivered</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-medium text-orange-600 mb-4">Package Details</h3>
                  <div className="space-y-2 text-sm">
                    {[['From:', 'Lagos, Nigeria'], ['To:', 'Abuja, Nigeria'], ['Weight:', '2.5 kg'], ['Service:', 'Express Delivery']].map(([label, value]) => (
                      <div key={label} className="flex justify-between">
                        <span className="text-gray-600">{label}</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Map */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-medium text-orange-600 mb-6">Live Location</h2>
              <div ref={mapRef} className="w-full rounded-lg border-2 border-gray-200" style={{ minHeight: 400 }}>
                {!tracked && (
                  <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                    Enter a tracking number to see the live map
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Updates skeleton */}
        {tracked && mapLoading && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <div className="skeleton h-5 w-36 rounded mb-4" />
            {[1,2,3].map(i => (
              <div key={i} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-b-0">
                <div className="skeleton w-8 h-8 rounded-full flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="skeleton h-4 w-3/4 rounded" />
                  <div className="skeleton h-3 w-1/2 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Updates */}
        {tracked && !mapLoading && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-orange-600 mb-4">Recent Updates</h3>
            <div className="space-y-3">
              {updates.map((u, i) => (
                <div key={i} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-500 text-xs font-bold">✓</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{u.message}</p>
                    <p className="text-xs text-gray-500">{u.location} • {u.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
