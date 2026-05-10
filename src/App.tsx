import React, { useState, useEffect, useRef } from 'react'
import profileImage from './assets/profile.png'
import projectImage from './assets/hero.png'
import './App.css'

// ─────────────────────────────────────────────
// PROJECT CATEGORIES
// To add a new category: append a new object to this array.
// To add a new project:  append to the `projects` array inside its category.
//
// Fields per category:
//   id       – unique string key
//   label    – display name shown on the tab
//   icon     – emoji or short symbol for the tab
//
// Fields per project:
//   id          – unique number
//   title       – project name
//   description – short summary
//   technologies – array of strings
//   image       – imported image (or URL string)
//   link        – GitHub / live URL, or '#'
// ─────────────────────────────────────────────
const projectCategories = [
  {
    id: 'programming',
    label: 'Programming',
    icon: '💻',
    projects: [
      {
        id: 1,
        title: 'MeditrackRx',
        description: 'Medication management app with reminders and tracking features',
        technologies: ['Dart', 'Flutter', 'Firebase'],
        image: projectImage,
        link: 'https://github.com/JrsyStn/meditrackrx',
      },
      {
        id: 2,
        title: 'ExplorePh',
        description: 'Travel guide website showcasing the beauty of the Philippines',
        technologies: ['Html', 'CSS', 'JavaScript'],
        image: projectImage,
        link: 'https://github.com/JrsyStn/ExplorePhilippines',
      },
      {
        id: 3,
        title: 'Task Management Tool',
        description: 'Collaborative task management with drag-and-drop interface',
        technologies: ['React', 'Firebase', 'TypeScript', 'Tailwind CSS'],
        image: projectImage,
        link: '#',
      },
      {
        id: 4,
        title: 'AI Content Generator',
        description: 'AI-powered content generation tool with API integration',
        technologies: ['React', 'OpenAI API', 'Python', 'FastAPI'],
        image: projectImage,
        link: '#',
      },
    ],
  },
  {
    id: 'graphic-design',
    label: 'Graphic Design',
    icon: '🎨',
    projects: [
      {
        id: 1,
        title: 'Brand Identity Kit',
        description: 'Complete brand identity for a local coffee shop — logo, palette, and typography system',
        technologies: ['Figma', 'Canva', 'Illustrator'],
        image: projectImage,
        link: '#',
      },
      {
        id: 2,
        title: 'UI/UX Case Study',
        description: 'End-to-end UX redesign of a food-delivery mobile app with improved user flow',
        technologies: ['Figma', 'Adobe XD'],
        image: projectImage,
        link: '#',
      },
    ],
  },
  {
    id: 'media-editing',
    label: 'Media Editing',
    icon: '🎬',
    projects: [
      {
        id: 1,
        title: 'Short-Form Content Pack',
        description: 'Edited a series of 30-second promotional reels optimized for social media reach',
        technologies: ['CapCut', 'DaVinci Resolve'],
        image: projectImage,
        link: '#',
      },
      {
        id: 2,
        title: 'Documentary Highlight Reel',
        description: 'Color-graded and edited a 5-minute highlight reel for a local environmental NGO',
        technologies: ['DaVinci Resolve', 'GIMP'],
        image: projectImage,
        link: '#',
      },
    ],
  },
]


