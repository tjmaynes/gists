import { ILinkedList, ListNode } from '../types'

export class SinglyLinkedList<T> implements ILinkedList<T> {
  private head: ListNode<T> | null
  private length: number

  constructor() {
    this.head = null
    this.length = 0
  }

  insertAtHead(data: T): ILinkedList<T> {
    const tempNode = new ListNode(data)
    tempNode.next = this.head
    this.head = tempNode
    this.length += 1
    return this
  }

  insertAtTail(data: T): ILinkedList<T> {
    const tempNode = new ListNode(data)
    if (this.head == null) {
      this.head = tempNode
      this.length += 1
      return this
    }

    let currentNode = this.head
    while (currentNode?.next != null) currentNode = currentNode.next

    currentNode.next = tempNode
    this.length += 1

    return this
  }

  search(data: T): boolean {
    if (this.isEmpty()) return false

    let currentNode = this.head
    while (currentNode != null) {
      if (currentNode.data == data) return true
      currentNode = currentNode.next
    }
    return false
  }

  delete(data: T): boolean {
    if (this.head == null) return false

    let currentNode = this.head

    // is first element
    if (currentNode.data == data) {
      this.head = currentNode.next
      this.length -= 1
      return true
    }

    // is next element
    while (currentNode.next != null) {
      if (currentNode.next.data == data) {
        currentNode.next = currentNode.next.next
        this.length -= 1
        return true
      }
      currentNode = currentNode.next
    }

    return false
  }

  deleteAtHead(): boolean {
    if (this.head == null || this.head?.next == null) return false

    if (this.head.next) {
      this.head = this.head.next
      this.length -= 1
      return true
    }

    return false
  }

  deleteAtTail(): boolean {
    if (this.head == null) return false

    let currentNode = this.head
    while (currentNode.next?.next != null) {
      currentNode = currentNode.next
    }

    currentNode.next = null
    this.length -= 1

    return true
  }

  removeDuplicates(): ILinkedList<T> {
    if (this.isEmpty() || this.getHead()?.next == null) return this

    let outerNode = this.getHead()
    while (outerNode != null) {
      let innerNode = outerNode
      while (innerNode.next != null) {
        if (outerNode.data == innerNode.next.data) {
          innerNode.next = innerNode.next.next
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
      currentNode.next = nextNode
      this.removeDuplicates()
    }

    return this
  }

  intersection(list: ILinkedList<T>): ILinkedList<T> {
    const newList = new SinglyLinkedList<T>()

    let currentNode = list.getHead()

    while (currentNode != null) {
      if (this.search(currentNode.data)) newList.insertAtTail(currentNode.data)

      currentNode = currentNode.next
    }

    return newList
  }

  nthNodeFromLast(n: number): ListNode<T> | null {
    if (this.isEmpty() || n < 0 || this.size() < n) return null

    let place = this.size() - n - 1
    let currentNode = this.getHead()
    while (place > 0 && currentNode != null) {
      currentNode = currentNode?.next
      place -= 1
    }

    return currentNode
  }

  size(): number {
    return this.length
  }

  getHead(): ListNode<T> | null {
    return this.head
  }

  getTail(): ListNode<T> | null {
    let currentNode = this.getHead()
    if (currentNode == null) return null

    while (currentNode?.next != null) {
      currentNode = currentNode.next
    }

    return currentNode
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
