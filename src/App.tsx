import { useState, useEffect } from 'react'
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
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and MongoDB',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      link: '#'
    },
    {
      id: 2,
      title: 'Real-Time Chat App',
      description: 'WebSocket-based chat application with user authentication',
      technologies: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
      link: '#'
    },
    {
      id: 3,
      title: 'Task Management Tool',
      description: 'Collaborative task management with drag-and-drop interface',
      technologies: ['React', 'Firebase', 'TypeScript', 'Tailwind CSS'],
      link: '#'
    },
    {
      id: 4,
      title: 'AI Content Generator',
      description: 'AI-powered content generation tool with API integration',
      technologies: ['React', 'OpenAI API', 'Python', 'FastAPI'],
      link: '#'
    }
  ]

  const skills = [
    { category: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Vite'] },
    { category: 'Backend', items: ['Node.js', 'Python', 'Express', 'FastAPI', 'PostgreSQL'] },
    { category: 'Tools', items: ['Git', 'Docker', 'AWS', 'Firebase', 'GraphQL'] },
    { category: 'Design', items: ['UI/UX Design', 'Figma', 'Responsive Design', 'Accessibility'] }
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
          <div className="hero-text">
            <h1 className="hero-title">Hi, I'm Jersey Sistona</h1>
            <p className="hero-subtitle">Designer</p>
            <div className="hero-buttons">
              <button className="btn btn-primary">View My Work</button>
              <button className="btn btn-secondary">Download CV</button>
            </div>
          </div>
          <div className="hero-image">
            <div className="avatar"></div>
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
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-header">
                  <h3>{project.title}</h3>
                </div>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <a href={project.link} className="project-link">View Project →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills-section">
        <div className="container">
          <h2 className="section-title">Skills & Expertise</h2>
          <div className="skills-grid">
            {skills.map((skillGroup, idx) => (
              <div key={idx} className="skill-category">
                <h3>{skillGroup.category}</h3>
                <div className="skill-items">
                  {skillGroup.items.map((skill, sidx) => (
                    <div key={sidx} className="skill-item">{skill}</div>
                  ))}
                </div>
              </div>
            ))}
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
