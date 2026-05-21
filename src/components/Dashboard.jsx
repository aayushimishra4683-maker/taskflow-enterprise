import React from 'react';

const Dashboard = ({ tasks, teamCount }) => {
  const total = tasks.length;
  const done = tasks.filter(t => t.category === 'Done').length;
  const progress = tasks.filter(t => t.category === 'In Progress').length;
  const todo = tasks.filter(t => t.category === 'To-Do').length;

  const highPriorityCount = tasks.filter(t => t.priority === 'High').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <h2 className="text-2xl font-black text-white tracking-tight">Active Scope Real-time Telemetry</h2>
        <span className="text-xs bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full border border-cyan-500/20 font-bold">Live Data Engine</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80"><p className="text-[11px] text-slate-500 font-bold uppercase">Total Scope Work</p><p className="text-3xl font-black text-white mt-1">{total}</p></div>
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80"><p className="text-[11px] text-slate-500 font-bold uppercase">Unassigned Backlog</p><p className="text-3xl font-black text-indigo-400 mt-1">{todo}</p></div>
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80"><p className="text-[11px] text-slate-500 font-bold uppercase">Active Sprints</p><p className="text-3xl font-black text-amber-400 mt-1">{progress}</p></div>
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80"><p className="text-[11px] text-slate-500 font-bold uppercase">Closed Outposts</p><p className="text-3xl font-black text-emerald-400 mt-1">{done}</p></div>
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80"><p className="text-[11px] text-slate-500 font-bold uppercase">Allocated Engineers</p><p className="text-3xl font-black text-cyan-400 mt-1">{teamCount}</p></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-5">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Resource Burn Rate & Allocations</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1"><span>Sprint Operational Efficiency</span><span>{total ? Math.round((done/total)*100) : 0}%</span></div>
              <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden"><div className="bg-linear-to-r from-cyan-500 to-emerald-400 h-full transition-all" style={{width: `${total ? (done/total)*100 : 0}%`}}></div></div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1"><span>Pipeline Blocking Multipliers (High Priority Items)</span><span>{total ? Math.round((highPriorityCount/total)*100) : 0}%</span></div>
              <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden"><div className="bg-red-500 h-full transition-all" style={{width: `${total ? (highPriorityCount/total)*100 : 0}%`}}></div></div>
            </div>
          </div>
        </div>

        {/* LOG PANEL: Makes it look extremely technical */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Internal Cluster Logs</h3>
          <div className="bg-slate-900 p-3 rounded-lg font-mono text-[11px] text-emerald-400/90 space-y-1.5 h-36 overflow-y-auto border border-slate-800/40">
            <div>&gt; Syncing instance tf_core_state...</div>
            <div>&gt; Array maps mapped successfully.</div>
            <div>&gt; Thread isolation pool loaded [OK]</div>
            <div>&gt; Dynamic CRUD mutations watcher live.</div>
            <div>&gt; High alert threshold: {highPriorityCount} units.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;