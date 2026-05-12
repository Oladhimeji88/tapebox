import { Link } from 'react-router-dom'

export default function DroneDeliveryPage() {
  return (
    <main className="flex-1 w-full">
      {/* Hero */}
      <section className="drone-hero px-6 text-white">
        <div className="max-w-4xl mx-auto w-full py-16">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6">Drone Delivery System</h1>
          <p className="text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
            Launch urgent deliveries in minutes, route missions intelligently, and track every drone in real time from dispatch to handoff.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/drone-request" className="inline-block bg-orange-500 text-white px-8 py-3 rounded hover:bg-orange-600 transition text-center">
              Plan Drone Mission
            </Link>
            <Link to="/drone-tracking" className="inline-block bg-white text-orange-600 px-8 py-3 rounded hover:bg-gray-50 transition text-center">
              Track Drone Mission
            </Link>
          </div>
        </div>
      </section>

      {/* Drone illustration */}
      <section className="max-w-4xl mx-auto p-8 my-12">
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl sm:text-3xl text-orange-600 font-medium mb-4">Meet Our Drone</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Our smart drone fleet is built for fast, safe, and precise last-mile delivery.</p>
          <img src="/images/drone-illustration.svg" alt="TapeBox drone" className="w-full max-w-md mx-auto mt-6 rounded-lg shadow-md" />
        </div>
      </section>

      {/* What you can do */}
      <section className="max-w-4xl mx-auto p-8 my-12">
        <h2 className="text-2xl sm:text-3xl text-orange-600 font-medium text-center mb-8">What You Can Do</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { num: '1', title: 'Nearest PUD Match', desc: 'Direct customers to the closest Drone PUD based on their location.' },
            { num: '2', title: 'Agent Handoff', desc: 'PUD agents receive, verify, and package items safely for drone dispatch.' },
            { num: '3', title: 'Pay at PUD', desc: 'Customers can complete payment at the PUD desk before mission launch.' },
          ].map((item) => (
            <div key={item.num} className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full mx-auto mb-4 flex items-center justify-center text-orange-600 font-bold">{item.num}</div>
              <h3 className="text-xl text-orange-600 font-medium mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PUD flow */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto p-8">
          <h2 className="text-2xl sm:text-3xl text-orange-600 font-medium text-center mb-8">PUD-to-Drone Flow</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 text-center">
            {[
              ['01', 'Find nearest Drone PUD'],
              ['02', 'Hand package to PUD agent'],
              ['03', 'Pay at PUD desk'],
              ['04', 'Drone launches to destination'],
            ].map(([num, label]) => (
              <div key={num} className="bg-white p-5 rounded-lg shadow-md">
                <p className="text-orange-600 font-bold mb-2">{num}</p>
                <p className="text-gray-700">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-4xl mx-auto p-8 my-12">
        <h2 className="text-2xl sm:text-3xl text-orange-600 font-medium text-center mb-8">Why Drone Delivery?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { icon: '⚡', title: 'Ultra-Fast', desc: 'Skip road congestion. Drones fly direct routes at high speed.' },
            { icon: '🌿', title: 'Eco-Friendly', desc: 'Zero emissions delivery reduces your carbon footprint.' },
            { icon: '🎯', title: 'Precise Drop-offs', desc: 'GPS-guided delivery ensures packages land exactly where needed.' },
            { icon: '📡', title: 'Real-Time Tracking', desc: 'Watch your drone live on the map from takeoff to landing.' },
          ].map((f) => (
            <div key={f.title} className="bg-white p-6 rounded-lg shadow-md flex items-start gap-4">
              <span className="text-3xl">{f.icon}</span>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">{f.title}</h3>
                <p className="text-gray-600 text-sm">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
