import * as Router from 'koa-router'
import { PostController } from '../controllers/post'
import { SessionController } from "../controllers/session";

const router = new Router({
  prefix: '/post'
})

router
  .get('/', PostController.getPost)
  .get('/:pid', PostController.getPostD)
  .post('/download/:pid', SessionController.checkCaptcha, PostController.download)


export = router
