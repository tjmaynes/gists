import { IQueue } from '../types'

export class ArrayQueue<T> implements IQueue<T> {
  private readonly items: T[]
  private readonly sizeLimit: number

  constructor(sizeLimit: number) {
    this.sizeLimit = sizeLimit
    this.items = []
  }

  enqueue(element: T): boolean {
    if (this.items.length < this.sizeLimit) {
      this.items.push(element)
      return true
    } else {
      return false
    }
  }

  dequeue(): T | null {
    return this.items.length != 0 ? this.items.shift() ?? null : null
  }

  getFront(): T | null {
    return this.items.length != 0 ? this.items[0] : null
  }

  getTail(): T | null {
    throw new Error('Method not implemented.')
  }

  isEmpty(): boolean {
    return this.items.length == 0
  }

  size(): number {
    return this.items.length
  }

  toList(): T[] {
    return this.items
  }
}
