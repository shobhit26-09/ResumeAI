interface ResumeAnalysisRequest {
  text: string;
}

export interface Section {
  score: number;
}

export interface Sections {
  [key: string]: Section;
  content: Section;
  formatting: Section;
  keywords: Section;
  relevance: Section;
}

export interface Insight {
  type: "positive" | "warning" | "negative";
  text: string;
}

export interface Recommendation {
  category: "content" | "keywords" | "formatting" | "other";
  title: string;
  description: string;
  examples?: string;
}

export interface ATSScores {
  readability: number;
  keywords: number;
  formatting: number;
}

export interface AnalysisResultData {
  overallScore: number;
  sections: Sections;
  keyInsights: Insight[];
  recommendations: Recommendation[];
  atsScores: ATSScores;
  detectedKeywords: string[];
}

export interface SavedAnalysis {
  id: string;
  timestamp: number;
  filename: string;
  overallScore: number;
  results: AnalysisResultData;
}

const GEMINI_API_KEY = "AIzaSyAEvHNa-fRhkLRnEyLHhR2Cp9t8memXYSg";
const API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent";

import * as pdfjsLib from 'pdfjs-dist';
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export const analyzeResume = async (fileContent: string): Promise<AnalysisResultData> => {
  try {
    console.log("Analyzing resume with content length:", fileContent.length);
    
    const cleanContent = await extractReadableText(fileContent);
    console.log("Cleaned content length:", cleanContent.length);
    
    if (cleanContent.length < 50) {
      throw new Error("Could not extract sufficient text from the resume. Please try a different file format.");
    }
    
    const prompt = `
      Analyze this resume content and provide a detailed, creative, and personalized analysis. Be specific and reference actual content from the resume:

      "${cleanContent.substring(0, 12000)}"
      
      Provide a thorough analysis that includes:
      1. Overall assessment of the resume's effectiveness
      2. Specific strengths and weaknesses found in the actual content
      3. Detailed suggestions for improvement based on current industry standards
      4. Analysis of keyword optimization and ATS compatibility
      5. Formatting and presentation evaluation
      
      Format your response as a JSON object with this structure:
      {
        "overallScore": (calculated score 0-100 based on comprehensive analysis),
        "sections": {
          "content": {"score": (0-100)},
          "formatting": {"score": (0-100)},
          "keywords": {"score": (0-100)},
          "relevance": {"score": (0-100)}
        },
        "keyInsights": [
          {"type": "positive/warning/negative", "text": "specific insight referencing actual content"}
        ],
        "recommendations": [
          {
            "category": "content/keywords/formatting/other",
            "title": "specific action item",
            "description": "detailed explanation referencing actual resume content",
            "examples": "specific example from or for the resume"
          }
        ],
        "atsScores": {
          "readability": (0-100),
          "keywords": (0-100),
          "formatting": (0-100)
        },
        "detectedKeywords": [
          "actual keywords found in the resume"
        ]
      }

      IMPORTANT:
      - Analyze thoroughly regardless of the format or content style
      - Reference specific details from the resume in your analysis
      - Be constructive and specific in your assessment
      - Provide actionable recommendations based on the actual content
      - Return ONLY valid JSON, nothing else
    `;

    console.log("Sending request to Gemini API...");
    
    const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.6,
          topK: 32,
          topP: 0.9,
          maxOutputTokens: 8192,
        }
      })
    });

    const data = await response.json();
    console.log("Received response from Gemini API");
    
    if (!response.ok) {
      console.error("API error:", data);
      throw new Error(`API error: ${data.error?.message || 'Unknown error'}`);
    }

    if (!data.candidates || !data.candidates[0]?.content?.parts?.length) {
      console.error("Invalid response format from Gemini API:", data);
      throw new Error("Invalid response format from Gemini API");
    }

    const generatedText = data.candidates[0].content.parts[0].text;
    console.log("Generated text length:", generatedText.length);
    
    const jsonMatch = generatedText.match(/```json\n([\s\S]*?)\n```/) || 
                      generatedText.match(/```([\s\S]*?)```/) ||
                      generatedText.match(/\{[\s\S]*\}/) ||
                      [null, generatedText];
    
    let cleanedJsonText = (jsonMatch[1] || jsonMatch[0] || generatedText).trim();
    
    if (!cleanedJsonText.startsWith('{')) {
      const startIndex = cleanedJsonText.indexOf('{');
      if (startIndex >= 0) {
        cleanedJsonText = cleanedJsonText.substring(startIndex);
      }
    }
    
    if (!cleanedJsonText.endsWith('}')) {
      const endIndex = cleanedJsonText.lastIndexOf('}');
      if (endIndex >= 0) {
        cleanedJsonText = cleanedJsonText.substring(0, endIndex + 1);
      }
    }
    
    console.log("Attempting to parse JSON response");
    
    try {
      const analysisResult = JSON.parse(cleanedJsonText) as AnalysisResultData;
      
      const validatedResult = validateAndFixAnalysisResult(analysisResult);
      console.log("Successfully parsed and validated analysis result");
      
      return validatedResult;
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError, "Raw JSON:", cleanedJsonText);
      throw new Error("Could not parse analysis results from AI response");
    }
  } catch (error) {
    console.error("Error analyzing resume:", error);
    throw new Error("Failed to analyze resume: " + (error as Error).message);
  }
};

