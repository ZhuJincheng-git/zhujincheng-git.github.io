# Monte Carlo Tree Search (MCTS)

A decision algorithm suitable for planning in combinatorial game actions. It is essentially a heuristic search method.

The process consists of four steps:

1. Tree traversal
2. Node expansion
3. Rollout (Random simulation)
4. Backpropagation

## UCB Formula (Upper Confidence Bounds)

$$
UCB(s_i) = \bar v_i + C \sqrt{\frac{\ln N}{n_i}}
$$

$$
UCB1(s_i) = \bar v_i + C \sqrt{\frac{2 \ln N}{n_i}}
$$

- $\bar v_i$ – simulation estimate (cumulative value of the node divided by its visit count)
- $N$ – visit count of the parent node
- $n_i$ – visit count of the node itself

> The UCB1 formula is commonly used in MCTS.

## Steps

Each node in the tree has two values:

- `Q` – cumulative value
- `N` – visit count

1. **(Selection)** Starting from the root node, repeatedly select the child node with the largest UCB value.
2. Is the node expandable?
   - Yes → Expansion.
   - No → Rollout.
3. **(Expansion)** Generate new child node(s), then perform a rollout. Initialize new nodes with `Q = 0; N = 0`.
4. **(Rollout)** Continue random simulations until a terminal state is reached.
5. **(Backpropagation)** Using the terminal state value obtained from the rollout, update the nodes along the path by incrementing `N += 1` and `Q += terminal value`.

---

***MCTS uses the UCB formula to bias the algorithm toward high-value paths and ensures that node estimates converge to true values through increased iterations.***