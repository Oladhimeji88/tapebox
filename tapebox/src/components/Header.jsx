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
    { to: '/contact', label: 'Contact Us' },
  ]

  const desktopLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors hover:text-orange-400${
      isActive ? ' text-orange-400 underline underline-offset-4' : ' text-white/90'
    }`

  const mobileLinkClass = ({ isActive }) =>
    `block py-2.5 px-3 rounded-md text-sm font-medium transition-colors${
      isActive
        ? ' bg-white/10 text-orange-400'
        : ' text-white/90 hover:bg-white/8 hover:text-white'
    }`

  return (
    <header className="bg-black text-white sticky top-0 z-50 w-full border-b border-white/10 shadow-md">
      <div className="max-w-4xl mx-auto px-5 h-20 flex items-center justify-between gap-6">

        {/* Logo */}
        <Link to="/" aria-label="TapeBox Home" className="shrink-0">
          <img src="/images/Tapebox-logo.svg" alt="TapeBox" className="h-10" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-6" aria-label="main">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={desktopLinkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTA */}
        <NavLink
          to="/dropbox"
          className="hidden sm:inline-flex shrink-0 items-center bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
        >
          Drop a box
        </NavLink>

        {/* Mobile hamburger / close */}
        <button
          id="mobile-menu-btn"
          className="sm:hidden ml-auto text-white focus:outline-none"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div id="mobile-menu" className="sm:hidden border-t border-white/10 bg-black px-4 pb-4 pt-2">
          <nav className="flex flex-col gap-1">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={mobileLinkClass}
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-3 pt-3 border-t border-white/10">
            <NavLink
              to="/dropbox"
              className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Drop a box
            </NavLink>
          </div>
        </div>
      )}
    </header>
  )
}