const extractReadableText = async (content: string): Promise<string> => {
  if (!content || content.length < 10) {
    return content;
  }
  
  try {
    // Check for PDF binary content
    const isPDF = content.includes('%PDF') || 
                  content.includes('%%EOF') || 
                  content.includes('/Type /Page') ||
                  content.includes('/Contents');
    
    // Check for Office XML format
    const isDocx = content.includes('PK') && 
                  (content.includes('word/') || 
                  content.includes('[Content_Types].xml'));
                   
    // Check for older Office binary format
    const isDoc = content.includes('\xD0\xCF\x11\xE0') || 
                 content.includes('Microsoft Word');
    
    console.log("File format detection: PDF=", isPDF, "DOCX=", isDocx, "DOC=", isDoc);
    
    if (isPDF) {
      return await extractPDFText(content);
    } else if (isDocx || isDoc) {
      return extractOfficeDocumentText(content);
    }
    
    // For plain text files
    return cleanTextContent(content);
  } catch (error) {
    console.error("Error in text extraction:", error);
    return cleanTextContent(content);
  }
};

const extractPDFText = async (pdfContent: string): Promise<string> => {
  try {
    console.log("Extracting text using PDF.js");
    
    // Convert binary string to array buffer
    const bytes = new Uint8Array(pdfContent.length);
    for (let i = 0; i < pdfContent.length; i++) {
      bytes[i] = pdfContent.charCodeAt(i) & 0xff;
    }
    
    // Load the PDF document
    const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
    console.log("PDF loaded successfully, pages:", pdf.numPages);
    
    let fullText = '';
    
    // Extract text from each page
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      try {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        
        // Extract and join the text items
        const pageText = textContent.items
          .map((item: any) => {
            // Some PDF.js versions return different object structures
            if (typeof item.str === 'string') {
              return item.str;
            } else if (item.chars) {
              return item.chars.map((char: any) => char.unicode).join('');
            }
            return '';
          })
          .join(' ');
        
        fullText += pageText + '\n\n';
      } catch (pageError) {
        console.error(`Error extracting text from page ${pageNum}:`, pageError);
        // Continue with other pages even if one fails
      }
    }
    
    // Clean up the extracted text
    let cleanedText = fullText
      .replace(/\s+/g, ' ')
      .replace(/(\w)-\s+(\w)/g, '$1$2')  // Fix hyphenated words
      .replace(/\s+([.,;:?!])/g, '$1')   // Fix spacing before punctuation
      .trim();
    
    console.log("PDF.js extraction complete, extracted text length:", cleanedText.length);
    
    if (cleanedText.length < 100) {
      // Fall back to the old extraction methods if PDF.js extraction is insufficient
      console.log("PDF.js extraction produced insufficient text, falling back to pattern-based extraction");
      
      // Extract potential text using various patterns
      const extractionPatterns = [
        // Extract parenthesized text (common PDF text format)
        /\(([^()]{3,})\)/g,
        // Look for words and sentences
        /[A-Za-z][A-Za-z0-9\s.,;:'"!?@#$%^&*()\-+=]{4,}/g,
        // Look for text blocks with reasonable words
        /[A-Za-z][a-z]{2,}(?:\s+[A-Za-z][a-z]*){3,}/g
      ];
      
      for (const pattern of extractionPatterns) {
        const matches = pdfContent.match(pattern) || [];
        for (const match of matches) {
          let text = match;
          // Clean up parenthesized text
          if (text.startsWith('(') && text.endsWith(')')) {
            text = text.substring(1, text.length - 1);
          }
          
          // Only include meaningful text chunks
          if (text.length > 5 && /[A-Za-z]{3,}/.test(text) && !/^\s*[\d.]+\s*$/.test(text)) {
            cleanedText += text + ' ';
          }
        }
      }
    }
    
    return cleanedText || "This PDF document could not be properly analyzed. Please try converting it to a text format.";
    
  } catch (error) {
    console.error("Error in PDF.js text extraction:", error);
    return "There was an error processing your PDF. Please try a different format or convert to plain text.";
  }
};

