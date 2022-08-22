var express = require('express');
var router = express.Router();
var {Joi, validate} = require('express-validation');
const md5= require("md5");
const User = require('../models/User');
/**
 *  API : /auth/login
 *  Type: Post
 */

router.post("/login", validate({
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
}), function(req, res, next) {
    const {email, password} = req.body;
    console.log("request-body", req.body);
    if ((email === "strike10310522@gmail.com") && (password === "123456")) {
        res.send("Okay");
    }
    else {
        res.send("Incorrect");
    }
});

/**
 *  API:  /auth/register
 *  Type: Post
 */
router.post("/register", validate({
    body: Joi.object({
        firstName: Joi.string().min(3).max(255).required(),
        lastName: Joi.string().min(3).max(255).required(),
        email: Joi.string().email().required(),
        password: Joi.string().regex(/[a-zA-Z0-9]{8,255}/).required()
    })
}, {}, {}), async function (req, res, next) {
    try {
        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;
    
        const existOne = await User.findOne({
           email: email 
        });

        if (existOne) {
            return res.json({
                status: false,
                message: "Email already exist"
            })
        }

        const user =  new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.password = md5(password);
    
        await user.save();
    
        res.json({
            status: true,
            message: "Success"
        });
    }
    catch (e) {
        res.json({
            status: false,
            message: e.message
        })
    }
    
});

module.exports = router;