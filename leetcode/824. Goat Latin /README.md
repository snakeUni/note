# 山羊拉丁文

给你一个由若干单词组成的句子  `sentence` ，单词间由空格分隔。每个单词仅由大写和小写英文字母组成。

请你将句子转换为 “山羊拉丁文（Goat Latin）”（一种类似于 猪拉丁文  - Pig Latin 的虚构语言）。山羊拉丁文的规则如下：

- 如果单词以元音开头（'a', 'e', 'i', 'o', 'u'），在单词后添加`"ma"`。
  - 例如，单词 "apple" 变为 "applema" 。
- 如果单词以辅音字母开头（即，非元音字母），移除第一个字符并将它放到末尾，之后再添加`"ma"`。
  - 例如，单词 "goat" 变为 "oatgma" 。
- 根据单词在句子中的索引，在单词最后添加与索引相同数量的字母'a'，索引从 1 开始。
  - 例如，在第一个单词后添加 "a" ，在第二个单词后添加 "aa" ，以此类推。

返回将 `sentence` 转换为山羊拉丁文后的句子。

示例 1：

```ts
输入：sentence = "I speak Goat Latin"
输出："Imaa peaksmaaa oatGmaaaa atinLmaaaaa"
```

示例 2：

```ts
输入：sentence = "The quick brown fox jumped over the lazy dog"
输出："heTmaa uickqmaaa rownbmaaaa oxfmaaaaa umpedjmaaaaaa overmaaaaaaa hetmaaaaaaaa azylmaaaaaaaaa ogdmaaaaaaaaaa"
```

提示：

- `1 <= sentence.length <= 150`
- sentence 由英文字母和空格组成
- sentence 不含前导或尾随空格
- sentence 中的所有单词由单个空格分隔