// ─────────────────────────────────────────────
// SKILL IMAGE SIZE CONFIGURATION
// Change the `imageSize` value (in px) for each skill to resize its icon.
// ─────────────────────────────────────────────
const skillCards = [
  { name: 'React', image: new URL('./assets/skills/react.svg', import.meta.url).href, imageSize: 40 },
  { name: 'TypeScript', image: new URL('./assets/skills/ts.png', import.meta.url).href, imageSize: 36 },
  { name: 'Python', image: new URL('./assets/skills/Python.png', import.meta.url).href, imageSize: 36 },
  { name: 'Node JS', image: new URL('./assets/skills/Nodejs.png', import.meta.url).href, imageSize: 36 },
  { name: 'HTML', image: new URL('./assets/skills/HTML.png', import.meta.url).href, imageSize: 36 },
  { name: 'CSS', image: new URL('./assets/skills/CSS.png', import.meta.url).href, imageSize: 36 },
  { name: 'Javascript', image: new URL('./assets/skills/JS.png', import.meta.url).href, imageSize: 36 },
  { name: 'PostgreSQL', image: new URL('./assets/skills/PostgreSQL.png', import.meta.url).href, imageSize: 32 },
  { name: 'GIT', image: new URL('./assets/skills/GIT.png', import.meta.url).href, imageSize: 32 },
  { name: 'AWS', image: new URL('./assets/skills/AWS.png', import.meta.url).href, imageSize: 36 },
  { name: 'Firebase', image: new URL('./assets/skills/Firebase.png', import.meta.url).href, imageSize: 36 },
  { name: 'Figma', image: new URL('./assets/skills/Figma.png', import.meta.url).href, imageSize: 36 },
  { name: 'Canva', image: new URL('./assets/skills/canva.png', import.meta.url).href, imageSize: 36 },
  { name: 'Capcut', image: new URL('./assets/skills/capcut.png', import.meta.url).href, imageSize: 36 },
  { name: 'Davinci Resolve', image: new URL('./assets/skills/Davinciresolve.png', import.meta.url).href, imageSize: 36 },
  { name: 'Gimp', image: new URL('./assets/skills/gimp.png', import.meta.url).href, imageSize: 36 },
  { name: 'Adobe', image: new URL('./assets/skills/adobe.png', import.meta.url).href, imageSize: 36 }
]

// ─────────────────────────────────────────────
// ABOUT – bold keywords shown on the left column
// ─────────────────────────────────────────────
const aboutKeywords = [
  { label: 'Dedicated' },
  { label: 'Creative' },
  { label: 'Detail-Oriented' }
]

