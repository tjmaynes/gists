import { IStack } from '../types'

export class ArrayStack<T> implements IStack<T> {
  private items: T[]
  private top: T | null
  private sizeLimit: number

  constructor(sizeLimit: number) {
    this.sizeLimit = sizeLimit
    this.items = []
    this.top = null
  }

  push(element: T): IStack<T> {
    if (this.items.length < this.sizeLimit) {
      this.items.push(element)
      this.top = element
    }

    return this
  }

  pop(): T | null {
    if (this.isEmpty()) return null

    this.top = this.items.length == 1 ? null : this.items[this.items.length - 2]

    return this.items.pop() ?? null
  }

  isEmpty(): boolean {
    return this.size() <= 0
  }

  getTop(): T | null {
    if (this.isEmpty()) return null
    return this.top
  }

  size(): number {
    return this.items.length
  }

  toList(): T[] {
    return this.items
  }
}
