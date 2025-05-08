
import { Mail, Phone, Globe, Calendar, ExternalLink } from "lucide-react";

export default function ResumePreview({ data }) {
  const hasData = data && Object.keys(data).length > 0;
  
  if (!hasData) {
    return (
      <div className="w-full h-full flex items-center justify-center p-10 border rounded-lg bg-muted/30">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">
            Your resume preview will appear here
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Fill out the form to see a live preview
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className="w-full min-h-full p-8 border rounded-lg bg-white dark:bg-gray-900 text-black dark:text-white">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">{data.personalInfo?.name || 'Your Name'}</h1>
        <h2 className="text-lg text-gray-700 dark:text-gray-300 mb-3">{data.personalInfo?.title || 'Professional Title'}</h2>
        
        <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400">
          {data.personalInfo?.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-3.5 w-3.5" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo?.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-3.5 w-3.5" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo?.website && (
            <div className="flex items-center gap-1">
              <Globe className="h-3.5 w-3.5" />
              <span>{data.personalInfo.website}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo?.summary && (
        <div className="mb-6">
          <h3 className="text-md font-bold border-b pb-1 mb-2">Professional Summary</h3>
          <p className="text-sm text-gray-800 dark:text-gray-300">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && data.experience[0].company && (
        <div className="mb-6">
          <h3 className="text-md font-bold border-b pb-1 mb-2">Experience</h3>
          
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-semibold">{exp.position}</h4>
                  <h5 className="text-sm text-gray-700 dark:text-gray-300">{exp.company}</h5>
                </div>
                {(exp.startDate || exp.endDate) && (
                  <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {exp.startDate && (
                      <span>{formatDate(exp.startDate)}</span>
                    )}
                    {exp.startDate && (exp.endDate || exp.current) && <span> - </span>}
                    {exp.current ? (
                      <span>Present</span>
                    ) : exp.endDate ? (
                      <span>{formatDate(exp.endDate)}</span>
                    ) : null}
                  </div>
                )}
              </div>
              {exp.description && <p className="text-xs mt-1 text-gray-800 dark:text-gray-300">{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && data.education[0].institution && (
        <div className="mb-6">
          <h3 className="text-md font-bold border-b pb-1 mb-2">Education</h3>
          
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-semibold">{edu.institution}</h4>
                  <h5 className="text-sm text-gray-700 dark:text-gray-300">{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h5>
                </div>
                {(edu.startDate || edu.endDate) && (
                  <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {edu.startDate && (
                      <span>{formatDate(edu.startDate)}</span>
                    )}
                    {edu.startDate && edu.endDate && <span> - </span>}
                    {edu.endDate && (
                      <span>{formatDate(edu.endDate)}</span>
                    )}
                  </div>
                )}
              </div>
              {edu.description && <p className="text-xs mt-1 text-gray-800 dark:text-gray-300">{edu.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills && data.skills.filter(s => s).length > 0 && (
        <div className="mb-6">
          <h3 className="text-md font-bold border-b pb-1 mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {data.skills.filter(s => s).map((skill, index) => (
              <span key={index} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-gray-800 dark:text-gray-200">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {data.certifications && data.certifications.filter(c => c.name || c.url).length > 0 && (
        <div>
          <h3 className="text-md font-bold border-b pb-1 mb-2">Certifications & Awards</h3>
          <ul className="list-disc list-inside text-sm text-gray-800 dark:text-gray-300">
            {data.certifications.filter(c => c.name || c.url).map((cert, index) => (
              <li key={index} className="flex items-center gap-1 mb-1">
                {cert.url ? (
                  <>
                    <a 
                      href={cert.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                    >
                      {cert.name || cert.url}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </>
                ) : (
                  cert.name
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
