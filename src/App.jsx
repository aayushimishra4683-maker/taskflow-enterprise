import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import TaskBoard from './components/TaskBoard';
import Timeline from './components/Timeline';
import Team from './components/Team';
import Settings from './components/Settings';

const App = () => {
  // Multitenant Project Data Isolation
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('tf_projects');
    return saved ? JSON.parse(saved) : [
      { id: 'p1', name: 'Core Alpha App', desc: 'Main production workspace' },
      { id: 'p2', name: 'R&D Sandbox', desc: 'Experimental feature testing' }
    ];
  });

  const [activeProjectId, setActiveProjectId] = useState('p1');
  const [newProjectName, setNewProjectName] = useState('');

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tf_tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [team, setTeam] = useState(() => {
    const saved = localStorage.getItem('tf_team');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Ayushi Sharma', role: 'Project Director', avatar: '💻', projectId: 'p1' },
      { id: 2, name: 'Rahul Verma', role: 'Backend Lead', avatar: '⚙️', projectId: 'p1' },
      { id: 3, name: 'Sneha Reddy', role: 'UI Developer', avatar: '🎨', projectId: 'p2' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('tf_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('tf_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('tf_team', JSON.stringify(team));
  }, [team]);

  // Handler Controls
  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    const nProj = { id: 'p_' + Date.now(), name: newProjectName, desc: 'Custom workspace module' };
    setProjects([...projects, nProj]);
    setActiveProjectId(nProj.id);
    setNewProjectName('');
  };

  const handleAddTask = ({ title, desc, priority, assignedTo }) => {
    const nTask = {
      id: Date.now(), title, desc, priority, assignedTo,
      projectId: activeProjectId,
      category: 'To-Do',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };
    setTasks([...tasks, nTask]);
  };

  const activeProjectName = projects.find(p => p.id === activeProjectId)?.name || 'Workspace';
  const currentTasks = tasks.filter(t => t.projectId === activeProjectId);
  const currentTeam = team.filter(m => m.projectId === activeProjectId || m.projectId === 'p1');

  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row font-sans">
        
        {/* BIG ENTERPRISE SIDEBAR CONTROL PANEL */}
        <aside className="w-full md:w-72 bg-slate-950 border-r border-slate-800 p-6 flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            <div>
              <h1 className="text-xl font-black tracking-wider bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent uppercase">
                TaskFlow Core v4
              </h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">SaaS Multi-Tenant Grid</p>
            </div>

            {/* PROJECT SWITCHER MODULE (Makes it look like Slack/Jira) */}
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-3">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Active Workspace</label>
              <select 
                value={activeProjectId} 
                onChange={(e) => setActiveProjectId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-xs font-semibold text-cyan-400 rounded-lg p-2 focus:outline-none"
              >
                {projects.map(p => <option key={p.id} value={p.id}>📂 {p.name}</option>)}
              </select>

              <form onSubmit={handleAddProject} className="flex gap-1.5 pt-1">
                <input 
                  type="text" value={newProjectName} onChange={e => setNewProjectName(e.target.value)}
                  placeholder="New Space Name"
                  className="w-full bg-slate-950 border border-slate-800 text-[11px] px-2 py-1 rounded focus:outline-none text-white"
                />
                <button type="submit" className="bg-cyan-500 text-slate-950 px-2 font-bold text-xs rounded hover:bg-cyan-400">+</button>
              </form>
            </div>
            
            <nav className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest px-2 mb-1">Navigation Modules</span>
              <Link to="/" className="text-xs font-bold text-slate-400 hover:text-white p-3 rounded-xl hover:bg-slate-900 border border-transparent hover:border-slate-800/60 transition-all flex items-center gap-2">📊 Analytics Console</Link>
              <Link to="/tasks" className="text-xs font-bold text-slate-400 hover:text-white p-3 rounded-xl hover:bg-slate-900 border border-transparent hover:border-slate-800/60 transition-all flex items-center gap-2">📋 Interactive Scrum Board</Link>
              <Link to="/timeline" className="text-xs font-bold text-slate-400 hover:text-white p-3 rounded-xl hover:bg-slate-900 border border-transparent hover:border-slate-800/60 transition-all flex items-center gap-2">⏳ Micro Sprints Audit</Link>
              <Link to="/team" className="text-xs font-bold text-slate-400 hover:text-white p-3 rounded-xl hover:bg-slate-900 border border-transparent hover:border-slate-800/60 transition-all flex items-center gap-2">👥 HR Resource Registry</Link>
              <Link to="/settings" className="text-xs font-bold text-slate-400 hover:text-white p-3 rounded-xl hover:bg-slate-900 border border-transparent hover:border-slate-800/60 transition-all flex items-center gap-2">⚙️ Cluster Preferences</Link>
            </nav>
          </div>
          
          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800/60 text-[10px] text-slate-500 space-y-1 font-mono">
            <div>Scope: <span className="text-slate-300 font-bold">{activeProjectName}</span></div>
            <div>Database: <span className="text-emerald-400 font-bold">Local IndexedDB</span></div>
          </div>
        </aside>

        {/* WORKSPACE CANVAS */}
        <main className="flex-1 p-6 md:p-8 bg-slate-900 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard tasks={currentTasks} teamCount={currentTeam.length} />} />
            <Route path="/tasks" element={<TaskBoard tasks={tasks} activeProjectId={activeProjectId} team={currentTeam} onAddTask={handleAddTask} setTasks={setTasks} />} />
            <Route path="/timeline" element={<Timeline tasks={currentTasks} />} />
            <Route path="/team" element={<Team team={team} setTeam={setTeam} activeProjectId={activeProjectId} />} />
            <Route path="/settings" element={<Settings projects={projects} setProjects={setProjects} setTasks={setTasks} />} />
          </Routes>
        </main>

      </div>
    </Router>
  );
};

export default App;