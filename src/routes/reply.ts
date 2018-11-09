import * as Router from 'koa-router'
import { SessionController } from "../controllers/session";
import { ReplyController } from "../controllers/reply";

const router = new Router({
  prefix: '/reply'
})

router
  .get('/', ReplyController.get)
  .post('/', SessionController.check, ReplyController.insertOne)


export = router
