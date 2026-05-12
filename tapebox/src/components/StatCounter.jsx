import { useEffect, useRef, useState } from 'react'

export default function StatCounter({ end, suffix = '', decimals = 0, duration = 1800, className = '' }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.disconnect() } },
      { threshold: 0.4 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    let raf
    let t0 = null
    const step = (ts) => {
      if (!t0) t0 = ts
      const progress = Math.min((ts - t0) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = eased * end
      setCount(decimals > 0 ? parseFloat(current.toFixed(decimals)) : Math.floor(current))
      if (progress < 1) raf = requestAnimationFrame(step)
      else setCount(end)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [started, end, duration, decimals])

  return (
    <span ref={ref} className={className}>
      {decimals > 0 ? count.toFixed(decimals) : count}{suffix}
    </span>
  )
}
