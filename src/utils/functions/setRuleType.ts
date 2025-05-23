export const setRuleType = (rule:Rule) => {
  switch (rule.type) {
    case 'CONDITIONAL': 
      return `Se a pontuação for ${rule.condition} que ${rule.value1} então ${rule.operation} ${rule.value2}`
    case 'SUM':
      return `Pontuação máxima: ${rule.maxScore}`
    case 'ARITHMETIC':
      return `${rule.value1Type === 'score' ? 'Pontuação' : rule.value1} ${rule.operation} ${rule.value2Type === 'score' ? 'pontuação' : rule.value2}`
  }
}