import { useState } from 'react'

const BASE_RATE = 5000

export default function DropBoxPage() {
  const [weight, setWeight] = useState('')
  const [deliveryType, setDeliveryType] = useState('standard')
  const [insurance, setInsurance] = useState(false)
  const [signature, setSignature] = useState(false)

  const weightCharge = Math.max(0, (parseFloat(weight) || 0) - 5) * 2250
  const deliveryCharge = deliveryType === 'express' ? 5985 : deliveryType === 'sameday' ? 14985 : 0
  const total = BASE_RATE + weightCharge + deliveryCharge + (insurance ? 4485 : 0) + (signature ? 2985 : 0)

  const fmt = (n) => '₦' + n.toFixed(2)

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for your order! Redirecting to payment...')
  }

  return (
    <main className="flex-1 w-full">
      {/* Hero */}
      <section className="bg-orange-950 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6">Drop a Box</h1>
          <p className="text-base sm:text-lg leading-relaxed">Create a delivery order in just a few clicks. Fast, easy, and affordable shipping for your packages.</p>
        </div>
      </section>

      {/* Main content */}
      <section className="max-w-4xl mx-auto p-8 my-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-medium text-orange-600 mb-8">Order Details</h2>
              <form id="dropBoxForm" className="space-y-6" onSubmit={handleSubmit}>

                {/* Sender */}
                <div className="border-b pb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">1. Sender Information</h3>
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
                  <div className="mt-4">
                    <label className="block text-gray-700 font-medium mb-2">Email Address *</label>
                    <input type="email" required className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500" />
                  </div>
                  <div className="mt-4">
                    <label className="block text-gray-700 font-medium mb-2">Pickup Address *</label>
                    <input type="text" required placeholder="Street address" className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">City *</label>
                      <input type="text" required className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500" />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">State *</label>
                      <input type="text" required className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500" />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">ZIP Code *</label>
                      <input type="text" required className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500" />
                    </div>
                  </div>
                </div>

                {/* Recipient */}
                <div className="border-b pb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">2. Recipient Information</h3>
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
                  <div className="mt-4">
                    <label className="block text-gray-700 font-medium mb-2">Delivery Address *</label>
                    <input type="text" required placeholder="Street address" className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">City *</label>
                      <input type="text" required className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500" />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">State *</label>
                      <input type="text" required className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500" />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">ZIP Code *</label>
                      <input type="text" required className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500" />
                    </div>
                  </div>
                </div>

                {/* Package */}
                <div className="border-b pb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">3. Package Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Weight (kg) *</label>
                      <input type="number" min="0.1" step="0.1" required value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500" />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Dimensions (L×W×H cm)</label>
                      <input type="text" placeholder="30 x 20 x 15"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-gray-700 font-medium mb-2">Package Description *</label>
                    <textarea rows="3" required placeholder="What's inside? (e.g., Electronics, Documents, Clothing)"
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500" />
                  </div>
                  <div className="mt-4">
                    <label className="block text-gray-700 font-medium mb-2">Declared Value (₦) *</label>
                    <input type="number" min="0" step="0.01" required
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500" />
                  </div>
                </div>

                {/* Delivery options */}
                <div className="border-b pb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">4. Delivery Options</h3>
                  <div className="space-y-3">
                    {[
                      { value: 'standard', label: 'Standard Delivery', sub: '2-3 business days' },
                      { value: 'express', label: 'Express Delivery', sub: 'Next business day' },
                      { value: 'sameday', label: 'Same Day Delivery', sub: 'Within 24 hours (select areas)' },
                    ].map((opt) => (
                      <label key={opt.value}
                        className={`flex items-center p-4 border rounded cursor-pointer ${deliveryType === opt.value ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                        <input type="radio" name="deliveryType" value={opt.value}
                          checked={deliveryType === opt.value}
                          onChange={() => setDeliveryType(opt.value)}
                          className="w-4 h-4 text-orange-500" />
                        <span className="ml-3">
                          <span className="font-medium text-gray-900">{opt.label}</span>
                          <span className="block text-sm text-gray-600">{opt.sub}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Additional services */}
                <div className="pb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">5. Additional Services</h3>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" checked={insurance} onChange={(e) => setInsurance(e.target.checked)} className="w-4 h-4 text-orange-500 rounded" />
                      <span className="ml-3 text-gray-700">Full Insurance Coverage (+₦4,485)</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" checked={signature} onChange={(e) => setSignature(e.target.checked)} className="w-4 h-4 text-orange-500 rounded" />
                      <span className="ml-3 text-gray-700">Signature Required (+₦2,985)</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked readOnly className="w-4 h-4 text-orange-500 rounded" />
                      <span className="ml-3 text-gray-700">Advanced Tracking (Included)</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button type="reset" onClick={() => { setWeight(''); setDeliveryType('standard'); setInsurance(false); setSignature(false) }}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded hover:bg-gray-50 transition">
                    Clear Form
                  </button>
                  <button type="submit" className="flex-1 px-6 py-3 bg-orange-500 text-white font-medium rounded hover:bg-orange-600 transition">
                    Continue to Payment
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md sticky top-24">
              <h3 className="text-xl font-medium text-orange-600 mb-6">Order Summary</h3>
              <div className="space-y-4 mb-6 pb-6 border-b">
                <div className="flex justify-between text-gray-700"><span>Base Rate:</span><span>{fmt(BASE_RATE)}</span></div>
                <div className="flex justify-between text-gray-700"><span>Weight Charge:</span><span>{fmt(weightCharge)}</span></div>
                <div className="flex justify-between text-gray-700"><span>Delivery Type:</span><span>{fmt(deliveryCharge)}</span></div>
                {insurance && <div className="flex justify-between text-gray-700"><span>Insurance:</span><span>₦4,485.00</span></div>}
                {signature && <div className="flex justify-between text-gray-700"><span>Signature:</span><span>₦2,985.00</span></div>}
              </div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-medium text-gray-900">Total:</span>
                <span className="text-3xl font-bold text-orange-600">{fmt(total)}</span>
              </div>
              <div className="bg-white p-4 rounded border border-orange-200 mb-6">
                <p className="text-sm text-gray-700"><span className="font-medium">💡 Tip:</span> Packages up to 5kg qualify for our Basic plan at just ₦5,000</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 mb-3">Included Features:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  {['Real-time tracking', 'Basic insurance (₦150,000)', 'Pickup & Delivery', 'Email notifications'].map((f) => (
                    <li key={f} className="flex items-start"><span className="text-orange-500 mr-2">✓</span><span>{f}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto p-8">
          <h2 className="text-3xl font-medium text-orange-600 text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { q: 'How long does delivery take?', a: 'Standard delivery takes 2-3 business days. Express is next business day, and same-day delivery is available in select areas.' },
              { q: 'Is my package insured?', a: 'All packages include basic insurance up to ₦150,000. You can upgrade to full coverage for just ₦4,485 more.' },
              { q: 'Can I track my package?', a: 'Yes! Real-time tracking is included with every shipment. Track via our website or mobile app.' },
              { q: 'What items cannot be shipped?', a: 'Hazardous materials, firearms, and certain electronics cannot be shipped. See our full prohibited items list.' },
            ].map((faq) => (
              <div key={faq.q} className="bg-white p-6 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
