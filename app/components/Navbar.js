"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePortfolio } from "../context/PortfolioContext";

export default function Navbar() {
  const pathname = usePathname() ?? "";
  const { profile } = usePortfolio();

  const firstName = (profile.name || "Portfolio").split(" ")[0];
  const mark = firstName.slice(0, 1).toUpperCase() || "P";

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="Home">
          <span className="brand-mark">{mark}</span>
          <span className="brand-name">{profile.name || "Portfolio"}</span>
        </Link>
        <nav className="nav">
          <Link href="/" className={pathname === "/" ? "active" : ""}>
            Work
          </Link>
          {pathname === "/" && <a href="#contact">Contact</a>}
          {process.env.NODE_ENV !== "production" && (
            <>
              <Link
                href="/admin"
                className={pathname === "/admin" ? "active" : ""}
              >
                Manage
              </Link>
              <Link
                href="/profile"
                className={pathname === "/profile" ? "active" : ""}
              >
                Profile
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
