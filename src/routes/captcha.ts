import * as Router from 'koa-router'
import {captcha, checkCaptcha} from '../controllers/captcha'

const router = new Router({
  prefix: '/captcha'
})

router
  .get('/', captcha)
  .post('/', checkCaptcha)

export = router
