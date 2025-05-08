
# ResumeAI - AI-Powered Resume Builder & Analyzer

![ResumeAI](public/og-image.png)

ResumeAI is a comprehensive web application that helps job seekers create professional resumes and get AI-powered feedback to improve their job application materials.

## 📋 Project Overview

ResumeAI is built to modernize the resume creation process by leveraging artificial intelligence to help job seekers create more effective resumes. The platform offers two main tools:

1. **AI Resume Builder**: Create polished, ATS-friendly resumes with AI assistance
2. **AI Resume Analyzer**: Get instant feedback and improvement suggestions for existing resumes

## 🚀 Features

### Resume Builder
- Interactive form-based resume creation
- Real-time preview of the resume as you build
- AI-assisted content suggestions
- Professional formatting and layout
- One-click PDF export

### Resume Analyzer
- Resume scoring and evaluation
- Detailed feedback on content, structure, and keywords
- Specific improvement suggestions for each section
- ATS compatibility checking
- Save and compare multiple analyses

### Additional Features
- Multiple professional templates
- User authentication and saved resumes
- Responsive design for all devices
- Dark/light mode support
- ATS-friendly outputs

## 🛠️ Technology Stack

### Frontend
- **React 18**: Component-based UI library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn UI**: High-quality React components
- **React Router**: Page navigation and routing
- **React Query**: Data fetching and state management
- **Clerk**: User authentication and management
- **Lucide React**: Icon library
- **HTML2Canvas & jsPDF**: PDF generation

### Build Tools
- **Vite**: Fast, modern frontend build tool
- **PostCSS**: CSS processing

### Key Libraries
- **html2canvas**: Convert HTML to canvas for PDF export
- **jsPDF**: Generate PDF files from canvas
- **date-fns**: Date manipulation utilities
- **recharts**: Charting and data visualization
- **zod**: Schema validation
- **class-variance-authority**: Component styling management

## 🏗️ Project Structure

```
src/
├── components/            # Reusable UI components
│   ├── ui/                # Basic UI components (shadcn)
│   ├── analyzer/          # Resume analyzer components
│   └── ...                # Other component categories
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and libraries
├── pages/                 # Page components
│   ├── Index.tsx          # Homepage
│   ├── Builder.tsx        # Resume builder page
│   ├── Analyzer.tsx       # Resume analyzer page
│   ├── Templates.tsx      # Resume templates page
│   ├── Pricing.tsx        # Pricing page
│   ├── FeaturesPage.tsx   # Features page
│   └── NotFound.tsx       # 404 page
├── services/              # Business logic and API services
└── App.tsx                # Main application component with routing
```

## 🔒 Authentication Flow

The application uses Clerk for authentication with the following flow:

1. Users can browse public pages (Home, Features, Templates, Pricing) without authentication
2. Protected routes (Builder, Analyzer) require user sign-in
3. Sign-in/sign-up pages are provided with customized UI
4. After authentication, users are redirected to the homepage

## 🎨 Design System

ResumeAI features a modern, clean design with:

- Gradient accents using primary colors (blue, indigo)
- Responsive layouts adapting to different screen sizes
- Interactive animations and transitions
- Dark/light mode support through Tailwind theming
- Consistent spacing and typography

## 💾 Data Management

- Resume data is managed through React state
- Analyses are stored in browser storage for later access
- User authentication data is handled securely by Clerk

## 🧩 Core Components

### Resume Builder Components
- `ResumeForm`: Multi-section form for resume data input
- `ResumePreview`: Live preview of the resume being created
- `Builder`: Main page combining form and preview

### Resume Analyzer Components
- `FileUpload`: Upload interface for resume documents
- `AnalysisResult`: Display of the AI analysis results
- `SavedAnalyses`: Management of previously analyzed resumes
- `Analyzer`: Main page orchestrating the analysis workflow

### UI Components
- Responsive `Navbar` with authentication state awareness
- `Hero` section with call-to-action
- `Features` showcase
- `Footer` with navigation and contact information

## 🖨️ Export Flow

The PDF export process:
1. User completes their resume in the builder
2. The HTML resume is captured using html2canvas
3. The canvas is converted to a PDF using jsPDF
4. The file is downloaded to the user's device

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/resumeai.git

# Navigate to the project directory
cd resumeai

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 🔧 Environment Variables

For full functionality, you'll need to set up:

- Clerk authentication keys

## 📚 Additional Resources

- [Clerk Documentation](https://clerk.dev/docs)
- [Shadcn UI Components](https://ui.shadcn.com)
- [React Query Documentation](https://tanstack.com/query/latest)

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
