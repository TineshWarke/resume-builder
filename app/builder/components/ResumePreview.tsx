import { useFormContext } from 'react-hook-form';
import jsPDF from 'jspdf';
import domToImage from 'dom-to-image';
import { useState } from 'react';
import Image from 'next/image';

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
            <hr />

            {data.summary &&
              <div>
                <h2 className="text-sm font-bold">Summary</h2>
                <p className='text-xs text-justify indent-4'>{data.summary}</p>
                <hr />
              </div>
            }

            {data.experience.length !== 0 &&
              <div>
                <h2 className="text-sm font-bold">Experience</h2>
                {data.experience?.map((exp: any, index: number) => (
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
                <hr />
              </div>
            }

            {data.projects.length !== 0 &&
              <div>
                <h2 className="text-xs font-bold">Projects</h2>
                {data.projects?.map((pro: any, index: number) => (
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
                <hr />
              </div>
            }

            {data.skills.length !== 0 &&
              <div>
                <h2 className="text-sm font-bold">Technical Skills</h2>
                <p className='text-xs'>{data.skills}</p>
                <hr />
              </div>
            }

            {data.education.length !== 0 &&
              <div>
                <h2 className="text-sm font-bold">Education</h2>
                {data.education?.map((edu: any, index: number) => (
                  <div key={index}>
                    <p className='text-xs'>{edu.degree} - {edu.institution}</p>
                  </div>
                ))}
                <hr />
              </div>
            }

            {data.coursework.length !== 0 &&
              <div>
                <h2 className="text-sm font-bold">Relevant Coursework</h2>
                {data.coursework?.map((course: any, index: number) => (
                  <div key={index}>
                    <p className='text-xs'>{course.courseName}</p>
                  </div>
                ))}
                <hr />
              </div>
            }

            {data.extracurriculars.length !== 0 &&
              <div>
                <h2 className="text-sm font-bold">Extracurriculars / Certificates</h2>
                {data.extracurriculars?.map((other: any, index: number) => (
                  <div key={index}>
                    <p className='text-xs'>{other.activity}</p>
                    <p className='text-xs'>{other.organization}</p>
                    <p className='text-xs'>{other.year}</p>
                  </div>
                ))}
                <hr />
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
            <Image src={'/template1.png'} alt='' width={130} height={130} className='rounded-md'/>
          </div>
        <div onClick={() => setTemplate(2)}
          className={`h-[25vh] w-[calc(25vh/1.414)] mx-auto cursor-pointer bg-white m-5 rounded-md border-accent ${template === 2 ? 'border-4' : ''}`}></div>
        <div onClick={() => setTemplate(3)}
          className={`h-[25vh] w-[calc(25vh/1.414)] mx-auto cursor-pointer bg-white m-5 rounded-md border-accent ${template === 3 ? 'border-4' : ''}`}></div>
      </div>
    </div>
  );
}
