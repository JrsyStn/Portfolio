import { useState, useEffect, useRef } from 'react'
import profileImage from './assets/profile.png'
import projectImage from './assets/hero.png'
import './App.css'

// ─────────────────────────────────────────────
// SKILL IMAGE SIZE CONFIGURATION
// Change the `imageSize` value (in px) for each skill to resize its icon.
// ─────────────────────────────────────────────
const skillCards = [
  { name: 'React', image: new URL('./assets/react.svg', import.meta.url).href, imageSize: 40 },
  { name: 'TypeScript', image: new URL('./assets/ts.png', import.meta.url).href, imageSize: 36 },
  { name: 'Tailwind CSS', image: new URL('./assets/profile.png', import.meta.url).href, imageSize: 36 },
  { name: 'Next.js', image: new URL('./assets/profile.png', import.meta.url).href, imageSize: 36 },
  { name: 'Vite', image: new URL('./assets/vite.svg', import.meta.url).href, imageSize: 36 },
  { name: 'Node.js', image: new URL('./assets/profile.png', import.meta.url).href, imageSize: 36 },
  { name: 'Python', image: new URL('./assets/profile.png', import.meta.url).href, imageSize: 36 },
  { name: 'Express', image: new URL('./assets/profile.png', import.meta.url).href, imageSize: 32 },
  { name: 'FastAPI', image: new URL('./assets/profile.png', import.meta.url).href, imageSize: 32 },
  { name: 'PostgreSQL', image: new URL('./assets/profile.png', import.meta.url).href, imageSize: 36 },
  { name: 'Git', image: new URL('./assets/profile.png', import.meta.url).href, imageSize: 36 },
  { name: 'Docker', image: new URL('./assets/profile.png', import.meta.url).href, imageSize: 36 },
  { name: 'AWS', image: new URL('./assets/profile.png', import.meta.url).href, imageSize: 36 },
  { name: 'Firebase', image: new URL('./assets/profile.png', import.meta.url).href, imageSize: 36 },
  { name: 'GraphQL', image: new URL('./assets/profile.png', import.meta.url).href, imageSize: 36 },
  { name: 'UI/UX Design', image: new URL('./assets/profile.png', import.meta.url).href, imageSize: 36 },
  { name: 'Figma', image: new URL('./assets/profile.png', import.meta.url).href, imageSize: 36 },
  { name: 'Responsive Design', image: new URL('./assets/profile.png', import.meta.url).href, imageSize: 32 },
  { name: 'Accessibility', image: new URL('./assets/profile.png', import.meta.url).href, imageSize: 32 },
]

// ─────────────────────────────────────────────
// CERTIFICATES DATA
// Add or remove certificates here.
// ─────────────────────────────────────────────
const certificates = [
  {
    id: 1,
    title: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    date: '2024',
    icon: '🏅',
    link: '#',
  },
  {
    id: 2,
    title: 'JavaScript Algorithms & Data Structures',
    issuer: 'freeCodeCamp',
    date: '2024',
    icon: '🏅',
    link: '#',
  },
  {
    id: 3,
    title: 'React – The Complete Guide',
    issuer: 'Udemy',
    date: '2024',
    icon: '🎓',
    link: '#',
  },
  {
    id: 4,
    title: 'Google UX Design Certificate',
    issuer: 'Coursera / Google',
    date: '2025',
    icon: '🎓',
    link: '#',
  },
  {
    id: 5,
    title: 'AWS Cloud Practitioner Essentials',
    issuer: 'Amazon Web Services',
    date: '2025',
    icon: '☁️',
    link: '#',
  },
  {
    id: 6,
    title: 'Flutter & Dart – The Complete Guide',
    issuer: 'Udemy',
    date: '2023',
    icon: '📱',
    link: '#',
  },
]

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

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

  const sliderRef = useRef<HTMLDivElement | null>(null)

  const scrollProjects = (direction: number) => {
    if (!sliderRef.current) return
    const scrollAmount = sliderRef.current.clientWidth * 0.9
    sliderRef.current.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' })
  }

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <span className="logo-text">Jersey</span>
          </div>
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

      {/* ── Hero Section ── */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          {/* Left – intro text */}
          <div className="hero-text">
            <p className="hero-label">Welcome to my portfolio</p>
            <h1 className="hero-title">Hi, I'm<br />Jersey Sistona</h1>
            <p className="hero-subtitle">Designer &amp; Developer</p>
            <div className="hero-buttons">
              <a href="#projects" className="btn btn-primary">View My Work</a>
              <a href="#contact" className="btn btn-secondary">Get In Touch</a>
            </div>
          </div>

          {/* Right – profile image (offset to the right side) */}
          <div className="hero-image">
            <img className="avatar-image" src={profileImage} alt="Jersey Sistona" />
          </div>
        </div>
      </section>

      {/* ── About Section ── */}
      <section id="about" className="about-section">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                I'm a passionate full-stack developer with 5+ years of experience creating innovative web solutions.
                I specialize in React, TypeScript, and modern web technologies.
              </p>
              <p>
                My journey in web development started with a curiosity about how things work online.
                Today, I'm committed to building user-centric applications that solve real-world problems.
              </p>
              <p>
                When I'm not coding, you can find me exploring new technologies, contributing to open source,
                or sharing knowledge with the developer community.
              </p>
            </div>
            <div className="about-stats">
              <div className="stat">
                <h3>50+</h3>
                <p>Projects Completed</p>
              </div>
              <div className="stat">
                <h3>30+</h3>
                <p>Happy Clients</p>
              </div>
              <div className="stat">
                <h3>5+</h3>
                <p>Years Experience</p>
              </div>
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

      {/* ── Projects Section ── */}
      <section id="projects" className="projects-section">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-grid">
            {projects.map((project) => (
              <a
                key={project.id}
                href={project.link}
                className="project-card"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="project-image-wrap">
                  <img className="project-image" src={project.image} alt={project.title} />
                  <div className="project-overlay">
                    <span className="project-view-btn">View Project →</span>
                  </div>
                </div>
                <div className="project-body">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tech">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certificates Section ── */}
      <section id="certificates" className="certificates-section">
        <div className="container">
          <h2 className="section-title">Certificates</h2>
          <div className="certs-grid">
            {certificates.map((cert) => (
              <a
                key={cert.id}
                href={cert.link}
                className="cert-card"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="cert-icon">{cert.icon}</div>
                <div className="cert-body">
                  <h4 className="cert-title">{cert.title}</h4>
                  <p className="cert-issuer">{cert.issuer}</p>
                  <span className="cert-date">{cert.date}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Section ── */}
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
