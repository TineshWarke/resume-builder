import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Define Props for the Component if needed
interface SkillsSectionProps { }

const SkillsSection: React.FC<SkillsSectionProps> = () => {
  const { register, setValue, watch } = useFormContext();
  const [currentSkill, setCurrentSkill] = useState<string>('');
  const [skills, setSkills] = useState<string[]>([]);

  // Sync skills with react-hook-form
  const watchedSkills = watch('skills', skills) as string[];

  const handleAddSkill = (): void => {
    if (skills.length === 20) {
      setCurrentSkill('');
      return;
    }
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      const updatedSkills = [...skills, currentSkill.trim()];
      setSkills(updatedSkills);
      setValue('skills', updatedSkills.join(', ')); // Sync with form
      setCurrentSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string): void => {
    const updatedSkills = skills.filter((skill) => skill !== skillToRemove);
    setSkills(updatedSkills);
    setValue('skills', updatedSkills.join(', ')); // Sync with form
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className="mb-6 w-full px-20">
      <h3 className="text-2xl font-bold mb-4 text-rose-500">Skills</h3>
      <div className="flex flex-wrap gap-3 mb-4">
        <AnimatePresence>
          {skills.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="text-rose-500 pl-3 py-1 pr-2 border-rose-500 border-2 font-semibold rounded-full flex items-center gap-2"
            >
              {skill}
              <button
                type="button"
                className=""
                onClick={() => handleRemoveSkill(skill)}
              >
                <Image src={'/close.png'} alt='✖' width={20} height={20} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-2"
      >
        <input
          type="text"
          value={currentSkill}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCurrentSkill(e.target.value)
          }
          onKeyDown={handleKeyDown}
          placeholder="Enter a skill and press Enter"
          className="input focus:border-rose-800 w-full shadow-lg bg-transparent border-2 border-rose-500 font-semibold text-rose-900"
        />
        <button
          type="button"
          onClick={handleAddSkill}
          className="btn btn-outline text-rose-500 hover:bg-rose-300 border-2 hover:border-black"
        >
          Add
        </button>
      </motion.div>

      <input type="hidden" {...register('skills')} value={watchedSkills} />
    </div>
  );
};

export default SkillsSection;
