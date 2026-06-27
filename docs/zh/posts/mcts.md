# 蒙特卡洛树搜索

决策算法，适合在组合博弈行动中进行规划。其实是一种启发式搜索方法。

整体为四步

1. Tree traversal
2. Node expansion
3. Rollout(Random sinulation)
4. Backpropagation

## UCB公式(Upper Confidence Bounds)

$$
UCB(s_i)
=
\bar v_i + C\sqrt{\frac{lnN}{n_i}}
$$

$$
UCB1(s_i)
=
\bar v_i + C\sqrt{\frac{2lnN}{n_i}}
$$

 - $\bar v_i$ - 模拟估计值（该节点累计价值/该节点被访问次数）
 - $N$ - 父节点被访问次数
 - $n_i$ - 该节点被访问次数

> UCB1公式常用于MCTS。

## 步骤

树的每个节点有两个值

- `Q` - 累计价值（value）
- `N` - 节点被访问次数（visit）


1. **(Selection)** 根节点开始，重复选择UCB最大的子节点。
2. 节点是否被可扩展？
    - 是。Expansion。
    - 不是。Rollout。
3. **(Expansion)** 产生新的子节点，再Rollout。新节点初始化 `Q=0;N=0`
4. **(Rollout)** 不断随机模拟决策直到结束（终态）。
5. **(Backpropagation)** 根据Rollout后得到的终态的值更新反向传播更新各节点的两个值(`访问次数N += 1`、`价值Q += 终态的值`)。

---

***MCTS利用UCB公式让算法倾向于走分数高的路。并通过增大迭代次数使节点估计值收敛于真实值。***
