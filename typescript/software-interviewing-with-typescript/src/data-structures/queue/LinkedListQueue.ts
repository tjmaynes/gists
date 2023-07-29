import { DoublyLinkedList } from '../linked-list'
import { ILinkedList, IQueue } from '../types'

export class LinkedListQueue<T> implements IQueue<T> {
  private items: ILinkedList<T>
  private sizeLimit: number

  constructor(sizeLimit: number) {
    this.sizeLimit = sizeLimit
    this.items = new DoublyLinkedList<T>()
  }

  enqueue(element: T): boolean {
    if (this.items.size() < this.sizeLimit) {
      this.items.insertAtTail(element)
      return true
    } else {
      return false
    }
  }

  dequeue(): T | null {
    if (this.isEmpty()) return null

    const oldHead = this.items.getHead()?.data ?? null
    this.items.deleteAtHead()

    return oldHead
  }

  getFront(): T | null {
    const head = this.items.getHead()
    return head != null ? head.data : null
  }

  getTail(): T | null {
    const tail = this.items.getTail()
    return tail != null ? tail.data : null
  }

  isEmpty(): boolean {
    return this.items.isEmpty()
  }

  size(): number {
    return this.items.size()
  }

  toList(): T[] {
    return this.items.toList()
  }
}
