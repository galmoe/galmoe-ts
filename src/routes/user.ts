import * as Router from 'koa-router'
import { UserController } from '../controllers/user'

const router = new Router({
  prefix: '/u'
})

router
  .get('/info/:uid', UserController.getUserInfo)
  .post('/', UserController.postInfo)
  .post('/check/uname', UserController.checkUname)
  .post('/check/email', UserController.checkEmail)
  // user page
  .get('/post', UserController.post)
  .get('/fav', UserController.fav)
  .get('/comment', UserController.comment)
  .post('/comment', UserController.comment)
  .del('/comment', UserController.comment)
  .get('/about', UserController.about)
  .put('/about', UserController.about)
  // follow
  .get('/following', UserController.following)
  .put('/following', UserController.following)
  .del('/following', UserController.following)
  .get('/follower', UserController.follower)

export = router
