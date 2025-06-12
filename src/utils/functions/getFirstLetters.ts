export function getFirstLetters(name: string) {
  const words = name.trim().split(' ').filter(Boolean) 
  if (words.length === 0) return ''

  const firstLetter = words[0].charAt(0)
  const lastLetter = words[words.length - 1].charAt(0)

  return (firstLetter + lastLetter).toUpperCase() 
}
