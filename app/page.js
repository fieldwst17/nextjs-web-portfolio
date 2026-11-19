"use client";
import Link from "next/link";
import { usePortfolio } from "./context/PortfolioContext";
import Reveal from "./components/Reveal";

function getInitials(name) {
  return (
    (name || "?")
      .replace(/\(.*?\)/g, "")
      .split(" ")
      .filter(Boolean)
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?"
  );
}

// "Wongsathorn Phumthong (Field)" -> { main: "Wongsathorn Phumthong", nick: "Field" }
function splitName(name) {
  const match = (name || "").match(/^(.*?)\s*\((.+)\)\s*$/);
  return match ? { main: match[1], nick: match[2] } : { main: name, nick: "" };
}

function getHost(url) {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}

// Track the pointer so each card's glow follows the mouse.
function handleCardMove(e) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
}

const ArrowUpRight = () => (
  <svg className="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17L17 7M8 7h9v9" />
  </svg>
);

const CodeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
  </svg>
);

export default function Home() {
  const { projects, profile } = usePortfolio();
  const { main, nick } = splitName(profile.name);
  const isDev = process.env.NODE_ENV !== "production";

  return (
    <div>
      <main className="container main">
        {/* Hero */}
        <section className="hero">
          <div>
            <p className="rise eyebrow" style={{ "--delay": "0ms" }}>
              <span className="pulse-dot" />
              Portfolio · {new Date().getFullYear()}
            </p>
            <p className="rise hero-greeting" style={{ "--delay": "80ms" }}>
              Hello, I&apos;m
            </p>
            <h1 className="rise hero-title" style={{ "--delay": "160ms" }}>
              <span className="gradient-text">{main}</span>
              {nick && <span className="hero-nick">a.k.a. {nick}</span>}
            </h1>
            {profile.bio && (
              <p className="rise hero-sub" style={{ "--delay": "240ms" }}>
                {profile.bio}
              </p>
            )}
            <div className="rise hero-cta" style={{ "--delay": "320ms" }}>
              <a className="btn btn-primary" href="#work">
                View my work
                <svg className="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              {profile.email && (
                <a className="btn btn-ghost" href={`mailto:${profile.email}`}>
                  Get in touch
                </a>
              )}
            </div>
          </div>

          <div className="rise hero-visual" style={{ "--delay": "200ms" }}>
            <div className="hero-glow" />
            <div className="orbit-dot" />
            {profile.avatar ? (
              <img src={profile.avatar} alt={profile.name} className="hero-avatar" />
            ) : (
              <div className="hero-avatar-initials">
                <span>{getInitials(profile.name)}</span>
              </div>
            )}
          </div>

          <a href="#work" className="scroll-hint">
            Scroll to explore
          </a>
        </section>

        <hr className="divider" />

        {/* Projects */}
        <section id="work" className="section projects">
          <Reveal className="section-header">
            <div>
              <p className="section-label">01 — Selected work</p>
              <h2 className="section-title">Things I&apos;ve built</h2>
            </div>
            {isDev && (
              <Link href="/admin" className="btn btn-ghost btn-sm">
                Manage projects
              </Link>
            )}
          </Reveal>

          {projects.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">✦</div>
              <p>
                No projects yet.
                {isDev && (
                  <>
                    {" "}
                    <Link href="/admin">Add your first project</Link>
                  </>
                )}
              </p>
            </div>
          ) : (
            <div className="grid">
              {projects.map((project, i) => (
                <Reveal
                  as="article"
                  key={project.id}
                  className="card"
                  delay={i * 90}
                  onMouseMove={handleCardMove}
                >
                  <div className="card-top">
                    <span className="card-index">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="card-icon">
                      <CodeIcon />
                    </span>
                  </div>
                  <h3>{project.name}</h3>
                  {project.description && <p>{project.description}</p>}
                  {project.url && (
                    <div className="card-footer">
                      <span className="card-host">{getHost(project.url)}</span>
                      <a
                        className="card-link"
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit <ArrowUpRight />
                      </a>
                    </div>
                  )}
                </Reveal>
              ))}
            </div>
          )}
        </section>

        {/* Contact */}
        {profile.email && (
          <section id="contact" className="section">
            <Reveal className="contact-panel">
              <p className="section-label">02 — Contact</p>
              <h2 className="contact-title">
                Let&apos;s build something
                <br />
                <span className="gradient-text">out of the dark.</span>
              </h2>
              <p className="contact-sub">
                Have a project in mind or just want to say hi? My inbox is
                always open.
              </p>
              <a className="btn btn-primary" href={`mailto:${profile.email}`}>
                Say hello
                <ArrowUpRight />
              </a>
              <br />
              <a className="contact-email" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </Reveal>
          </section>
        )}
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span className="mono">Built with Next.js</span>
        </div>
      </footer>
    </div>
  );
}
