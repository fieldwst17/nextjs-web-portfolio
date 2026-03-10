'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePortfolio } from '../context/PortfolioContext';

export default function Navbar() {
  const pathname = usePathname() ?? '';
  const { profile } = usePortfolio();

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand">
          {profile.name || 'Portfolio'}
        </Link>
        <nav className="nav">
          <Link href="/" className={pathname === '/' ? 'active' : ''}>Work</Link>
          <Link href="/admin" className={pathname === '/admin' ? 'active' : ''}>Manage</Link>
          <Link href="/profile" className={pathname === '/profile' ? 'active' : ''}>Profile</Link>
        </nav>
      </div>
    </header>
  );
}
