import { Context } from 'koa'
const send = require('koa-send')
import * as path from 'path'
import * as os from 'os'
const fs = require('fs')
import { md5SUFFIX } from '../../lib/md5'
const { bytesToSize } = require('../utils/util')
import * as Upload from '../models/mysql/Upload'
// import {freemem} from "os";

export const getPage = async (ctx: Context) => {
  const html = `
      <h1>koa2 upload demo</h1>
      <form method="POST" action="/api/upload" enctype="multipart/form-data">
        <p>file upload</p>
        <input name="file" type="file" multiple /><br/><br/>
        <button type="submit">submit</button>
      </form>
    `
  ctx.body = html
}

export const uploadFile = async (ctx: Context) => {
  const {file} = ctx.request.files           // 获取上传文件
  const reader = fs.createReadStream(file.path) // 创建可读流
  const sizeSimple = bytesToSize(file.size)   // 文件大小
  let ext = file.name.split('.').pop()        // 获取上传文件扩展名
  // TODO: 获取fileType
  // 过滤blob, 设为webp
  if (ext === 'blob') {
    ext = 'webp'
  }
  console.log('sizeSimple：', sizeSimple)
  // const hash = md5SUFFIX(String(Date.now()))
  const fileName = `${md5SUFFIX(String(Date.now()))}.${ext}`
  const upStream = fs.createWriteStream(path.join(__dirname, `../../public/files/${fileName}`)) // 创建可写流
  // const upStream = fs.createWriteStream(path.join(os.tmpdir(), Math.random().toString()));
  // 可读流通过管道写入可写流
  reader.pipe(upStream)
  // 写入mysql
  // let fileObj = {
  //   hash: md5SUFFIX(String(Date.now())),
  //   uid: 1,
  //   uname: 'admin',
  //   size: file.size,
  //   size_simple: sizeSimple,
  //   type: ext
  // }
  // let res = await Upload.saveInfo(fileObj)
  // 直接删除temp
  // fs.unlink(os.tmpdir()+'\\'+fileName, (err: any) => {
  //   if (err) {
  //     console.log(err)
  //   }
  // })
  // 或者以命名方式改路径
  // fs.rename(oldFilePath, newFilePath, callback(err));
  console.log('uploading %s -> %s', file.name, upStream.path)
  // const file = ctx.request.files.file;
  // const reader = fs.createReadStream(file.path);
  // // const stream = fs.createWriteStream(path.join(os.tmpdir(), Math.random().toString()));
  // const stream = fs.createWriteStream(`D:/Sites/upload/${md5SUFFIX(String(Date.now()))}`);
  // reader.pipe(stream);
  // console.log('uploading %s -> %s', file.name, stream.path);
  ctx.body = {
    type: 'success',
    msg: '上传成功',
    src: `http://localhost:3000/files/${fileName}`
  }
}
