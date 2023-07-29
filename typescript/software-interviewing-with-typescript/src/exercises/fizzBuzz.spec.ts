const fillArray = <T>(value: T, start = 0, end: number): T[] =>
  new Array<T>(end).fill(value, start, end)

const fizzBuzzString = (value: number): string => {
  if (value % 15 == 0) return 'FizzBuzz'
  else if (value % 3 == 0) return 'Fizz'
  else if (value % 5 == 0) return 'Buzz'
  return `${value}`
}

const fizzBuzz = (value: number): string[] =>
  fillArray('', 0, value).reduce(
    (accum, _, index) => accum.concat([fizzBuzzString(index + 1)]),
    [] as string[]
  )

describe('FizzBuzz', () => {
  describe('when given an integer', () => {
    it('should return an array of strings', () => {
      expect(fizzBuzz(3)).toStrictEqual(['1', '2', 'Fizz'])
      expect(fizzBuzz(5)).toStrictEqual(['1', '2', 'Fizz', '4', 'Buzz'])
      expect(fizzBuzz(15)).toStrictEqual([
        '1',
        '2',
        'Fizz',
        '4',
        'Buzz',
        'Fizz',
        '7',
        '8',
        'Fizz',
        'Buzz',
        '11',
        'Fizz',
        '13',
        '14',
        'FizzBuzz',
      ])
    })
  })
})
