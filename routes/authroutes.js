const express = require('express');
const { currentUserController, loginController, registerController } = require('../contollers/authcontoller');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();
router.post('/register', registerController);
router.post('/login', loginController);

router.get('/current-user', authMiddleware, currentUserController)
module.exports = router; 