# Search Algorithm Tool

The Search Algorithm Tool is a client-side application deployed on Netlify. Find the website here: https://searchalgorithmtool.netlify.app/

## Overview

This app is intended to help users better understand search algorithms by watching them visually. The algorithms display which nodes they are searching in order to help the user understand how and when nodes are searched in a graph, and then display the "shortest" path it could come up with. The start and end points can be adjusted so the user can test multiple scenarios. There is also the capability to place walls (either individually or multiple at a time) to better show how the algorithm moves around a grid if there are walls, or "weights," in the way. After the algorithm has completed its search (meaning it has searched the finish node), it displays its "shortest" path.

Each algorithm is also specified to be weighted/unweighted and displays whether or not it guarentees a shortest path to help the user better understand each algorithm and understand its benefits/downfalls.

There is also an option to generate a maze in different ways, to help the user also better understand how these search algorithms work within different mazes of walls.

Lastly, the user can reset the board and go to a help menu that provides explanations for what weighted and unweighted mean, and also explains functionality for the app. For usability purposes, the app will not reset the walls unless the user clicks reset, so that they can user a similar wall configuration with multiple algorithms.

## Algorithms

As of now, the app features these algorithms:
1. Dijkstra's Algorithm (with and without a Binary Heap implementation)
2. A* Search
3. Greedy Best-First Search
4. Depth-First Search

## Mazes

As of now, the app features these mazes:
1. A Maze built from Recursive Division
2. A Maze build from randomly generated walls (can be added repeatedly)

