# 实现 strStr()

实现  `strStr()`  函数。

给你两个字符串 `haystack` 和 `needle` ，请你在 haystack 字符串中找出 needle 字符串出现的第一个位置（下标从 0 开始）。如果不存在，则返回   `-1` 。

说明：

当  needle  是空字符串时，我们应当返回什么值呢？这是一个在面试中很好的问题。

对于本题而言，当 `needle`  是空字符串时我们应当返回 `0` 。这与 C 语言的  strstr()  以及 Java 的  indexOf()  定义相符。

示例 1：

```ts
输入：haystack = "hello", needle = "ll"
输出：2
```

示例 2：

```ts
输入：haystack = "aaaaa", needle = "bba"
输出：-1
```

示例 3：

```ts
输入：haystack = "", needle = ""
输出：0
```

提示：

- 0 <= haystack.length, needle.length <= 5 \* 10<sup>4</sup>
- `haystack` 和 `needle` 仅由小写英文字符组成

## 题解

实际上题目就是实现一个 `indexOf`, 当然最简单暴力的方法就是遍历一次就可以实现，算法的复杂度是 `o(n-m)`, 也可以使用[官方提供的解法](https://leetcode-cn.com/problems/implement-strstr/solution/shi-xian-strstr-by-leetcode-solution-ds6y/)。
