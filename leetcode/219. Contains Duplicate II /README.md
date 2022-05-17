# 存在重复元素 II

给你一个整数数组  nums 和一个整数  k ，判断数组中是否存在两个 不同的索引  i  和  j ，满足 nums[i] == nums[j] 且 abs(i - j) <= k 。如果存在，返回 true ；否则，返回 false 。

示例  1：

```ts
输入：nums = [1,2,3,1], k = 3
输出：true
```

示例 2：

```ts
输入：nums = [1,0,1,1], k = 1
输出：true
```

示例 3：

```ts
输入：nums = [1,2,3,1,2,3], k = 2
输出：false
```

提示：

- 1 <= nums.length <= 10<sup>5</sup>
- -10<sup>9</sup> <= nums[i] <= 10<sup>9</sup>
- 0 <= k <= 10<sup>5</sup>
