# 存在重复元素 III

给你一个整数数组 `nums` 和两个整数 `k` 和 `t` 。请你判断是否存在两个下标 `i` 和 `j`，使得  `abs(nums[i] - nums[j]) <= t` ，同时又满足 `abs(i - j) <= k` 。

如果存在则返回 true，不存在返回 false。

示例  1：

```ts
输入：nums = [1,2,3,1], k = 3, t = 0
输出：true
```

示例 2：

```ts
输入：nums = [1,0,1,1], k = 1, t = 2
输出：true
```

示例 3：

```ts
输入：nums = [1,5,9,1,5,9], k = 2, t = 3
输出：false
```

提示：

- 0 <= nums.length <= 2 \* 10<sup>4</sup>
- -2<sup>31</sup> <= nums[i] <= 2<sup>31</sup> - 1
- 0 <= k <= 10<sup>4</sup>
- 0 <= t <= 2<sup>31</sup> - 1

## 题解

1. 可以使用最暴力的解法，就是两次循环 K 的元素，那么时间复杂度就是 o(nk)
2. 使用[桶排序](https://zh.wikipedia.org/wiki/%E6%A1%B6%E6%8E%92%E5%BA%8F)来解，时间复杂度为 o(n)
