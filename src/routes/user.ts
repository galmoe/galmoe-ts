import * as Router from 'koa-router'
import {UserController} from '../controllers/user'

const router = new Router({
  prefix: '/u'
})

router
  .get('/:id', UserController.getUserInfo)
  .post('/', UserController.postInfo)
  .get('/message', UserController.getMessage)
  .get('/errmessage', UserController.getErrMessage)
  .post('/check/uname', UserController.checkUname)
  .post('/check/email', UserController.checkEmail)

export = router