## Nginx
### Install

注意是最新版本

### nginx-module-image-filter

[nginx_signing.key](https://blog.csdn.net/hj605635529/article/details/80739335)

```sh
wget http://nginx.org/keys/nginx_signing.key 
sudo apt-key add nginx_signing.key
```

添加源
```sh
vim /etc/apt/sources.list

deb http://nginx.org/packages/ubuntu/ xenial nginx
deb-src http://nginx.org/packages/ubuntu/ xenial  nginx
```

安装nginx-module-image-filter
```sh
apt update
apt search nginx
apt install nginx-full
sudo apt-get install nginx-module-image-filter
```

配置nginx.config

启动
```
nginx
```

kill 占用端口

Windows
```sh
netstat -nao | find ":80"
taskkill /pid pid /f
```

Linux
```sh
lsof -i:80
fuser -k 80/tcp
```

```sh
nginx
nginx -s stop
nginx -s reload
```

kill 占用端口

Windows
```sh
netstat -nao | find ":80"
taskkill /pid pid /f
```

Linux
```sh
lsof -i:80
fuser -k 80/tcp
```

```sh
nginx
nginx -s stop
nginx -s reload
```

## 配置
```sh
cd /etc/nginx
vim nginx.conf
```

详见 ` nginx.conf `

### url参数
```
*.jpg?r=90&w=100&h=100
```