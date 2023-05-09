const router = require('express').Router()
const User = require("../models/User")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken");


router.post("/Register",async(req,res)=>{
    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
        
    });
    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
    
    
});

//LOGIN
router.post("/login",async(req,res)=>{
    try {
        const user = await User.findOne({username:req.body.username});
        if(!user ) 
            {
                res.status(401).json('Wrong Credentials!')
        }else{
            const hashedPassword= CryptoJS.AES.decrypt(user.password,process.env.PASS_SEC);
            const Inputpassword = hashedPassword.toString(CryptoJS.enc.Utf8);
            if(Inputpassword !== req.body.password) {
                res.status(401).json('Wrong Credentials!')
            }else
            {
                const accessToken = jwt.sign(
                    {
                        id: user._id,
                        isAdmin: user.isAdmin,
                    },
                    process.env.JWT_SEC,
                        {expiresIn:"1d"}
                    );
                const {password, ...others}=user._doc
                res.status(200).json({...others,accessToken});
            }
        }
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router