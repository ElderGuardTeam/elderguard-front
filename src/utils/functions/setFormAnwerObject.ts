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

  const questionsMap = formDetails.seccions
    .flatMap((sec: any) => sec.questionsIds)
    .reduce((acc: Record<string, any>, question: any) => {
      acc[question.id] = question.type
      return acc
    }, {})

  for (const [questionId, rawAnswer] of Object.entries(data)) {
    const type = questionsMap[questionId]
    if (!type) continue

    // Evita respostas em branco para tipos de texto/imagem/select
    if (
      (type === 'TEXT' || type === 'IMAGE' || type === 'SELECT') &&
      (rawAnswer === null || rawAnswer === undefined || String(rawAnswer).trim() === '')
    ) {
      continue
    }

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
        console.log('Boolean answer:', rawAnswer, typeof rawAnswer)
        if (rawAnswer === null || rawAnswer === undefined) {
          break
        }
        result.push({
          questionId,
          answerBoolean: rawAnswer === 'true' ? true : false,
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
        break
    }
  }

  return result
}
