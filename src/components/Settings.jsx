import React from 'react';

const Settings = ({ projects, setProjects, setTasks }) => {
  const resetEntireCluster = () => {
    if (window.confirm("Are you sure you want to hard reset all SaaS clusters?")) {
      setTasks([]);
      localStorage.removeItem('tf_tasks');
      alert("All task data structures truncated.");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white uppercase tracking-wide">Cluster Configuration Control</h2>
      <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 max-w-xl space-y-6">
        <div>
          <h4 className="font-bold text-white text-sm">Workspace Registry List</h4>
          <p className="text-xs text-slate-500 mt-0.5">Active database allocations allocated in current cache index.</p>
          <div className="mt-3 space-y-2">
            {projects.map(p => (
              <div key={p.id} className="bg-slate-900 border border-slate-800/80 px-3 py-2 rounded text-xs text-slate-300 flex justify-between font-mono">
                <span>📁 {p.name}</span>
                <span className="text-[10px] text-slate-600">ID: {p.id}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="pt-4 border-t border-slate-900">
          <button 
            onClick={resetEntireCluster}
            className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-bold py-2.5 rounded-lg transition-colors"
          >
            TRUNCATE ALL CLUSTER DATA STRUCTURES (HARD RESET)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;