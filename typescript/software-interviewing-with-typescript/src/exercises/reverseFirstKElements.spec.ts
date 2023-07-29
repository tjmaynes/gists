import { LinkedListQueue } from '../data-structures/queue/LinkedListQueue'
import { LinkedListStack } from '../data-structures/stack/LinkedListStack'
import { IQueue } from '../data-structures/types'

const reverseFirstKElements = <T>(input: IQueue<T>, k: number): IQueue<T> => {
  if (input.size() < k) return input

  const queue = new LinkedListQueue<T>(input.size())
  const stack = new LinkedListStack<T>(input.size())

  for (let i = 0; i < k; i++) {
    const front = input.getFront()
    if (input.dequeue() && front != null) stack.push(front)
  }

  for (let i = 0; i < k; i++) {
    const item = stack.pop()
    if (item != null) queue.enqueue(item)
  }

  const originalInputSize = input.size()
  for (let i = 0; i < originalInputSize; i++) {
    const front = input.getFront()
    if (input.dequeue() && front != null) queue.enqueue(front)
  }

  return queue
}

describe('reverseFirstKElements', () => {
  describe('when given a queue and a number', () => {
    it('should return the queue with the first k elements reversed', () => {
      const queue = new LinkedListQueue(9)
      ;[1, 2, 3, 4, 5, 6, 7, 8].forEach((num) => queue.enqueue(num))

      expect(reverseFirstKElements(queue, 4).toList()).toStrictEqual([
        4, 3, 2, 1, 5, 6, 7, 8,
      ])
    })
  })

  describe('when given a k that is larger than queue', () => {
    it('should return the queue', () => {
      const queue = new LinkedListQueue<number>(4)
      ;[1].forEach((num) => queue.enqueue(num))

      expect(reverseFirstKElements(queue, 4).toList()).toStrictEqual([1])
    })
  })
})
