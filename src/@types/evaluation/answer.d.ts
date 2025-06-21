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
  formAnswares: Array<{
    formId: string
  }>
}
