const usermodel = require("../models/usermodel");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const registercontroller = async (req, res) => {
    try {
        const existinguser = await usermodel.findOne({ email: req.body.email });
        if (existinguser) {
            return res.status(200).send({
                success: false,
                message: 'User already exists'
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashPassword;

        const user = new usermodel(req.body);
        await user.save();
        return res.status(201).send({
            success: true,
            message: 'User registered successfully',
            user,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in register API',
            error,
        });
    }
};

const loginContoller = async (req, res) => {
    try {
        const existinguser = await usermodel.findOne({ email: req.body.email });
        if (!existinguser) {
            return res.status(404).send({
                success: false,
                message: 'Invalid credentials'
            });
        }
        if(existinguser.role!==req.body.role){
            return res.status(500).send({
                success:false,
                message:'role doesnot match'
            });
        }
        const comparePassword = await bcrypt.compare(
            req.body.password,
            existinguser.password // Correct variable name
        );
        if (!comparePassword) {
            return res.status(401).send({
                success: false,
                message: 'Invalid credentials'
            });
        }
        const token = jwt.sign({ userId: existinguser._id }, process.env.JWT_SECRET, {
            expiresIn: '1h' // Correct expiry value
        });
        return res.status(200).send({
            success: true,
            message: "Login successful",
            token,
            user: existinguser, // Return the existing user, not 'user'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in login API',
            error
        });
    }
};

const currentUserController= async(req,res)=>{
    try{
        const user =await usermodel.findOne({id:req.body.userId})
        return res.status(200).send({
            success:true,
            message:'user fetched successfully',
            user,
        });

    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'unable to get current user',
            error,
        });
    }

};
module.exports = { registercontroller, loginContoller,currentUserController };
