const express = require('express')
const router = express.Router()
const userContoller= require('../controllers/users');
const dbo = require('../db')


router.get(['/',"/login"],(req,res)=>{
    res.render("login")
})
router.get('/register',(req,res)=>{
    res.render("Register")
})
router.get('/profile',userContoller.isLoggedIn,async(req,res)=>{
    if(req.user){
        let database =await dbo.getDataBase();
        const collection = database.collection('datas');
        const cursor = collection.find({email:req.user.email})
        let datas =await cursor.toArray();
        res.render("profile",{user:req.user,datas})
    }
    else{
        res.redirect("/login")
    }
})
router.get('/home',userContoller.isLoggedIn,async(req,res)=>{
    if(req.user){
        let database =await dbo.getDataBase();
        const collection = database.collection('datas');
        const cursor = collection.find({})
        let datas =await cursor.toArray();
        res.render("Home",{user:req.user,datas});
    }
    else{
        res.redirect("/login")
    }
})
router.get('/write',userContoller.isLoggedIn,async(req,res)=>{
    if(req.user){
        res.render("NewPost",{user:req.user});
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