const removeVowels = (sentence: string) =>
  sentence
    .split('')
    .filter((c) => !['a', 'e', 'i', 'o', 'u'].includes(c))
    .join('')

describe('RemoveVowels', () => {
  it('should return a string without vowels', () => {
    expect(removeVowels('helloworld')).toBe('hllwrld')
    expect(removeVowels('welcome to geeksforgeeks')).toBe('wlcm t gksfrgks')
    expect(removeVowels('what is your name ?')).toBe('wht s yr nm ?')
  })
})
