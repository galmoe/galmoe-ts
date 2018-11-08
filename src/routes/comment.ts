import * as Router from 'koa-router'
import { PostController } from '../controllers/post'
import { SessionController } from "../controllers/session";
import { CommentController } from "../controllers/comment";

const router = new Router({
  prefix: '/comment'
})

router
  .get('/:pid(\\d+)', CommentController.getComment)
  .post('/:pid(\\d+)', SessionController.check, CommentController.insertOne)


export = router
