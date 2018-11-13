### node-form
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

### gm
```
sudo apt-get install graphicsmagick
sudo apt-get install imagemagick

npm install gm --with-webp
```
