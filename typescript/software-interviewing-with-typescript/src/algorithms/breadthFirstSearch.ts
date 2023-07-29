import { ArrayQueue } from '../data-structures/queue'
import { IGraph } from '../data-structures/types'

export const breadthFirstSearch = (graph: IGraph): string => {
  const visited = new Array(graph.vertices).fill(false)

  let results = ''
  for (let i = 0; i < graph.vertices; i++)
    if (!visited[i]) results += helper(i, graph, visited)

  return results
}

function helper(source: number, graph: IGraph, visited: boolean[]) {
  const queue = new ArrayQueue<number>(graph.vertices)
  queue.enqueue(source)
  visited[source] = true

  let result = ''
  while (!queue.isEmpty()) {
    const currentNode = queue.dequeue()
    if (currentNode != null) {
      result += `${currentNode}`
      let adjacentNode = graph.list[currentNode].getHead()
      while (adjacentNode != null) {
        if (!visited[adjacentNode.data]) {
          queue.enqueue(adjacentNode.data)
          visited[adjacentNode.data] = true
        }
        adjacentNode = adjacentNode.next
      }
    } else {
      break
    }
  }

  return result
}
