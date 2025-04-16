interface Question {
  title: string;
  description: string;
  type: string;
  options?: QuestionOption[];
}

interface QuestionOption {
  description: string;
  score: number;
}