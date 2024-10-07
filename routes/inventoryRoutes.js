const express=require('express');
const { createInventoryController, getInventorController } = require('../contollers/inventoryController');
const authMiddleware = require('../middlewares/authMiddleware');
const router =express.Router();

router.post('/create-inventory', authMiddleware ,createInventoryController);

//GET BLOOD RECORDS
router.get('/get-inventory',authMiddleware,getInventorController);

module.exports=router;