export const setEvaluationStatus = (status: string) => {
  switch (status) {
    case 'IN_PROGRESS':
      return (
        <p className="badge badge-outline badge-info">Em andamento</p>
      )
    case 'COMPLETED':
      return (
        <p className="badge badge-outline  badge-success">Concluída</p>
      )
    case 'PAUSED':
      return (
        <p className="badge badge-outline  badge-warning">Pausada</p>
      )
    case 'CANCELED':
      return (
        <p className="badge badge-outline  badge-error">Cancelada</p>
      )
    default:
      return 'Desconhecido';
  }
}