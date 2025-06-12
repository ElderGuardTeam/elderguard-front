interface EvaluationAnswer {
  evaluationId: string;
  formAnswares: FormAnswer[];
  scoreTotal?: number;
}

interface FormAnswer {
  formId: string;
  elderlyId: string;
  techProfessionalId: string;
  questionsAnswares: QuestionAnswer[];
  totalScore?: number;
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