// ─────────────────────────────────────────────
// CERTIFICATES DATA
// Add or remove certificates here.
// Set `credlyLink` to your real Credly certificate URL.
// Set `image` to a screenshot/preview of your certificate (or leave as '').
// ─────────────────────────────────────────────
const certificates = [
  {
    id: 1,
    title: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    date: '2024',
    description: 'Covers HTML, CSS, flexbox, CSS grid, and accessible responsive design principles.',
    image: '',                        // ← replace with: new URL('./assets/cert1.png', import.meta.url).href
    credlyLink: 'https://www.credly.com/users/jersey-sistona', // ← replace with your actual Credly URL
  },
  {
    id: 2,
    title: 'JavaScript Algorithms & Data Structures',
    issuer: 'freeCodeCamp',
    date: '2024',
    description: 'ES6+, regular expressions, OOP, functional programming, and algorithm scripting.',
    image: '',
    credlyLink: 'https://www.credly.com/users/jersey-sistona',
  },
  {
    id: 3,
    title: 'React – The Complete Guide',
    issuer: 'Udemy',
    date: '2024',
    description: 'React hooks, context, Redux, Next.js, testing, and real-world project building.',
    image: '',
    credlyLink: 'https://www.credly.com/users/jersey-sistona',
  },
  {
    id: 4,
    title: 'Google UX Design Certificate',
    issuer: 'Coursera / Google',
    date: '2025',
    description: 'End-to-end UX design process: empathize, define, ideate, prototype, and test.',
    image: '',
    credlyLink: 'https://www.credly.com/users/jersey-sistona',
  },
  {
    id: 5,
    title: 'AWS Cloud Practitioner Essentials',
    issuer: 'Amazon Web Services',
    date: '2025',
    description: 'AWS core services, security, architecture, pricing, and support fundamentals.',
    image: '',
    credlyLink: 'https://www.credly.com/users/jersey-sistona',
  },
  {
    id: 6,
    title: 'Flutter & Dart – The Complete Guide',
    issuer: 'Udemy',
    date: '2023',
    description: 'Cross-platform mobile development with Flutter, state management, and Firebase.',
    image: '',
    credlyLink: 'https://www.credly.com/users/jersey-sistona',
  },
]

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [theme, setTheme] = useState('light')
  const [certIndex, setCertIndex] = useState(0)
  const [activeCategoryId, setActiveCategoryId] = useState(projectCategories[0].id)
  const [menuOpen, setMenuOpen] = useState(false)
  // Linear (non-looping) index: 0 to n-1
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isCategorySwitching, setIsCategorySwitching] = useState(false)
  const [sectionWidth, setSectionWidth] = useState(0)

  const projectSectionRef = useRef<HTMLElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const touchStartX = useRef<number | null>(null)
  const certTouchStartX = useRef<number | null>(null)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  useEffect(() => {
    const measure = () => {
      if (projectSectionRef.current) {
        setSectionWidth(projectSectionRef.current.offsetWidth)
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = (section: string) => {
    setActiveSection(section)
    setMenuOpen(false)
  }

  // Touch swipe handlers for project carousel
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(dx) < 40) return  // ignore tiny taps
    if (dx < 0) goNext()
    else goPrev()
  }

  const prevCert = () => setCertIndex(i => (i - 1 + certificates.length) % certificates.length)
  const nextCert = () => setCertIndex(i => (i + 1) % certificates.length)

  const onCertTouchStart = (e: React.TouchEvent) => {
    certTouchStartX.current = e.touches[0].clientX
  }

  const onCertTouchEnd = (e: React.TouchEvent) => {
    if (certTouchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - certTouchStartX.current
    certTouchStartX.current = null
    if (Math.abs(dx) < 30) return
    if (dx < 0) nextCert()
    else prevCert()
  }

  const activeCert = certificates[certIndex]

  // Derive the active category's projects
  const activeCategory = projectCategories.find(c => c.id === activeCategoryId) ?? projectCategories[0]
  const projects = activeCategory.projects
  const n = projects.length

  const pCardWidth = sectionWidth > 0 ? sectionWidth * 0.60 : 0
  const pGap = 24
  const pCardStep = pCardWidth + pGap
  const pCenterOff = sectionWidth > 0 ? (sectionWidth - pCardWidth) / 2 : 0
  // Position based on linear currentIndex (no looping)
  const pTrackX = pCenterOff - currentIndex * pCardStep

  const atStart = currentIndex === 0
  const atEnd = currentIndex === n - 1

  const goNext = () => {
    if (!isAnimating && !atEnd) {
      setIsAnimating(true)
      setCurrentIndex(i => i + 1)
    }
  }

  const goPrev = () => {
    if (!isAnimating && !atStart) {
      setIsAnimating(true)
      setCurrentIndex(i => i - 1)
    }
  }

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== trackRef.current || e.propertyName !== 'transform') return
    setIsAnimating(false)
  }

  // Switch category: fade out → swap → fade in
  const switchCategory = (id: string) => {
    if (id === activeCategoryId) return

    // Phase 1 – fade out current carousel
    setIsCategorySwitching(true)

    setTimeout(() => {
      // Phase 2 – swap content while invisible, reset to first item
      setActiveCategoryId(id)
      setIsAnimating(false)
      setCurrentIndex(0)

      // Phase 3 – fade back in
      requestAnimationFrame(() => requestAnimationFrame(() => {
        setIsCategorySwitching(false)
      }))
    }, 240)  // matches CSS fade-out duration
  }

  return (
    <div className="app">

      {/* ── Navigation ── */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo"><span className="logo-text">Jersey</span></div>

          {/* Desktop nav links */}
          <ul className="nav-links">
            <li><a href="#home" onClick={() => handleNavClick('home')} className={activeSection === 'home' ? 'active' : ''}>Home</a></li>
            <li><a href="#about" onClick={() => handleNavClick('about')} className={activeSection === 'about' ? 'active' : ''}>About</a></li>
            <li><a href="#projects" onClick={() => handleNavClick('projects')} className={activeSection === 'projects' ? 'active' : ''}>Projects</a></li>
            <li><a href="#skills" onClick={() => handleNavClick('skills')} className={activeSection === 'skills' ? 'active' : ''}>Skills</a></li>
            <li><a href="#certificates" onClick={() => handleNavClick('certificates')} className={activeSection === 'certificates' ? 'active' : ''}>Certificates</a></li>
            <li><a href="#contact" onClick={() => handleNavClick('contact')} className={activeSection === 'contact' ? 'active' : ''}>Contact</a></li>
          </ul>

          <div className="nav-right">
            <button className="theme-toggle" onClick={toggleTheme} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            {/* Hamburger – visible only on mobile */}
            <button
              id="hamburger-btn"
              className={`hamburger${menuOpen ? ' hamburger-open' : ''}`}
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              <span className="ham-line" />
              <span className="ham-line" />
              <span className="ham-line" />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile menu overlay ── */}
      <div className={`mobile-nav-overlay${menuOpen ? ' mobile-nav-open' : ''}`} onClick={() => setMenuOpen(false)} />
      <div className={`mobile-nav${menuOpen ? ' mobile-nav-open' : ''}`}>
        <ul className="mobile-nav-links">
          {[['home', 'Home'], ['about', 'About'], ['projects', 'Projects'], ['skills', 'Skills'], ['certificates', 'Certificates'], ['contact', 'Contact']].map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} onClick={() => handleNavClick(id)} className={activeSection === id ? 'active' : ''}>{label}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Hero ── */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <p className="hero-label">Welcome to my portfolio</p>
            <h1 className="hero-title">Hi, I'm<br />Jersey Sistona</h1>
            <p className="hero-subtitle">Designer &amp; Developer</p>
            <div className="hero-buttons">
              <a href="#projects" className="btn btn-primary">View My Work</a>
              <a href="#contact" className="btn btn-secondary">Get In Touch</a>
            </div>
          </div>
          <div className="hero-image">
            <img className="avatar-image" src={profileImage} alt="Jersey Sistona" />
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="about-section">
        <div className="container">


          {/* Two-column: bold keywords | short description */}
          <div className="about-intro">
            {/* Left – bold keyword pills */}
            <div className="about-keywords">
              {aboutKeywords.map(kw => (
                <div key={kw.label} className="keyword-pill">
                  <span className="keyword-label">{kw.label}</span>
                </div>
              ))}
            </div>

            {/* Right – summary */}
            <div className="about-description">
              <p className="about-desc-text">
                I'm a <strong>full-stack developer &amp; designer</strong> from the Philippines passionate
                about crafting clean, user-friendly digital experiences. I work at the intersection of
                <strong> design and code</strong>, building polished products with React, TypeScript,
                Flutter, and Firebase — and I'm always exploring new tech to keep growing.
              </p>
            </div>
          </div>

          {/* ── Skills Carousel ── */}
          <div id="skills" className="about-skills">
            <h3 className="section-title">Skills</h3>
            <div className="skills-carousel">
              <div className="skill-track">
                {skillCards.concat(skillCards).map((skill, idx) => (
                  <div key={`${skill.name}-${idx}`} className="skill-card">
                    <div className="skill-icon">
                      <img
                        className="skill-img"
                        src={skill.image}
                        alt={skill.name}
                        style={{ width: skill.imageSize, height: skill.imageSize }}
                      />
                    </div>
                    <span className="skill-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="projects-section" ref={projectSectionRef as React.RefObject<HTMLElement>}>
        {/* Title + category tabs inside container */}
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>

          {/* ── Category tab bar ── */}
          <div className="project-category-tabs" role="tablist" aria-label="Project categories">
            {projectCategories.map(cat => (
              <button
                key={cat.id}
                id={`tab-${cat.id}`}
                role="tab"
                aria-selected={cat.id === activeCategoryId}
                className={`category-tab${cat.id === activeCategoryId ? ' category-tab-active' : ''}`}
                onClick={() => switchCategory(cat.id)}
              >
                <span className="category-tab-icon">{cat.icon}</span>
                <span className="category-tab-label">{cat.label}</span>
                <span className="category-tab-count">{cat.projects.length}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Full-width track – lives outside container so peek bleeds to edges */}
        <div className={`project-slider-outer${isCategorySwitching ? ' category-switching' : ''}`}>
          <div
            className="project-track"
            ref={trackRef}
            style={{ transform: `translateX(${pTrackX}px)` }}
            onTransitionEnd={handleTransitionEnd}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {projects.map((project, idx) => {
              const isActive = idx === currentIndex
              return (
                <a
                  key={`${project.id}-${idx}`}
                  href={project.link}
                  className={`project-card project-slide${isActive ? ' project-slide-active' : ''}`}
                  style={pCardWidth ? { width: `${pCardWidth}px` } : undefined}
                  target={isActive ? '_blank' : undefined}
                  rel={isActive ? 'noopener noreferrer' : undefined}
                  onClick={(e) => {
                    if (idx < currentIndex) { e.preventDefault(); goPrev() }
                    else if (idx > currentIndex) { e.preventDefault(); goNext() }
                  }}
                >
                  <div className="project-image-wrap">
                    <img className="project-image" src={project.image} alt={project.title} />
                    {isActive && (
                      <div className="project-overlay">
                        <span className="project-view-btn">View Project →</span>
                      </div>
                    )}
                  </div>
                  <div className="project-body">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    <div className="project-tech">
                      {project.technologies.map((tech, techIdx) => (
                        <span key={techIdx} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        </div>

        {/* Nav + dots inside container */}
        <div className="container">
          <div className="project-nav">
            <button
              className="cert-arrow"
              onClick={goPrev}
              aria-label="Previous project"
              disabled={atStart}
              style={{ opacity: atStart ? 0.3 : 1, cursor: atStart ? 'not-allowed' : 'pointer' }}
            >←</button>
            <span className="project-counter">{currentIndex + 1} / {projects.length}</span>
            <button
              className="cert-arrow"
              onClick={goNext}
              aria-label="Next project"
              disabled={atEnd}
              style={{ opacity: atEnd ? 0.3 : 1, cursor: atEnd ? 'not-allowed' : 'pointer' }}
            >→</button>
          </div>
          <div className="cert-dots" style={{ marginTop: '1rem' }}>
            {projects.map((_, i) => (
              <button
                key={i}
                className={`cert-dot${i === currentIndex ? ' cert-dot-active' : ''}`}
                onClick={() => { if (!isAnimating) setCurrentIndex(i) }}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Certificates – single-item slider ── */}
      <section id="certificates" className="certificates-section">
        <div className="container">
          <h2 className="section-title">Certificates</h2>

          <div className="cert-slider" onTouchStart={onCertTouchStart} onTouchEnd={onCertTouchEnd}>
            <div className="cert-slide" key={activeCert.id}>
              {/* Certificate image (or placeholder if no image) */}
              <div className="cert-preview">
                {activeCert.image ? (
                  <img src={activeCert.image} alt={activeCert.title} className="cert-img" />
                ) : (
                  <div className="cert-placeholder">
                    <span className="cert-placeholder-icon">🏅</span>
                    <span className="cert-placeholder-label">Certificate Preview</span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="cert-info">
                <h3 className="cert-slide-title">{activeCert.title}</h3>
                <p className="cert-slide-issuer">{activeCert.issuer} · {activeCert.date}</p>
                <p className="cert-slide-desc">{activeCert.description}</p>
                <a
                  href={activeCert.credlyLink}
                  className="cert-credly-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Credly →
                </a>
              </div>
            </div>

            <div className="cert-nav-bottom">
              <button
                className="cert-arrow cert-arrow-bottom"
                onClick={prevCert}
                aria-label="Previous certificate"
                disabled={certIndex === 0}
                style={{ opacity: certIndex === 0 ? 0.3 : 1, cursor: certIndex === 0 ? 'not-allowed' : 'pointer' }}
              >
                ←
              </button>
              <span className="project-counter">{certIndex + 1} / {certificates.length}</span>
              <button
                className="cert-arrow cert-arrow-bottom"
                onClick={nextCert}
                aria-label="Next certificate"
                disabled={certIndex === certificates.length - 1}
                style={{ opacity: certIndex === certificates.length - 1 ? 0.3 : 1, cursor: certIndex === certificates.length - 1 ? 'not-allowed' : 'pointer' }}
              >
                →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="contact-section">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-content">
            <p className="contact-subtitle">I'm always interested in hearing about new projects and opportunities.</p>
            <div className="contact-methods">
              <a href="mailto:your.email@example.com" className="contact-card">
                <div className="contact-icon">✉</div>
                <h3>Email</h3>
                <p>your.email@example.com</p>
              </a>
              <a href="https://linkedin.com" className="contact-card" target="_blank" rel="noopener noreferrer">
                <div className="contact-icon">in</div>
                <h3>LinkedIn</h3>
                <p>Connect with me</p>
              </a>
              <a href="https://github.com" className="contact-card" target="_blank" rel="noopener noreferrer">
                <div className="contact-icon">⚙</div>
                <h3>GitHub</h3>
                <p>View my projects</p>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2026 My Portfolio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
