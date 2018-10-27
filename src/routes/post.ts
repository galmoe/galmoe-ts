import * as Router from 'koa-router'
import { PostController } from '../controllers/post'

const router = new Router({
  prefix: '/post'
})

router
  .get('/', PostController.getPost)


export = router
