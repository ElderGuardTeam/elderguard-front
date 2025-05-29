interface ValidatePatient {
  name: string;
  cpf: string;
  sex: string;
}

interface InitiateEvaluation {
  evaluationId: string
  elderlyData: ValidatePatient
}