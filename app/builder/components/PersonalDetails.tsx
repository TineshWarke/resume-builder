import { useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';

export default function PersonalDetails() {
  const { register } = useFormContext();

  const fields = [
    { name: 'name', placeholder: 'Full Name' },
    { name: 'email', placeholder: 'Email' },
    { name: 'phone', placeholder: 'Phone' },
    { name: 'address', placeholder: 'Address' },
    { name: 'linkedin', placeholder: 'LinkedIn Profile' },
    { name: 'portfolio', placeholder: 'Portfolio Link' },
  ];

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="m-8 p-8 rounded-lg"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h3
        className="text-2xl font-bold mb-4 text-cyan-500"
        variants={itemVariants}
      >
        Personal Details
      </motion.h3>
      {fields.map((field) => (
        <motion.input
          key={field.name}
          {...register(field.name)}
          placeholder={field.placeholder}
          className="input focus:border-cyan-800 w-full mb-4 shadow-lg bg-transparent border-2 border-cyan-500 font-semibold text-cyan-900"
          variants={itemVariants}
        />
      ))}
      <motion.textarea
        {...register('summary')}
        placeholder="Summary (Write a brief about yourself)"
        className="textarea focus:border-cyan-800 w-full mb-4 max-h-24 shadow-lg bg-transparent border-2 border-cyan-500 font-semibold text-cyan-900"
        variants={itemVariants}
      ></motion.textarea>
    </motion.div>
  );
}
