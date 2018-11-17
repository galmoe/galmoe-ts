import * as Router from 'koa-router'
import * as img from '../controllers/img'
import { SessionController } from '../controllers/session'


const router = new Router({
  prefix: '/img'
})

router
  // .get('/', )
  // .post('/', )
  .get('/sticker', img.sticker)
  .post('/sticker', SessionController.checkAdmin, img.sticker)

export = router
