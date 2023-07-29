import { ArrayStack } from '../data-structures/stack'
import { IGraph } from '../data-structures/types'

export const depthFirstSearch = (graph: IGraph): string => {
  const visited = new Array(graph.vertices).fill(false)

  let result = ''
  for (let i = 0; i < graph.vertices; i++)
    if (!visited[i]) result += helper(i, graph, visited)

  return result
}

const helper = (source: number, graph: IGraph, visited: boolean[]): string => {
  const stack = new ArrayStack<number>(graph.vertices)
  stack.push(source)
  visited[source] = true

  let result = ''
  while (!stack.isEmpty()) {
    const currentNode = stack.pop()
    if (currentNode != null) {
      result += `${currentNode}`
      let nextNode = graph.list[currentNode].getHead()
      while (nextNode != null) {
        if (!visited[nextNode.data]) {
          stack.push(nextNode.data)
          visited[nextNode.data] = true
        }

        nextNode = nextNode.next
      }
    } else {
      break
    }
  }

  return result
}
