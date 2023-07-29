import { breadthFirstSearch } from '.'
import { DirectedGraph } from '../data-structures/graph'

describe('BreadthFirstSearch', () => {
  describe('when give a graph filled with nodes', () => {
    it('should return a string of visited nodes in BFS order', () => {
      const graph = new DirectedGraph(6)
      graph.addEdge(1, 2)
      graph.addEdge(1, 3)
      graph.addEdge(2, 4)
      graph.addEdge(2, 5)

      const actual = breadthFirstSearch(graph)

      expect(actual).toBe('013254')
      expect(actual.length).toBe(6)
    })
  })
})