const extractOfficeDocumentText = (content: string): string => {
  try {
    let extractedText = '';
    
    // For DOCX/XML formats
    if (content.includes('word/document.xml') || content.includes('[Content_Types].xml')) {
      console.log("Extracting text from DOCX format");
      
      // Extract text from XML tags
      const xmlTextTags = [
        /<w:t[^>]*>([^<]*)<\/w:t>/g,          // Word text tags
        /<a:t[^>]*>([^<]*)<\/a:t>/g,          // Other text tags
        />([^<]{3,})</g                        // Text between XML tags
      ];
      
      for (const pattern of xmlTextTags) {
        const matches = content.match(pattern) || [];
        for (const match of matches) {
          const text = match.replace(/<[^>]+>/g, '');
          if (text.trim().length > 0) {
            extractedText += text + ' ';
          }
        }
      }
    }
    
    // For DOC binary formats and general fallback
    if (extractedText.length < 100) {
      console.log("Using binary document extraction or fallback method");
      
      // Extract text based on common patterns in binary documents
      const textPatterns = [
        // Look for sequences that appear to be words/sentences
        /[A-Za-z][A-Za-z0-9\s.,;:'"!?@#$%^&*()-+=]{5,}/g,
        // Look for capitalized phrases (likely headings)
        /[A-Z][A-Z\s]{3,}/g,
        // Look for text blocks
        /[A-Za-z][a-z]{2,}(?:\s+[A-Za-z][a-z]*){3,}/g
      ];
      
      for (const pattern of textPatterns) {
        const matches = content.match(pattern) || [];
        for (const match of matches) {
          if (match.length > 5 && /[A-Za-z]{3,}/.test(match)) {
            extractedText += match + ' ';
          }
        }
      }
    }
    
    // Clean up the extracted text
    extractedText = extractedText
      .replace(/\s+/g, ' ')
      .replace(/\u0000/g, '')              // Remove null bytes
      .replace(/[\x00-\x1F\x7F]/g, '')     // Remove control characters
      .replace(/(\w)-\s+(\w)/g, '$1$2')    // Fix hyphenated words
      .trim();
    
    console.log("Office document extraction complete, text length:", extractedText.length);
    
    if (extractedText.length < 100) {
      return "This document format made text extraction difficult. Please consider saving your document as plain text for better analysis.";
    }
    
    return extractedText;
  } catch (error) {
    console.error("Error in Office document text extraction:", error);
    return "This document could not be properly analyzed. Please try saving it as plain text format.";
  }
};

const cleanTextContent = (text: string): string => {
  if (!text || text.length < 10) {
    return text;
  }
  
  return text
    .replace(/\\n/g, '\n')
    .replace(/\\t/g, ' ')
    .replace(/\\r/g, '')
    .replace(/\s+/g, ' ')
    .replace(/[\x00-\x1F\x7F]/g, '')
    .replace(/\r\n|\r|\n/g, '\n')
    .trim();
};

export const extractTextFromFile = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    console.log("Extracting text from file:", file.name, "Type:", file.type);
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      const content = e.target?.result as string;
      console.log("File read complete, content length:", content.length);
      
      // Process based on file type
      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        console.log("Processing PDF file");
        try {
          const extractedText = await extractReadableText(content);
          resolve(extractedText);
        } catch (error) {
          console.error("Error extracting PDF text:", error);
          reject(new Error("Error extracting text from PDF"));
        }
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
                file.name.toLowerCase().endsWith('.docx')) {
        console.log("Processing DOCX file");
        try {
          const extractedText = await extractReadableText(content);
          resolve(extractedText);
        } catch (error) {
          console.error("Error extracting DOCX text:", error);
          reject(new Error("Error extracting text from DOCX"));
        }
      } else if (file.type === 'application/msword' || 
                file.name.toLowerCase().endsWith('.doc')) {
        console.log("Processing DOC file");
        try {
          const extractedText = await extractReadableText(content);
          resolve(extractedText);
        } catch (error) {
          console.error("Error extracting DOC text:", error);
          reject(new Error("Error extracting text from DOC"));
        }
      } else {
        // For plain text files
        console.log("Processing plain text file");
        resolve(content);
      }
    };
    
    reader.onerror = (e) => {
      console.error("Error reading file:", e);
      reject(new Error('Error reading file'));
    };
    
    // Use the appropriate reading method based on file type
    if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf') ||
        file.type.includes('officedocument') || file.name.match(/\.(docx|doc)$/i)) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsText(file);
    }
  });
};

