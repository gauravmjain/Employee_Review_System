const express = require('express');
const router = express.Router();
const userController = require('../controller/user_conntroller');
const passport = require('passport');

router.post('/create',userController.create);
router.get('/sign-in',userController.signIn);
router.get('/sign-up',userController.signUp);
router.post('/create-session',passport.authenticate('local',{failureRedirect : "/"}),userController.createSession);
router.get('/sign-out',userController.destroySession);
router.get('/review-page',userController.review_page);
router.post('/change_status', userController.changeStatus);
router.get('/delete',userController.destroyUser)        


module.exports = router;