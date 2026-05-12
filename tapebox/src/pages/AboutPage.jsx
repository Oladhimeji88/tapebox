import StatCounter from '../components/StatCounter'

export default function AboutPage() {
  return (
    <main className="flex-1 w-full">
      {/* Hero */}
      <section className="bg-orange-950 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6">About TapeBox</h1>
          <p className="text-base sm:text-lg leading-relaxed">
            We are a leading delivery service committed to providing fast, reliable, and affordable delivery solutions to our customers. Our mission is to revolutionize the delivery industry with innovation and customer excellence.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-4xl mx-auto p-8 my-12">
        <h2 className="text-2xl sm:text-3xl text-orange-600 font-medium mb-8">Our Story</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-gray-700 mb-4">TapeBox was founded in 2020 with a simple vision: to make delivery services accessible, affordable, and reliable for everyone. What started as a small operation has grown into a trusted partner for thousands of customers.</p>
            <p className="text-gray-700 mb-4">Our team of dedicated professionals works tirelessly to ensure that every package reaches its destination safely and on time. We've built our reputation on trust, transparency, and exceptional service.</p>
            <p className="text-gray-700">Today, TapeBox operates across multiple cities, serving individuals and businesses with the same commitment to excellence that defined us from day one.</p>
          </div>
          <div className="bg-orange-100 rounded-lg p-4">
            <img src="/images/Hero-image.jpg" alt="Our Team" className="w-full h-full object-cover rounded" />
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto p-8">
          <h2 className="text-2xl sm:text-3xl text-orange-600 font-medium text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                title: 'Reliability',
                desc: 'We deliver on our promises, every single time. Your package is our responsibility.',
                icon: (
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mx-auto">
                    <rect x="4" y="16" width="28" height="20" rx="3" fill="#fff7ed" stroke="#f97316" strokeWidth="2"/>
                    <path d="M32 22h6l6 8v6h-12V22z" fill="#fff7ed" stroke="#f97316" strokeWidth="2" strokeLinejoin="round"/>
                    <circle cx="13" cy="38" r="4" fill="#f97316"/>
                    <circle cx="37" cy="38" r="4" fill="#f97316"/>
                    <path d="M10 24h12" stroke="#f97316" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M10 29h8" stroke="#fdba74" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                ),
              },
              {
                title: 'Affordability',
                desc: "Quality delivery doesn't have to be expensive. We offer competitive rates for everyone.",
                icon: (
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mx-auto">
                    <circle cx="24" cy="24" r="19" fill="#fff7ed" stroke="#f97316" strokeWidth="2"/>
                    <path d="M24 12v2M24 34v2" stroke="#f97316" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M18 20c0-3.314 2.686-6 6-6s6 2.686 6 6c0 2-1.5 3.5-4 4.5-2.5 1-4 2.5-4 4.5 0 3.314 2.686 6 6 6" stroke="#f97316" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M30 28c0 3.314-2.686 6-6 6" stroke="#fdba74" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                ),
              },
              {
                title: 'Security',
                desc: 'Your items are insured and handled with the utmost care and attention.',
                icon: (
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mx-auto">
                    <path d="M24 4L8 11v14c0 9.941 6.857 19.239 16 22 9.143-2.761 16-12.059 16-25V11L24 4z" fill="#fff7ed" stroke="#f97316" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M17 24l5 5 9-9" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
              },
            ].map((v) => (
              <div key={v.title} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="mb-4">{v.icon}</div>
                <h3 className="text-xl font-medium text-orange-600 mb-3">{v.title}</h3>
                <p className="text-gray-600">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-4xl mx-auto p-8 my-12">
        <h2 className="text-2xl sm:text-3xl text-orange-600 font-medium text-center mb-12">Why Choose TapeBox?</h2>
        <div className="space-y-6">
          {[
            { title: 'Same Day Delivery Available', desc: "Need your package delivered today? We've got you covered with our same-day delivery service in select areas." },
            { title: 'Real-Time Tracking', desc: 'Track your delivery in real-time with our advanced mobile app and web platform.' },
            { title: 'Professional Team', desc: 'Our trained and vetted delivery personnel are background-checked and professionally trained.' },
            { title: '24/7 Customer Support', desc: 'Our customer support team is available round the clock to assist with any questions or concerns.' },
          ].map((item) => (
            <div key={item.title} className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white font-bold text-lg">✓</div>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-orange-600 text-white py-12">
        <div className="max-w-4xl mx-auto p-8">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 text-center">
            {[
              { end: 10, suffix: 'K+', label: 'Happy Customers' },
              { end: 50, suffix: 'K+', label: 'Packages Delivered' },
              { end: 99.9, suffix: '%', decimals: 1, label: 'On-Time Rate' },
              { end: 6, suffix: '+', label: 'Years Experience' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-4xl font-bold mb-2">
                  <StatCounter end={s.end} suffix={s.suffix} decimals={s.decimals ?? 0} />
                </div>
                <p className="text-orange-100">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
