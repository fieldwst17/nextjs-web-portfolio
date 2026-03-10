'use client';
import { useState, useRef, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export default function ProfilePage() {
  const { profile, updateProfile, hydrated } = usePortfolio();
  const [form, setForm] = useState({ name: '', bio: '', email: '' });
  const [toast, setToast] = useState(null);
  const fileInputRef = useRef(null);

  // Sync form with localStorage data once hydrated
  useEffect(() => {
    if (hydrated) {
      setForm({
        name: profile.name || '',
        bio: profile.bio || '',
        email: profile.email || '',
      });
    }
  }, [hydrated]); // eslint-disable-line react-hooks/exhaustive-deps

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast('Please select an image file.', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      updateProfile({ avatar: ev.target.result });
      showToast('Profile photo updated!');
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    updateProfile({ ...form });
    showToast('Profile saved!');
  };

  const initials = (form.name || '?')
    .split(' ')
    .filter(Boolean)
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || '?';

  return (
    <main className="container main">
      {toast && (
        <div className={`toast toast-${toast.type}`}>{toast.message}</div>
      )}

      <div className="admin-header">
        <h1 className="page-title">Profile</h1>
        <p className="page-sub">Set your name, bio, and profile photo shown on your portfolio.</p>
      </div>

      <div className="profile-card">
        {/* Avatar upload */}
        <div className="avatar-section">
          <div
            className="avatar-wrapper"
            onClick={handleAvatarClick}
            role="button"
            tabIndex={0}
            aria-label="Change profile photo"
            onKeyDown={e => e.key === 'Enter' && handleAvatarClick()}
          >
            {profile.avatar ? (
              <img src={profile.avatar} alt="Profile" className="avatar-img" />
            ) : (
              <div className="avatar-initials">{initials}</div>
            )}
            <div className="avatar-overlay">Change Photo</div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          {profile.avatar && (
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => { updateProfile({ avatar: null }); showToast('Photo removed'); }}
            >
              Remove
            </button>
          )}
          <p className="avatar-hint">Click to change photo</p>
        </div>

        {/* Profile form */}
        <form onSubmit={handleSubmit} className="project-form profile-form">
          <div className="form-group">
            <label className="form-label" htmlFor="pname">Display Name *</label>
            <input
              id="pname"
              name="name"
              className="form-input"
              placeholder="Your full name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              className="form-input form-textarea"
              placeholder="Tell visitors a bit about yourself, your skills, and what you do..."
              rows={4}
              value={form.bio}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-input"
              placeholder="hello@example.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Save Profile</button>
          </div>
        </form>
      </div>
    </main>
  );
}
