<<<<<<< HEAD
import { useState, useEffect, useRef } from 'react'
import profileImage from './assets/profile.png'
import projectImage from './assets/hero.png'
=======
import { useState, useEffect } from 'react'
import profilePic from './assets/me.png'
>>>>>>> e7b73738c721c373d21605dee7efd7d893e4c180
import './App.css'

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
      link: 'https://github.com/JrsyStn/meditrackrx'
    },
    {
      id: 2,
      title: 'ExplorePh',
      description: 'Travel guide website showcasing the beauty of the Philippines',
      technologies: ['Html', 'CSS', 'JavaScript',],
      image: projectImage,
      link: 'https://github.com/JrsyStn/ExplorePhilippines'
    },
    {
      id: 3,
      title: 'Task Management Tool',
      description: 'Collaborative task management with drag-and-drop interface',
      technologies: ['React', 'Firebase', 'TypeScript', 'Tailwind CSS'],
      image: projectImage,
      link: '#'
    },
    {
      id: 4,
      title: 'AI Content Generator',
      description: 'AI-powered content generation tool with API integration',
      technologies: ['React', 'OpenAI API', 'Python', 'FastAPI'],
      image: projectImage,
      link: '#'
    }
  ]

  const sliderRef = useRef<HTMLDivElement | null>(null)

  const scrollProjects = (direction: number) => {
    if (!sliderRef.current) return
    const scrollAmount = sliderRef.current.clientWidth * 0.9
    sliderRef.current.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' })
  }

  const assetUrl = (path: string) => new URL(path, import.meta.url).href

  const skillCards = [
    { name: 'React', image: assetUrl('./assets/react.svg') },
    { name: 'TypeScript', image: assetUrl('./assets/ts.png'), },
    { name: 'Tailwind CSS', image: assetUrl('./assets/profile.png') },
    { name: 'Next.js', image: assetUrl('./assets/profile.png') },
    { name: 'Vite', image: assetUrl('./assets/vite.svg') },
    { name: 'Node.js', image: assetUrl('./assets/profile.png') },
    { name: 'Python', image: assetUrl('./assets/profile.png') },
    { name: 'Express', image: assetUrl('./assets/profile.png') },
    { name: 'FastAPI', image: assetUrl('./assets/profile.png') },
    { name: 'PostgreSQL', image: assetUrl('./assets/profile.png') },
    { name: 'Git', image: assetUrl('./assets/profile.png') },
    { name: 'Docker', image: assetUrl('./assets/profile.png') },
    { name: 'AWS', image: assetUrl('./assets/profile.png') },
    { name: 'Firebase', image: assetUrl('./assets/profile.png') },
    { name: 'GraphQL', image: assetUrl('./assets/profile.png') },
    { name: 'UI/UX Design', image: assetUrl('./assets/profile.png') },
    { name: 'Figma', image: assetUrl('./assets/profile.png') },
    { name: 'Responsive Design', image: assetUrl('./assets/profile.png') },
    { name: 'Accessibility', image: assetUrl('./assets/profile.png') }
  ]

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
            <li><a href="#contact" onClick={() => setActiveSection('contact')} className={activeSection === 'contact' ? 'active' : ''}>Contact</a></li>
          </ul>
          <button className="theme-toggle" onClick={toggleTheme} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
<<<<<<< HEAD
          <div className="hero-text">
            <h1 className="hero-title">Hi, I'm Jersey Sistona</h1>
            <p className="hero-subtitle">Designer</p>
            <a href="#projects" className="btn btn-primary">View My Work</a>
=======
          <div className="hero-side hero-left">
            <div className="hero-intro">
              <p className="hero-label">Hello, I'm</p>
              <h1 className="hero-title">Jersey Sistona</h1>
              <p className="hero-description">
                Creative Designer building immersive digital brands and polished user experiences.
              </p>
            </div>
>>>>>>> e7b73738c721c373d21605dee7efd7d893e4c180
          </div>

          <div className="hero-image">
<<<<<<< HEAD
            <img className="avatar-image" src={profileImage} alt="Jersey Sistona" />
=======
            <img src={profilePic} alt="Jersey Sistona" className="avatar" />
          </div>

          <div className="hero-side hero-right">
            <div className="hero-badge">
              <span className="hero-role">Designer</span>
              <p className="hero-detail">
                A modern visual creator focused on responsive interfaces, brand systems, and pixel-perfect detail.
              </p>
            </div>
>>>>>>> e7b73738c721c373d21605dee7efd7d893e4c180
          </div>
        </div>
      </section>

      {/* About Section */}
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

          <div id="skills" className="about-skills">
            <h3 className="section-title">Skills</h3>
            <div className="skills-carousel">
              <div className="skill-track">
                {skillCards.concat(skillCards).map((skill, idx) => (
                  <div key={`${skill.name}-${idx}`} className="skill-card">
                    <div className="skill-icon">
                      <img className="skill-img" src={skill.image} alt={skill.name} />
                    </div>
                    <span className="skill-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <div className="container">
          <div className="section-heading-row">
            <h2 className="section-title">Featured Projects</h2>
            <div className="projects-nav">
              <button className="nav-button" onClick={() => scrollProjects(-1)} aria-label="Previous projects">←</button>
              <button className="nav-button" onClick={() => scrollProjects(1)} aria-label="Next projects">→</button>
            </div>
          </div>
          <div className="projects-slider-wrapper">
            <div className="projects-slider" ref={sliderRef}>
              {projects.map((project) => (
                <a key={project.id} href={project.link} className="project-card" target="_blank" rel="noopener noreferrer">
                  <img className="project-image" src={project.image} alt={project.title} />
                  <div className="project-body">
                    <div className="project-header">
                      <h3>{project.title}</h3>
                    </div>
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
        </div>
      </section>

      {/* Contact Section */}
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

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2026 My Portfolio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
