import { SinglyLinkedList } from './SinglyLinkedList'
import { DoublyLinkedList } from './DoublyLinkedList'
import { ILinkedList } from '../types'

const runTests = (
  testName: string,
  newLinkedList: () => ILinkedList<number>
) => {
  describe(testName, () => {
    let linkedList: ILinkedList<number>

    beforeEach(() => {
      linkedList = newLinkedList()
    })

    describe('#insertAtHead', () => {
      describe('when given an item', () => {
        it('should set item as head', () => {
          const actual = linkedList
            .insertAtHead(10)
            .insertAtHead(5)
            .insertAtHead(7)
          expect(actual.toList()).toStrictEqual([7, 5, 10])
        })
      })
    })

    describe('#insertAtTail', () => {
      describe('when given an item', () => {
        it('should set item as head', () => {
          const actual = linkedList
            .insertAtTail(10)
            .insertAtTail(5)
            .insertAtTail(7)
          expect(actual.toList()).toStrictEqual([10, 5, 7])
        })
      })
    })

    describe('#search', () => {
      describe('when item exists in linkedlist', () => {
        beforeEach(() => {
          linkedList
            .insertAtHead(10)
            .insertAtHead(9)
            .insertAtHead(8)
            .insertAtHead(-1)
            .insertAtTail(7)
        })

        it('should return true', () => {
          expect(linkedList.search(8)).toBeTruthy()
          expect(linkedList.search(7)).toBeTruthy()
        })
      })

      describe('when item does not exist in linkedlist', () => {
        it('should return false', () => {
          expect(linkedList.search(-1000)).toBeFalsy()
          expect(newLinkedList().search(8)).toBeFalsy()
        })
      })
    })

    describe('#delete', () => {
      describe('when item exists in linkedlist', () => {
        beforeEach(() => {
          linkedList
            .insertAtHead(10)
            .insertAtHead(9)
            .insertAtHead(8)
            .insertAtHead(-1)
            .insertAtTail(7)
        })

        it('should return true', () => {
          expect(linkedList.delete(10)).toBeTruthy()
          expect(linkedList.toList()).toStrictEqual([-1, 8, 9, 7])

          expect(linkedList.delete(7)).toBeTruthy()
          expect(linkedList.toList()).toStrictEqual([-1, 8, 9])

          expect(linkedList.delete(-1)).toBeTruthy()
          expect(linkedList.toList()).toStrictEqual([8, 9])
        })
      })

      describe('when item does not exist in linkedlist', () => {
        it('should return false', () => {
          linkedList.insertAtHead(10).insertAtHead(9)

          expect(linkedList.delete(5)).toBeFalsy()
          expect(linkedList.toList()).toStrictEqual([9, 10])
        })
      })
    })

    describe('#deleteAtHead', () => {
      describe('when head exists in linkedlist', () => {
        beforeEach(() => {
          linkedList
            .insertAtHead(10)
            .insertAtHead(9)
            .insertAtHead(8)
            .insertAtHead(-1)
            .insertAtTail(7)
        })

        it('should return true', () => {
          expect(linkedList.deleteAtHead()).toBeTruthy()
          expect(linkedList.toList()).toStrictEqual([8, 9, 10, 7])
        })
      })

      describe('when head does not exist in linkedlist', () => {
        it('should return false', () => {
          expect(linkedList.deleteAtHead()).toBeFalsy()
          expect(linkedList.toList()).toStrictEqual([])
        })
      })
    })

    describe('#deleteAtTail', () => {
      describe('when head exists in linkedlist', () => {
        beforeEach(() => {
          linkedList
            .insertAtHead(10)
            .insertAtHead(9)
            .insertAtHead(8)
            .insertAtHead(-1)
            .insertAtTail(7)
            .insertAtTail(14)
        })

        it('should return true', () => {
          expect(linkedList.deleteAtTail()).toBeTruthy()
          expect(linkedList.toList()).toStrictEqual([-1, 8, 9, 10, 7])
        })
      })

      describe('when head does not exist in linkedlist', () => {
        it('should return false', () => {
          expect(linkedList.deleteAtTail()).toBeFalsy()
          expect(linkedList.toList()).toStrictEqual([])
        })
      })
    })

    describe('#removeDuplicates', () => {
      describe('when duplicates exist in linkedlist', () => {
        beforeEach(() => {
          linkedList
            .insertAtHead(10)
            .insertAtHead(10)
            .insertAtHead(6)
            .insertAtHead(9)
            .insertAtHead(8)
            .insertAtHead(8)
            .insertAtTail(6)
        })

        it('should return with no duplicate data', () => {
          const actual = linkedList.removeDuplicates()
          expect(actual.toList()).toStrictEqual([8, 9, 6, 10])
        })
      })

      describe('when no duplicates does exist in linkedlist', () => {
        beforeEach(() => {
          linkedList
            .insertAtHead(10)
            .insertAtHead(9)
            .insertAtHead(8)
            .insertAtHead(7)
            .insertAtHead(6)
            .insertAtTail(5)
        })

        it('should return unchanged', () => {
          const actual = linkedList.removeDuplicates()
          expect(actual.toList()).toStrictEqual([6, 7, 8, 9, 10, 5])
        })
      })
    })

    describe('#union', () => {
      describe('when a union exists between two given linkedlists', () => {
        const otherLinkedList = newLinkedList()
          .insertAtTail(10)
          .insertAtTail(9)
          .insertAtHead(-1)
          .insertAtHead(3)
          .insertAtTail(6)

        beforeEach(() => {
          linkedList
            .insertAtHead(10)
            .insertAtHead(10)
            .insertAtHead(6)
            .insertAtHead(9)
            .insertAtHead(8)
            .insertAtHead(8)
            .insertAtTail(6)
        })

        it('should return a union between the two linkedlists', () => {
          const actual = linkedList.union(otherLinkedList)
          expect(actual.toList()).toStrictEqual([8, 9, 6, 10, 3, -1])
        })
      })
    })

    describe('#intersection', () => {
      describe('when a intersection exists between two given linkedlists', () => {
        const otherLinkedList = newLinkedList()
          .insertAtTail(10)
          .insertAtTail(9)
          .insertAtHead(-1)
          .insertAtHead(3)
          .insertAtTail(6)

        beforeEach(() => {
          linkedList
            .insertAtHead(10)
            .insertAtHead(10)
            .insertAtHead(6)
            .insertAtHead(9)
            .insertAtHead(8)
            .insertAtHead(8)
            .insertAtTail(6)
        })

        it('should return a intersection between the two linkedlists', () => {
          const actual = linkedList.intersection(otherLinkedList)
          expect(actual.toList()).toStrictEqual([10, 9, 6])
        })
      })
    })

    describe('#nthNodeFromLast', () => {
      describe('when node exists at n-th place', () => {
        beforeEach(() => {
          linkedList
            .insertAtHead(10)
            .insertAtHead(10)
            .insertAtHead(6)
            .insertAtHead(9)
            .insertAtHead(8)
            .insertAtHead(8)
            .insertAtTail(6)
        })

        it('should return node', () => {
          expect(linkedList.nthNodeFromLast(1)?.data).toBe(10)
        })
      })

      describe('when node does not exist at n-th place', () => {
        beforeEach(() => {
          linkedList
            .insertAtHead(10)
            .insertAtHead(10)
            .insertAtHead(6)
            .insertAtHead(9)
        })

        it('should return null', () => {
          expect(linkedList.nthNodeFromLast(15)).toBeNull()
          expect(linkedList.nthNodeFromLast(-1)).toBeNull()
          expect(newLinkedList().nthNodeFromLast(10)).toBeNull()
        })
      })
    })

    describe('#size', () => {
      describe('when items exist in linkedlist', () => {
        beforeEach(() => {
          linkedList
            .insertAtHead(10)
            .insertAtHead(9)
            .insertAtHead(8)
            .insertAtHead(-1)
            .insertAtTail(7)
        })

        it('should return size', () => {
          expect(linkedList.size()).toBe(5)
        })
      })

      describe('when no items exist in linkedlist', () => {
        it('should return size', () => {
          expect(linkedList.size()).toBe(0)
        })
      })
    })
  })
}

describe('LinkedLists', () => {
  runTests('SinglyLinkedLists', () => new SinglyLinkedList())
  runTests('DoublyLinkedLists', () => new DoublyLinkedList())
})
