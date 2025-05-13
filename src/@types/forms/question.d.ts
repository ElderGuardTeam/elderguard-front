interface Question {
  title: string;
  description: string;
  type: string;
  options?: QuestionOption[];
}

interface QuestionOption {
  description: string;
  score: number;
  questionId: string
}

interface QuestionList {
  id: string
  title: string
  description: string
  type: string
  created: string
  updated: string
}

interface QuestionDetails {
  id: string
  title: string
  description: string
  type: string
  created: string
  updated: string
  options?: QuestionOption[]
}
