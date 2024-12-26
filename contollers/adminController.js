const userModel = require("../models/usermodel");
const nodemailer = require("nodemailer");

//GET DONAR LIST
const getDonarsListController = async (req, res) => {
  try {
    const donarData = await userModel
      .find({ role: "donor" })
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      Toatlcount: donarData.length,
      message: "Donar List Fetched Successfully",
      donarData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Donar List API",
      error,
    });
  }
};
//GET HOSPITAL LIST
const getHospitalListController = async (req, res) => {
  try {
    const hospitalData = await userModel
      .find({ role: "hospital" })
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      Toatlcount: hospitalData.length,
      message: "HOSPITAL List Fetched Successfully",
      hospitalData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Hospital List API",
      error,
    });
  }
};
//GET ORG LIST
const getOrgListController = async (req, res) => {
  try {
    const orgData = await userModel
      .find({ role: "organisation" })
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      Toatlcount: orgData.length,
      message: "ORG List Fetched Successfully",
      orgData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In ORG List API",
      error,
    });
  }
};


// Email setup 
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


// DELETE DONOR
const deleteDonarController = async (req, res) => {
  try {
    // Find the user to get their email
    const user = await userModel.findById(req.params.id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Delete the user
    await userModel.findByIdAndDelete(req.params.id);

    // Send email notification
    const mailOptions = {
      from: "your-email@example.com", // Sender email
      to: user.email, // Recipient email
      subject: "Account Deletion Notification",
      text: `Dear ${user.name || user.organisationName || "User"},\n\nYour account has been deleted. For further queries contact helpline number 9463805924.\n\nRegards,\nBlood Bank Management Team`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).send({
      success: true,
      message: "Record deleted successfully and email notification sent",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while deleting user or sending email",
      error,
    });
  }
};


//EXPORT
module.exports = {
  getDonarsListController,
  getHospitalListController,
  getOrgListController,
  deleteDonarController,
};
