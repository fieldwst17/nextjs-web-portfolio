export default function Home() {
  return (
    <div className="site-root">
      <header className="site-header">
        <div className="container header-inner">
          <div className="brand">Your Name</div>
          <nav className="nav">
            <a href="#about">About</a>
            <a href="#work">Work</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main className="container main"> 
        <section className="hero">
          <h1 className="hero-title">Hi — I’m Your Name.</h1>
          <p className="hero-sub">I design and build minimal, accessible web experiences.</p>
          <p className="hero-cta">
            <a className="btn" href="#contact">Get in touch</a>
          </p>
        </section>

        <section id="about" className="about">
          <h2>About</h2>
          <p>
            I’m a front-end developer focused on clean interfaces and fast, accessible
            implementations. I enjoy simple systems and thoughtful details.
          </p>
        </section>

        <section id="work" className="projects">
          <h2>Selected Work</h2>
          <div className="grid">
            <article className="card">
              <h3>Project One</h3>
              <p>Short description of a project showcasing design and front-end engineering.</p>
            </article>
            <article className="card">
              <h3>Project Two</h3>
              <p>Short description of a second project with emphasis on simplicity and speed.</p>
            </article>
            <article className="card">
              <h3>Project Three</h3>
              <p>Short description of another project — links and details can go here.</p>
            </article>
          </div>
        </section>

        <section id="contact" className="contact">
          <h2>Contact</h2>
          <p>
            Email: <a className="link" href="mailto:hello@example.com">hello@example.com</a>
          </p>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">© {new Date().getFullYear()} Your Name — Built with Next.js</div>
      </footer>
    </div>
  );
}
