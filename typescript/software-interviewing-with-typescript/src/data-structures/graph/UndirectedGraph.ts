import { DoublyLinkedList } from '../linked-list'
import { IGraph, ILinkedList } from '../types'

export class UndirectedGraph implements IGraph {
  readonly vertices: number
  readonly list: ILinkedList<number>[]

  constructor(vertices: number) {
    this.vertices = vertices
    this.list = []

    for (let i = 0; i < vertices; i++) {
      this.list.push(new DoublyLinkedList())
    }
  }

  addEdge(source: number, destination: number): IGraph {
    if (source < this.vertices && destination < this.vertices) {
      this.list[source].insertAtHead(destination)
      this.list[destination].insertAtHead(source)
    }
    return this
  }

  print(): void {
    console.log('>>Adjacency List of Directed Graph<<')

    let i
    for (i = 0; i < this.list.length; i++) {
      let line = '|' + String(i) + '| => '
      let temp = this.list[i].getHead()
      while (temp != null) {
        line += '[' + String(temp.data) + '] -> '
        temp = temp.next
      }
      console.log(line + 'null ')
    }
  }
}