const validateAndFixAnalysisResult = (result: Partial<AnalysisResultData>): AnalysisResultData => {
  // Check if all required properties exist and have valid values
  const hasValidStructure = result.overallScore !== undefined && 
                           result.sections !== undefined &&
                           result.keyInsights !== undefined &&
                           result.recommendations !== undefined &&
                           result.atsScores !== undefined;
  
  if (!hasValidStructure) {
    console.warn("Received invalid analysis structure from AI, generating fallback analysis");
    return generateFallbackAnalysis(result);
  }
  
  // Fix any missing or invalid data
  const validResult: AnalysisResultData = {
    overallScore: typeof result.overallScore === 'number' && result.overallScore >= 0 && result.overallScore <= 100 
                  ? result.overallScore : 65,
    sections: {
      content: { score: (result.sections?.content?.score ?? 65) },
      formatting: { score: (result.sections?.formatting?.score ?? 60) },
      keywords: { score: (result.sections?.keywords?.score ?? 70) },
      relevance: { score: (result.sections?.relevance?.score ?? 65) }
    },
    keyInsights: Array.isArray(result.keyInsights) && result.keyInsights.length > 0
                 ? result.keyInsights
                 : [
                     { type: "positive", text: "Your resume contains valuable content that can be analyzed for improvement." },
                     { type: "warning", text: "Consider adding more specific achievements and metrics to strengthen your experience section." },
                     { type: "negative", text: "Your resume may not be optimized for ATS systems based on the format." }
                   ],
    recommendations: Array.isArray(result.recommendations) && result.recommendations.length > 0
                    ? result.recommendations
                    : [
                        {
                          category: "content",
                          title: "Add quantifiable achievements",
                          description: "Include specific metrics and results in your work experience to demonstrate impact.",
                          examples: "Increased website traffic by 45% through implementation of SEO strategies."
                        },
                        {
                          category: "keywords",
                          title: "Optimize for ATS systems",
                          description: "Include relevant industry keywords throughout your resume to pass through applicant tracking systems.",
                          examples: "Add skills and technologies specific to your industry in a dedicated skills section."
                        },
                        {
                          category: "formatting",
                          title: "Improve readability",
                          description: "Use consistent formatting, bullet points, and white space to make your resume more scannable.",
                          examples: "Use 3-5 bullet points per job role, focusing on achievements rather than responsibilities."
                        }
                      ],
    atsScores: {
      readability: (result.atsScores?.readability ?? 65),
      keywords: (result.atsScores?.keywords ?? 70),
      formatting: (result.atsScores?.formatting ?? 60)
    },
    detectedKeywords: Array.isArray(result.detectedKeywords) && result.detectedKeywords.length > 0 
                     ? result.detectedKeywords 
                     : ["skills", "experience", "education", "communication", "teamwork"]
  };
  
  return validResult;
};

