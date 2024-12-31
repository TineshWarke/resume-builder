import { useFormContext } from 'react-hook-form';
import jsPDF from 'jspdf';
import domToImage from 'dom-to-image';
import { useState } from 'react';
import Image from 'next/image';

interface Experience {
  company: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Project {
  title: string;
  technologies: string;
  liveDemo: string;
  description: string;
}

interface Education {
  institution: string;
  degree: string;
  year: string;
  score: string;
}

interface Course {
  courseName: string;
}

interface Extracurricular {
  activity: string;
  organization: string;
  year: string;
}

export const downloadPDF = async () => {
  const element = document.getElementById('resume-preview');
  if (!element) return;

  const imgData = await domToImage.toPng(element);
  const pdf = new jsPDF();
  pdf.addImage(imgData, 'PNG', -16, -10, 210, 0);
  pdf.save('resume.pdf');
};

export default function ResumePreview() {
  const { watch } = useFormContext();
  const data = watch();
  const [template, setTemplate] = useState<number>(1);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' }); // e.g., Feb 2000
  };


  return (
    <div className='h-screen p-4 flex justify-between'>

      {
        template === 1 ?
          <div id="resume-preview" className="p-4 mt-4 mx-8 rounded h-[90vh] w-[calc(90vh/1.414)] bg-white text-black overflow-scroll">
            <h1 className="text-2xl font-bold text-center">{data.name}</h1>
            <p className='text-xs text-center'>{data.address}</p>
            <div className='flex gap-4 justify-center'>
              <p className='text-xs'>{data.phone}</p>
              <p className='text-xs'>{data.email}</p>
              {data.linkedin &&
                <p className='text-xs'>
                  <a href={data.linkedin} className="text-blue-500" target='_blank'> LinkedIn </a>
                </p>
              }
              {data.portfolio &&
                <p className='text-xs'>
                  <a href={data.portfolio} className="text-blue-500" target='_blank'> Portfolio </a>
                </p>
              }
            </div>

            {data.summary &&
              <div>
                <h2 className="text-sm font-bold">Profile Summary</h2>
                <hr />
                <p className='text-xs text-justify indent-4'>{data.summary}</p>
              </div>
            }

            {data.experience.length !== 0 &&
              <div>
                <h2 className="text-sm font-bold">Experience</h2>
                <hr />
                {data.experience?.map((exp: Experience, index: number) => (
                  <div key={index}>
                    <span className='flex gap-8 justify-between'>
                      <p className='text-xs font-semibold'>{exp.company} - {exp.jobTitle}</p>
                      <p className='text-xs'>
                        {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                      </p>

                    </span>
                    <p className='text-xs text-justify indent-4'>{exp.description}</p>
                  </div>
                ))}
              </div>
            }

            {data.projects.length !== 0 &&
              <div>
                <h2 className="text-xs font-bold">Projects</h2>
                <hr />
                {data.projects?.map((pro: Project, index: number) => (
                  <div key={index}>
                    <div className='flex items-start gap-2'>
                      <p className='text-xs font-semibold'>{pro.title}</p>
                      {pro.technologies &&
                        <p className='text-xs'> | {pro.technologies}</p>}
                      {pro.liveDemo &&
                        <p className='text-xs'> |
                          <a href={pro.liveDemo} className="text-blue-500" target='_blank'> Live Demo </a>
                        </p>}
                    </div>
                    <p className='text-xs text-justify indent-4'>{pro.description}</p>
                  </div>
                ))}
              </div>
            }

            {data.skills.length !== 0 &&
              <div>
                <h2 className="text-sm font-bold">Technical Skills</h2>
                <hr />
                <p className='text-xs'>{data.skills}</p>
              </div>
            }

            {data.education.length !== 0 &&
              <div>
                <h2 className="text-sm font-bold">Education</h2>
                <hr />
                {data.education?.map((edu: Education, index: number) => (
                  <div key={index}>
                    <div className='flex justify-between'>
                      <p className='text-xs font-semibold'>{edu.institution} </p>
                      <p className='text-xs'>{formatDate(edu.year)}</p>
                    </div>
                    <div className='flex justify-between'>
                      <p className='text-xs'>{edu.degree} </p>
                      <p className='text-xs'>{edu.score} </p>
                    </div>
                  </div>
                ))}
              </div>
            }

            {data.coursework.length !== 0 &&
              <div>
                <h2 className="text-sm font-bold">Relevant Coursework</h2>
                <hr />
                <div className='grid grid-cols-2'>
                  {data.coursework?.map((course: Course, index: number) => (
                    <div key={index}>
                      <p className='text-xs'>• {course.courseName}</p>
                    </div>
                  ))}
                </div>
              </div>
            }

            {data.extracurriculars.length !== 0 &&
              <div>
                <h2 className="text-sm font-bold">Extracurriculars / Certificates</h2>
                <hr />
                {data.extracurriculars?.map((other: Extracurricular, index: number) => (
                  <li className="text-xs flex justify-between items-center space-x-1" key={index}>
                    <p>• {other.activity} - {other.organization} - {formatDate(other.year)}</p>
                  </li>
                ))}
              </div>
            }
          </div>
          :
          template === 2 ?
            <div id="resume-preview" className="p-4 mt-4 mx-8 rounded h-[90vh] w-[calc(90vh/1.414)] bg-white text-black overflow-scroll">

            </div>
            :
            <div id="resume-preview" className="p-4 mt-4 mx-8 rounded h-[90vh] w-[calc(90vh/1.414)] bg-white text-black overflow-scroll">

            </div>
      }

      <div className='p-8 mr-8 h-[90vh]'>
        <div onClick={() => setTemplate(1)}
          className={`h-[25vh] w-[calc(25vh/1.414)] mx-auto cursor-pointer bg-white m-5 rounded-md border-accent ${template === 1 ? 'border-4' : ''}`}>
          <Image src={'/template1.png'} alt='' width={130} height={130} className='rounded-md' />
        </div>
        <div onClick={() => setTemplate(2)}
          className={`h-[25vh] w-[calc(25vh/1.414)] mx-auto cursor-pointer bg-white m-5 rounded-md border-accent ${template === 2 ? 'border-4' : ''}`}></div>
        <div onClick={() => setTemplate(3)}
          className={`h-[25vh] w-[calc(25vh/1.414)] mx-auto cursor-pointer bg-white m-5 rounded-md border-accent ${template === 3 ? 'border-4' : ''}`}></div>
      </div>
    </div>
  );
}
