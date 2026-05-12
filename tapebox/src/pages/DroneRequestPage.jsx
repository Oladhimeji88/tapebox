import { useState } from 'react'

export default function DroneRequestPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    e.target.reset()
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <main className="flex-1 w-full">
      <section className="bg-orange-950 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Plan a Drone Mission</h1>
          <p className="text-base sm:text-lg leading-relaxed">Fill in the details below to schedule a drone delivery mission.</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto p-8 my-12">
        {submitted && (
          <div className="mb-6 p-4 bg-orange-50 border border-orange-300 rounded-lg text-orange-700 font-medium">
            🚁 Mission request submitted! Our team will confirm your drone slot shortly.
          </div>
        )}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-medium text-orange-600 mb-8">Mission Details</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Full Name *</label>
                <input type="text" required className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Phone Number *</label>
                <input type="tel" required className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500" />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Pickup PUD Location *</label>
              <input type="text" required placeholder="Nearest Drone PUD address" className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Delivery Coordinates / Address *</label>
              <input type="text" required placeholder="Destination address or GPS coordinates" className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Package Weight (kg) *</label>
                <input type="number" min="0.1" max="5" step="0.1" required className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Preferred Mission Time *</label>
                <input type="datetime-local" required className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500" />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Package Contents *</label>
              <textarea rows="3" required placeholder="Describe the contents" className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500" />
            </div>
            <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded hover:bg-orange-600 transition font-medium">
              Submit Mission Request
            </button>
          </form>
        </div>

        <div className="mt-8 bg-amber-50 border border-amber-200 p-5 rounded-lg">
          <h3 className="font-medium text-amber-800 mb-2">📋 Drone Mission Guidelines</h3>
          <ul className="text-sm text-amber-700 space-y-1 list-disc list-inside">
            <li>Max package weight: 5 kg per mission</li>
            <li>Delivery radius: up to 15 km from PUD</li>
            <li>Operating hours: 7:00 AM – 7:00 PM</li>
            <li>Weather cancellations will be notified via SMS</li>
          </ul>
        </div>
      </section>
    </main>
  )
}
