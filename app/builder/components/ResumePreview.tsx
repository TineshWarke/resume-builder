import { useFormContext } from 'react-hook-form';
import jsPDF from 'jspdf';
import domToImage from 'dom-to-image';

export const downloadPDF = async () => {
  const element = document.getElementById('resume-preview');
  if (!element) return;

  const imgData = await domToImage.toPng(element);
  const pdf = new jsPDF();
  pdf.addImage(imgData, 'PNG', 0, -10, 210, 0);
  pdf.save('resume.pdf');
};

export default function ResumePreview() {
  const { watch } = useFormContext();
  const data = watch();

  return (
    <div className='h-screen p-4'>
      <div id="resume-preview" className="p-4 mt-4 rounded h-[90vh] w-[calc(90vh/1.414)] bg-white text-black">
        <h1 className="text-2xl font-bold">{data.name}</h1>
        <p>{data.email}</p>
        <p>{data.phone}</p>
        <h2 className="text-lg font-bold mt-4">Education</h2>
        {data.education?.map((edu: any, index: number) => (
          <div key={index}>
            <p>{edu.degree} - {edu.institution}</p>
          </div>
        ))}
        <h2 className="text-lg font-bold mt-4">Experience</h2>
        {data.experience?.map((exp: any, index: number) => (
          <div key={index}>
            <p>{exp.jobTitle} at {exp.company}</p>
          </div>
        ))}
        <h2 className="text-lg font-bold mt-4">Skills</h2>
        <p>{data.skills}</p>
      </div>
    </div>
  );
}
