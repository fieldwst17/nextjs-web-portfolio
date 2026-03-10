'use client';
import { PortfolioProvider } from '../context/PortfolioContext';

export default function Providers({ children }) {
  return <PortfolioProvider>{children}</PortfolioProvider>;
}
