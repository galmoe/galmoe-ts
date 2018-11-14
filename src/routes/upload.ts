import * as Router from 'koa-router'
import * as upload from '../controllers/upload'
import { SessionController } from "../controllers/session";

const router = new Router({
  prefix: '/upload'
})

router
  .get('/', upload.getPage)
  .post('/', SessionController.check, upload.uploadFile)

export = router
