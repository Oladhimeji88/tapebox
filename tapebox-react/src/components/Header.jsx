import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const close = (e) => {
      if (!e.target.closest('#mobile-menu') && !e.target.closest('#mobile-menu-btn')) {
        setMobileOpen(false)
      }
    }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [])

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/tracking', label: 'Track Order' },
    { to: '/drone-delivery', label: 'Drone Delivery' },
    { to: '/about', label: 'About' },
    { to: '/testimonials', label: 'Testimonials' },
    { to: '/contact', label: 'Contact-us' },
  ]

  const linkClass = ({ isActive }) =>
    `site-nav-link hover:opacity-80${isActive ? ' active-page' : ''}`

  return (
    <header className="bg-green-900 text-white sticky top-0 z-10 w-full">
      <section className="max-w-4xl mx-auto p-5 flex justify-between items-center">
        <Link to="/" aria-label="TapeBox Home" className="block">
          <img src="/images/Tapebox-logo.svg" alt="TapeBox logo" className="h-12" />
        </Link>

        <div className="flex items-center">
          <nav className="hidden sm:block space-x-8 text-sm" aria-label="main">
            {navLinks.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
          </nav>
          <NavLink
            to="/dropbox"
            className="site-nav-link hidden sm:block ml-4 bg-green-600 text-white px-5 py-2 rounded-full text-base hover:bg-green-700"
          >
            Drop a box
          </NavLink>

          <button
            id="mobile-menu-btn"
            className="sm:hidden ml-4 text-white focus:outline-none"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </section>

      {mobileOpen && (
        <div id="mobile-menu" className="sm:hidden bg-green-950 px-5 py-4">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `site-nav-link hover:opacity-80 py-2${isActive ? ' active-page' : ''}`
                }
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </NavLink>
            ))}
            <NavLink
              to="/dropbox"
              className="site-nav-link hover:opacity-80 py-2"
              onClick={() => setMobileOpen(false)}
            >
              Drop a box
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  )
}
