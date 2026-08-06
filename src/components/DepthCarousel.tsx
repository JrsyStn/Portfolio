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
  inactiveOpacity: 0.02, // opacity for cards that are not the active card
  inactiveFilter: 'saturate(1) brightness(0.90)', // extra visual dimming for non-active cards
  scaleStep: 0.16,   // scale reduction per card away from center
  perspective: 1600, // CSS perspective (px)
  duration: 0.58,    // GSAP animation duration (s)
  ease: 'power2.out',
  autoplayInterval: 4000, // ms
  autoAdvance: false, // disable automatic switching
  mobileBreakpoint: 900,
  mobile: {
    depth: 180,
    spreadX: 44,
    tilt: 12,
    visibleCards: 1,
    blurStep: 1.1,
    brightnessStep: 0.24,
    scaleStep: 0.10,
    perspective: 1200,
    duration: 0.42,
    ease: 'power1.out',
  },
} as const

// ─────────────────────────────────────────────────────────────────────────────
// Helper — compute 3D style for a given relative index
// ─────────────────────────────────────────────────────────────────────────────
function getCardStyle(relIndex: number, stageWidth: number, compact: boolean) {
  const abs = Math.abs(relIndex)
  const sign = Math.sign(relIndex)
  const cfg = compact ? CONFIG.mobile : CONFIG

  const translateZ = -cfg.depth * abs
  const translateXPct = cfg.spreadX * sign * abs
  const rotateY = -cfg.tilt * sign * Math.min(abs, 2)
  const scale = Math.max(0.45, 1 - cfg.scaleStep * abs)
  const blur = cfg.blurStep * abs
  const brightness = Math.max(0.28, 1 - cfg.brightnessStep * abs)
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
  const dragRef = useRef({ active: false, startX: 0, startY: 0, threshold: 46, moved: false })
  // Autoplay
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null)
  // Prevent click-after-drag
  const didDragRef = useRef(false)

  // ── animate cards whenever activeIndex changes ────────────────────────────
  const animateCards = useCallback(
    (nextActive: number) => {
      const w = stageWidthRef.current || 800
      const compact = w <= CONFIG.mobileBreakpoint
      const visibleCards = compact ? CONFIG.mobile.visibleCards : CONFIG.visibleCards
      const animationDuration = compact ? CONFIG.mobile.duration : CONFIG.duration
      const animationEase = compact ? CONFIG.mobile.ease : CONFIG.ease

      cardRefs.current.forEach((el, idx) => {
        if (!el) return
        const relIndex = idx - nextActive
        const abs = Math.abs(relIndex)

        // Hide cards too far away
        if (abs > visibleCards + 1) {
          gsap.set(el, { autoAlpha: 0 })
          return
        }

        const { translateX, translateZ, rotateY, scale, blur, brightness, zIndex } =
          getCardStyle(relIndex, w, compact)

        const isActive = relIndex === 0
        const filterValue = isActive
          ? 'none'
          : compact
            ? `brightness(${Math.max(0.55, brightness - 0.15)}) saturate(0.78)`
            : `blur(${Math.max(0.4, blur * 0.5)}px) brightness(${Math.max(0.22, brightness - 0.18)}) saturate(0.72)`

        gsap.to(el, {
          x: translateX,
          z: translateZ,
          rotateY,
          scale,
          filter: filterValue,
          opacity: isActive ? 1 : CONFIG.inactiveOpacity,
          zIndex,
          autoAlpha: 1,
          duration: animationDuration,
          ease: animationEase,
          overwrite: 'auto',
          force3D: true,
        })
      })
    },
    []
  )

  // ── measure stage ─────────────────────────────────────────────────────────
  useLayoutEffect(() => {
    const measure = () => {
      if (stageRef.current) {
        stageWidthRef.current = stageRef.current.offsetWidth
      }
      window.requestAnimationFrame(() => animateCards(activeIndex))
    }

    measure()
    const ro = new ResizeObserver(measure)
    if (stageRef.current) ro.observe(stageRef.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [activeIndex, animateCards])

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

  const moveBy = useCallback(
    (delta: number) => {
      setActiveIndex(prev => Math.max(0, Math.min(total - 1, prev + delta)))
    },
    [total]
  )

  const goPrev = useCallback(() => moveBy(-1), [moveBy])
  const goNext = useCallback(() => moveBy(1), [moveBy])

  const atStart = activeIndex === 0
  const atEnd = activeIndex === total - 1

  // ── autoplay disabled ───────────────────────────────────────────────────
  useEffect(() => {
    if (!CONFIG.autoAdvance || paused || total <= 1) return
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

  // ── mouse drag ────────────────────────────────────────────────────────────
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return

    const target = e.target as HTMLElement
    if (target.closest('button, a, input, textarea, select, [role="button"]')) {
      e.stopPropagation()
      return
    }

    dragRef.current = { active: true, startX: e.clientX, startY: e.clientY, threshold: 46, moved: false }
    didDragRef.current = false
    setIsDragging(false)
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === 'touch' || !dragRef.current.active) return
    const dx = e.clientX - dragRef.current.startX
    const dy = e.clientY - dragRef.current.startY
    if (Math.abs(dx) > Math.abs(dy) + 8 && Math.abs(dx) > 8) {
      dragRef.current.moved = true
      setIsDragging(true)
    }
  }, [])

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType === 'touch' || !dragRef.current.active) return
      dragRef.current.active = false
      const dx = e.clientX - dragRef.current.startX
      const dy = e.clientY - dragRef.current.startY
      if (dragRef.current.moved && Math.abs(dx) >= dragRef.current.threshold && Math.abs(dx) > Math.abs(dy) + 10) {
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
  const touchStartY = useRef<number | null>(null)

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }, [])

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return
    const dx = e.touches[0].clientX - touchStartX.current
    const dy = e.touches[0].clientY - touchStartY.current
    if (Math.abs(dx) > Math.abs(dy) + 8 && Math.abs(dx) > 10) {
      e.preventDefault()
    }
  }, [])

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null || touchStartY.current === null) return
      const dx = e.changedTouches[0].clientX - touchStartX.current
      const dy = e.changedTouches[0].clientY - touchStartY.current
      touchStartX.current = null
      touchStartY.current = null
      if (Math.abs(dx) < 38 || Math.abs(dx) < Math.abs(dy) + 10) return
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
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
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
              <div className="dc-card-face cert-slide glass-card">
                <div className="cert-preview" data-reveal="left">
                  {cert.image ? (
                    <>
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="cert-img"
                        loading="lazy"
                        draggable={false}
                      />
                      {isActive && (
                        <button
                          type="button"
                          className="cert-image-trigger"
                          onMouseDown={(e) => e.stopPropagation()}
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={(e) => {
                            e.stopPropagation()
                            onOpenLightbox(cert)
                          }}
                          aria-label={`View full certificate image for ${cert.title}`}
                        >
                          View More
                        </button>
                      )}
                    </>
                  ) : (
                    <div className="cert-placeholder">
                      <span className="cert-placeholder-icon">🏅</span>
                      <span className="cert-placeholder-label">Certificate Preview</span>
                    </div>
                  )}
                </div>

                <div className="cert-info" data-reveal="right">
                  <h3 className="cert-slide-title">{cert.title}</h3>
                  <p className="cert-slide-issuer">{cert.issuer} · {cert.date}</p>
                  <p className="cert-slide-desc">{cert.description}</p>
                  <a
                    href={cert.credlyLink}
                    className="cert-credly-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                  >
                    View on Credly →
                  </a>
                </div>
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

        {/* Counter only */}
        <div className="dc-indicator">
          <span className="dc-counter">{activeIndex + 1} / {total}</span>
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

    </div>
  )
}

export default DepthCarousel
