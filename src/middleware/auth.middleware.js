const usermodel = require("../models/user.model");
const jwt = require(JsonWebToken)


async function authMiddleware(req, res, next){
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]

    if(!token){
        return res.status(401).json({
            message: "Unauthorized access, token is missing"
        });
    }

    try{
        
    }catch(err){
        return res.status(401).json({
            message: "Unauthorized access, token is invalid"
        });
    }
}