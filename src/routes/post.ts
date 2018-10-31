import * as Router from 'koa-router'
import { PostController } from '../controllers/post'

const router = new Router({
  prefix: '/post'
})

router
  .get('/', PostController.getPost)
  .get('/:pid', PostController.getPostD)


export = router
