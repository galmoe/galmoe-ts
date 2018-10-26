import * as Router from 'koa-router'
import {SessionController} from '../controllers/session'

const router = new Router({
  prefix: '/s'
})

router
  .get('/', SessionController.check, SessionController.getInfo)
  .post('/login', SessionController.login)
  .post('/logout', SessionController.logout)
  .post('/register', SessionController.register)

export = router
