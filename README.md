[不容错过](https://classroom.udacity.com/courses/ud666-cn-2)

导入 demo.sql 之前, **comment** 表要进行如下修改,否则 nickName 在特殊情况下会报这样的错误

----  `ER_TRUNCATED_WRONG_VALUE_FOR_FIELD`

```

  `username` varchar(255) CHARACTER SET utf8mb4 NOT NULL,

```

评价列表应该把最新发布的排在最前,最简单的办法就是调整CSS

```
.comment-list{
  display: flex;
  flex-direction: column-reverse;
}

```