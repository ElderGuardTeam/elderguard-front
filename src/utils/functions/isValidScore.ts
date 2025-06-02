export function isValidScore(score: string | number | undefined | null): boolean {
  if (score === null || score === undefined) return false;

  if (typeof score === 'number') {
    return !isNaN(score);
  }

  if (typeof score === 'string') {
    if (score.trim() === '') return false;
    return !isNaN(Number(score));
  }

  return false;
}
