import React, { useState } from 'react';

const Team = ({ team, setTeam, activeProjectId }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!name.trim() || !role.trim()) return;
    const nMember = {
      id: Date.now(), name, role, avatar: '👤', projectId: activeProjectId
    };
    setTeam([...team, nMember]);
    setName(''); setRole('');
  };

  const removeMember = (id) => {
    setTeam(team.filter(m => m.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
        <h2 className="text-xl font-bold text-white uppercase tracking-wide">Resource Allocation Registry</h2>
        
        {/* Dynamic Entry Form */}
        <form onSubmit={handleAddMember} className="flex flex-wrap gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
          <input 
            type="text" placeholder="Resource Name" value={name} onChange={e => setName(e.target.value)}
            className="bg-slate-900 text-xs px-3 py-1.5 rounded focus:outline-none border border-slate-800 text-white"
          />
          <input 
            type="text" placeholder="Role (e.g., QA Specialist)" value={role} onChange={e => setRole(e.target.value)}
            className="bg-slate-900 text-xs px-3 py-1.5 rounded focus:outline-none border border-slate-800 text-white"
          />
          <button type="submit" className="bg-cyan-500 text-slate-950 font-bold text-xs px-3 rounded hover:bg-cyan-400">Onboard</button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {team.filter(m => m.projectId === activeProjectId || m.projectId === 'p1').map(m => (
          <div key={m.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl bg-slate-900 p-2 rounded-lg border border-slate-800/60">{m.avatar}</span>
              <div>
                <h4 className="font-bold text-white text-sm">{m.name}</h4>
                <p className="text-[11px] text-slate-500 font-semibold">{m.role}</p>
              </div>
            </div>
            {m.id > 3 && (
              <button onClick={() => removeMember(m.id)} className="text-xs text-red-500/80 hover:text-red-400 font-bold">Offload</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;