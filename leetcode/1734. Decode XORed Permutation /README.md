# 解码异或后的排列

给你一个整数数组  `perm` ，它是前  `n`  个正整数的排列，且  `n`  是个 `奇数`  。

它被加密成另一个长度为 `n - 1`  的整数数组  `encoded` ，满足  `encoded[i] = perm[i] XOR perm[i + 1]` 。比方说，如果  `perm = [1,3,2]` ，那么  `encoded = [2,1]` 。

给你  `encoded`  数组，请你返回原始数组  `perm` 。题目保证答案存在且唯一。

示例 1：

```ts
输入：encoded = [3,1]
输出：[1,2,3]
解释：如果 perm = [1,2,3] ，那么 encoded = [1 XOR 2,2 XOR 3] = [3,1]
```

示例 2：

```ts
输入：encoded = [6,5,4,6]
输出：[2,4,1,5,3]
```

提示：

- 3 <= n < 10<sup>5</sup>
- n  是奇数。
- encoded.length == n - 1

## 题解

本题的重点是前 n 个正整数，所以只需要找到相应的规律即可。可以参考[官方解答](https://leetcode-cn.com/problems/decode-xored-permutation/solution/jie-ma-yi-huo-hou-de-pai-lie-by-leetcode-9gw4/)
