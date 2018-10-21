import * as Router from 'koa-router'
// import {getUserInfo} from '../controllers/user'
import * as user from './user'

const router = new Router({
  prefix: '/api'
})

router.get('/', async (ctx) => {
  ctx.throw(403, '403 Forbidden')
});


router.use(user.routes())

// router.use(user)
// router.use(user.routes(), user.allowedMethods())

export = router
