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