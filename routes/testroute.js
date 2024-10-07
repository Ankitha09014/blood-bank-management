const express=require('express');
const { testController } = require('../contollers/testController');
const router=express.Router();
router.get('/', testController);
module.exports=router;