interface Form {
  title: string
  description: string
  type: string
  seccions: Section[]
  rule?: Rule | any
  questionsIds?: any[]
}

interface Section {
  id?: number
  title: string
  rule: Rule | any
  questionsIds: any[]
}

interface FormList {
  id: string
  title: string
  description: string
  type: string
  created: string
  updated: string
}


interface FormDetails{
  id: string
  title: string
  type: string
  description: string
  ruleId?: string
  formId: string
  created: string
  updated: string
  questionsRel: QuestionsRel[]
  seccions: SectionDetails[]
  rule?: Rule
}

interface QuestionsRel {
  seccionId: string
  questionId: string
  question: Question
}

interface SectionDetails {
  id: string
  title: string
  ruleId: string
  formId: string
  created: string
  updated: string
  questionsRel: QuestionsRel[]
  rule: Rule
}

