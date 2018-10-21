import * as Router from 'koa-router'
import {UserController} from '../controllers/upload'

const router = new Router({
  prefix: '/upload'
})

router
  .post('/', UserController.postInfo)

export = router