const generateFallbackAnalysis = (partialResult: Partial<AnalysisResultData>): AnalysisResultData => {
  return {
    overallScore: 65,
    sections: {
      content: { score: 65 },
      formatting: { score: 60 },
      keywords: { score: 70 },
      relevance: { score: 65 }
    },
    keyInsights: [
      { 
        type: "positive", 
        text: "Your resume has been analyzed and shows potential with some good content elements."
      },
      { 
        type: "warning", 
        text: "Consider enhancing your resume with more specific achievements and relevant keywords for your industry."
      },
      { 
        type: "negative", 
        text: "The resume needs improvements in formatting for better readability and ATS compatibility."
      }
    ],
    recommendations: [
      {
        category: "content",
        title: "Strengthen your experience section",
        description: "Focus on achievements rather than just responsibilities. Use active verbs and include specific metrics.",
        examples: "Instead of 'Responsible for social media', use 'Grew Instagram following by 5,000+ followers in 3 months'"
      },
      {
        category: "keywords",
        title: "Optimize for ATS systems",
        description: "Include relevant industry keywords throughout your resume to pass through applicant tracking systems.",
        examples: "Research job descriptions for positions you're interested in and incorporate those keywords naturally"
      },
      {
        category: "formatting",
        title: "Improve structure and readability",
        description: "Use consistent formatting with clear section headings and bullet points for better readability.",
        examples: "Organize information using headings like 'Experience', 'Education', and 'Skills'"
      },
      {
        category: "other",
        title: "Customize for each application",
        description: "Tailor your resume for each position you apply for by emphasizing relevant experience.",
        examples: "Adjust your summary section to highlight skills most relevant to the specific job description"
      }
    ],
    atsScores: {
      readability: 65,
      keywords: 70,
      formatting: 60
    },
    detectedKeywords: partialResult.detectedKeywords || [
      "communication",
      "teamwork",
      "organization",
      "leadership",
      "project management"
    ]
  };
};

export const saveAnalysisToStorage = (analysis: AnalysisResultData, filename: string): SavedAnalysis => {
  const savedAnalyses = getSavedAnalyses();
  
  const newSavedAnalysis: SavedAnalysis = {
    id: generateId(),
    timestamp: Date.now(),
    filename,
    overallScore: analysis.overallScore,
    results: analysis
  };
  
  const updatedAnalyses = [newSavedAnalysis, ...savedAnalyses];
  localStorage.setItem('savedResumeAnalyses', JSON.stringify(updatedAnalyses));
  
  return newSavedAnalysis;
};

export const getSavedAnalyses = (): SavedAnalysis[] => {
  const savedAnalysesString = localStorage.getItem('savedResumeAnalyses');
  return savedAnalysesString ? JSON.parse(savedAnalysesString) : [];
};

export const deleteSavedAnalysis = (id: string): void => {
  const savedAnalyses = getSavedAnalyses();
  const updatedAnalyses = savedAnalyses.filter(analysis => analysis.id !== id);
  localStorage.setItem('savedResumeAnalyses', JSON.stringify(updatedAnalyses));
};

export const getSavedAnalysisById = (id: string): SavedAnalysis | null => {
  const savedAnalyses = getSavedAnalyses();
  return savedAnalyses.find(analysis => analysis.id === id) || null;
};

const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};
