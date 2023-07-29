import { DoublyLinkedList } from '../linked-list'
import { IStack } from '../types'

export class LinkedListStack<T> implements IStack<T> {
  private items: DoublyLinkedList<T>
  private top: T | null
  private sizeLimit: number

  constructor(sizeLimit: number) {
    this.sizeLimit = sizeLimit
    this.items = new DoublyLinkedList<T>()
    this.top = null
  }

  push(element: T): IStack<T> {
    if (this.items.size() < this.sizeLimit) {
      this.items.insertAtHead(element)
      this.top = element
    }
    return this
  }

  pop(): T | null {
    if (this.isEmpty()) return null
    else if (this.size() == 1) {
      this.items.deleteAtHead()
      const oldTop = this.top
      this.top = null
      return oldTop
    } else if (this.items.getHead()?.next != null) {
      if (this.items.deleteAtHead()) {
        const oldTop = this.top
        this.top = this.items.getHead()?.data || null
        return oldTop
      } else {
        this.top = null
        return null
      }
    }
    return null
  }

  isEmpty(): boolean {
    return this.size() <= 0
  }

  getTop(): T | null {
    if (this.isEmpty()) return null
    return this.top
  }

  size(): number {
    return this.items.size()
  }

  toList(): T[] {
    return this.items.toList()
  }
}
