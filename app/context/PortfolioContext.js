'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const PortfolioContext = createContext(null);

const SAMPLE_PROJECTS = [
  {
    id: 1,
    name: 'Project One',
    description: 'A showcase project demonstrating design and front-end engineering skills.',
    url: 'https://example.com',
  },
  {
    id: 2,
    name: 'Project Two',
    description: 'Another project highlighting simplicity, speed, and clean code.',
    url: '',
  },
];

const DEFAULT_PROFILE = {
  name: 'Your Name',
  bio: 'Front-end developer focused on clean interfaces and fast, accessible implementations.',
  email: 'hello@example.com',
  avatar: null,
};

export function PortfolioProvider({ children }) {
  const [projects, setProjects] = useState(SAMPLE_PROJECTS);
  const [profile, setProfileState] = useState(DEFAULT_PROFILE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedProjects = localStorage.getItem('pf_projects');
      const storedProfile = localStorage.getItem('pf_profile');
      if (storedProjects) setProjects(JSON.parse(storedProjects));
      if (storedProfile) setProfileState(prev => ({ ...prev, ...JSON.parse(storedProfile) }));
    } catch {
      // localStorage unavailable (private browsing, etc.)
    }
    setHydrated(true);
  }, []);

  const persistProjects = (data) => {
    setProjects(data);
    try { localStorage.setItem('pf_projects', JSON.stringify(data)); } catch { /* ignore */ }
  };

  const addProject = (project) => {
    persistProjects([...projects, { ...project, id: Date.now() }]);
  };

  const updateProject = (id, updates) => {
    persistProjects(projects.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProject = (id) => {
    persistProjects(projects.filter(p => p.id !== id));
  };

  const updateProfile = (data) => {
    const updated = { ...profile, ...data };
    setProfileState(updated);
    try { localStorage.setItem('pf_profile', JSON.stringify(updated)); } catch { /* ignore */ }
  };

  return (
    <PortfolioContext.Provider value={{
      projects,
      addProject,
      updateProject,
      deleteProject,
      profile,
      updateProfile,
      hydrated,
    }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error('usePortfolio must be used within PortfolioProvider');
  return context;
};
