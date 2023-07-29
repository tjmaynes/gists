import { LinkedListQueue } from '../data-structures/queue'

const findBinary = (n: number): string[] => {
  const result: string[] = []

  const queue = new LinkedListQueue<string>(n)
  queue.enqueue('1')

  for (let i = 0; i < n; i++) {
    queue.dequeue()

    const currentBinary = queue.getFront()
    if (currentBinary != null) {
      result.push(currentBinary)

      queue.enqueue(`${currentBinary}0`)
      queue.enqueue(`${currentBinary}1`)
    }
  }

  return result
}

describe('#findBinary', () => {
  describe('when given a number', () => {
    it('should return the binary-format for the number', () => {
      expect(findBinary(3)).toStrictEqual(['1', '10', '11'])
      expect(findBinary(5)).toStrictEqual(['1', '10', '11', '100', '101'])
    })
  })
})
