import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const testimonialItems = [
  { quote: 'From Lekki to Gwarinpa, TapeBox delivers sharp-sharp. I can track every package live, and my customers are always happy.', name: 'Chiamaka Eze, Lagos' },
  { quote: 'I run a small skincare store in Surulere, and TapeBox helped us cut delayed deliveries by more than half in just one month.', name: 'Tosin Adebayo, Surulere' },
  { quote: 'As a busy parent in Abuja, I love the pickup + dropbox option. I can send items without waiting around all day.', name: 'Amina Yusuf, Abuja' },
  { quote: 'My team ships documents daily from Port Harcourt. TapeBox updates are clear, and clients always know exactly when to expect delivery.', name: 'Emeka Nwosu, Port Harcourt' },
  { quote: 'We started using TapeBox for weekend orders in Ikeja, and the speed gave our business a serious edge over competitors.', name: 'Bolanle Ogunleye, Ikeja' },
]

export default function HomePage() {
  const typewriterRef = useRef(null)
  const testimonialIndexRef = useRef(0)
  const quoteRef = useRef(null)
  const nameRef = useRef(null)
  const deliverySectionRef = useRef(null)
  const deliveryTitleRef = useRef(null)

  // Typewriter effect
  useEffect(() => {
    const el = typewriterRef.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const words = ['TAPE BOX', 'SHIP FASTER', 'ZERO HASSLE']
    let wordIndex = 0, charIndex = 0, deleting = false
    let timer

    const loop = () => {
      const current = words[wordIndex]
      if (deleting) charIndex -= 1
      else charIndex += 1
      el.textContent = current.slice(0, charIndex)
      let delay = deleting ? 150 : 250
      if (!deleting && charIndex === current.length) { delay = 3200; deleting = true }
      else if (deleting && charIndex === 0) { deleting = false; wordIndex = (wordIndex + 1) % words.length; delay = 650 }
      timer = setTimeout(loop, delay)
    }
    el.textContent = ''
    timer = setTimeout(loop, 900)
    return () => clearTimeout(timer)
  }, [])

  // Scroll-reveal observer
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.scroll-reveal').forEach((s) => s.classList.add('in-view'))
      return
    }
    const obs = new IntersectionObserver(
      (entries, o) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in-view'); o.unobserve(e.target) } }),
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    document.querySelectorAll('.scroll-reveal').forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  // Hero parallax
  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let ticking = false
    const update = () => {
      hero.style.backgroundPosition = `center calc(50% + ${(window.scrollY || window.pageYOffset) * 0.25}px)`
      ticking = false
    }
    const onScroll = () => { if (!ticking) { requestAnimationFrame(update); ticking = true } }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Delivery fill on scroll
  useEffect(() => {
    const section = deliverySectionRef.current
    const title = deliveryTitleRef.current
    if (!section || !title) return
    const clamp01 = (v) => Math.max(0, Math.min(1, v))
    let pending = false
    const update = () => {
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight
      const progress = clamp01((vh * 0.88 - rect.top) / (vh * 0.88 - vh * 0.24))
      title.style.setProperty('--fill-progress', `${(progress * 100).toFixed(2)}%`)
      pending = false
    }
    const request = () => { if (!pending) { requestAnimationFrame(update); pending = true } }
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)
    request()
    return () => { window.removeEventListener('scroll', request); window.removeEventListener('resize', request) }
  }, [])

  // Testimonial carousel
  const cycleTestimonial = (step) => {
    const idx = (testimonialIndexRef.current + step + testimonialItems.length) % testimonialItems.length
    testimonialIndexRef.current = idx
    const q = quoteRef.current, n = nameRef.current
    if (!q || !n) return
    q.classList.add('is-changing'); n.classList.add('is-changing')
    setTimeout(() => {
      q.textContent = testimonialItems[idx].quote
      n.textContent = testimonialItems[idx].name
      q.classList.remove('is-changing'); n.classList.remove('is-changing')
    }, 150)
  }

  return (
    <main className="w-full flex flex-col items-center">
      {/* Hero */}
      <section id="hero" className="landing-hero px-6">
        <article className="flex flex-col justify-center items-center max-w-4xl mx-auto w-full text-center">
          <h1 className="hero-enter hero-brand landing-hero-title text-white mb-12 font-medium">
            <span ref={typewriterRef} className="hero-typewriter">TAPE BOX</span>
          </h1>
          <p className="hero-enter hero-enter-delay landing-hero-copy text-orange-100 text-center max-w-prose mx-auto">
            Smarter logistics. Faster shipping. Zero hassle.
          </p>

          <div className="hero-cta-row hero-enter hero-enter-delay-2">
            <div className="dropbox-cta bg-orange-500 hover:bg-slate-900">
              <Link to="/dropbox">
                <svg className="cta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <span>Drop a box</span>
                <svg className="arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="hero-video-btn">
              <svg className="play-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 8l6 4-6 4V8z" />
                <circle cx="12" cy="12" r="9" strokeWidth="2" />
              </svg>
              <span>Watch Video</span>
            </a>
          </div>

          <a href="#services" className="hero-scroll-hint" aria-label="Scroll down for more">
            <span>Scroll down for more</span>
            <span className="hero-scroll-line" aria-hidden="true" />
          </a>
        </article>
      </section>

      {/* Delivery highlight */}
      <section ref={deliverySectionRef} className="delivery-highlight w-full bg-orange-950 flex flex-col sm:flex-row px-9 rounded-sm gap-6 items-center justify-center scroll-reveal post-hero-section">
        <article className="w-full sm:w-1/2 flex flex-col">
          <h2 ref={deliveryTitleRef} className="delivery-highlight-title text-white flex mb-5 w-full">
            Fast, Reliable, and Affordable Delivery!
          </h2>
          <Link to="/dropbox" className="flex bg-slate-900 text-white p-4 rounded-full mt-2 w-fit px-6 hover:bg-orange-600">
            Get Started
          </Link>
        </article>
        <div className="w-full sm:w-1/3 flex h-32 sm:h-64 rounded-md">
          <img src="/images/Tape_big.svg" alt="TapeBox package" className="w-full h-full object-cover rounded-md" />
        </div>
      </section>

      {/* Join Delivery Agents */}
      <section className="no-post-hero-section w-full scroll-reveal">
        <div className="agents-banner w-full">
          <article className="agents-banner-content">
            <h2 className="agents-banner-title" aria-label="Join Our Delivery Agents">
              <span className="agent-wave-word">Join</span>
              <span className="agent-wave-word">Our</span>
              <span className="agent-wave-word">Delivery</span>
              <span className="agent-wave-word">Agents</span>
            </h2>
            <p className="agents-banner-copy">
              Become a TapeBox delivery agent and earn while helping us move packages faster across your area. Flexible schedules, training support, and steady delivery requests available.
            </p>
            <Link to="/contact" className="agents-join-btn">
              <span>Join Now</span>
              <svg className="join-arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h12m-5-5l5 5-5 5" />
              </svg>
            </Link>
          </article>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="services-wrap scroll-reveal post-hero-section">
        <div className="services-shell">
          <p className="services-eyebrow">Our Services</p>
          <h2 className="services-title">Ship faster and smarter with TapeBox services</h2>
          <p className="services-subtitle">Everything you need for reliable, modern delivery — from real-time tracking to drone last-mile.</p>
          <div className="services-grid">

            <article className="service-item">
              <div className="service-icon-wrap">
                <svg className="service-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="service-name">Real-Time Package Tracking</h3>
              <p className="service-copy">Track every shipment from pickup to doorstep with live status updates and instant delivery alerts.</p>
              <Link to="/tracking" className="service-link">Track a package →</Link>
            </article>

            <article className="service-item">
              <div className="service-icon-wrap">
                <svg className="service-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="service-name">Smart DropBox Pickup Points</h3>
              <p className="service-copy">Use secure TapeBox drop points to speed up handoffs, reduce failed deliveries, and keep parcels safe.</p>
              <Link to="/dropbox" className="service-link">Drop a box →</Link>
            </article>

            <article className="service-item">
              <div className="service-icon-wrap">
                <svg className="service-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <h3 className="service-name">Drone &amp; Last-Mile Delivery</h3>
              <p className="service-copy">Combine drone support with route-optimized riders to deliver faster in busy areas and hard-to-reach zones.</p>
              <Link to="/drone-delivery" className="service-link">Explore drones →</Link>
            </article>

          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonial-showcase scroll-reveal post-hero-section">
        <div className="testimonial-shell">
          <h2 className="testimonial-title">What Our Customers Say</h2>
          <p className="testimonial-subtitle">Real stories from Lagos, Abuja, Port Harcourt and beyond. See how TapeBox makes daily deliveries easier across Nigeria.</p>
          <Link to="/dropbox" className="testimonial-book-btn">Book Now</Link>

          <div className="testimonial-track">
            <svg className="testimonial-line" viewBox="0 0 1200 360" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 180 C90 130 130 95 220 122 C300 146 320 260 390 262 C470 264 500 130 580 126 C650 124 680 178 760 180 C850 182 860 92 950 104 C1040 116 1038 246 1120 244 C1160 243 1180 220 1200 208" />
            </svg>

            <span className="testimonial-dot" style={{ left: '20.5%', top: '62%' }} />
            <span className="testimonial-dot testimonial-avatar-hide-mobile" style={{ left: '34%', top: '27%' }} />
            <span className="testimonial-dot" style={{ left: '56.3%', top: '32%' }} />
            <span className="testimonial-dot testimonial-avatar-hide-mobile" style={{ left: '72.8%', top: '80%' }} />
            <span className="testimonial-dot" style={{ left: '91.2%', top: '47%' }} />

            <figure className="testimonial-avatar testimonial-avatar-sm testimonial-avatar-hide-mobile" style={{ left: '14%', top: '30%' }}>
              <img src="/images/image_fx_ - 2025-03-21T000557.454.jpg" alt="Customer testimonial" />
            </figure>
            <figure className="testimonial-avatar testimonial-avatar-md" style={{ left: '27.8%', top: '58%' }}>
              <img src="/images/image_fx_ - 2025-03-21T000739.722.jpg" alt="Customer testimonial" />
            </figure>
            <figure className="testimonial-avatar testimonial-avatar-md" style={{ left: '40.8%', top: '30%' }}>
              <img src="/images/image_fx_ - 2025-03-21T000555.243.jpg" alt="Customer testimonial" />
            </figure>
            <figure className="testimonial-avatar testimonial-avatar-lg" style={{ left: '52.8%', top: '41%' }}>
              <img src="/images/image_fx_ - 2025-03-21T000824.037.jpg" alt="Customer testimonial" />
            </figure>
            <figure className="testimonial-avatar testimonial-avatar-md" style={{ left: '66.4%', top: '37%' }}>
              <img src="/images/image_fx_ - 2025-03-21T000929.031.jpg" alt="Customer testimonial" />
            </figure>
            <figure className="testimonial-avatar testimonial-avatar-md" style={{ left: '86%', top: '30%' }}>
              <img src="/images/image_fx_ - 2025-03-21T001001.795.jpg" alt="Customer testimonial" />
            </figure>
          </div>

          <div className="testimonial-quote-row">
            <button type="button" className="testimonial-arrow" aria-label="Previous testimonial" onClick={() => cycleTestimonial(-1)}>&lt;</button>
            <div className="testimonial-copy-stack">
              <p ref={quoteRef} className="testimonial-quote" aria-live="polite">{testimonialItems[0].quote}</p>
              <p ref={nameRef} className="testimonial-name" aria-live="polite">{testimonialItems[0].name}</p>
            </div>
            <button type="button" className="testimonial-arrow" aria-label="Next testimonial" onClick={() => cycleTestimonial(1)}>&gt;</button>
          </div>
        </div>
      </section>

      {/* Drone showcase */}
      <section className="w-full scroll-reveal post-hero-section" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="drone-showcase w-full">
          <article className="drone-showcase-content">
            <p className="drone-showcase-eyebrow">Drone Delivery</p>
            <h2 className="drone-showcase-title">Fast. Secure. Intelligent.</h2>
            <p className="drone-showcase-copy">No more delivery headaches. Use high-tech drone routing for quick, eco-friendly drops that reach hard-to-access areas with confidence.</p>
            <Link to="/drone-delivery" className="drone-showcase-button">Explore Now</Link>
          </article>
          <div className="drone-showcase-visual">
            <img src="/images/drone-illustration.svg" alt="TapeBox drone carrying a package" className="drone-showcase-main" />
          </div>
        </div>
      </section>

      {/* Track order */}
      <section id="track-order" className="max-w-4xl mx-auto p-8 my-12 w-full scroll-reveal post-hero-section">
        <h2 className="text-2xl sm:text-3xl text-orange-600 font-medium text-center mb-12">Track Your Order</h2>
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
          <p className="text-gray-600 mb-6 text-center">Enter your tracking number to see the real-time status of your package.</p>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert(`Tracking: ${e.target.trackingNumber.value}`) }}>
            <div>
              <label htmlFor="trackingNumber" className="block text-sm font-medium text-gray-700 mb-2">Tracking Number</label>
              <input type="text" id="trackingNumber" name="trackingNumber" placeholder="Enter your tracking number"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500" required />
            </div>
            <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded hover:bg-orange-600 transition duration-300">Track Package</button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">Don't have a tracking number? Check your email or <Link to="/contact" className="text-orange-500 hover:underline">contact support</Link>.</p>
          </div>
        </div>
      </section>

      {/* Cost Estimator */}
      <CostEstimator />

      {/* Pricing */}
      <section className="pricing-wrap scroll-reveal post-hero-section">
        <div className="pricing-shell">
          <h2 className="pricing-title">Delivery Coverage &amp; Pricing</h2>
          <p className="pricing-subtitle">Built for fast, secure package movement across local, intercity, and business routes. Every plan includes tracking and delivery confirmation.</p>

          <div className="pricing-grid">
            {[
              {
                name: 'City Standard', price: '₦ 3,490/delivery', meta: 'Within-city coverage · Up to 5kg',
                features: ['Doorstep pickup and drop-off','Pickup window: 2-4 hours','Same day or next day delivery','Live package tracking','Photo proof of delivery','Basic insurance up to ₦150,000','SMS and email updates','Customer support 8am–8pm'],
              },
              {
                name: 'Intercity Express', badge: 'BEST VALUE', price: '₦ 4,990/delivery', meta: 'Major intercity routes · Up to 10kg', featured: true,
                features: ['Coverage across key city-to-city lanes','Next-business-day delivery target','Priority dispatch queue','Live package tracking','Signature proof of delivery','Insurance up to ₦300,000','Weekend delivery in select areas','Two delivery attempts included','Priority support response'],
              },
              {
                name: 'Business Priority', price: '₦ 7,490/delivery', meta: 'Same-day options in select zones · Up to 20kg',
                features: ['Same-day delivery in select zones','Up to 3 delivery stops per order','Dedicated rider or vehicle','Live GPS route visibility','Signature and photo confirmation','Insurance up to ₦500,000','Monthly invoicing and reporting','Dedicated account management','Escalation support 24/7'],
              },
            ].map((plan) => (
              <article key={plan.name} className={`plan-card${plan.featured ? ' featured' : ''}`}>
                <div className="plan-top">
                  <h3 className="plan-name">
                    {plan.name}
                    {plan.badge && <span className="plan-badge">{plan.badge}</span>}
                  </h3>
                </div>
                <p className="plan-price">{plan.price}</p>
                <p className="plan-meta">{plan.meta}</p>
                <Link to="/dropbox" className={`plan-btn${plan.featured ? ' featured' : ''}`}>Schedule Pickup</Link>
                <ul className="plan-features">
                  {plan.features.map((f) => <li key={f}>{f}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="contact-highlight w-full scroll-reveal post-hero-section">
        <div className="contact-highlight-inner">
          <div className="newsletter-card">
            <div className="newsletter-content">
              <article>
                <h2 className="contact-highlight-title newsletter-title">Subscribe to our newsletter</h2>
                <p className="newsletter-copy">Join our newsletter to get exclusive insights, timely updates, and expert tips that help you ship smarter with TapeBox.</p>
              </article>
              <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); alert(`Subscribed: ${e.target.newsletterEmail.value}`); e.target.reset() }}>
                <p className="newsletter-kicker">Stay Informed</p>
                <div className="newsletter-input-row">
                  <input id="newsletterEmail" name="newsletterEmail" type="email" placeholder="Enter your email" required />
                  <button type="submit" className="newsletter-submit">Subscribe</button>
                </div>
                <p className="newsletter-policy">By subscribing you agree to our <a href="#">Privacy Policy</a></p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
