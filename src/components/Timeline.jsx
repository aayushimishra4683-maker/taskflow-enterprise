
import React from 'react';

const Timeline = ({ tasks }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white uppercase tracking-wide">Historical Sprint & Milestones Timeline</h2>
      <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 min-h-100">
        {tasks.length === 0 ? (
          <p className="text-xs text-slate-600 text-center py-20 font-mono">No nodes deployed to track inside this module.</p>
        ) : (
          <div className="relative border-l-2 border-slate-800 pl-6 space-y-6 ml-2">
            {tasks.map(task => (
              <div key={task.id} className="relative">
                <div className={`absolute -left-7.75 top-1 w-2.5 h-2.5 rounded-full ${task.category === 'Done' ? 'bg-emerald-400' : 'bg-amber-400'}`}></div>
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl max-w-2xl space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-mono"><span className="text-cyan-400 font-bold">{task.date}</span><span className="text-slate-500 uppercase">Stage: {task.category}</span></div>
                  <h4 className="font-bold text-white text-sm">{task.title}</h4>
                  <p className="text-slate-400 text-xs">{task.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Timeline;