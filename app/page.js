"use client";
import Link from "next/link";
import { usePortfolio } from "./context/PortfolioContext";

export default function Home() {
  const { projects, profile } = usePortfolio();

  const initials =
    (profile.name || "?")
      .split(" ")
      .filter(Boolean)
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?";

  return (
    <div>
      <main className="container main">
        {/* Hero */}
        <section className="hero">
          <div className="hero-profile">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt={profile.name}
                className="hero-avatar"
              />
            ) : (
              <div className="hero-avatar-initials">{initials}</div>
            )}
          </div>
          <h1 className="hero-title">Hello {profile.name}.</h1>
          <p className="hero-sub">{profile.bio}</p>
          {profile.email && (
            <p className="hero-cta">
              <a className="btn btn-primary" href={`mailto:${profile.email}`}>
                Get in touch
              </a>
            </p>
          )}
        </section>

        {/* Projects */}
        <section id="work" className="projects">
          <div className="section-header">
            <h2>Selected Work</h2>
            <Link href="/admin" className="btn btn-ghost btn-sm">
              Manage
            </Link>
          </div>
          {projects.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">ðŸ“</div>
              <p>
                No projects yet.{" "}
                <Link href="/admin">Add your first project’</Link>
              </p>
            </div>
          ) : (
            <div className="grid">
              {projects.map((project) => (
                <article key={project.id} className="card">
                  <h3>{project.name}</h3>
                  {project.description && <p>{project.description}</p>}
                  {project.url && (
                    <a
                      className="card-link"
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit project →
                    </a>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Contact */}
        {profile.email && (
          <section id="contact" className="contact">
            <h2>Contact</h2>
            <p>
              Email:{" "}
              <a className="link" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </p>
          </section>
        )}
      </main>

      <footer className="site-footer">
        <div className="container">
          Â© {new Date().getFullYear()} {profile.name} â€” Built with Next.js
        </div>
      </footer>
    </div>
  );
}
