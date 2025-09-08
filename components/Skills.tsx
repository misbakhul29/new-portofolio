

import React from 'react';
import type { Skill } from '../types';
import Section from './Section';
import SkillIcon from './SkillIcon';
import {
  IconBrandReact,
  IconBrandNextjs,
  IconBrandTypescript,
  IconBrandJavascript,
  IconBrandNodejs,
  IconBrandTailwind,
  IconBrandHtml5,
  IconBrandCss3,
  IconBrandFigma,
  IconBrandGit,
  IconBrandMongodb,
  IconDatabase, // Using a generic database icon for PostgreSQL
} from '@tabler/icons-react';

const skills: { category: string; list: Skill[] }[] = [
  {
    category: 'Frontend',
    list: [
      { name: 'React', icon: <IconBrandReact size={40} stroke={1.5} />, mastery: 'Expert' },
      { name: 'Next.js', icon: <IconBrandNextjs size={40} stroke={1.5} />, mastery: 'Expert' },
      { name: 'TypeScript', icon: <IconBrandTypescript size={40} stroke={1.5} />, mastery: 'Proficient' },
      { name: 'JavaScript', icon: <IconBrandJavascript size={40} stroke={1.5} />, mastery: 'Expert' },
      { name: 'Tailwind CSS', icon: <IconBrandTailwind size={40} stroke={1.5} />, mastery: 'Expert' },
      { name: 'HTML5', icon: <IconBrandHtml5 size={40} stroke={1.5} />, mastery: 'Expert' },
      { name: 'CSS3', icon: <IconBrandCss3 size={40} stroke={1.5} />, mastery: 'Proficient' },
    ],
  },
  {
    category: 'Backend',
    list: [
      { name: 'Node.js', icon: <IconBrandNodejs size={40} stroke={1.5} />, mastery: 'Proficient' },
      { name: 'PostgreSQL', icon: <IconDatabase size={40} stroke={1.5} />, mastery: 'Familiar' },
      { name: 'MongoDB', icon: <IconBrandMongodb size={40} stroke={1.5} />, mastery: 'Familiar' },
    ],
  },
  {
    category: 'Tools & Others',
    list: [
      { name: 'Git', icon: <IconBrandGit size={40} stroke={1.5} />, mastery: 'Proficient' },
      { name: 'Figma', icon: <IconBrandFigma size={40} stroke={1.5} />, mastery: 'Familiar' },
    ],
  },
];

const Skills: React.FC = () => {
  return (
    <Section title="My Skills">
      <div className="space-y-12">
        {skills.map(({ category, list }) => (
          <div key={category}>
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">{category}</h3>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
              {list.map((skill) => (
                <SkillIcon key={skill.name} name={skill.name} icon={skill.icon} mastery={skill.mastery} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Skills;