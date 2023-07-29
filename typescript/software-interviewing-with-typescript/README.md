# Software Interviewing with Typescript

> My interviewing preparation (data structures, algorithms, etc) work.

## Requirements

- [GNU Make](https://www.gnu.org/software/make)
- [Nodejs](https://nodejs.org/en/)

## Usage

To install project dependencies, run the following command:

```bash
make install
```

To run all tests, run the following command:

```bash
make test
```

## Studying

### Big-O Notation

- An algorithm is a finite sequence of instructions that solve a specific problem or perform a computation.
- We use polynomials to express the time complexity of an algorithm.
- If the input size is small, a poorly designed algorithm may perform ok. However, as the input size increases/scales, a poorly designed algorithm will be costly to run. We can use _asymptotic notation_ to compare two different implementations of the same algorithm with large input.
- Big-O, Big-Omega, and Big-Theta are examples of asymptotic notations.
- Big-O => `f(n)` belongs to `O(g(n))`
- `n^2 + 2n + 1` is `O(n^2)`, while `n^5 + 2n^4 + 8n + 5` is `O(n^5)`
- We tend to care more about Big-O when we are analyzing algorithms as it tells us the worst-case running time of an algorithm will grow _at most_ as fast as a constant multiple of a certain function (than grow at least like Big-Omega).
- Whenever you see a problem iterated over a problem space, `i` to `n`, it is most likely in `O(n)` or linear time complexity
- Whenever you see a problem iterated over a problem space and the number of elements gets halved each iteration, it is most likely in `O(logn)` or logarithmic time complexity
- Whenver you see a problem iterated over a problem space and there exists an inner loop that depends on the outer-loop, it is most likely in `O(n^2)` or quadratic time complexity
- Whenver you see a problem iterated over a problem space and there exists an inner loop that is independent of the outer-loop, it is most likely in `O(nm)` or linear time complexity

| Function         | Name         |
| ---------------- | ------------ |
| Any constant `c` | Constant     |
| `logn`           | Logarithmic  |
| `log^2n`         | Log-square   |
| `n`              | Linear       |
| `nlogn`          | Linearithmic |
| `n^2`            | Quadratic    |
| `n^3`            | Cubic        |
| `n^4`            | Quartic      |
| `2^n`            | Exponential  |
| `e^n`            | Exponential  |
| `n!`             | n-Factorial  |

### Data Structures

#### Arrays

##### Asymptotic Time Complexity

| Type  | Access | Search | Insertion (at head) | Deletion (at head) | Insertion (at tail) | Deletion (at tail) | Delete (anywhere) |
| ----- | ------ | ------ | ------------------- | ------------------ | ------------------- | ------------------ | ----------------- |
| Array | O(1)   | O(n)   | O(n)                | O(n)               | O(1)                | O(1)               | O(1)              |

#### Linked Lists

##### Asymptotic Time Complexity

| Type               | Access | Search | Insertion (at head) | Deletion (at head) | Insertion (at tail) | Deletion (at tail) | Delete (anywhere) |
| ------------------ | ------ | ------ | ------------------- | ------------------ | ------------------- | ------------------ | ----------------- |
| Singly-Linked List | O(n)   | O(n)   | O(1)                | O(1)               | O(n)                | O(n)               | O(n)              |
| Doubly-Linked List | O(n)   | O(n)   | O(1)                | O(1)               | O(1)                | O(1)               | O(n)              |

#### Stacks & Queues

##### Asymptotic Time Complexity

| Type  | Access | Search | Insertion (at head) | Deletion (at head) | Insertion (at tail) | Deletion (at tail) | Delete (anywhere) |
| ----- | ------ | ------ | ------------------- | ------------------ | ------------------- | ------------------ | ----------------- |
| Stack | O(n)   | O(n)   | O(1)                | O(1)               | O(1)                | O(1)               | O(n)              |
| Queue | O(n)   | O(n)   | O(1)                | O(1)               | O(1)                | O(1)               | O(n)              |

#### Graphs

A _graph_ is a set of nodes that are connected to each other in the form of a network. A _vertex_ is a part of a graph. A collection of vertices form a graph. An _edge_ is a link between two vertices. It can be uni-directional or bi-directional, depending on your graph.

##### Terminology

- Degree of a vertex: the total number of edges connected to a vertex. There are two types of degrees:
  - In-Degree: The total number of incoming edges connected to a vertex.
  - Out-Degree: The total number of outgoing edges connected to a vertex.
- Parallel Edges: Two unidirectional edges are parallel if they have the same end vertices. Two directed edges are parallel if they have the same origin and destination.
- Self Loop: This occurs when an edge starts and ends on the same vertex.
- Adjacency: Two vertices are said to be adjacent if there is an edge connecting them directly.
-

##### Types of Graphs

- Undirected: All edges are undirected, there is no direction to the edges. You can calculate the number of edges by using the following formula: `(n(n - 1))/2`.
- Directed: Edges are unidirectional. You can calculate the number of edges by using the following formula: `n*(n - 1)`.

##### Representation

- Adjacency Matrix: a two dimensional matrix where each cell can contain a _0_ or a _1_. The row and column headings represent the vertices. For a directed graph, the convention is to think of the rows as sources and the columns as destinations.
- Adjacency List: an array of linked lists is used to store all the edges in the graph, the size of the array is equal to the number of vertices. Each index represents a specific vertex in the graph. The entry at index `i` of the array contains a linked list containing the vertices that are adjacent to vertex `i`.

| Operation     | Adjacency List | Adjacency Matrix |
| ------------- | -------------- | ---------------- |
| Add vertex    | O(1)           | O(V^2)           |
| Remove vertex | O(V + E)       | O(V^2)           |
| Add edge      | O(1)           | O(1)             |
| Remove edge   | O(E)           | O(1)             |

##### Graph Traversal Algorithms

- Breadth-first search (BFS): all nodes at a certain level are travered before moving on to the next level.
- Depth-first search (DFS): start from a node, traverse until we reach farthest level, and then jump back to the starting node and pick another adjacent node.

#### Sorting Algorithms

| Algorithm      | Worst | Average | Best | Worst Space Complexity |
| -------------- | ----- | ------- | ---- | ---------------------- |
| Bubble Sort    |       |         |      |                        |
| Insertion Sort |       |         |      |                        |
| Selection Sort |       |         |      |                        |
| Quicksort      |       |         |      |                        |
| Mergesort      |       |         |      |                        |
| Heapsort       |       |         |      |                        |

## Links

- [Big-O Cheatsheet](https://www.bigocheatsheet.com/)
