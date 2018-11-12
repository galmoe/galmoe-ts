## mysql 8

### install

进入mysql官网下载 [https://dev.mysql.com/downloads/repo/apt/](https://dev.mysql.com/downloads/repo/apt/)

下载 ` mysql-apt-config_0.8.10-1_all.deb ` 安装包

### 安装
```
sudo dpkg -i mysql-apt-config_0.8.10-1_all.deb
```
选择 ` mysql 8.0 `

```
sudo apt update
sudo apt install mysql-server
```

### 配置
```
mysql
```
创建用户如果报错
```sql
mysql> create user 'mysql8'@'%' identified by 'Password123!';
ERROR 1146 (42S02): Table 'mysql.role_edges' doesn't exist
```

更新
```
sudo mysql_upgrade -u root -p 
```
```sql
mysql> create user 'mysql8'@'%' identified by '111111';
Query OK, 0 rows affected (0.12 sec)
mysql> flush privileges;


```

用户授权
```sql
mysql> GRANT ALL PRIVILEGES ON *.* TO 'mysql8'@'%' WITH GRANT OPTION;
mysql> exit;
```

重启
```
service mysql restart
```
