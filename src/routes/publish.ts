import * as Router from 'koa-router'
import { SessionController } from "../controllers/session";
import { PublishController } from "../controllers/publish";

const router = new Router({
  prefix: '/publish'
})

router
  .get('/', SessionController.check, SessionController.isAuthorByQuery, PublishController.edit)
  .put('/', SessionController.check,  SessionController.isAuthorByPost, PublishController.update)
  .del('/', SessionController.check,  SessionController.isAuthorByQuery, PublishController.remove)
  .post('/', SessionController.check, PublishController.publish)
  .get('/list', SessionController.check, PublishController.list)


export = router
