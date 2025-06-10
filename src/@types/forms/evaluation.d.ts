interface Evaluation {
  title: string
  description: string
  formsIds: string[]
}

interface EvaluationDetails {
  id: string
  title: string
  description: string
  created: string
  updated: string
  formsRel: Array<{
    order: number
    form: Form
  }>
}

interface EvaluationList{
  id: string
  title: string
  description: string
  created: string
  updated: string
}

interface AnswerEvaluation {
  id: string
  title: string
  description: string
  created: string
  updated: string
  formsRel: FormsRel[]
}

interface FormsRel {
  order: number
  form: AnswerForm
}

interface AnswerForm {
  id: string
  title: string
  description: string
}
