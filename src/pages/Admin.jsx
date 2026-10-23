import React, { useState } from 'react';
import { 
  Lock, 
  Unlock, 
  Save, 
  Plus, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  Layers, 
  Code2, 
  HelpCircle, 
  User, 
  PhoneCall, 
  Shield, 
  FileText, 
  ArrowUp, 
  ArrowDown, 
  Download, 
  Upload,
  LogOut,
  Sparkles
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import SEO from '../components/SEO';

const Admin = () => {
  const {
    siteInfo,
    heroData,
    projects,
    services,
    processSteps,
    aboutData,
    faq,
    isAdminAuthenticated,
    login,
    logout,
    changeAdminPassword,
    updateSiteInfo,
    updateHeroData,
    updateProjects,
    updateServices,
    updateProcessSteps,
    updateAboutData,
    updateFaq,
    resetToDefaults,
    exportBackupJson,
    importBackupJson
  } = useContent();

  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('hero');
  const [toast, setToast] = useState(null);

  // Local form states for each tab
  const [localSiteInfo, setLocalSiteInfo] = useState(siteInfo);
  const [localHero, setLocalHero] = useState(heroData);
  const [localProjects, setLocalProjects] = useState(projects);
  const [localServices, setLocalServices] = useState(services);
  const [localProcess, setLocalProcess] = useState(processSteps);
  const [localAbout, setLocalAbout] = useState(aboutData);
  const [localFaq, setLocalFaq] = useState(faq);

  // Editing modals/drawers
  const [editingProject, setEditingProject] = useState(null);
  const [newProjectMode, setNewProjectMode] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);

  // Security tab state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passMessage, setPassMessage] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Sync local states if context changes externally
  React.useEffect(() => {
    setLocalSiteInfo(siteInfo);
    setLocalHero(heroData);
    setLocalProjects(projects);
    setLocalServices(services);
    setLocalProcess(processSteps);
    setLocalAbout(aboutData);
    setLocalFaq(faq);
  }, [siteInfo, heroData, projects, services, processSteps, aboutData, faq]);

  const handleLogin = (e) => {
    e.preventDefault();
    const res = login(passwordInput);
    if (!res.success) {
      setLoginError(res.error);
    } else {
      setLoginError('');
      setPasswordInput('');
    }
  };

  // ==========================================
  // Save Handlers for Each Section
  // ==========================================
  const handleSaveHeroAndBrand = (e) => {
    e.preventDefault();
    updateSiteInfo(localSiteInfo);
    updateHeroData(localHero);
    showToast("Hero and brand entity updated successfully!");
  };

  const handleSaveContact = (e) => {
    e.preventDefault();
    updateSiteInfo(localSiteInfo);
    showToast("Contact details & socials updated!");
  };

  const handleSaveAbout = (e) => {
    e.preventDefault();
    updateAboutData(localAbout);
    showToast("About profile & skills updated!");
  };

  const handleSaveProcess = (e) => {
    e.preventDefault();
    updateProcessSteps(localProcess);
    showToast("Process steps saved!");
  };

  // Projects operations
  const handleSaveProjectModal = (e) => {
    e.preventDefault();
    if (!editingProject.name || !editingProject.url) {
      alert("Project name and URL are required.");
      return;
    }

    let updated;
    if (newProjectMode) {
      const newId = editingProject.id || editingProject.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      updated = [{ ...editingProject, id: newId }, ...localProjects];
    } else {
      updated = localProjects.map(p => p.id === editingProject.id ? editingProject : p);
    }

    setLocalProjects(updated);
    updateProjects(updated);
    setEditingProject(null);
    setNewProjectMode(false);
    showToast("Projects updated successfully!");
  };

  const handleDeleteProject = (id) => {
    if (window.confirm("Are you sure you want to remove this project?")) {
      const updated = localProjects.filter(p => p.id !== id);
      setLocalProjects(updated);
      updateProjects(updated);
      showToast("Project removed.");
    }
  };

  const handleMoveProject = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= localProjects.length) return;
    const copy = [...localProjects];
    const [moved] = copy.splice(index, 1);
    copy.splice(targetIndex, 0, moved);
    setLocalProjects(copy);
    updateProjects(copy);
  };

  // FAQ operations
  const handleSaveFaqModal = (e) => {
    e.preventDefault();
    let updated;
    if (editingFaq.index !== undefined) {
      updated = [...localFaq];
      updated[editingFaq.index] = { question: editingFaq.question, answer: editingFaq.answer };
    } else {
      updated = [...localFaq, { question: editingFaq.question, answer: editingFaq.answer }];
    }
    setLocalFaq(updated);
    updateFaq(updated);
    setEditingFaq(null);
    showToast("FAQ updated!");
  };

  const handleDeleteFaq = (index) => {
    if (window.confirm("Remove this FAQ item?")) {
      const updated = localFaq.filter((_, i) => i !== index);
      setLocalFaq(updated);
      updateFaq(updated);
      showToast("FAQ removed.");
    }
  };

  // Backup & Restore
  const handleDownloadBackup = () => {
    const json = exportBackupJson();
    const blob = new Blob([json], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = `hws-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Backup downloaded!");
  };

  const handleImportFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const res = importBackupJson(event.target.result);
      if (res.success) {
        showToast("Backup restored successfully!");
      } else {
        alert("Failed to import: " + res.error);
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (window.confirm("WARNING: This will reset all edits back to original default portfolio code. Are you sure?")) {
      resetToDefaults();
      showToast("Reset to default content.");
    }
  };

  const handleChangePass = (e) => {
    e.preventDefault();
    const res = changeAdminPassword(oldPassword, newPassword);
    if (res.success) {
      setPassMessage({ type: 'success', text: 'Admin password changed successfully!' });
      setOldPassword('');
      setNewPassword('');
    } else {
      setPassMessage({ type: 'error', text: res.error });
    }
  };

  // ==========================================
  // Gated Login View
  // ==========================================
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070814] flex items-center justify-center px-4">
        <SEO 
          title="Admin Portal | Hussain Web Solutions"
          description="Internal Management Portal"
          canonical="https://hussainwebsolutions.netlify.app/admin"
        />

        <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-[#0c0f26] border border-white/[0.08] shadow-[0_10px_50px_rgba(0,0,0,0.8)]">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center mx-auto mb-4 text-white shadow-[0_0_20px_rgba(139,92,246,0.5)] border border-violet-400/30">
              <Lock size={26} />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">HWS Content Manager</h1>
            <p className="text-xs text-slate-400 mt-1">Authenticate to edit website content & settings</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-3 text-xs rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-center gap-2">
                <AlertCircle size={15} />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Admin Passcode
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password..."
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-violet-400 transition-colors"
              />
            </div>

            <button type="submit" className="w-full btn-primary py-3 text-sm font-semibold justify-center">
              <span>Unlock Admin Panel</span>
              <Unlock size={16} />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/[0.06] text-center">
            <div className="p-3 rounded-xl bg-violet-950/30 border border-violet-500/20 text-[11px] text-violet-300 leading-relaxed">
              Default master password: <code className="font-mono bg-white/[0.1] px-1.5 py-0.5 rounded text-white font-bold">hussain@admin2026</code>
              <br />(You can change this password inside the Security tab).
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // Authenticated Admin Dashboard
  // ==========================================
  return (
    <div className="min-h-screen bg-[#070814] text-slate-100 pb-20">
      <SEO 
        title="Admin Content Manager | Hussain Web Solutions"
        description="Internal Management Portal"
        canonical="https://hussainwebsolutions.netlify.app/admin"
      />

      {/* Floating Toast Notification */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-emerald-600 text-white shadow-xl text-xs sm:text-sm font-medium animate-fadeIn">
          <CheckCircle2 size={18} />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Admin Bar */}
      <header className="sticky top-0 z-40 bg-[#090b1e]/90 backdrop-blur-xl border-b border-white/[0.08] px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center text-white font-bold text-sm shadow-[0_0_15px_rgba(139,92,246,0.5)]">
              H
            </div>
            <div>
              <span className="text-sm sm:text-base font-bold text-white">HWS Admin Portal</span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                Active Session
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary py-1.5 px-3.5 text-xs flex items-center gap-1.5"
            >
              <span>View Live Website</span>
              <ExternalLink size={13} />
            </a>
            <button
              onClick={logout}
              className="p-2 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-white/[0.04] transition-colors cursor-pointer"
              title="Logout"
            >
              <LogOut size={17} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#0c0f26] border border-white/[0.08] rounded-2xl mb-8 overflow-x-auto scrollbar-thin">
          {[
            { id: 'hero', label: 'Hero & Brand', icon: Sparkles },
            { id: 'projects', label: `Projects (${localProjects.length})`, icon: Layers },
            { id: 'services', label: `Services (${localServices.length})`, icon: Code2 },
            { id: 'process', label: 'Process Steps', icon: FileText },
            { id: 'about', label: 'About & Skills', icon: User },
            { id: 'faq', label: `FAQ (${localFaq.length})`, icon: HelpCircle },
            { id: 'contact', label: 'Contact & Socials', icon: PhoneCall },
            { id: 'backup', label: 'Backup & Security', icon: Shield },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                  active
                    ? 'bg-violet-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ==============================================================
            TAB 1: HERO & BRAND ENTITY
        ============================================================== */}
        {activeTab === 'hero' && (
          <form onSubmit={handleSaveHeroAndBrand} className="space-y-8">
            <div className="cosmic-card p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Brand Entity Information</h2>
                <p className="text-xs text-slate-400 mt-1">Core branding and positioning shown throughout header, footer and SEO.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Business Name</label>
                  <input
                    type="text"
                    value={localSiteInfo.businessName}
                    onChange={(e) => setLocalSiteInfo({ ...localSiteInfo, businessName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:border-violet-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Founder / Identity Name</label>
                  <input
                    type="text"
                    value={localSiteInfo.founder}
                    onChange={(e) => setLocalSiteInfo({ ...localSiteInfo, founder: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:border-violet-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Short / Abbreviated Name</label>
                  <input
                    type="text"
                    value={localSiteInfo.shortName}
                    onChange={(e) => setLocalSiteInfo({ ...localSiteInfo, shortName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:border-violet-400 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="cosmic-card p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Hero Section Copy & Positioning</h2>
                <p className="text-xs text-slate-400 mt-1">First impression copy on the homepage hero.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Availability / Status Badge Text</label>
                <input
                  type="text"
                  value={localHero.statusBadge}
                  onChange={(e) => setLocalHero({ ...localHero, statusBadge: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:border-violet-400 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Main Headline (Part 1)</label>
                  <input
                    type="text"
                    value={localHero.headlinePart1}
                    onChange={(e) => setLocalHero({ ...localHero, headlinePart1: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:border-violet-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Main Headline (Gradient Highlight)</label>
                  <input
                    type="text"
                    value={localHero.headlineGradient}
                    onChange={(e) => setLocalHero({ ...localHero, headlineGradient: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:border-violet-400 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Hero Subheading (H2)</label>
                <input
                  type="text"
                  value={localHero.subheading}
                  onChange={(e) => setLocalHero({ ...localHero, subheading: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:border-violet-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Hero Value Proposition Paragraph</label>
                <textarea
                  rows={4}
                  value={localHero.description}
                  onChange={(e) => setLocalHero({ ...localHero, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:border-violet-400 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Location Coverage Tag</label>
                  <input
                    type="text"
                    value={localHero.locationText}
                    onChange={(e) => setLocalHero({ ...localHero, locationText: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:border-violet-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Quick Contact Feature Tag</label>
                  <input
                    type="text"
                    value={localHero.quickContactText}
                    onChange={(e) => setLocalHero({ ...localHero, quickContactText: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:border-violet-400 outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button type="submit" className="btn-primary py-2.5 px-6 text-sm">
                  <Save size={16} />
                  <span>Save Hero & Brand Changes</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* ==============================================================
            TAB 2: PROJECTS MANAGER
        ============================================================== */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">Portfolio Projects Manager</h2>
                <p className="text-xs text-slate-400 mt-0.5">Add, edit, reorder, or toggle featured projects shown on the website.</p>
              </div>
              <button
                onClick={() => {
                  setNewProjectMode(true);
                  setEditingProject({
                    id: '',
                    name: '',
                    url: 'https://',
                    category: 'Custom Web Application',
                    badge: 'Web App',
                    featured: true,
                    description: '',
                    overview: '',
                    purpose: '',
                    solution: '',
                    features: ['Feature 1', 'Feature 2'],
                    technologies: ['React', 'Tailwind CSS']
                  });
                }}
                className="btn-primary py-2 px-4 text-xs font-semibold"
              >
                <Plus size={16} />
                <span>Add New Project</span>
              </button>
            </div>

            {/* Projects Table / Card List */}
            <div className="space-y-3">
              {localProjects.map((proj, idx) => (
                <div
                  key={proj.id}
                  className="cosmic-card p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2.5">
                      <h4 className="text-base font-bold text-white">{proj.name}</h4>
                      {proj.featured && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-violet-600/30 text-violet-300 border border-violet-500/40">
                          Featured
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/[0.04] text-slate-400">
                        {proj.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1">{proj.description}</p>
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-cyan-400 hover:underline"
                    >
                      {proj.url} <ExternalLink size={11} />
                    </a>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center">
                    <button
                      onClick={() => handleMoveProject(idx, -1)}
                      disabled={idx === 0}
                      className="p-1.5 rounded-lg bg-white/[0.04] text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                      title="Move up"
                    >
                      <ArrowUp size={15} />
                    </button>
                    <button
                      onClick={() => handleMoveProject(idx, 1)}
                      disabled={idx === localProjects.length - 1}
                      className="p-1.5 rounded-lg bg-white/[0.04] text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                      title="Move down"
                    >
                      <ArrowDown size={15} />
                    </button>
                    <button
                      onClick={() => {
                        setNewProjectMode(false);
                        setEditingProject({ ...proj });
                      }}
                      className="btn-secondary py-1.5 px-3 text-xs"
                    >
                      <Edit3 size={13} /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProject(proj.id)}
                      className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                      title="Delete project"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal for Project Edit/Add */}
            {editingProject && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
                <div className="w-full max-w-2xl bg-[#0c0f26] border border-white/[0.1] rounded-3xl p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                    <h3 className="text-lg font-bold text-white">
                      {newProjectMode ? 'Add New Portfolio Project' : `Edit "${editingProject.name}"`}
                    </h3>
                    <button
                      onClick={() => setEditingProject(null)}
                      className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.05]"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleSaveProjectModal} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Project Name *</label>
                        <input
                          type="text"
                          required
                          value={editingProject.name}
                          onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Live URL *</label>
                        <input
                          type="url"
                          required
                          value={editingProject.url}
                          onChange={(e) => setEditingProject({ ...editingProject, url: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                        <input
                          type="text"
                          value={editingProject.category}
                          onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Badge Label</label>
                        <input
                          type="text"
                          value={editingProject.badge || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, badge: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Short Card Description *</label>
                      <textarea
                        rows={2}
                        required
                        value={editingProject.description}
                        onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Technologies (comma-separated)</label>
                      <input
                        type="text"
                        value={editingProject.technologies ? editingProject.technologies.join(', ') : ''}
                        onChange={(e) => setEditingProject({
                          ...editingProject,
                          technologies: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                        })}
                        placeholder="React, Tailwind CSS, Shopify, JavaScript..."
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm"
                      />
                    </div>

                    {/* Image Management Section */}
                    <div className="space-y-3 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-semibold text-slate-300">
                          Project Screenshot / Image URL
                        </label>
                        <span className="text-[10px] text-purple-400 font-mono">PNG / JPG / WebP / Preset</span>
                      </div>
                      
                      <input
                        type="text"
                        value={typeof editingProject.image === 'string' ? editingProject.image : ''}
                        onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                        placeholder="/images/at-brand.png or https://..."
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:border-purple-400"
                      />

                      {/* Quick Preset Selector */}
                      <div>
                        <span className="text-[11px] text-slate-400 block mb-1.5">Or choose from portfolio presets:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            { label: 'AT Brand', path: '/images/at-brand.png' },
                            { label: 'Unique Match', path: '/images/unique-match-maker.png' },
                            { label: 'Trade Signals', path: '/images/trade-signals.png' },
                            { label: 'Timecraft', path: '/images/timecraft.png' },
                            { label: 'CherryFlows', path: '/images/cherryflows.png' },
                            { label: 'SkillPathHub', path: '/images/skillpathhub.png' },
                            { label: 'Aqua Life', path: '/images/aqua-life.png' },
                          ].map(preset => (
                            <button
                              key={preset.path}
                              type="button"
                              onClick={() => setEditingProject({ ...editingProject, image: preset.path })}
                              className={`px-2.5 py-1 text-[11px] rounded-lg border transition-all cursor-pointer ${
                                editingProject.image === preset.path
                                  ? 'bg-purple-600/40 border-purple-500 text-white font-semibold'
                                  : 'bg-white/[0.04] border-white/10 text-slate-400 hover:text-white'
                              }`}
                            >
                              {preset.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Live Image Preview */}
                      {editingProject.image && (
                        <div className="mt-3">
                          <span className="text-[11px] text-slate-400 block mb-1">Live Image Preview:</span>
                          <div className="w-full h-36 rounded-xl overflow-hidden border border-white/10 bg-black/40">
                            <img
                              src={editingProject.image}
                              alt="Preview"
                              className="w-full h-full object-cover object-top"
                              onError={(e) => { e.target.style.display = 'none'; }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <input
                        type="checkbox"
                        id="featuredCheckbox"
                        checked={editingProject.featured || false}
                        onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                        className="w-4 h-4 accent-violet-600 rounded cursor-pointer"
                      />
                      <label htmlFor="featuredCheckbox" className="text-xs font-semibold text-slate-300 cursor-pointer">
                        Feature this project on the homepage primary grid
                      </label>
                    </div>

                    <div className="pt-4 flex justify-end gap-3 border-t border-white/[0.08]">
                      <button
                        type="button"
                        onClick={() => setEditingProject(null)}
                        className="btn-secondary py-2 px-4 text-xs"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn-primary py-2 px-6 text-xs font-semibold"
                      >
                        Save Project
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==============================================================
            TAB 3: SERVICES MANAGER
        ============================================================== */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">Services & Deliverables</h2>
              <p className="text-xs text-slate-400 mt-0.5">Edit service titles, descriptions, and deliverable bullet points.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {localServices.map((svc, idx) => (
                <div key={svc.id} className="cosmic-card p-6 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-violet-400 bg-violet-950/40 border border-violet-500/30 px-2 py-0.5 rounded-md">
                        {svc.category}
                      </span>
                    </div>
                    <input
                      type="text"
                      value={svc.title}
                      onChange={(e) => {
                        const copy = [...localServices];
                        copy[idx].title = e.target.value;
                        setLocalServices(copy);
                      }}
                      className="w-full text-base font-bold text-white bg-transparent border-b border-white/[0.1] focus:border-violet-400 outline-none pb-1"
                    />
                    <textarea
                      rows={3}
                      value={svc.description}
                      onChange={(e) => {
                        const copy = [...localServices];
                        copy[idx].description = e.target.value;
                        setLocalServices(copy);
                      }}
                      className="w-full text-xs text-slate-300 bg-white/[0.03] border border-white/[0.08] rounded-xl p-2.5 outline-none focus:border-violet-400"
                    />
                  </div>

                  <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                    <span className="text-[10px] font-semibold uppercase text-slate-400">Deliverables (comma-separated):</span>
                    <input
                      type="text"
                      value={svc.deliverables ? svc.deliverables.join(', ') : ''}
                      onChange={(e) => {
                        const copy = [...localServices];
                        copy[idx].deliverables = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                        setLocalServices(copy);
                      }}
                      className="w-full text-xs text-slate-200 bg-white/[0.03] border border-white/[0.08] rounded-lg p-2 outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => {
                  updateServices(localServices);
                  showToast("Services saved successfully!");
                }}
                className="btn-primary py-2.5 px-6 text-sm"
              >
                <Save size={16} /> Save All Services
              </button>
            </div>
          </div>
        )}

        {/* ==============================================================
            TAB 4: PROCESS STEPS ("HOW I WORK")
        ============================================================== */}
        {activeTab === 'process' && (
          <form onSubmit={handleSaveProcess} className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">How I Work (4-Stage Process)</h2>
              <p className="text-xs text-slate-400 mt-0.5">Edit step numbers, titles, and descriptions shown in the methodology section.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {localProcess.map((step, idx) => (
                <div key={idx} className="cosmic-card p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={step.step}
                      onChange={(e) => {
                        const copy = [...localProcess];
                        copy[idx].step = e.target.value;
                        setLocalProcess(copy);
                      }}
                      className="w-12 font-extrabold text-violet-400 bg-transparent text-xl outline-none"
                    />
                    <input
                      type="text"
                      value={step.badge}
                      onChange={(e) => {
                        const copy = [...localProcess];
                        copy[idx].badge = e.target.value;
                        setLocalProcess(copy);
                      }}
                      className="w-20 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.08] text-right"
                    />
                  </div>

                  <input
                    type="text"
                    value={step.title}
                    onChange={(e) => {
                      const copy = [...localProcess];
                      copy[idx].title = e.target.value;
                      setLocalProcess(copy);
                    }}
                    className="w-full font-bold text-white text-sm bg-transparent border-b border-white/[0.1] pb-1 outline-none"
                  />

                  <textarea
                    rows={4}
                    value={step.desc}
                    onChange={(e) => {
                      const copy = [...localProcess];
                      copy[idx].desc = e.target.value;
                      setLocalProcess(copy);
                    }}
                    className="w-full text-xs text-slate-300 bg-white/[0.03] border border-white/[0.08] rounded-xl p-2 outline-none"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <button type="submit" className="btn-primary py-2.5 px-6 text-sm">
                <Save size={16} /> Save Process Steps
              </button>
            </div>
          </form>
        )}

        {/* ==============================================================
            TAB 5: ABOUT & TECH STACK
        ============================================================== */}
        {activeTab === 'about' && (
          <form onSubmit={handleSaveAbout} className="space-y-6">
            <div className="cosmic-card p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">About Section & Principles</h2>
                <p className="text-xs text-slate-400 mt-0.5">Edit biographical copy and core technical philosophy.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Section Sub-headline</label>
                <input
                  type="text"
                  value={localAbout.tagline}
                  onChange={(e) => setLocalAbout({ ...localAbout, tagline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm outline-none"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-semibold text-slate-300">Biographical Paragraphs</label>
                {localAbout.paragraphs.map((para, idx) => (
                  <div key={idx} className="flex gap-2">
                    <textarea
                      rows={3}
                      value={para}
                      onChange={(e) => {
                        const copy = [...localAbout.paragraphs];
                        copy[idx] = e.target.value;
                        setLocalAbout({ ...localAbout, paragraphs: copy });
                      }}
                      className="flex-1 p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-slate-200 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const copy = localAbout.paragraphs.filter((_, i) => i !== idx);
                        setLocalAbout({ ...localAbout, paragraphs: copy });
                      }}
                      className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg self-center"
                      title="Remove paragraph"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setLocalAbout({
                      ...localAbout,
                      paragraphs: [...localAbout.paragraphs, "New paragraph..."]
                    });
                  }}
                  className="btn-secondary py-1.5 px-3 text-xs"
                >
                  <Plus size={14} /> Add Paragraph
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Tech Stack Skills (comma-separated tags)
                </label>
                <input
                  type="text"
                  value={localAbout.skills.join(', ')}
                  onChange={(e) => setLocalAbout({
                    ...localAbout,
                    skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm outline-none"
                />
              </div>

              <div className="flex justify-end pt-4">
                <button type="submit" className="btn-primary py-2.5 px-6 text-sm">
                  <Save size={16} /> Save About Changes
                </button>
              </div>
            </div>
          </form>
        )}

        {/* ==============================================================
            TAB 6: FAQ MANAGER
        ============================================================== */}
        {activeTab === 'faq' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
                <p className="text-xs text-slate-400 mt-0.5">Manage question & answer pairs displayed in the accordion.</p>
              </div>
              <button
                onClick={() => setEditingFaq({ question: '', answer: '' })}
                className="btn-primary py-2 px-4 text-xs font-semibold"
              >
                <Plus size={15} /> Add Question
              </button>
            </div>

            <div className="space-y-3">
              {localFaq.map((item, idx) => (
                <div key={idx} className="cosmic-card p-5 space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="font-semibold text-white text-sm">{item.question}</h4>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setEditingFaq({ ...item, index: idx })}
                        className="btn-secondary py-1 px-2.5 text-xs"
                      >
                        <Edit3 size={13} /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteFaq(idx)}
                        className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed border-t border-white/[0.04] pt-2">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>

            {/* Modal for FAQ Edit/Add */}
            {editingFaq && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                <div className="w-full max-w-lg bg-[#0c0f26] border border-white/[0.1] rounded-3xl p-6 sm:p-8 space-y-4">
                  <h3 className="text-lg font-bold text-white">
                    {editingFaq.index !== undefined ? 'Edit Question & Answer' : 'Add New FAQ Question'}
                  </h3>
                  <form onSubmit={handleSaveFaqModal} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Question *</label>
                      <input
                        type="text"
                        required
                        value={editingFaq.question}
                        onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Answer *</label>
                      <textarea
                        rows={4}
                        required
                        value={editingFaq.answer}
                        onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm outline-none"
                      />
                    </div>
                    <div className="pt-2 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setEditingFaq(null)}
                        className="btn-secondary py-2 px-4 text-xs"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn-primary py-2 px-6 text-xs font-semibold"
                      >
                        Save FAQ
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==============================================================
            TAB 7: CONTACT DETAILS & SOCIALS
        ============================================================== */}
        {activeTab === 'contact' && (
          <form onSubmit={handleSaveContact} className="space-y-6">
            <div className="cosmic-card p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Contact & Social Channels</h2>
                <p className="text-xs text-slate-400 mt-0.5">Control where inquiries route and verified social links.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Official Inquiries Email</label>
                  <input
                    type="email"
                    required
                    value={localSiteInfo.contact.email}
                    onChange={(e) => setLocalSiteInfo({
                      ...localSiteInfo,
                      contact: { ...localSiteInfo.contact, email: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">WhatsApp Number</label>
                  <input
                    type="text"
                    required
                    value={localSiteInfo.contact.whatsapp}
                    onChange={(e) => setLocalSiteInfo({
                      ...localSiteInfo,
                      contact: { ...localSiteInfo.contact, whatsapp: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">WhatsApp Direct Link URL</label>
                <input
                  type="url"
                  required
                  value={localSiteInfo.contact.whatsappLink}
                  onChange={(e) => setLocalSiteInfo({
                    ...localSiteInfo,
                    contact: { ...localSiteInfo.contact, whatsappLink: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Default WhatsApp Greeting Message</label>
                <input
                  type="text"
                  value={localSiteInfo.contact.defaultMessage}
                  onChange={(e) => setLocalSiteInfo({
                    ...localSiteInfo,
                    contact: { ...localSiteInfo.contact, defaultMessage: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    value={localSiteInfo.contact.linkedin}
                    onChange={(e) => setLocalSiteInfo({
                      ...localSiteInfo,
                      contact: { ...localSiteInfo.contact, linkedin: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Facebook Page URL</label>
                  <input
                    type="url"
                    value={localSiteInfo.contact.facebook}
                    onChange={(e) => setLocalSiteInfo({
                      ...localSiteInfo,
                      contact: { ...localSiteInfo.contact, facebook: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button type="submit" className="btn-primary py-2.5 px-6 text-sm">
                  <Save size={16} /> Save Contact Details
                </button>
              </div>
            </div>
          </form>
        )}

        {/* ==============================================================
            TAB 8: BACKUP, RESTORE & SECURITY
        ============================================================== */}
        {activeTab === 'backup' && (
          <div className="space-y-8">
            {/* Change Admin Password */}
            <div className="cosmic-card p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-bold text-white">Security & Password Management</h3>
              <p className="text-xs text-slate-400">Update the master passcode required to enter the `/admin` portal.</p>

              {passMessage && (
                <div className={`p-3 text-xs rounded-xl ${
                  passMessage.type === 'success' 
                    ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300' 
                    : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
                }`}>
                  {passMessage.text}
                </div>
              )}

              <form onSubmit={handleChangePass} className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Current Password *</label>
                  <input
                    type="password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">New Password (min 6 chars) *</label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm outline-none"
                  />
                </div>
                <div className="sm:col-span-2 flex justify-end pt-2">
                  <button type="submit" className="btn-secondary py-2 px-5 text-xs">
                    Update Password
                  </button>
                </div>
              </form>
            </div>

            {/* Export & Import */}
            <div className="cosmic-card p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-bold text-white">Data Backup & Migration</h3>
              <p className="text-xs text-slate-400">Export your configured content as a JSON file or restore from a previous backup.</p>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={handleDownloadBackup}
                  className="btn-secondary py-2.5 px-5 text-xs flex items-center gap-2"
                >
                  <Download size={15} /> Download Full Site Backup (.json)
                </button>

                <label className="btn-secondary py-2.5 px-5 text-xs flex items-center gap-2 cursor-pointer">
                  <Upload size={15} /> Restore from File
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportFile}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="p-6 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-3">
              <h3 className="text-base font-bold text-rose-400">Reset Content to Defaults</h3>
              <p className="text-xs text-slate-400">
                This clears all browser-saved overrides and returns the website to its original built-in defaults.
              </p>
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition-colors cursor-pointer"
              >
                Reset All Website Content
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Admin;
