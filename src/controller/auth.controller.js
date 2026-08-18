const userModel = require("../models/user.model");
const jwt = require('jsonwebtoken');
const emailService = require("../services/email.service");

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
            message: "User already exist",
            status: "failed"
        })
    }

    const user = await userModel.create({
        email: email,
        name: name,
        password: password
    });

    const token = jwt.sign({userId: user._id,}, process.env.JWT_SECRET, {expiresIn: "3d"});

    res.cookie("token", token);

    res.status(201).json({
        user:{
            id: user._id,
            email: user.email,
            name: user.name
        },
        token
    });

    // send registration email
    await emailService.sendRegistrationEmail(user.email, user.name);

}


/**
* - user login controller
* - POST /api/auth/login
*/

async function userLoginController(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({email}).select("+password");
    
    if(!user){
        res.status(201).json({
            message: "Inavlid email or passwrod",
        });
    }

    const correctPassword = await user.comparePassword(password);

    if(!correctPassword){
        res.status(201).json({
            message: "Inavlid passwrod",
        });
    }

    const token = jwt.sign({user: user._id}, process.env.JWT_SECRET, {expiresIn: "3d"});
    res.cookie("token", token);

    res.status(201).json({
        user:{
            id: user._id,
            email: user.email,
            name: user.name
        },
        token
    });

}

module.exports = {
    userRegistrationController,
    userLoginController
};