import { IQueue } from '../types'
import { LinkedListQueue } from '.'
import { ArrayQueue } from './ArrayQueue'

const runTest = (testName: string, createQueue: () => IQueue<number>) => {
  describe(testName, () => {
    let queue: IQueue<number>

    beforeEach(() => {
      queue = createQueue()
    })

    describe('#enqueue', () => {
      it('adds elements to the front queue', () => {
        expect(queue.enqueue(10)).toBeTruthy()
        expect(queue.enqueue(19)).toBeTruthy()

        expect(queue.size()).toEqual(2)
        expect(queue.toList()).toStrictEqual([10, 19])
      })
    })

    describe('#dequeue', () => {
      describe('when elements exist in queue', () => {
        beforeEach(() => {
          queue.enqueue(99)
          queue.enqueue(14)
          queue.enqueue(7)
        })

        it('removes elements front elements from queue', () => {
          expect(queue.dequeue()).toEqual(99)

          expect(queue.size()).toEqual(2)
          expect(queue.toList()).toStrictEqual([14, 7])
        })
      })
    })
  })
}

describe('Queue', () => {
  const sizeLimit = 3
  runTest('LinkedListQueue', () => new LinkedListQueue<number>(sizeLimit))
  runTest('ArrayQueue', () => new ArrayQueue<number>(sizeLimit))
})
