'use client';
import { FormProvider, useForm } from 'react-hook-form';
import PersonalDetails from './components/PersonalDetails';
import EducationDetails from './components/EducationDetails';
import ExperienceDetails from './components/ExperienceDetails';
import SkillsSection from './components/SkillsSection';
import ResumePreview, { downloadPDF } from './components/ResumePreview';
import { ResumeData } from './types';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ProjectsDetails from './components/ProjectDetails';
import ExtracurricularCertificates from './components/ExtracurricularCertificates';
import RelevantCoursework from './components/RelevantCoursework';

export default function BuilderPage() {
    const methods = useForm<ResumeData>({ defaultValues: { experience: [], projects: [], skills: [], education: [], coursework: [], extracurriculars: [] } });

    const onSubmit = (data: ResumeData) => {
        console.log(data); // Here you can process or send data to an API
    };

    const containerRef = useRef<HTMLDivElement>(null);

    const scrollToSection = (direction: 'up' | 'down') => {
        if (containerRef.current) {
            const currentScroll = containerRef.current.scrollTop;
            const sectionHeight = window.innerHeight * 0.9;
            const newScroll =
                direction === 'down'
                    ? currentScroll + sectionHeight
                    : currentScroll - sectionHeight;
            containerRef.current.scrollTo({
                top: newScroll,
                behavior: 'smooth',
            });
        }
    };

    // Simple fade-in animation for sections
    const sectionVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    // Button fade-in animation
    const buttonVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-base-100">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } }}
                    className="relative h-[90vh] m-8 mr-0"
                >
                    {/* Scrollable container */}
                    <motion.div
                        ref={containerRef}
                        className="overflow-y-auto h-full rounded-box snap-y snap-mandatory scroll-smooth"
                    >
                        <motion.div
                            variants={sectionVariants}
                            transition={{ duration: 0.4 }}
                            className="snap-start h-full flex items-center justify-center bg-cyan-100"
                        >
                            <PersonalDetails />
                        </motion.div>
                        <motion.div
                            variants={sectionVariants}
                            transition={{ duration: 0.4 }}
                            className="snap-start h-full flex items-center justify-center bg-lime-100"
                        >
                            <ExperienceDetails />
                        </motion.div>
                        <motion.div
                            variants={sectionVariants}
                            transition={{ duration: 0.4 }}
                            className="snap-start h-full flex items-center justify-center bg-teal-100"
                        >
                            <ProjectsDetails />
                        </motion.div>
                        <motion.div
                            variants={sectionVariants}
                            transition={{ duration: 0.4 }}
                            className="snap-start h-full flex items-center justify-center bg-rose-100"
                        >
                            <SkillsSection />
                        </motion.div>
                        <motion.div
                            variants={sectionVariants}
                            transition={{ duration: 0.4 }}
                            className="snap-start h-full flex items-center justify-center bg-amber-100"
                        >
                            <EducationDetails />
                        </motion.div>
                        <motion.div
                            variants={sectionVariants}
                            transition={{ duration: 0.4 }}
                            className="snap-start h-full flex items-center justify-center bg-emerald-100"
                        >
                            <RelevantCoursework />
                        </motion.div>
                        <motion.div
                            variants={sectionVariants}
                            transition={{ duration: 0.4 }}
                            className="snap-start h-full flex items-center justify-center bg-sky-100"
                        >
                            <ExtracurricularCertificates />
                        </motion.div>
                        <motion.div
                            variants={sectionVariants}
                            transition={{ duration: 0.4 }}
                            className="snap-start h-full flex items-center justify-center bg-gray-300"
                        >
                            <button
                                // type="submit"
                                onClick={downloadPDF}
                                className="btn btn-outline text-gray-500 hover:bg-gray-300 border-2 text-lg hover:border-black"
                            >
                                Download PDF
                            </button>
                        </motion.div>
                    </motion.div>

                    {/* Up and Down Arrows */}
                    <motion.button
                        onClick={() => scrollToSection('up')}
                        className="absolute right-2 top-[38vh] rounded-full p-0 hover:scale-105 active:scale-95"
                        initial="hidden"
                        animate="visible"
                        variants={buttonVariants}
                        transition={{ duration: 0.4 }}
                    >
                        <Image src={'/up-arrow.png'} alt='↑' width={35} height={35} />
                    </motion.button>
                    <motion.button
                        onClick={() => scrollToSection('down')}
                        className="absolute right-2 bottom-[38vh] rounded-full p-0 hover:scale-105 active:scale-95"
                        initial="hidden"
                        animate="visible"
                        variants={buttonVariants}
                        transition={{ duration: 0.4 }}
                    >
                        <Image src={'/down-arr.png'} alt='↓' width={35} height={35} />
                    </motion.button>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <ResumePreview />
                </motion.div>
            </form>
        </FormProvider>
    );
}
