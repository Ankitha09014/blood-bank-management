const express=require('express');
const { registercontroller, loginContoller, currentUserController } = require('../contollers/authcontoller');
const authMiddleware = require('../middlewares/authMiddleware');
const router=express.Router();
router.post('/register',registercontroller);
router.post('/login',loginContoller);

router.get('/current-user',authMiddleware,currentUserController)
module.exports=router; 