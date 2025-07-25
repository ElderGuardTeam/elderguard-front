

interface QuestionOption {
  id: string;
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
  rule?: Rule
}

interface Rule {
  id?: string | undefined
  type?: string | null
  maxScore?: number | null | undefined
  operation?: string | null| undefined
  condition?: string | null| undefined
  value1Type?: string | null| undefined
  value2Type?: string | null| undefined
  value1?: number | null | undefined
  value2?: number | null| undefined
  valueIf?: number | null| undefined
  valueThen?: number | null| undefined
  totalItems?: number | null | undefined
}
