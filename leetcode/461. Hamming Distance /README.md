# 汉明距离

两个整数之间的汉明距离指的是这两个数字对应二进制位不同的位置的数目。

给出两个整数 x 和 y，计算它们之间的汉明距离。

注意：
0 ≤ x, y < 2<sup>31</sup>

示例:

```ts
输入: x = 1, y = 4

输出: 2

解释:
1   (0 0 0 1)
4   (0 1 0 0)
       ↑   ↑

上面的箭头指出了对应二进制位不同的位置。
```

## 题解

先进行异或然后计算二进制中 1 的个数即可。[官方解答](https://leetcode-cn.com/problems/hamming-distance/solution/yi-ming-ju-chi-by-leetcode-solution-u1w7/)
