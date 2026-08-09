import { useState } from 'react';
import heroImg from './assets/user_portrait.jpg';
import FloatingShape from './components/FloatingShape';
import ProjectCard from './components/ProjectCard';
import ContactForm from './components/ContactForm';
import HideAndSeekCharacter from './components/HideAndSeekCharacter';
import './App.css';

// SVGs for Floating elements and icons
const FigmaLogo = () => (
  <svg width="60" height="90" viewBox="0 0 60 90" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(3px 3px 0px #1e1e1e)' }}>
    <path d="M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30Z" fill="#F24E1E"/>
    <path d="M45 30C53.2843 30 60 23.2843 60 15C60 6.71573 53.2843 0 45 0C36.7157 0 30 6.71573 30 15C30 23.2843 36.7157 30 45 30Z" fill="#FF7262"/>
    <path d="M15 60C23.2843 60 30 53.2843 30 45C30 36.7157 23.2843 30 15 30C6.71573 30 0 36.7157 0 45C0 53.2843 6.71573 60 15 60Z" fill="#A259FF"/>
    <path d="M15 90C23.2843 90 30 83.2843 30 75V60H15C6.71573 60 0 66.7157 0 75C0 83.2843 6.71573 90 15 90Z" fill="#1ABC9C"/>
    <path d="M45 60C53.2843 60 60 53.2843 60 45C60 36.7157 53.2843 30 45 30C36.7157 30 30 36.7157 30 45C30 53.2843 36.7157 60 45 60Z" fill="#19BCFE"/>
  </svg>
);

const DribbbleBall = () => (
  <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="35" cy="35" r="33" fill="#FF5C9D" stroke="#1E1E1E" strokeWidth="4"/>
    <path d="M10 25C22 36 34 38 60 38" stroke="#1E1E1E" strokeWidth="3.5" strokeLinecap="round"/>
    <path d="M15 50C25 45 42 22 46 6" stroke="#1E1E1E" strokeWidth="3.5" strokeLinecap="round"/>
    <path d="M35 2C35 24 22 55 5 62" stroke="#1E1E1E" strokeWidth="3.5" strokeLinecap="round"/>
  </svg>
);

const StatsIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="4" width="44" height="40" rx="8" fill="#00D2C4" stroke="#1E1E1E" strokeWidth="3"/>
    <path d="M10 32H14V22H10V32ZM18 32H22V14H18V32ZM26 32H30V26H26V32ZM34 32H38V18H34V32Z" fill="#FFFFFF" stroke="#1E1E1E" strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="M10 20L18 10L28 22L38 12" stroke="#1E1E1E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EyeIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="22" fill="#FFDE4D" stroke="#1E1E1E" strokeWidth="3"/>
    <path d="M10 24C10 24 16 14 24 14C32 14 38 24 38 24C38 24 32 34 24 34C16 34 10 24 10 24Z" fill="#FFFFFF" stroke="#1E1E1E" strokeWidth="3"/>
    <circle cx="24" cy="24" r="5" fill="#1E1E1E"/>
    <path d="M24 8V11M12 12L14.5 14.5M8 24H11M12 36L14.5 33.5M24 37V40M36 36L33.5 33.5M40 24H37M36 12L33.5 14.5" stroke="#1E1E1E" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

const CustomArrow = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(-45deg)' }}>
    <path d="M6 16H26M26 16L18 8M26 16L18 24" stroke="#8B93FC" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Macaroni / Crescent Shape
const CrescentShape = ({ color, size = 60 }: { color: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 10C10 32.0914 27.9086 50 50 50" stroke={color} strokeWidth="12" strokeLinecap="round" />
  </svg>
);

// Sausage Capsule
const SausageShape = ({ color }: { color: string }) => (
  <svg width="40" height="90" viewBox="0 0 40 90" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="30" height="80" rx="15" fill={color} stroke="#1E1E1E" strokeWidth="3.5" />
  </svg>
);

// Shuffle Icon
const ShuffleIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="18" fill="#8B93FC" stroke="#1E1E1E" strokeWidth="3"/>
    <path d="M11 15L15 11M15 11L11 7M15 11H29M29 25L25 29M25 29L29 33M25 29H11M11 20L29 20" stroke="#1E1E1E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Heart Icon
const HeartIcon = () => (
  <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M35 60C35 60 62 42 62 25C62 13 52 5 40 5C33 5 35 12 35 12C35 12 37 5 30 5C18 5 8 13 8 25C8 42 35 60 35 60Z" fill="#FF5C9D" stroke="#1E1E1E" strokeWidth="4.5" strokeLinejoin="round"/>
  </svg>
);

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Core content for Hassan Naseer (Full Stack Developer)
  const portfolioInfo = {
    headline: "I build responsive frontends & scalable backends.",
    subText: "I'm Hassan Naseer, a Full Stack Developer specializing in crafting clean, high-performance web applications, from interactive user interfaces to robust database systems.",
    buttonText: "Let's Work Together",
    accent: "var(--color-yellow)",
    services: [
      {
        title: "Web Development",
        desc: "I build responsive, high-performance web applications using modern technologies like React, Next.js, and Node.js. Fast loading speeds, clean layouts, and clean user experience are always guaranteed.",
        icon: "💻",
        color: "var(--color-blue)",
      },
      {
        title: "App Development",
        desc: "I design and develop cross-platform mobile applications for iOS and Android using React Native. From native integration to deployment on App Store and Google Play, I handle it all.",
        icon: "📱",
        color: "var(--color-teal)",
      },
      {
        title: "Shopify App Dev",
        desc: "I build custom Shopify apps, extensions, and headless store integrations using Remix, Node.js, and GraphQL, helping stores scale, automate workflows, and boost sales.",
        icon: "🛍️",
        color: "var(--color-pink)",
      }
    ]
  };

  // Selected projects to show in "My Work"
  const projects = [
    {
      title: "Interactive Dashboard Panel",
      description: "A data visualization platform monitoring SaaS server health, user activity, and conversion rates, featuring custom SVGs and charts.",
      tags: ["React", "TypeScript", "Node.js", "ChartJS"],
      color: "var(--color-teal)",
      linkText: "Read Case Study",
      details: {
        problem: "Admins found traditional server logs hard to scan, delaying server incident responses by over 30 minutes.",
        solution: "Engineered a live socket-connected dashboard that visualizes resource utilization and groups warnings logically.",
        impact: "Incident response time dropped from 30 minutes to under 2 minutes; dashboard usage grew 2.5x.",
      }
    },
    {
      title: "Delivery tracking mobile App",
      description: "A high-performance courier tracking and mobile delivery application with live geographical tracking and offline-first order sync.",
      tags: ["React Native", "GraphQL", "Node.js", "PostgreSQL"],
      color: "var(--color-yellow)",
      linkText: "Read Case Study",
      details: {
        problem: "Users experienced sync glitches and inaccurate order updates on weak mobile connections.",
        solution: "Built a React Native client connected to a GraphQL subscription endpoint, storing state locally for offline-first support.",
        impact: "Delivery times tracked with 99.8% geo-accuracy; reduced client sync dropouts by 45%.",
      }
    },
    {
      title: "Shopify Assistant Bot",
      description: "An AI-powered assistant built directly inside Shopify admin panel. It automates inventory updates, answers customer ticket requests, and generates weekly growth reports.",
      tags: ["Shopify App", "Node.js", "OpenAI API", "React"],
      color: "var(--color-pink)",
      linkText: "Read Case Study",
      details: {
        problem: "Shopify store owners spend 15+ hours weekly managing store tasks and answering repetitive ticket FAQs.",
        solution: "Engineered an embedded Shopify app using Remix and OpenAI API, leveraging webhooks to monitor orders and auto-respond to customer inquiries.",
        impact: "Reduced manual administrative support time by 65%; handles over 2,000 requests per day seamlessly.",
      }
    },
  ];

  const handleServiceClick = (serviceTitle: string) => {
    if (serviceTitle.toLowerCase().includes('shopify')) {
      setIsContactOpen(true);
    } else {
      const element = document.getElementById('work');
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="portfolio-app-root">
      {/* SVG Clip Path definitions */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <clipPath id="badge-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0 L 1,0 L 1,0.72 L 0.5,1 L 0,0.72 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Floating interactive shapes around the main canvas */}
      <div className="floating-shapes-wrapper">
        <FloatingShape initialX="15%" initialY="-45px" rotation={15} floatDuration="5s" zIndex={15}>
          <FigmaLogo />
        </FloatingShape>
        <FloatingShape initialX="1.5%" initialY="480px" rotation={-12} floatDuration="7s" zIndex={15}>
          <DribbbleBall />
        </FloatingShape>
        <FloatingShape initialX="92%" initialY="120px" rotation={10} floatDuration="6s" zIndex={15}>
          <div className="name-badge-wrapper">
            Hassan
          </div>
        </FloatingShape>
        <FloatingShape initialX="4%" initialY="20px" rotation={-15} floatDuration="8s" zIndex={5}>
          <CrescentShape color="var(--color-teal)" size={80} />
        </FloatingShape>
        <FloatingShape initialX="1%" initialY="850px" rotation={95} floatDuration="9s" zIndex={5}>
          <CrescentShape color="var(--color-purple)" size={75} />
        </FloatingShape>
        <FloatingShape initialX="94%" initialY="900px" rotation={-45} floatDuration="8s" zIndex={5}>
          <CrescentShape color="var(--color-yellow)" size={70} />
        </FloatingShape>
        <FloatingShape initialX="93%" initialY="520px" rotation={25} floatDuration="7s" zIndex={5}>
          <SausageShape color="var(--color-pink)" />
        </FloatingShape>
        <FloatingShape initialX="12%" initialY="1050px" rotation={0} floatDuration="6.5s" zIndex={5}>
          <ShuffleIcon />
        </FloatingShape>
        <FloatingShape initialX="92%" initialY="1250px" rotation={10} floatDuration="7.5s" zIndex={5}>
          <HeartIcon />
        </FloatingShape>
      </div>

      {/* Central Canvas Container */}
      <main className="canvas-card" style={{ position: 'relative', overflow: 'visible' }}>
        {/* Hide and seek character peeking from edges */}
        <HideAndSeekCharacter />
        {/* Navigation Header */}
        <header className="header-nav">
          <div className="logo-section">
            <svg width="24" height="36" viewBox="0 0 24 36" fill="none" className="logo-svg">
              <rect x="2" y="2" width="10" height="20" rx="5" stroke="#1E1E1E" strokeWidth="3" fill="#8B93FC" />
              <rect x="12" y="14" width="10" height="20" rx="5" stroke="#1E1E1E" strokeWidth="3" fill="transparent" />
            </svg>
            <span className="logo-text">hassan.dev</span>
          </div>

          {/* Navigation Links */}
          <nav className="desktop-nav">
            <a href="#about" className="nav-link">About</a>
            <a href="#what-i-do" className="nav-link">What I Do</a>
            <a href="#work" className="nav-link">My Work</a>
          </nav>

          {/* Simple Get In Touch button instead of the Role Switcher */}
          <div className="header-cta-section">
            <button
              type="button"
              className="neobrutal-btn"
              onClick={() => setIsContactOpen(true)}
              style={{ padding: '8px 20px', fontSize: '0.95rem' }}
            >
              Get In Touch 🚀
            </button>
          </div>

          {/* Mobile hamburger menu */}
          <button
            type="button"
            className="hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </header>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
          <button type="button" className="drawer-close" onClick={() => setMobileMenuOpen(false)}>✕</button>
          <div className="drawer-links">
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#what-i-do" onClick={() => setMobileMenuOpen(false)}>What I Do</a>
            <a href="#work" onClick={() => setMobileMenuOpen(false)}>My Work</a>
            <button
              type="button"
              className="neobrutal-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsContactOpen(true);
              }}
              style={{ backgroundColor: portfolioInfo.accent }}
            >
              Get In Touch 🚀
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <section id="about" className="hero-section">
          <div className="hero-text-side">
            <p className="hero-greeting">Hi, my name is Hassan Naseer.</p>
            <h1 className="hero-title">{portfolioInfo.headline}</h1>
            <p className="hero-desc">{portfolioInfo.subText}</p>
            <button
              type="button"
              className="neobrutal-btn hero-cta-btn"
              onClick={() => setIsContactOpen(true)}
              style={{ backgroundColor: portfolioInfo.accent }}
            >
              {portfolioInfo.buttonText}
            </button>
          </div>

          <div className="hero-media-side">
            <div className="portrait-badge-container">
              {/* Floating inner widgets around Hassan */}
              <div className="hero-widget chat-stats">
                <StatsIcon />
              </div>
              <div className="hero-widget eye-widget">
                <EyeIcon />
              </div>
              <div className="hero-widget blue-arrow">
                <CustomArrow />
              </div>

              {/* Portrait badge shape */}
              <div className="portrait-badge-border">
                <div className="portrait-badge-background">
                  <img src={heroImg} className="portrait-img" alt="Hassan Naseer portrait" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services / What I do Section */}
        <section id="what-i-do" className="services-section">
          <p className="section-pre-title">Driven by clean code & systems</p>
          <h2 className="section-title">What I do</h2>
          <div className="services-grid">
            {portfolioInfo.services.map((service, index) => (
              <div
                key={index}
                className="service-card hover-lift"
                onClick={() => handleServiceClick(service.title)}
              >
                <div className="service-icon-box" style={{ backgroundColor: service.color }}>
                  <span className="service-icon">{service.icon}</span>
                </div>
                <h3 className="service-name">{service.title}</h3>
                <p className="service-desc">{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Portfolio / Selected Projects Section */}
        <section id="work" className="work-section">
          <p className="section-pre-title">Live Production Work</p>
          <h2 className="section-title">My Work</h2>
          <div className="work-grid">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                tags={project.tags}
                color={project.color}
                linkText={project.linkText}
                onSelect={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="canvas-footer">
          <p>© {new Date().getFullYear()} hassan.dev. Engineered with passion.</p>
        </footer>
      </main>

      {/* Case Study Modal */}
      {selectedProject && (
        <div className="modal-overlay open" onClick={() => setSelectedProject(null)}>
          <div className="modal-content project-modal" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="modal-close" onClick={() => setSelectedProject(null)}>✕</button>
            <div className="project-modal-header" style={{ backgroundColor: selectedProject.color }}>
              <h3>{selectedProject.title}</h3>
            </div>
            <div className="project-modal-body">
              <div className="modal-tags">
                {selectedProject.tags.map((t: string, i: number) => (
                  <span key={i} className="project-tag">{t}</span>
                ))}
              </div>
              <p className="modal-lead-desc">{selectedProject.description}</p>

              <div className="modal-detail-section">
                <h4>⚠️ The Challenge</h4>
                <p>{selectedProject.details.problem}</p>
              </div>

              <div className="modal-detail-section">
                <h4>💡 The Solution</h4>
                <p>{selectedProject.details.solution}</p>
              </div>

              <div className="modal-detail-section highlight">
                <h4>📈 Project Result / Metric</h4>
                <p className="metric-text">{selectedProject.details.impact}</p>
              </div>

              <button
                type="button"
                className="neobrutal-btn work-inquiry-btn"
                style={{ backgroundColor: portfolioInfo.accent }}
                onClick={() => {
                  setSelectedProject(null);
                  setIsContactOpen(true);
                }}
              >
                Inquire about this project 🚀
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Form Dialogue Overlay */}
      <ContactForm
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        accentColor={portfolioInfo.accent}
        role="growth" // Fallback role mapping for form defaults
      />
    </div>
  );
}

export default App;
