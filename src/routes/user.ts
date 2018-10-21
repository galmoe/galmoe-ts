import * as Router from 'koa-router'
import {UserController} from '../controllers/user'

const router = new Router({
  prefix: '/u'
})

router
  .get('/', UserController.getUserInfo)
  .post('/', UserController.postInfo)
  .get('/message', UserController.getMessage)
  .get('/errmessage', UserController.getErrMessage)

export = router
