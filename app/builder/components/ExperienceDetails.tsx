// 'use client'
import { useFieldArray, useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';
// import { useEffect } from 'react';

export default function EducationDetails() {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: 'experience' });

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  // useEffect(() => {
  //   append({ jobTitle: '', company: '' })
  // }, [])

  return (
    <motion.div
      className="m-8 p-8 rounded-lg bg-transparent w-full"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h3
        className="text-2xl font-bold mb-2 text-lime-500"
        variants={itemVariants}
      >
        Experience
      </motion.h3>
      {fields.map((field, index) => (
        <motion.div key={field.id} className="mb-4" variants={itemVariants}>
          <input
            {...register(`experience.${index}.jobTitle`)}
            placeholder="Job Title (e.g., Software Engineer)"
            className="input focus:border-lime-800 w-full mb-2 shadow-lg bg-transparent border-2 border-lime-500 font-semibold text-lime-900"
          />
          <input
            {...register(`experience.${index}.company`)}
            placeholder="Company (e.g., ABC Corp)"
            className="input focus:border-lime-800 w-full mb-2 shadow-lg bg-transparent border-2 border-lime-500 font-semibold text-lime-900"
          />
          <div className="flex gap-4 mb-2">
            <input
              {...register(`experience.${index}.startDate`)}
              type="date"
              className="input w-full shadow-lg bg-transparent border-2 border-lime-500 focus:border-lime-800 font-semibold text-lime-900"
            />
            <input
              {...register(`experience.${index}.endDate`)}
              type="date"
              className="input w-full shadow-lg bg-transparent border-2 border-lime-500 focus:border-lime-800 font-semibold text-lime-900"
            />
          </div>
          <input
            {...register(`experience.${index}.description`)}
            placeholder="Describe your role and achievements"
            className="input w-full mb-2 shadow-lg bg-transparent border-2 border-lime-500 font-semibold text-lime-900 focus:border-lime-800"
          />
          <button
            type="button"
            onClick={() => remove(index)}
            className="btn btn-outline text-red-500 hover:bg-red-300 btn-sm border-2 hover:border-black"
          >
            Remove
          </button>
        </motion.div>
      ))}
      {
        fields.length < 2 && (
          <motion.button
            type="button"
            onClick={() => append({ jobTitle: '', company: '' })}
            className="btn btn-outline text-lime-500 w-full hover:bg-lime-300 mt-4 px-3 border-2 hover:border-black"
            variants={itemVariants}
          >
            Add Experience
          </motion.button>
        )}
    </motion.div>
  );
}
