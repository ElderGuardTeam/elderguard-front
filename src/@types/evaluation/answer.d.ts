interface EvaluationAnswer {
  evaluationId: string;
  formAnswares: FormAnswer[];
  professionalId: string;
  elderlyId: string;
}

interface FormAnswer {
  formId: string;
  elderlyId: string;
  techProfessionalId: string;
  questionsAnswares: QuestionAnswer[];
}

interface QuestionAnswer {
  questionId: string;
  answerText?: string;
  answerNumber?: number;
  answerImage?: string;
  answerBoolean?: boolean;
  selectedOptionId?: string;
  score?: number;
  optionAnswers?: OptionAnswer[];
}

interface OptionAnswer {
  optionId: string;
  score: number;
  answerText?: string;
  answerNumber?: number;
  answerBoolean?: boolean;
}

interface EvaluationAnswerList {
  id: string
  evaluationId: string
  startedAt: string
  completedAt: any
  status: string
  scoreTotal: number
  created: string
  updated: string
  evaluation: {
    title:string
    id: string
  }
  elderly: {
    id: string
    cpf: string
    name: string
  }
  formAnswares: FormAnswerDetails[]
}

interface FormAnswerDetails {
  formId: string
  totalScore: number
  questionsAnswares: Array<{
    id: string
    questionId: string
    formAnswareId: string
    answerText: string
    answerNumber: string
    answerImage?: string
    answerBoolean: boolean
    selectedOptionId: string
    score: number
    created: string
    updated: string
  }>
}


interface FormAnswerData {
  formId: string
  formTitle: string
  formType: string
  scores: Score[]
}

interface Score {
  evaluationAnswareId: string
  date: string
  totalScore: number
  status: string
}
