import * as fs from 'fs'

export function bytesToSize (bytes: number) {
  if (bytes === 0) {
    return '0 B'
  }
  let k = 1024
  let sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let i = Math.floor(Math.log(bytes) / Math.log(k))
  return (bytes / Math.pow(k, i)).toPrecision(4) + ' ' + sizes[i]
}

// 10位 timeStamp => yyyy-mm-dd h:mm:ss
export function formatDateTime (timeStamp: number) {
  let date = new Date()
  date.setTime(timeStamp * 1000)
  let y: number | string = date.getFullYear()
  let m: number | string = date.getMonth() + 1
  let d: number | string = date.getDate()
  let h: number | string = date.getHours()
  let minute: number | string = date.getMinutes()
  let second: number | string = date.getSeconds()
  m = m < 10 ? ('0' + m) : m
  d = d < 10 ? ('0' + d) : d
  h = h < 10 ? ('0' + h) : h
  minute = minute < 10 ? ('0' + minute) : minute
  second = second < 10 ? ('0' + second) : second
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
}

// yyyy-mm-dd h:mm:ss 时间
export function dateTime () {
  let date = new Date()
  date.setTime(Date.now())
  let y: number | string = date.getFullYear()
  let m: number | string = date.getMonth() + 1
  let d: number | string = date.getDate()
  let h: number | string = date.getHours()
  let minute: number | string = date.getMinutes()
  let second: number | string = date.getSeconds()
  m = m < 10 ? ('0' + m) : m
  d = d < 10 ? ('0' + d) : d
  h = h < 10 ? ('0' + h) : h
  minute = minute < 10 ? ('0' + minute) : minute
  second = second < 10 ? ('0' + second) : second
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
}

export function getFileSize(dir: string, filename: string):string {
  const stats = fs.statSync(`${dir}/${filename}`)
  const fileSizeInBytes = stats["size"]
  return bytesToSize(fileSizeInBytes)
}
