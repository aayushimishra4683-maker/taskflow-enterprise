import React, { useState } from 'react';

const TaskBoard = ({ tasks, activeProjectId, team, onAddTask, setTasks }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [assigned, setAssigned] = useState('');

  const currentTasks = tasks.filter(t => t.projectId === activeProjectId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!title.trim() || !desc.trim()) return;
    onAddTask({ title, desc, priority, assignedTo: assigned || 'Unassigned' });
    setTitle(''); setDesc(''); setAssigned('');
  };

  const moveTask = (id, nextCat) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, category: nextCat } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white uppercase tracking-wide">Interactive Project Scrum Board</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 h-fit space-y-4">
          <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Initialize Task Node</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text" placeholder="Artifact Identifier" value={title} onChange={e => setTitle(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none"
            />
            <textarea
              placeholder="Detailed description specifications..." value={desc} rows="3" onChange={e => setDesc(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none resize-none"
            ></textarea>
            
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 font-bold uppercase">Assign Resource</label>
              <select value={assigned} onChange={e => setAssigned(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none">
                <option value="">Choose Engineer</option>
                {team.map(m => <option key={m.id} value={m.name}>{m.name}</option>)}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 font-bold uppercase">Priority Rating</label>
              <select value={priority} onChange={e => setPriority(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none">
                <option value="Low">🟢 Low Threat</option>
                <option value="Medium">🟡 Medium Action</option>
                <option value="High">🔴 Mission Critical</option>
              </select>
            </div>

            <button type="submit" className="w-full bg-linear-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold py-2 rounded-lg text-xs transition-transform active:scale-95">
              Deploy to Core Canvas
            </button>
          </form>
        </div>

        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          {['To-Do', 'In Progress', 'Done'].map(col => (
            <div key={col} className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/80 min-h-115">
              <div className="flex justify-between items-center mb-4 border-b border-slate-800/80 pb-2">
                <span className="text-xs font-black text-slate-300 uppercase tracking-wider">{col}</span>
                <span className="text-[10px] bg-slate-900 border border-slate-800 text-slate-400 px-2 py-0.5 rounded-full">{currentTasks.filter(t => t.category === col).length}</span>
              </div>
              <div className="space-y-3">
                {currentTasks.filter(t => t.category === col).map(task => (
                  <div key={task.id} className="bg-slate-900 border border-slate-800 p-3 rounded-lg space-y-2 hover:border-slate-700 transition-all">
                    <div className="flex justify-between items-center"><span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${task.priority === 'High' ? 'bg-red-500/10 text-red-400' : 'bg-slate-800 text-slate-400'}`}>{task.priority}</span><span className="text-[9px] text-slate-600 font-mono">{task.date}</span></div>
                    <h4 className="font-bold text-white text-xs">{task.title}</h4>
                    <p className="text-slate-400 text-[11px] line-clamp-2 leading-tight">{task.desc}</p>
                    <div className="text-[10px] bg-slate-950 px-2 py-1 rounded text-cyan-400 font-medium">👷: {task.assignedTo}</div>
                    <div className="flex justify-between items-center pt-2 border-t border-slate-800/40">
                      <button onClick={() => deleteTask(task.id)} className="text-[11px] text-red-500/80 hover:text-red-400 font-medium">Drop</button>
                      <div className="flex gap-1">
                        {col !== 'To-Do' && <button onClick={() => moveTask(task.id, col === 'Done' ? 'In Progress' : 'To-Do')} className="bg-slate-950 text-[10px] px-2 py-0.5 rounded border border-slate-800">◀</button>}
                        {col !== 'Done' && <button onClick={() => moveTask(task.id, col === 'To-Do' ? 'In Progress' : 'Done')} className="bg-slate-950 text-[10px] px-2 py-0.5 rounded border border-slate-800">▶</button>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;