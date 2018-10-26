import {Context} from 'koa'

const svgCaptcha = require('svg-captcha')

export const captcha = async (ctx: Context) => {
  const captcha = svgCaptcha.create({
    size: 6,
    noise: 5,
    width: 160,
    height: 50,
    color: true,
    background: '#ffffff'
  })
  console.log('captcha.text: ====>', captcha.text)
  ctx.session.captcha = captcha.text
  ctx.set('Content-Type', 'image/svg+xml')
  ctx.status = 200
  ctx.body = captcha.data
}

export const checkCaptcha = async (ctx: Context) => {
  console.log('pc all data: ======>', ctx.request.body)
  // 不区分大小写
  const req = ctx.request.body
  const {captcha} = ctx.session
  const captchaReg = new RegExp(req.captcha, 'i')
  if (!captchaReg.test(captcha)) {
    ctx.body = {
      status: 'error',
      msg: '验证码错误'
    }
  }
}
