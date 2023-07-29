import { DirectedGraph } from '../data-structures/graph'
import { depthFirstSearch } from '.'

describe('DepthFirstSearch', () => {
  describe('when give a graph filled with nodes', () => {
    it('should return a string of visited nodes in DFS order', () => {
      const graph = new DirectedGraph(5)
      graph.addEdge(0, 1)
      graph.addEdge(0, 2)
      graph.addEdge(1, 3)
      graph.addEdge(1, 4)

      const actual = depthFirstSearch(graph)

      expect(actual).toBe('01342')
      expect(actual.length).toBe(5)
    })
  })
})
