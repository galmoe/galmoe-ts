import * as Router from 'koa-router'
import { PostController } from '../controllers/post'
import { SessionController } from "../controllers/session";

const router = new Router({
  prefix: '/post'
})

router
  .get('/', PostController.getPost)
  .get('/:pid(\\d+)', PostController.getPostD)
  .post('/download/:pid(\\d+)', SessionController.checkCaptcha, PostController.download)
  .post('/tag/:pid(\\d+)', SessionController.check, PostController.addTag)
  .del('/tag/:pid(\\d+)', SessionController.check, PostController.removeTag)


export = router
