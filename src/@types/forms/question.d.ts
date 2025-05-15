interface Question {
  title: string;
  description: string;
  type: string;
  options?: QuestionOption[];
  rule?: Rule
}

interface QuestionOption {
  description: string;
  score: number;
  questionId?: string
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

interface Rule {
  id?: string
  type?: string | null
  maxScore?: number | null | number
  operation?: string | null
  condition?: string | null
  value1Type?: string | null
  value2Type?: string | null
  value1?: number | null | number
  value2?: number | null | number
  valueIf?: number | null
  valueThen?: number | null
}
