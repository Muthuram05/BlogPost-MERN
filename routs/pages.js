const express = require('express')
const router = express.Router()
const userContoller= require('../controllers/users');

router.get(['/',"/login"],(req,res)=>{
    res.render("login")
})
router.get('/register',(req,res)=>{
    res.render("Register")
})
router.get('/profile',userContoller.isLoggedIn,(req,res)=>{
    if(req.user){
        res.render("profile",{user:req.user})
    }
    else{
        res.redirect("/login")
    }
})
router.get('/home',userContoller.isLoggedIn,(req,res)=>{
    if(req.user){
        res.render("Home",{user:req.user})
    }
    else{
        res.redirect("/login")
    }
})
router.get('/logout',(req,res)=>{
        res.cookie("Ram","logout",{
        expires:new Date(Date.now()+2*1000),
        httpOnly:true,
    });
    res.status(200).redirect("/");
})
module.exports = router;