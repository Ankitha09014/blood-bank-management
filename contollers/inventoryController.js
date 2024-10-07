const inventoryModel = require("../models/inventoryModel");
const usermodel = require("../models/usermodel");

const createInventoryController = async (req, res) => {
    try {
        const { email, inventoryType } = req.body;
        
        // Check if user exists
        const user = await usermodel.findOne({ email });
        if (!user) {
            throw new Error("User not found");  // Fixed throw usage
        }
        
        // Validate user role for 'in' inventoryType
        if (inventoryType === 'in' && user.role !== 'donar') {
            throw new Error('Not a donor account');  // Fixed condition and throw usage
        }
        
        // Validate user role for 'out' inventoryType
        if (inventoryType === 'out' && user.role !== 'hospital') {
            throw new Error('Not a hospital');  // Fixed condition and throw usage
        }

        // Create new inventory record
        const inventory = new inventoryModel(req.body);
        await inventory.save();

        return res.status(201).send({
            success: true,
            message: 'New blood record added'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in create inventory API',
            error,
        });
    }
};


//get blood record
const getInventorController=async(req,res)=>{
    try{
        const inventory=await inventoryModel.find({
            organisation :req.body.userId,
        })
        .populate('donar')
        .populate('hospital')
        .sort({createdAt:-1});
        return res.status(200).send({
            success:true,
            message:"get all records successfully",
            inventory,
        });

    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"error in get all inventory",
            error,
        });
    }
};





module.exports = { createInventoryController ,getInventorController};
