import * as Router from 'koa-router'
import { SessionController } from "../controllers/session";
import { PublishController } from "../controllers/publish";

const router = new Router({
  prefix: '/publish'
})

router
  .get('/', SessionController.check, PublishController.edit)
  .post('/', SessionController.check, PublishController.publish)


export = router
