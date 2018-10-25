import * as Router from 'koa-router'
import {SessionController} from '../controllers/session'

const router = new Router({
  prefix: '/s'
})

router
  .post('/login', SessionController.login)
  .post('/logout', SessionController.logout)
  .post('/register', SessionController.register)

export = router
