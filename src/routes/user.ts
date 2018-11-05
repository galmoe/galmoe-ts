import * as Router from 'koa-router'
import { UserController } from '../controllers/user'
import { SessionController } from "../controllers/session";

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
  .put('/fav', SessionController.check, UserController.addFav)
  .del('/fav', SessionController.check, UserController.removeFav)
  .get('/comment', UserController.comment)
  .post('/comment', SessionController.check, UserController.comment)
  .del('/comment', SessionController.check, UserController.comment)
  .get('/about', UserController.about)
  .put('/about', SessionController.check, UserController.UpdateAbout)
  // follow
  .get('/following', UserController.following)
  .put('/following', UserController.following)
  .del('/following', UserController.following)
  .get('/follower', UserController.follower)

export = router
