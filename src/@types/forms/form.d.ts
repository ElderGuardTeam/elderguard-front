interface Form {
  title: string
  description: string
  type: string
  seccion: Section[]
}

interface Section {
  id: number
  title: string
  rule: Rule | any
  questions: Question[]
}