const express = require("express");
const authMiddelware = require("../middlewares/authMiddleware");
const { bloodGroupDetailsContoller } = require("../contollers/analyticsContoller");


const router = express.Router();

//routes

//GET BLOOD DATA
router.get("/bloodGroups-data", authMiddelware, bloodGroupDetailsContoller);

module.exports = router;
