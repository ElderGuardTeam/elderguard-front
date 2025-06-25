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

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export async function normalizeAnswers(
  data: Record<string, any>,
  formDetails: any
): Promise<AnswerOutput[]> {
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
        if (rawAnswer === null || rawAnswer === undefined) break
        result.push({
          questionId,
          answerBoolean: rawAnswer === 'true' ? true : false,
        })
        break

        case 'IMAGE':
          let base64Image = ''
        
          base64Image = await fileToBase64(rawAnswer[0]) 
        
          result.push({
            questionId,
            answerImage: base64Image,
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
