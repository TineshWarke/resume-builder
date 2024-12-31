// 'use client'
import { useFieldArray, useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';
// import { useEffect } from 'react';

export default function EducationDetails() {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: 'education' });

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
  //   append({ degree: '', institution: '' })
  // }, [])

  return (
    <motion.div
      className="m-8 p-8 rounded-lg bg-transparent w-full"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h3
        className="text-2xl font-bold mb-4 text-amber-500"
        variants={itemVariants}
      >
        Education
      </motion.h3>
      {fields.map((field, index) => (
        <motion.div key={field.id} className="mb-4" variants={itemVariants}>
          <input
            {...register(`education.${index}.degree`)}
            placeholder="Degree"
            className="input focus:border-amber-800 w-full mb-2 shadow-lg bg-transparent border-2 border-amber-500 font-semibold text-amber-900"
          />
          <input
            {...register(`education.${index}.institution`)}
            placeholder="Institution"
            className="input focus:border-amber-800 w-full mb-2 shadow-lg bg-transparent border-2 border-amber-500 font-semibold text-amber-900"
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
            onClick={() => append({ degree: '', institution: '' })}
            className="btn btn-outline w-full text-amber-500 hover:bg-amber-300 mt-4 px-3 border-2 hover:border-black"
            variants={itemVariants}
          >
            Add Education
          </motion.button>
        )}
    </motion.div>
  );
}
