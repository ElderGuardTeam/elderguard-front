type AnswerOutput = {
  questionId: string
} & (
  | { score: number }
  | { answerText: string }
  | { answerNumber: number }
  | { answerImage: string }
  | { answerBoolean: boolean }
  | { selectedOptionId: string }
)

export function normalizeAnswers(data: Record<string, any>, formDetails: any): AnswerOutput[] {
  const result: AnswerOutput[] = []

  // Flatten all questions from all sections
  const questionsMap = formDetails.seccions
    .flatMap((sec: any) => sec.questionsIds)
    .reduce((acc: Record<string, any>, question: any) => {
      acc[question.id] = question.type
      return acc
    }, {})

  for (const [questionId, rawAnswer] of Object.entries(data)) {
    const type = questionsMap[questionId]

    if (!type) continue // skip unknown questionId

    switch (type) {
      case 'SCORE':
        result.push({
          questionId,
          score: parseInt(rawAnswer) || 0,
        })
        break

      case 'TEXT':
        result.push({
          questionId,
          answerText: String(rawAnswer),
        })
        break

      case 'NUMBER':
        result.push({
          questionId,
          answerNumber: Number(rawAnswer),
        })
        break

      case 'BOOLEAN':
        result.push({
          questionId,
          answerBoolean: Boolean(rawAnswer),
        })
        break

      case 'IMAGE':
        result.push({
          questionId,
          answerImage: String(rawAnswer),
        })
        break

      case 'SELECT':
        result.push({
          questionId,
          selectedOptionId: String(rawAnswer),
        })
        break

      default:
        // skip unknown type
        break
    }
  }

  return result
}
