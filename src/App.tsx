import React, { useState, useEffect, useRef } from 'react'
import profileImage from './assets/profile.png'
import projectImage from './assets/hero.png'
import './App.css'

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
  const [trackIndex, setTrackIndex] = useState(1) // 1 = first real item (index 0 is last-clone)
  const [isAnimating, setIsAnimating] = useState(false)
  const [sectionWidth, setSectionWidth] = useState(0)

  const projectSectionRef = useRef<HTMLElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)

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

  const prevCert = () => setCertIndex(i => (i - 1 + certificates.length) % certificates.length)
  const nextCert = () => setCertIndex(i => (i + 1) % certificates.length)

  const activeCert = certificates[certIndex]

  const projects = [
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
  ]

  // ─ Centered carousel geometry ─
  const pCardWidth = sectionWidth > 0 ? sectionWidth * 0.60 : 0
  const pGap = 24
  const pCardStep = pCardWidth + pGap
  const pCenterOff = sectionWidth > 0 ? (sectionWidth - pCardWidth) / 2 : 0
  const pTrackX = pCenterOff - trackIndex * pCardStep
  const realIndex = (trackIndex - 1 + projects.length) % projects.length
  const trackItems = [projects[projects.length - 1], ...projects, projects[0]]

  const goNext = () => { if (!isAnimating) { setIsAnimating(true); setTrackIndex(i => i + 1) } }
  const goPrev = () => { if (!isAnimating) { setIsAnimating(true); setTrackIndex(i => i - 1) } }

  const handleTransitionEnd = () => {
    setIsAnimating(false)
    if (trackIndex >= projects.length + 1) {
      if (trackRef.current) trackRef.current.style.transition = 'none'
      setTrackIndex(1)
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (trackRef.current) trackRef.current.style.transition = ''
      }))
    } else if (trackIndex <= 0) {
      if (trackRef.current) trackRef.current.style.transition = 'none'
      setTrackIndex(projects.length)
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (trackRef.current) trackRef.current.style.transition = ''
      }))
    }
  }

  return (
    <div className="app">

      {/* ── Navigation ── */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo"><span className="logo-text">Jersey</span></div>
          <ul className="nav-links">
            <li><a href="#home" onClick={() => setActiveSection('home')} className={activeSection === 'home' ? 'active' : ''}>Home</a></li>
            <li><a href="#about" onClick={() => setActiveSection('about')} className={activeSection === 'about' ? 'active' : ''}>About</a></li>
            <li><a href="#projects" onClick={() => setActiveSection('projects')} className={activeSection === 'projects' ? 'active' : ''}>Projects</a></li>
            <li><a href="#skills" onClick={() => setActiveSection('skills')} className={activeSection === 'skills' ? 'active' : ''}>Skills</a></li>
            <li><a href="#certificates" onClick={() => setActiveSection('certificates')} className={activeSection === 'certificates' ? 'active' : ''}>Certificates</a></li>
            <li><a href="#contact" onClick={() => setActiveSection('contact')} className={activeSection === 'contact' ? 'active' : ''}>Contact</a></li>
          </ul>
          <button className="theme-toggle" onClick={toggleTheme} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </nav>

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
        {/* Title inside container */}
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
        </div>

        {/* Full-width track – lives outside container so peek bleeds to edges */}
        <div className="project-slider-outer">
          <div
            className="project-track"
            ref={trackRef}
            style={{ transform: `translateX(${pTrackX}px)` }}
            onTransitionEnd={handleTransitionEnd}
          >
            {trackItems.map((project, idx) => {
              const isActive = idx === trackIndex
              return (
                <a
                  key={`${project.id}-${idx}`}
                  href={project.link}
                  className={`project-card project-slide${isActive ? ' project-slide-active' : ''}`}
                  style={pCardWidth ? { width: `${pCardWidth}px` } : undefined}
                  target={isActive ? '_blank' : undefined}
                  rel={isActive ? 'noopener noreferrer' : undefined}
                  onClick={(e) => {
                    if (idx < trackIndex) { e.preventDefault(); goPrev() }
                    else if (idx > trackIndex) { e.preventDefault(); goNext() }
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
            <button className="cert-arrow" onClick={goPrev} aria-label="Previous project">←</button>
            <span className="project-counter">{realIndex + 1} / {projects.length}</span>
            <button className="cert-arrow" onClick={goNext} aria-label="Next project">→</button>
          </div>
          <div className="cert-dots" style={{ marginTop: '1rem' }}>
            {projects.map((_, i) => (
              <button
                key={i}
                className={`cert-dot${i === realIndex ? ' cert-dot-active' : ''}`}
                onClick={() => { if (!isAnimating) setTrackIndex(i + 1) }}
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

          <div className="cert-slider">
            {/* Prev arrow */}
            <button className="cert-arrow cert-arrow-left" onClick={prevCert} aria-label="Previous certificate">
              ←
            </button>

            {/* Card */}
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
                <p className="cert-counter">{certIndex + 1} / {certificates.length}</p>
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

            {/* Next arrow */}
            <button className="cert-arrow cert-arrow-right" onClick={nextCert} aria-label="Next certificate">
              →
            </button>
          </div>

          {/* Dot indicators */}
          <div className="cert-dots">
            {certificates.map((_, i) => (
              <button
                key={i}
                className={`cert-dot${i === certIndex ? ' cert-dot-active' : ''}`}
                onClick={() => setCertIndex(i)}
                aria-label={`Go to certificate ${i + 1}`}
              />
            ))}
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
