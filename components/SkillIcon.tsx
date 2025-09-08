import React from 'react';
import type { Skill } from '../types';

const SkillIcon: React.FC<Skill> = ({ name, icon, mastery }) => {
  return (
    <div className="relative flex flex-col items-center gap-2 text-center group">
       <div className="absolute bottom-full mb-3 w-max px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-md text-sm text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
        {mastery}
        <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-700"></div>
      </div>
      <div className="w-20 h-20 bg-slate-900/40 backdrop-blur-md border border-slate-700/80 rounded-full flex items-center justify-center text-slate-400 group-hover:text-white group-hover:border-cyan-400/60 transition-all duration-300 transform group-hover:-translate-y-1 group-hover:scale-110">
        <div className="w-10 h-10">{icon}</div>
      </div>
      <p className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors duration-300">
        {name}
      </p>
    </div>
  );
};

export default SkillIcon;