interface Form {
  title: string
  description: string
  type: string
  seccions: Section[]
}

interface Section {
  id: number
  title: string
  rule: Rule | any
  questionsIds: any[]
}