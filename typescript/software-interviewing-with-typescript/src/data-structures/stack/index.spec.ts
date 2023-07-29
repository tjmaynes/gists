import { IStack } from '../types'
import { ArrayStack, LinkedListStack } from '.'

const runTest = (testName: string, getNewStack: () => IStack<number>) => {
  describe(testName, () => {
    let stack: IStack<number>

    beforeEach(() => {
      stack = getNewStack()
    })

    describe('#push', () => {
      it('should add an item to the top of the stack', () => {
        stack.push(10).push(7).push(8)

        expect(stack.getTop()).toBe(8)
        expect(stack.size()).toBe(3)
      })
    })

    describe('#pop', () => {
      describe('when items are available', () => {
        beforeEach(() => {
          stack.push(10).push(12)
        })

        it('should return the top item in the stack and remove item', () => {
          const result = stack.pop()

          expect(result).toBe(12)
          expect(stack.getTop()).toBe(10)
          expect(stack.size()).toBe(1)
        })
      })

      describe('when items are not available', () => {
        it('should throw an exception', () => {
          expect(stack.pop()).toBeNull()
        })
      })
    })
  })
}

describe('Stack', () => {
  const sizeLimit = 3
  runTest('ArrayStack', () => new ArrayStack(sizeLimit))
  runTest('LinkedListStack', () => new LinkedListStack(sizeLimit))
})
