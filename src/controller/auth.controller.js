const userModel = require("../models/user.model");
const jwt = require('jsonwebtoken');

/**
* - user register controller
* - POST /api/auth/register
*/

async function userRegistrationController(req, res) {
    const { email, name, password } = req.body;

    const isExist = await userModel.findOne({
        email: email
    });

    if(isExist){
        return res.status(422).json({
            message: "USer already exist",
            status: "failed"
        })
    }

    const user = await userModel.create({
        email: email,
        name: name,
        password: password
    });

    const token = jwt.sign({userId: user._id,}, process.env.JWT_SECRET);
}

module.exports = {
    userRegistrationController
};