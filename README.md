## galmoe ts
[![Node](https://img.shields.io/badge/node-%3E=9.0.0-ff69b4.svg?style=flat-square)](https://nodejs.org/en/download/releases/)
[![Mysql](https://img.shields.io/badge/mysql-%3E%3D5.7.8-%23ff69b4.svg?style=flat-square)](https://dev.mysql.com/downloads/mysql/)
[![License](https://img.shields.io/badge/license-GPLV3-green.svg?style=flat-square)](https://github.com/galmoe/galmoe-server/blob/master/LICENSE)

galmoe node server base on typescript and koa2

重写中...

完成度 20%

```js
npm install

// ts watch dev
npm run watch-server-ts

// build dev
npm run serve
```

### 配置
node-form
```js
node_modules\formidable\lib\incoming_form.js
```

改为
```js
IncomingForm.prototype._uploadPath = function(filename) {
  var buf = crypto.randomBytes(16);
  var name = buf.toString('hex');

  if (this.keepExtensions) {
    var ext = path.extname(filename);
    ext     = ext.replace(/(\.[a-z0-9]+).*/i, '$1');

    name += ext;
  }

  return path.join(this.uploadDir, name+'.webp');
};
```
