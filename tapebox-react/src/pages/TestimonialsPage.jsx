import { Link } from 'react-router-dom'

const testimonials = [
  {
    quote: 'From Lekki to Gwarinpa, TapeBox delivers sharp-sharp. I can track every package live, and my customers are always happy.',
    name: 'Chiamaka Eze', location: 'Lagos',
    img: '/images/image_fx_ - 2025-03-21T000824.037.jpg', rating: 5,
    tags: ['Real-Time Tracking', 'Fast Delivery'],
  },
  {
    quote: 'I run a small skincare store in Surulere, and TapeBox helped us cut delayed deliveries by more than half in just one month.',
    name: 'Tosin Adebayo', location: 'Surulere, Lagos',
    img: '/images/image_fx_ - 2025-03-21T000739.722.jpg', rating: 5,
    tags: ['Business Plan', 'Reliability'],
  },
  {
    quote: 'As a busy parent in Abuja, I love the pickup + dropbox option. I can send items without waiting around all day.',
    name: 'Amina Yusuf', location: 'Abuja',
    img: '/images/image_fx_ - 2025-03-21T000557.454.jpg', rating: 5,
    tags: ['DropBox Pickup', 'Convenience'],
  },
  {
    quote: 'My team ships documents daily from Port Harcourt. TapeBox updates are clear, and clients always know exactly when to expect delivery.',
    name: 'Emeka Nwosu', location: 'Port Harcourt',
    img: '/images/image_fx_ - 2025-03-21T000929.031.jpg', rating: 5,
    tags: ['Business', 'Notifications'],
  },
  {
    quote: 'We started using TapeBox for weekend orders in Ikeja, and the speed gave our business a serious edge over competitors.',
    name: 'Bolanle Ogunleye', location: 'Ikeja, Lagos',
    img: '/images/image_fx_ - 2025-03-21T001001.795.jpg', rating: 5,
    tags: ['Weekend Delivery', 'Express'],
  },
  {
    quote: 'The drone delivery option is a game changer. My packages reach remote areas in record time. Absolutely amazing service!',
    name: 'Kelechi Obi', location: 'Enugu',
    img: '/images/image_fx_ - 2025-03-21T000735.915.jpg', rating: 5,
    tags: ['Drone Delivery', 'Last-Mile'],
  },
]

export default function TestimonialsPage() {
  return (
    <main className="flex-1 w-full">
      {/* Hero */}
      <section className="testimonials-hero text-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6">What Our Customers Say</h1>
          <p className="text-base sm:text-lg leading-relaxed max-w-2xl">
            Real stories from Lagos, Abuja, Port Harcourt and beyond. See how TapeBox makes daily deliveries easier across Nigeria.
          </p>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-green-700 py-8 px-6 text-center text-white">
        <p className="text-lg font-medium mb-4">Ready to experience the TapeBox difference?</p>
        <Link to="/dropbox" className="inline-block bg-white text-green-700 font-bold px-8 py-3 rounded-full hover:bg-green-50 transition">
          Book a Delivery
        </Link>
      </section>

      {/* Cards */}
      <section className="max-w-5xl mx-auto p-8 my-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <article key={i} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
              <div className="relative h-48 bg-gray-100">
                <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 bg-white/90 rounded-full px-3 py-1.5">
                  <div className="w-5 h-5 rounded-full bg-green-900 text-white text-xs flex items-center justify-center font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <span className="text-xs font-semibold text-gray-800 truncate">{t.name} joined TapeBox</span>
                </div>
              </div>

              <div className="flex flex-col flex-1 p-5">
                <div className="text-yellow-400 text-sm mb-2">{'★'.repeat(t.rating)}</div>
                <p className="text-gray-800 font-semibold text-base leading-snug mb-2">"{t.quote}"</p>
                <p className="text-gray-500 text-sm mt-1">{t.name} — {t.location}</p>
                <ul className="flex flex-wrap gap-2 mt-auto pt-4">
                  {t.tags.map((tag) => (
                    <li key={tag} className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">{tag}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-green-950 text-white py-12 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[['4.9/5', 'Average Rating'], ['10K+', 'Happy Customers'], ['50K+', 'Deliveries'], ['99.9%', 'On-Time Rate']].map(([stat, label]) => (
            <div key={label}>
              <div className="text-3xl font-bold mb-1">{stat}</div>
              <p className="text-green-300 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
