import * as Router from 'koa-router'
import * as upload from '../controllers/upload'

const router = new Router({
  prefix: '/upload'
})

router
  .get('/', upload.getPage)
  .post('/', upload.uploadFile)

export = router
