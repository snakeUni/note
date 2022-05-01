# xx

给你 `root1` 和 `root2` 这两棵二叉搜索树。请你返回一个列表，其中包含   **两棵树**   中的所有整数并按 **升序** 排序。.

示例 1：

![1](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/12/29/q2-e1.png)

```ts
输入：root1 = [2,1,4], root2 = [1,0,3]
输出：[0,1,1,2,3,4]
```

示例 2：

![2](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/12/29/q2-e5-.png)

```ts
输入：root1 = [1,null,8], root2 = [8,1]
输出：[1,1,8,8]
```

提示：

- 每棵树的节点数在  [0, 5000] 范围内
- -10<sup>5</sup> <= Node.val <= 10<sup>5</sup>
