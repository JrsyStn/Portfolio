import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { gsap } from 'gsap'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
export interface Certificate {
  id: number
  title: string
  issuer: string
  date: string
  description: string
  image: string
  credlyLink: string
}

interface DepthCarouselProps {
  certificates: Certificate[]
  onOpenLightbox: (cert: Certificate) => void
}

// ─────────────────────────────────────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────────────────────────────────────
const CONFIG = {
  depth: 280,        // translateZ step per card (px)
  spreadX: 68,       // horizontal spread per card (% of stage width)
  tilt: 18,          // rotateY degrees per card away from center
  visibleCards: 2,   // how many cards each side of active to render
  blurStep: 2.5,     // blur added per card away from center (px)
  brightnessStep: 0.38, // brightness subtracted per card away from center
  scaleStep: 0.16,   // scale reduction per card away from center
  perspective: 1600, // CSS perspective (px)
  duration: 0.7,     // GSAP animation duration (s)
  ease: 'power3.out',
  autoplayInterval: 4000, // ms
} as const

// ─────────────────────────────────────────────────────────────────────────────
// Helper — compute 3D style for a given relative index
// ─────────────────────────────────────────────────────────────────────────────
function getCardStyle(relIndex: number, stageWidth: number) {
  const abs = Math.abs(relIndex)
  const sign = Math.sign(relIndex)

  const translateZ = -CONFIG.depth * abs
  const translateXPct = CONFIG.spreadX * sign * abs
  const rotateY = -CONFIG.tilt * sign * Math.min(abs, 2)
  const scale = Math.max(0.4, 1 - CONFIG.scaleStep * abs)
  const blur = CONFIG.blurStep * abs
  const brightness = Math.max(0.15, 1 - CONFIG.brightnessStep * abs)
  const zIndex = 100 - abs * 20

  // Convert % spread to px so GSAP can tween it
  const translateX = (translateXPct / 100) * stageWidth

  return { translateX, translateZ, rotateY, scale, blur, brightness, zIndex }
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
const DepthCarousel: React.FC<DepthCarouselProps> = ({
  certificates,
  onOpenLightbox,
}) => {
  const total = certificates.length
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const stageRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const stageWidthRef = useRef(0)

  // Drag tracking
  const dragRef = useRef({ active: false, startX: 0, threshold: 50 })
  // Autoplay
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null)
  // Wheel throttle
  const wheelCooldownRef = useRef(false)
  // Prevent click-after-drag
  const didDragRef = useRef(false)

  // ── measure stage ─────────────────────────────────────────────────────────
  useLayoutEffect(() => {
    const measure = () => {
      if (stageRef.current) {
        stageWidthRef.current = stageRef.current.offsetWidth
      }
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (stageRef.current) ro.observe(stageRef.current)
    return () => ro.disconnect()
  }, [])

  // ── animate cards whenever activeIndex changes ────────────────────────────
  const animateCards = useCallback(
    (nextActive: number) => {
      const w = stageWidthRef.current || 800

      cardRefs.current.forEach((el, idx) => {
        if (!el) return
        const relIndex = idx - nextActive
        const abs = Math.abs(relIndex)

        // Hide cards too far away
        if (abs > CONFIG.visibleCards + 1) {
          gsap.set(el, { autoAlpha: 0 })
          return
        }

        const { translateX, translateZ, rotateY, scale, blur, brightness, zIndex } =
          getCardStyle(relIndex, w)

        gsap.to(el, {
          x: translateX,
          z: translateZ,
          rotateY,
          scale,
          filter: `blur(${blur}px) brightness(${brightness})`,
          zIndex,
          autoAlpha: 1,
          duration: CONFIG.duration,
          ease: CONFIG.ease,
          overwrite: 'auto',
        })
      })
    },
    []
  )

  // Run on mount and whenever activeIndex changes
  useEffect(() => {
    animateCards(activeIndex)
  }, [activeIndex, animateCards])

  // ── navigation helpers ────────────────────────────────────────────────────
  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(total - 1, index))
      setActiveIndex(clamped)
    },
    [total]
  )

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo])
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])

  const atStart = activeIndex === 0
  const atEnd = activeIndex === total - 1

  // ── autoplay ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (paused || total <= 1) return
    autoplayRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % total)
    }, CONFIG.autoplayInterval)
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
    }
  }, [paused, total])

  // ── keyboard ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev() }
      if (e.key === 'ArrowRight') { e.preventDefault(); goNext() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goPrev, goNext])

  // ── mouse wheel ───────────────────────────────────────────────────────────
  const onWheel = useCallback(
    (e: React.WheelEvent) => {
      if (wheelCooldownRef.current) return
      wheelCooldownRef.current = true
      setTimeout(() => { wheelCooldownRef.current = false }, 600)

      if (e.deltaY > 0 || e.deltaX > 0) goNext()
      else goPrev()
    },
    [goPrev, goNext]
  )

  // ── mouse drag ────────────────────────────────────────────────────────────
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragRef.current = { active: true, startX: e.clientX, threshold: 50 }
    didDragRef.current = false
    setIsDragging(false)
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current.active) return
    const dx = Math.abs(e.clientX - dragRef.current.startX)
    if (dx > 8) setIsDragging(true)
  }, [])

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!dragRef.current.active) return
      dragRef.current.active = false
      const dx = e.clientX - dragRef.current.startX
      if (Math.abs(dx) >= dragRef.current.threshold) {
        didDragRef.current = true
        if (dx < 0) goNext()
        else goPrev()
      }
      setIsDragging(false)
    },
    [goPrev, goNext]
  )

  // ── touch swipe ───────────────────────────────────────────────────────────
  const touchStartX = useRef<number | null>(null)

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }, [])

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null) return
      const dx = e.changedTouches[0].clientX - touchStartX.current
      touchStartX.current = null
      if (Math.abs(dx) < 40) return
      if (dx < 0) goNext()
      else goPrev()
    },
    [goPrev, goNext]
  )

  // ── card click (only fire if NOT a drag) ─────────────────────────────────
  const handleCardClick = useCallback(
    (cert: Certificate, idx: number) => {
      if (didDragRef.current) return
      if (idx === activeIndex) {
        onOpenLightbox(cert)
      } else {
        goTo(idx)
      }
    },
    [activeIndex, onOpenLightbox, goTo]
  )

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div
      className="dc-wrapper"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Stage ── */}
      <div
        ref={stageRef}
        className="dc-stage"
        style={{ perspective: `${CONFIG.perspective}px` }}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        role="region"
        aria-label="Certificate carousel"
        aria-roledescription="carousel"
      >
        {certificates.map((cert, idx) => {
          const relIndex = idx - activeIndex
          const abs = Math.abs(relIndex)
          const isActive = relIndex === 0

          return (
            <div
              key={cert.id}
              ref={el => { cardRefs.current[idx] = el }}
              className={`dc-card${isActive ? ' dc-card-active' : ''}`}
              style={{
                opacity: 0,
                visibility: 'hidden' as const,
                cursor: isDragging ? 'grabbing' : isActive ? 'pointer' : 'default',
              }}
              onClick={() => handleCardClick(cert, idx)}
              role="group"
              aria-roledescription="slide"
              aria-label={`${cert.title} — ${cert.issuer} (${cert.date}), ${idx + 1} of ${total}`}
              aria-hidden={!isActive && abs > CONFIG.visibleCards}
              tabIndex={isActive ? 0 : -1}
              onKeyDown={e => {
                if ((e.key === 'Enter' || e.key === ' ') && isActive) {
                  e.preventDefault()
                  onOpenLightbox(cert)
                }
              }}
            >
              {/* ── Card Face ── */}
              <div className="dc-card-face">
                {/* Certificate image — always visible */}
                <div className="dc-card-image-wrap">
                  {cert.image ? (
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="dc-card-img"
                      loading="lazy"
                      draggable={false}
                    />
                  ) : (
                    <div className="dc-card-placeholder">
                      <span className="dc-placeholder-icon">🏅</span>
                    </div>
                  )}

                  {/* Active-only: click-to-view overlay */}
                  {isActive && (
                    <div className="dc-card-overlay" aria-hidden="true">
                      <span className="dc-card-view-label">View Certificate</span>
                    </div>
                  )}
                </div>

                {/* Info — only on the active card */}
                {isActive && (
                  <div className="dc-card-info">
                    <h3 className="dc-card-title">{cert.title}</h3>
                    <p className="dc-card-issuer">{cert.issuer} · {cert.date}</p>
                    <p className="dc-card-desc">{cert.description}</p>
                    <a
                      href={cert.credlyLink}
                      className="dc-card-credly"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                    >
                      View on Credly →
                    </a>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Navigation controls ── */}
      <div className="dc-controls" aria-label="Carousel navigation">
        <button
          className="dc-arrow dc-arrow-prev"
          onClick={goPrev}
          disabled={atStart}
          aria-label="Previous certificate"
          aria-disabled={atStart}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Counter + dots */}
        <div className="dc-indicator">
          <span className="dc-counter">{activeIndex + 1} / {total}</span>
          <div className="dc-dots" role="tablist">
            {certificates.map((_, i) => (
              <button
                key={i}
                className={`dc-dot${i === activeIndex ? ' dc-dot-active' : ''}`}
                onClick={() => goTo(i)}
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`Go to certificate ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <button
          className="dc-arrow dc-arrow-next"
          onClick={goNext}
          disabled={atEnd}
          aria-label="Next certificate"
          aria-disabled={atEnd}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* ── Autoplay status (screen-reader) ── */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {certificates[activeIndex]?.title}
      </div>
    </div>
  )
}

export default DepthCarousel
