import * as Router from 'koa-router'
import {SessionController} from '../controllers/session'

const router = new Router({
  prefix: '/s'
})

router
  .get('/', SessionController.check, SessionController.getInfo)
  .get('/p', SessionController.check, SessionController.private)
  .post('/login', SessionController.checkCaptcha, SessionController.login)
  .post('/logout', SessionController.logout)
  .post('/register', SessionController.checkCaptcha, SessionController.register)
  .put('/update', SessionController.check, SessionController.update)
  .put('/safety', SessionController.check, SessionController.checkCaptcha, SessionController.safety)

export = router
