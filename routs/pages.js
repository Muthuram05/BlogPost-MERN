const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.render("index")
})
router.get('/register',(req,res)=>{
    res.render("Register")
})
router.get('/profile',(req,res)=>{
    res.render("Profile")
})
router.get('/home',(req,res)=>{
    res.render("Home")
})
module.exports = router;