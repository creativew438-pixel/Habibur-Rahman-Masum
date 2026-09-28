export interface VideoProject {
  id: string;
  youtubeId: string;
  title: string;
  category: string;
  description: string;
  aspectRatio: '16:9' | '9:16';
  resolution?: string;
  tools?: string[];
  metrics?: string;
}

export interface GraphicProject {
  id: number;
  src: string;
  fallbackSrc: string;
  localFilename: string;
  title: string;
  category: string;
  description: string;
  tools?: string[];
}

export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  duration: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
