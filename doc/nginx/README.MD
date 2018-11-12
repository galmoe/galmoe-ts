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
```conf
server {
   	listen 80;
   	server_name 192.168.10.101;
	#server_name localhost;
	error_page 500 502 503 504 /50x.html;
	location = /50x.html {
		root html;
	}
    root /data/github/galmoe/galmoe-ts/public;
	index index.html;

    # proxy
    location /api/ {
        proxy_pass http://192.168.10.101:3000/;
    }
    
	# vue
	location / {
		try_files $uri $uri/ @router;
		index index.html;
	}

	# rewrite
	location @router {
		rewrite ^.*$ /index.html last;
	}

	# image filter
    location ~ \.(gif|jpg|jpeg|png|bmp|swf|webp)$ {
		root  /data/github/galmoe/galmoe-ts/public/images/;
        set $width    "-";
		set $height   "-";
		if ( $arg_w != "" ){
        set $width $arg_w;
        }
        if ( $arg_h != "" ){
        set $height $arg_h;
        }
        set $rotate "-";
        if ( $arg_r != "" ){
        set $rotate $arg_r;
        }
        set $quality "-";
        if ( $arg_q != "" ){
        set $quality $arg_q;
        }
        image_filter resize $width $height;   # 缩放图片
        image_filter rotate $rotate;          # 旋转图片
        image_filter_jpeg_quality $quality;   # jpeg图片质量，没有效果
        image_filter_interlace on;            # 将jpeg图片转换为可以渐进式加载的格式，这样用户可以尽快看到图片效果
        image_filter_transparency on;         # 是否保留图片的透明像素，因为我们还有png图，所以这里要打开
        image_filter_buffer 8M;
        #error_page   415 = /empty;
    }

	# webp
	location /images {
		expires 365d;
		try_files $uri $uri/ @webp; # 如果文件不存在尝试生成 webp 图片
    }

    #location @webp {
    #    if ($uri ~ "/([a-zA-Z0-9-_]+)\.(png|jpg|gif)\.webp") {
    #      content_by_lua_file "/etc/nginx/conf/webp.lua";
    #    }
    #}
}
```

url参数
```
*.jpg?r=90&w=100&h=100
```

### webp
```sh
# webp
sudo apt-get install webp
```

### libpng

添加源
```sh
vim /etc/apt/sources.list

deb http://security.ubuntu.com/ubuntu xenial-security main
```
```
sudo apt-get update
sudo apt-get install libpng12-0
```

#### zlib
sudo apt-get install zlib1g-dev