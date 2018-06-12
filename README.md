[视频资料](https://classroom.udacity.com/courses/ud666-cn-2)

几点补充:

- 1.导入 demo.sql 之前, **comment** 表可进行如下修改, 否则 nickName 在特殊情况下会报这样的错误

----  `ER_TRUNCATED_WRONG_VALUE_FOR_FIELD`

```

  `username` varchar(255) CHARACTER SET utf8mb4 NOT NULL

```



- 2.最新发布的评论最好排在评价列表的最前面, 简单调整下 CSS

```
.comment-list{
  display: flex;
  flex-direction: column-reverse;
}

```