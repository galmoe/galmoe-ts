import * as Router from 'koa-router'
import {UserController} from '../controllers/user'

const router = new Router({
  prefix: '/u'
})

router
  .get('/:uid', UserController.getUserInfo)
  .post('/', UserController.postInfo)
  .post('/check/uname', UserController.checkUname)
  .post('/check/email', UserController.checkEmail)

export = router
