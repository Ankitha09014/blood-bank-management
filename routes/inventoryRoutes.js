const express=require('express');
const { createInventoryController, getInventorController, getDonarsController, getHospitalController, getOrgnaisationController, getOrgnaisationForHospitalController, getInventoryHospitalController, getRecentInventoryController } = require('../contollers/inventoryController');
const authMiddleware = require('../middlewares/authMiddleware');
const router =express.Router();
//add inventory
router.post('/create-inventory', authMiddleware ,createInventoryController);

//GET BLOOD RECORDS
router.get('/get-inventory',authMiddleware,getInventorController);
//get recent blood
router.get('/get-recent-inventory',authMiddleware,getRecentInventoryController);

router.post('/get-inventory-hospital',authMiddleware,getInventoryHospitalController);
//GET Donar RECORDS
router.get('/get-donars',authMiddleware,getDonarsController);
router.get('/get-hospitals',authMiddleware,getHospitalController);
router.get('/get-orgnaisation',authMiddleware,getOrgnaisationController);
router.get('/get-orgnaisation-for-hospital',authMiddleware,getOrgnaisationForHospitalController);
module.exports=router;