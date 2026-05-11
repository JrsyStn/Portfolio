import React, { useState, useEffect, useRef } from 'react'
import profileImage from './assets/profile.png'
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
        image: new URL('./assets/projects/image.png', import.meta.url).href,
        link: 'https://github.com/JrsyStn/meditrackrx',
        fullDescription: 'MeditrackRx is a comprehensive medication management application built with Flutter and Firebase. The app helps users track their medication schedules, set reminders, and monitor their adherence to prescribed treatments. Key features include customizable reminder notifications, medication history tracking, and integration with Firebase for cloud storage and real-time synchronization across devices.',
        images: [new URL('./assets/projects/image.png', import.meta.url).href, new URL('./assets/projects/image.png', import.meta.url).href, new URL('./assets/projects/image.png', import.meta.url).href],
        features: ['Medication reminders', 'Adherence tracking', 'Firebase integration', 'Cross-platform support'],
        challenges: 'Implementing reliable push notifications and ensuring data privacy compliance.'
      },
      {
        id: 2,
        title: 'ExplorePh',
        description: 'Travel guide website showcasing the beauty of the Philippines',
        technologies: ['Html', 'CSS', 'JavaScript'],
        image: new URL('./assets/projects/image.png', import.meta.url).href,
        link: 'https://github.com/JrsyStn/ExplorePhilippines',
        fullDescription: 'ExplorePh is a responsive travel guide website dedicated to showcasing the natural beauty and cultural heritage of the Philippines. Built with vanilla HTML, CSS, and JavaScript, the site features interactive maps, destination guides, and photo galleries highlighting popular tourist spots across the archipelago.',
        images: [new URL('./assets/projects/image.png', import.meta.url).href, new URL('./assets/projects/image.png', import.meta.url).href],
        features: ['Interactive destination maps', 'Photo galleries', 'Responsive design', 'Local culture highlights'],
        challenges: 'Optimizing images for web performance and creating smooth animations with pure JavaScript.'
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
        title: 'Publication Material Policy Front Page Design',
        description: 'This policy of the Action Center of Batangas State University outlines the guidelines for the procurement, utilization, and incentivization of Disaster Risk Reduction and Management (DRRM) technology inventions, ensuring their effective development, deployment, and recognition in support of disaster preparedness and response initiatives.',
        technologies: ['Canva'],
        image: new URL('./assets/projects/policy.jfif', import.meta.url).href,
        link: 'https://www.canva.com/design/DAHJVwckIRU/VhUx_RBzD8LwS0dEKft31g/edit',
        fullDescription: 'Designed the front page for the DRRM Technology Inventions Policy publication of Batangas State University. The design incorporates university branding, clear typography hierarchy, and visual elements that convey the importance of disaster risk reduction and management. The layout ensures readability while maintaining a professional and authoritative appearance suitable for official university publications.',
        images: [new URL('./assets/projects/policy.jfif', import.meta.url).href, new URL('./assets/projects/policy.jfif', import.meta.url).href, new URL('./assets/projects/policy.jfif', import.meta.url).href, new URL('./assets/projects/policy.jfif', import.meta.url).href, ],
        features: ['University branding integration', 'Professional typography', 'Clear visual hierarchy', 'DRRM-themed iconography'],
        challenges: 'Balancing aesthetic appeal with document readability and maintaining brand consistency.'
      },
      {
        id: 2,
        title: 'Multi Hazard Emergency Preparedness Guide',
        description: 'A concise guide developed to support effective preparedness and response for multiple hazards, helping individuals and communities understand safety procedures and minimize risks during emergencies.',
        technologies: ['Canva', 'Gimp'],
        image: new URL('./assets/projects/guide.jfif', import.meta.url).href,
        link: '#',
        fullDescription: 'Created a comprehensive visual guide for multi-hazard emergency preparedness, covering various types of disasters including earthquakes, floods, and fires. The guide uses clear infographics, step-by-step instructions, and visual aids to help communities understand emergency procedures and safety measures.',
        images: [new URL('./assets/projects/guide.jfif', import.meta.url).href, new URL('./assets/projects/earthquakedrill.jpg', import.meta.url).href, new URL('./assets/projects/firepreventionmonth.jpg', import.meta.url).href],
        features: ['Multi-hazard coverage', 'Visual infographics', 'Step-by-step instructions', 'Community-focused design'],
        challenges: 'Simplifying complex emergency procedures into clear, actionable visual content.'
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
        title: 'Fire Prevention Month Reels',
        description: 'A video documentation of the Batangas State University fire drill activity showcasing proper emergency procedures, evacuation practices, and preparedness measures to ensure safety and readiness during fire-related incidents.',
        technologies: ['CapCut', 'DaVinci Resolve', 'Gimp'],
        image: new URL('./assets/projects/firepreventionmonth.jpg', import.meta.url).href,
        link: 'https://www.facebook.com/reel/733009969778464',
        fullDescription: 'Produced promotional video reels for Batangas State University\'s Fire Prevention Month activities. The videos document fire drill procedures, showcase safety demonstrations, and highlight emergency preparedness measures. Edited with professional color grading, smooth transitions, and engaging B-roll footage to effectively communicate fire safety messages to the university community.',
        images: [new URL('./assets/projects/firepreventionmonth.jpg', import.meta.url).href],
        features: ['Professional video editing', 'Color grading', 'Safety demonstrations', 'Community engagement'],
        challenges: 'Capturing clear footage during live drill activities and maintaining viewer engagement in short-form video content.'
      },
      {
        id: 2,
        title: 'Earthquake Drill Reels',
        description: 'A video documentation of the Batangas State University earthquake drill demonstrating proper safety protocols, evacuation procedures, and preparedness actions to ensure effective response during seismic emergencies.',
        technologies: ['DaVinci Resolve', 'GIMP'],
        image: new URL('./assets/projects/earthquakedrill.jpg', import.meta.url).href,
        link: 'https://www.facebook.com/reel/922363777286065',
        fullDescription: 'Created video documentation for Batangas State University\'s earthquake drill exercises. The reels capture the entire drill process from preparation to execution, highlighting proper "duck, cover, and hold" procedures, orderly evacuation, and post-drill assessments. Professional editing techniques were used to create engaging content that educates viewers on earthquake safety while maintaining visual appeal.',
        images: [new URL('./assets/projects/earthquakedrill.jpg', import.meta.url).href],
        features: ['Drill documentation', 'Safety protocol visualization', 'Professional editing', 'Educational content'],
        challenges: 'Coordinating filming during live emergency drills and ensuring all safety procedures were clearly captured.'
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
    title: 'Network Defense',
    issuer: 'CISCO',
    date: '2024',
    description: 'This certificate demonstrates foundational knowledge in network defense, including monitoring and protecting networks using access control, firewalls, cloud security, and cryptography, as well as responding to security alerts.',
    image: new URL('./assets/certificates/networkdefense.png', import.meta.url).href,
    credlyLink: 'https://www.credly.com/users/jersey-sistona/edit#credly', // ← replace with your actual Credly URL
  },
  {
    id: 2,
    title: 'Introduction to Cybersecurity',
    issuer: 'CISCO',
    date: '2025',
    description: 'This certificate demonstrates introductory knowledge of cybersecurity, including cyber threats, vulnerabilities, threat detection and defense, and career opportunities in the cybersecurity field.',
    image: new URL('./assets/certificates/introductiontocybersecurity.png', import.meta.url).href,
    credlyLink: 'https://www.credly.com/users/jersey-sistona/edit#credly',
  },
  {
    id: 3,
    title: 'CCNAv7: Introduction to Networks',
    issuer: 'CISCO',
    date: '2024',
    description: 'This certificate demonstrates foundational networking knowledge, including IP addressing, Ethernet protocols, and configuring connectivity between switches, routers, and end devices, supported by hands-on experience through labs using Cisco hardware and Packet Tracer.',
    image: new URL('./assets/certificates/CCNAv7.png', import.meta.url).href,
    credlyLink: 'https://www.credly.com/users/jersey-sistona/edit#credly',
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
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<any>(null)

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

  const openProjectModal = (project: any) => {
    setSelectedProject(project)
    setModalOpen(true)
  }

  const closeProjectModal = () => {
    setModalOpen(false)
    setSelectedProject(null)
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
                <div
                  key={`${project.id}-${idx}`}
                  className={`project-card project-slide${isActive ? ' project-slide-active' : ''}`}
                  style={pCardWidth ? { width: `${pCardWidth}px` } : undefined}
                  onClick={() => {
                    if (idx < currentIndex) { goPrev() }
                    else if (idx > currentIndex) { goNext() }
                    else if (isActive) { openProjectModal(project) }
                  }}
                >
                  <div className="project-image-wrap">
                    <img className="project-image" src={project.image} alt={project.title} />
                    {isActive && (
                      <div className="project-overlay">
                        <span className="project-view-btn">See More →</span>
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
                </div>
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

      {/* ── Project Modal ── */}
      {modalOpen && selectedProject && (
        <div className="project-modal-overlay" onClick={closeProjectModal}>
          <div className="project-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeProjectModal}>×</button>
            
            <div className="modal-header">
              <h2 className="modal-title">{selectedProject.title}</h2>
              <div className="modal-tech">
                {selectedProject.technologies.map((tech: string, idx: number) => (
                  <span key={idx} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>

            <div className="modal-content">
              <div className="modal-description">
                <p>{selectedProject.fullDescription}</p>
              </div>

              {selectedProject.features && (
                <div className="modal-features">
                  <h3>Key Features</h3>
                  <ul>
                    {selectedProject.features.map((feature: string, idx: number) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedProject.challenges && (
                <div className="modal-challenges">
                  <h3>Challenges Overcome</h3>
                  <p>{selectedProject.challenges}</p>
                </div>
              )}

              <div className="modal-images">
                <h3>Project Gallery</h3>
                <div className="modal-image-grid">
                  {selectedProject.images.map((img: string, idx: number) => (
                    <img key={idx} src={img} alt={`${selectedProject.title} ${idx + 1}`} className="modal-image" />
                  ))}
                </div>
              </div>

              <div className="modal-actions">
                <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="modal-link-btn">
                  View Live Project →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
