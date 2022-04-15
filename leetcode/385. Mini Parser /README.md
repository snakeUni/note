# 迷你语法分析器

给定一个字符串 s 表示一个整数嵌套列表，实现一个解析它的语法分析器并返回解析的结果 `NestedInteger` 。

列表中的每个元素只可能是整数或整数嵌套列表

示例 1：

```ts
输入：s = "324",
输出：324
解释：你应该返回一个 `NestedInteger` 对象，其中只包含整数值 324。
```

示例 2：

```ts
输入：s = "[123,[456,[789]]]",
输出：[123,[456,[789]]]
解释：返回一个 NestedInteger 对象包含一个有两个元素的嵌套列表：

1. 一个 integer 包含值 123
2. 一个包含两个元素的嵌套列表：
   i. 一个 integer 包含值 456
   ii. 一个包含一个元素的嵌套列表
   a. 一个 integer 包含值 789
```

提示：

- 1 <= s.length <= 5 \* 10<sup>4</sup>
- s 由数字、方括号  `"[]"`、负号  `'-'` 、逗号  `','`组成
- 用例保证  s 是可解析的  NestedInteger
- 输入中的所有值的范围是  [-10<sup>6</sup>, 10<sup>6</sup>]

## 题解

[官方题解](https://leetcode-cn.com/problems/mini-parser/solution/mi-ni-yu-fa-fen-xi-qi-by-leetcode-soluti-l2ma/) 使用栈结构
