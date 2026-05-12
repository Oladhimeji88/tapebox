import { useState, useEffect, useRef } from 'react'

const droneRoute = [
  [6.5244, 3.3792],
  [6.5800, 3.4200],
  [6.6300, 3.4600],
  [6.6800, 3.5000],
  [6.7200, 3.5300],
]

export default function DroneTrackingPage() {
  const [missionId, setMissionId] = useState('')
  const [tracking, setTracking] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('En Route')
  const [battery, setBattery] = useState(98)
  const mapRef = useRef(null)
  const leafletMapRef = useRef(null)

  const startTracking = async () => {
    if (leafletMapRef.current) return
    try {
      const L = (await import('leaflet')).default
      await import('leaflet/dist/leaflet.css')

      const map = L.map(mapRef.current).setView([6.5244, 3.3792], 12)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map)

      const dot = (color, size = 18) => L.divIcon({
        className: '',
        html: `<div style="background:${color};width:${size}px;height:${size}px;border-radius:50%;border:3px solid white;box-shadow:0 0 8px rgba(0,0,0,.3)"></div>`,
        iconSize: [size, size], iconAnchor: [size / 2, size / 2],
      })

      L.marker(droneRoute[0], { icon: dot('#16a34a') }).addTo(map).bindPopup('PUD Takeoff Point')
      L.marker(droneRoute[droneRoute.length - 1], { icon: dot('#dc2626') }).addTo(map).bindPopup('Destination')
      L.polyline(droneRoute, { color: '#9ca3af', weight: 2, dashArray: '6,6' }).addTo(map)

      const droneIcon = L.divIcon({
        className: '',
        html: `<div style="font-size:24px;line-height:1">🚁</div>`,
        iconSize: [28, 28], iconAnchor: [14, 14],
      })
      const marker = L.marker(droneRoute[0], { icon: droneIcon }).addTo(map)
      leafletMapRef.current = map

      let pos = 0
      const interval = setInterval(() => {
        if (pos < droneRoute.length - 1) {
          pos++
          marker.setLatLng(droneRoute[pos])
          map.setView(droneRoute[pos], 13)
          const pct = ((pos) / (droneRoute.length - 1)) * 100
          setProgress(pct)
          setBattery((b) => Math.max(0, b - 8))
          if (pct >= 100) { setStatus('Delivered'); clearInterval(interval) }
        } else {
          setStatus('Delivered')
          clearInterval(interval)
        }
      }, 2500)

      setTimeout(() => map.invalidateSize(), 100)
    } catch {
      if (mapRef.current) {
        mapRef.current.innerHTML = '<p style="padding:12px;color:#374151;text-align:center">Map failed to load.</p>'
      }
    }
  }

  const handleTrack = (e) => {
    e.preventDefault()
    setTracking(true)
    setTimeout(startTracking, 200)
  }

  return (
    <main className="flex-1 w-full">
      <section className="bg-green-950 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Track Drone Mission</h1>
          <p className="text-base sm:text-lg leading-relaxed">Monitor your active drone mission in real time.</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto p-8 my-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Controls */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-medium text-green-700 mb-4">Enter Mission ID</h2>
              <form onSubmit={handleTrack} className="space-y-4">
                <input type="text" placeholder="e.g. TBD-20260512-001" value={missionId}
                  onChange={(e) => setMissionId(e.target.value)} required
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-green-500" />
                <button type="submit" className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition">
                  Track Mission
                </button>
              </form>
            </div>

            {tracking && (
              <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
                <h3 className="text-lg font-medium text-green-700">Mission Status</h3>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Status</span>
                  <span className={`font-medium ${status === 'Delivered' ? 'text-blue-600' : 'text-green-600'}`}>{status}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Mission ID</span>
                  <span className="font-medium text-gray-800">{missionId}</span>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Flight Progress</span>
                    <span className="font-medium">{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Battery</span>
                    <span className={`font-medium ${battery < 30 ? 'text-red-600' : 'text-gray-800'}`}>{battery}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className={`h-2 rounded-full transition-all duration-500 ${battery < 30 ? 'bg-red-500' : 'bg-green-600'}`} style={{ width: `${battery}%` }} />
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Altitude</span>
                  <span className="font-medium">120 m</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Speed</span>
                  <span className="font-medium">65 km/h</span>
                </div>
              </div>
            )}
          </div>

          {/* Map */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-medium text-green-700 mb-4">Live Drone Map</h2>
              <div ref={mapRef} className="w-full rounded-lg border-2 border-gray-200" style={{ minHeight: 400 }}>
                {!tracking && (
                  <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                    Enter a Mission ID to see the live drone map
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
