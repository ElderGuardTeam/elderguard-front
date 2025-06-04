export function transformApiResponseToForm(apiResponse: any): Form {
  return {
    id: apiResponse.id,
    title: apiResponse.title,
    description: apiResponse.description,
    type: apiResponse.type,
    rule: apiResponse.rule?.id,
    questionsIds: [],  
    seccions: apiResponse.seccions.map((seccion: any) => ({
      id: seccion.id, 
      title: seccion.title,
      rule: seccion.rule,
      questionsIds: seccion.questionsRel.map((qr: any) => ({
        id: qr.question.id,
        title: qr.question.title,
        description: qr.question.description,
        type: qr.question.type,
        created: qr.question.created,
        updated: qr.question.updated,
        options: qr.question.options
      }))
    }))
  }
}