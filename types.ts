
export enum PresentationType {
  ORAL = 'Oral Presentation',
  POSTER = 'Poster Presentation'
}

export interface AbstractSubmission {
  firstName: string;
  lastName: string;
  email: string;
  institution: string;
  isPresenting: boolean;
  type?: PresentationType;
  title?: string;
  abstract?: string;
}

// Added FeedbackResponse interface to resolve the import error in geminiService.ts
export interface FeedbackResponse {
  score: number;
  suggestions: string;
  alignment: string;
}
