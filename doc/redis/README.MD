## redis
### install

```sh
sudo apt-get install redis-server
redis-cli
exit
```

授权
```sh
## 配置config
sudo vim /etc/redis/redis.conf

## 修改bindip
bind 0.0.0.0
```

启动关闭
```sh
## 关闭
redis-cli -h 127.0.0.1 -p 6379 shutdown

## 启动
redis-server /etc/redis/redis.conf
redis-cli

## 或者使用redis-server
/etc/init.d/redis-server stop
/etc/init.d/redis-server start
/etc/init.d/redis-server restart
```

## 设置密码
```sh
redis 127.0.0.1:6379> config set requirepass redisRoot
```

查询密码：
```
redis 127.0.0.1:6379> config get requirepass
(error) ERR operation not permitted
```

设置config
```sh
vim redis.conf
```
```sh
# requirepass foobared
```
改为
```
requirepass redisRoot
```


密码验证：
```
redis 127.0.0.1:6379> auth redisRoot
OK
```

再次查询：
```
redis 127.0.0.1:6379> config get requirepass
1) "requirepass"
2) "redisRoot"
```

PS：如果配置文件中没添加密码 那么redis重启后，密码失效；

#### 登陆

在登录的时候的时候输入密码：
```
redis-cli -p 6379 -a redisRoot
```

先登陆后验证：
```
redis 127.0.0.1:6379> auth redisRoot
OK
```
