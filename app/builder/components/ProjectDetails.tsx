'use client';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useState } from 'react';

type Project = {
  title: string;
  description: string;
  technologies: string;
  liveDemo: string;
};

type FormValues = {
  projects: Project[];
};

export default function ProjectsDetails() {
  const { control, register } = useFormContext<FormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'projects',
  });

  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  // useEffect(() => {
  //   if (fields.length === 0) {
  //     append({ title: '', description: '', technologies: '', liveDemo: '' });
  //   }
  // }, [append, fields.length]);

  const handleNext = () => {
    if (currentProjectIndex < fields.length - 1) {
      setCurrentProjectIndex(currentProjectIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentProjectIndex > 0) {
      setCurrentProjectIndex(currentProjectIndex - 1);
    }
  };

  const handleRemove = (index: number) => {
    remove(index);
    if (index === fields.length - 1 && currentProjectIndex > 0) {
      setCurrentProjectIndex(currentProjectIndex - 1);
    }
  };

  return (
    <div className="m-8 p-8 bg-transparent max-h-[600px] grid gap-6 w-full">
      <h3 className="text-2xl font-bold text-center text-teal-500 mb-0">
        Projects
      </h3>
      <div className="grid gap-4">
        {fields.length > 0 && (
          <motion.div
            key={fields[currentProjectIndex].id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <input
              {...register(`projects.${currentProjectIndex}.title` as const)}
              placeholder="Project Title"
              className="input focus:ring-teal-600 focus:border-teal-600 w-full shadow-lg bg-transparent border-2 border-teal-500 font-semibold text-teal-900 py-2 px-3"
            />
            <textarea
              {...register(`projects.${currentProjectIndex}.description` as const)}
              placeholder="Project Description"
              className="textarea focus:ring-teal-600 focus:border-teal-600 w-full max-h-20 shadow-lg bg-transparent border-2 border-teal-500 font-semibold text-teal-900 py-2 px-3"
            />
            <input
              {...register(`projects.${currentProjectIndex}.technologies` as const)}
              placeholder="Technologies Used"
              className="input focus:ring-teal-600 focus:border-teal-600 w-full shadow-lg bg-transparent border-2 border-teal-500 font-semibold text-teal-900 py-2 px-3"
            />
            <input
              {...register(`projects.${currentProjectIndex}.liveDemo` as const)}
              placeholder="Live Demo URL"
              className="input focus:ring-teal-600 focus:border-teal-600 w-full shadow-lg bg-transparent border-2 border-teal-500 font-semibold text-teal-900 py-2 px-3"
            />
            <button
              type="button"
              onClick={() => handleRemove(currentProjectIndex)}
              className="btn btn-outline text-red-500 hover:bg-red-300 btn-sm border-2 hover:border-black"
            >
              Remove
            </button>
          </motion.div>
        )}
      </div>
      { fields.length !== 0 &&
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentProjectIndex === 0}
            className="btn btn-outline text-teal-500 hover:bg-teal-300 btn-sm border-2 hover:border-teal-600 hover:text-teal-900"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentProjectIndex === fields.length - 1}
            className="btn btn-outline text-teal-500 hover:bg-teal-300 btn-sm border-2 hover:border-teal-600 hover:text-teal-900"
          >
            Next
          </button>
        </div>
      }
      {fields.length < 3 && (
        <button
          type="button"
          onClick={() => append({ title: '', description: '', technologies: '', liveDemo: '' })}
          className="btn btn-outline w-full text-teal-500 hover:bg-teal-300 px-6 py-2 border-2 hover:border-black"
        >
          Add Project
        </button>
      )}
    </div>
  );
}
