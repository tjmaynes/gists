import { ILinkedList, ListNode } from '../types'

export class DoublyLinkedList<T> implements ILinkedList<T> {
  private head: ListNode<T> | null
  private tail: ListNode<T> | null
  private length: number

  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  insertAtHead(data: T): ILinkedList<T> {
    const newHead = new ListNode(data)
    newHead.next = this.head
    this.head = newHead

    if (this.tail == null) this.tail = newHead

    this.length += 1

    return this
  }

  insertAtTail(data: T): ILinkedList<T> {
    const newTail = new ListNode(data)
    if (this.tail == null) {
      this.head = newTail
      this.tail = newTail
      this.length += 1
      return this
    }

    const previousNode = this.tail
    previousNode.next = newTail
    newTail.prev = previousNode
    this.tail = newTail

    this.length += 1
    return this
  }

  search(data: T): boolean {
    let currentNode = this.getHead()
    while (currentNode != null) {
      if (currentNode.data == data) return true
      currentNode = currentNode.next
    }

    return false
  }

  delete(data: T): boolean {
    if (this.isEmpty()) return false

    let currentNode = this.getHead()

    if (currentNode?.data == data) {
      this.head = currentNode.next
      this.length -= 1
      return true
    }

    while (currentNode != null && currentNode.next != null) {
      if (currentNode.next.data == data) break
      currentNode = currentNode.next
    }

    if (currentNode?.next?.next) {
      const nextNode = currentNode.next.next
      nextNode.prev = currentNode
      currentNode.next = nextNode

      this.length -= 1

      return true
    } else if (currentNode?.next) {
      currentNode.next = null
      this.length -= 1
      return true
    }

    return false
  }

  deleteAtHead(): boolean {
    if (this.head == null || this.head.next == null) return false

    const oldHead = this.head
    if (oldHead.next != null) oldHead.next.prev = null

    this.head = oldHead.next
    this.length -= 1

    return true
  }

  deleteAtTail(): boolean {
    if (this.tail == null) return false

    if (this.tail.prev != null) {
      const previousTail = this.tail.prev
      previousTail.next = null
      this.tail = previousTail
      this.length -= 1

      return true
    }

    return false
  }

  removeDuplicates(): ILinkedList<T> {
    if (this.isEmpty()) return this

    let outerNode = this.getHead()
    while (outerNode != null) {
      let innerNode = outerNode
      while (innerNode.next != null) {
        if (innerNode.next.data == outerNode.data) {
          const nextNode = innerNode.next.next
          if (nextNode) nextNode.prev = innerNode
          innerNode.next = nextNode
        } else {
          innerNode = innerNode.next
        }
      }
      outerNode = outerNode.next
    }

    return this
  }

  union(list: ILinkedList<T>): ILinkedList<T> {
    if (this.isEmpty()) return list
    else if (list.isEmpty()) return this

    let currentNode = this.getHead()
    while (currentNode?.next != null) {
      currentNode = currentNode.next
    }

    if (currentNode != null) {
      const nextNode = list.getHead()
      if (nextNode != null) nextNode.prev = currentNode
      currentNode.next = nextNode
      this.removeDuplicates()
    }

    return this
  }

  intersection(list: ILinkedList<T>): ILinkedList<T> {
    let currentNode = list.getHead()
    const newList = new DoublyLinkedList<T>()

    while (currentNode != null) {
      if (this.search(currentNode.data)) newList.insertAtTail(currentNode.data)

      currentNode = currentNode.next
    }

    return newList
  }

  nthNodeFromLast(n: number): ListNode<T> | null {
    if (n < 0 || n > this.size()) return null

    let currentNode = this.tail
    let place = n
    while (currentNode != null && place > 0) {
      place -= 1
      currentNode = currentNode.prev
    }

    return currentNode
  }

  getHead(): ListNode<T> | null {
    return this.head
  }

  getTail(): ListNode<T> | null {
    return this.tail
  }

  size(): number {
    return this.length
  }

  isEmpty(): boolean {
    return this.head == null
  }

  toList(): T[] {
    const result = []
    let currentNode = this.getHead()

    while (currentNode != null) {
      result.push(currentNode.data)
      currentNode = currentNode.next
    }

    return result
  }
}
