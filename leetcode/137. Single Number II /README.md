# 只出现一次的数字 II

给你一个整数数组  `nums` ，除某个元素仅出现 **一次** 外，其余每个元素都恰出现 **三次** 。请你找出并返回那个只出现了一次的元素。

示例 1：

```ts
输入：nums = [2,2,3,2]
输出：3
```

示例 2：

```ts
输入：nums = [0,1,0,1,0,1,99]
输出：99
```

提示：

- 1 <= nums.length <= 3 \* 10<sup>4</sup>
- -2<sup>31</sup> <= nums[i] <= 2<sup>31</sup> - 1
- nums 中，除某个元素仅出现 一次 外，其余每个元素都恰出现 三次

进阶：你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？

## 题解

最简单是使用 hash map 来存储，但是此时的时间和空间复杂度都较高，其他的做法可以参考[官方解答](https://leetcode-cn.com/problems/single-number-ii/solution/zhi-chu-xian-yi-ci-de-shu-zi-ii-by-leetc-23t6/)
