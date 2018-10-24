import * as Router from 'koa-router'
import {UserController} from '../controllers/user'

const router = new Router({
  prefix: '/s'
})

router
  .get('/', UserController.getUserInfo)
  .post('/', UserController.postInfo)

export = router
