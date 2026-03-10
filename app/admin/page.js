'use client';
import { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

const EMPTY_FORM = { name: '', description: '', url: '' };

export default function AdminPage() {
  const { projects, addProject, updateProject, deleteProject } = usePortfolio();
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    if (editingId !== null) {
      updateProject(editingId, { ...form });
      showToast('Project updated successfully');
      setEditingId(null);
    } else {
      addProject({ ...form });
      showToast('Project added!');
    }
    setForm(EMPTY_FORM);
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setForm({ name: project.name, description: project.description, url: project.url });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  const handleDelete = () => {
    if (editingId === deleteTarget) { setEditingId(null); setForm(EMPTY_FORM); }
    deleteProject(deleteTarget);
    setDeleteTarget(null);
    showToast('Project deleted', 'error');
  };

  return (
    <main className="container main">
      {/* Toast notification */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>{toast.message}</div>
      )}

      {/* Delete confirmation modal */}
      {deleteTarget !== null && (
        <div className="modal-overlay" onClick={() => setDeleteTarget(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Delete project?</h3>
            <p>This will permanently remove the project. This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={() => setDeleteTarget(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}

      <div className="admin-header">
        <h1 className="page-title">{editingId !== null ? 'Edit Project' : 'Add New Project'}</h1>
        <p className="page-sub">
          {editingId !== null
            ? 'Update the details of your project below.'
            : 'Fill in the details to add a new project to your portfolio.'}
        </p>
      </div>

      {/* Form */}
      <div className="form-card">
        <form onSubmit={handleSubmit} className="project-form">
          <div className="form-group">
            <label className="form-label" htmlFor="name">Project Name *</label>
            <input
              id="name"
              name="name"
              className="form-input"
              placeholder="e.g. My Awesome App"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              className="form-input form-textarea"
              placeholder="What does this project do? What technologies were used?"
              rows={3}
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="url">Project URL</label>
            <input
              id="url"
              name="url"
              type="url"
              className="form-input"
              placeholder="https://your-project.com"
              value={form.url}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            {editingId !== null && (
              <button type="button" className="btn btn-ghost" onClick={handleCancel}>
                Cancel
              </button>
            )}
            <button type="submit" className="btn btn-primary">
              {editingId !== null ? 'Update Project' : '+ Add Project'}
            </button>
          </div>
        </form>
      </div>

      {/* Project list */}
      <div className="admin-list-header">
        <h2>
          All Projects
          <span className="badge">{projects.length}</span>
        </h2>
      </div>

      {projects.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📁</div>
          <p>No projects yet. Add your first one above!</p>
        </div>
      ) : (
        <div className="admin-list">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`admin-item${editingId === project.id ? ' editing' : ''}`}
            >
              <div className="admin-item-info">
                <p className="admin-item-name">{project.name}</p>
                {project.description && (
                  <p className="admin-item-desc">{project.description}</p>
                )}
                {project.url && (
                  <a
                    className="admin-item-url"
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.url}
                  </a>
                )}
              </div>
              <div className="admin-item-actions">
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => handleEdit(project)}
                  disabled={editingId === project.id}
                >
                  {editingId === project.id ? 'Editing…' : 'Edit'}
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => setDeleteTarget(project.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
