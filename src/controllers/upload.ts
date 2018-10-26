import { Context } from 'koa'
import { host } from '../../config';
import * as path from 'path'
import * as Upload from '../models/mysql/Upload'
import { saveAvatar } from '../models/mysql/Session'
import * as fs from 'fs'
import { randomMd5 } from '../../lib/md5'
import { bytesToSize } from '../utils/util'

// file upload test
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
  const { uid } = ctx.state
  const {file} = ctx.request.files           // 获取上传文件
  const reader = fs.createReadStream(file.path) // 创建可读流
  const sizeSimple = bytesToSize(file.size)   // 文件大小
  let ext = file.name.split('.').pop()        // 获取上传文件扩展名
  // 过滤blob, 设为webp
  if (ext === 'blob') {
    ext = 'webp'
  }
  console.log('sizeSimple：', sizeSimple)
  const hash = randomMd5()
  const fileName = `${hash}.${ext}`
  // 创建可写流
  const upStream = fs.createWriteStream(path.join(__dirname, `../../public/files/${fileName}`))
  // 可读流通过管道写入可写流
  reader.pipe(upStream)
  // 直接删除temp
  // await fs.unlink(file.path, (err: any) => {
  //   if (err) {
  //     console.log(err)
  //   }
  // })
  // 写入mysql
  let fileObj = {
    hash: hash,
    uid,
    size_simple: sizeSimple,
    type: ext
  }
  await Upload.saveInfo(fileObj)
  await saveAvatar(uid, `${host}/files/${fileName}`)
  console.log('uploading %s -> %s', file.name, upStream.path)
  ctx.body = {
    type: 'success',
    msg: '上传成功',
    src: `${host}/files/${fileName}`
  }
}
