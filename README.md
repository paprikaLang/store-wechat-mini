[不容错过](https://classroom.udacity.com/courses/ud666-cn-2)

导入 demo.sql 之前, **comment** 表要进行如下修改,否则 nickName 和 content 在特殊情况下会报这样的错误

----  `ER_TRUNCATED_WRONG_VALUE_FOR_FIELD`

```
CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `user` varchar(255) NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `content` varchar(511) CHARACTER SET utf8mb4 DEFAULT NULL,
  `images` varchar(1023) DEFAULT NULL,
  `product_id` int(11) NOT NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```