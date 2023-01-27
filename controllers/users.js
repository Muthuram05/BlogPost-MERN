const dbo = require("../db");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const objectId = dbo.objectId

exports.register= async(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;
    let database =await dbo.getDataBase();
    const collection = database.collection('users');
    const len = await collection.findOne({email:email});
    if(len){
        return res.render('register',{msg:'Email id already taken',msg_type:'error'})
    }
    else if(password !== confirm_password){
        return res.render('register',{msg:'Password Do not match',msg_type:'error'});
    }
    else{
        let hashedPassword = await bcrypt.hash(password,8);
        let user = { name: req.body.name, email:req.body.email,password : hashedPassword}
        await collection.insertOne(user);
        return res.render('register',{msg:'User Registration Sucessfully',msg_type:'good'});
    }

}
exports.login= async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).render("login",{msg:'please enter your email and password',msg_type:'error'})
        }
        let database =await dbo.getDataBase();
        const collection = database.collection('users');
        const result = await collection.findOne({email:email});
        // console.log(result.password)
        if(!result || !(await bcrypt.compare(password,result.password))){
            return res.status(401).render('login',{
                msg:'Email or Password incorrect',
                msg_type:'error'
            })
        }
        else{
            const id = result._id;
            const cookieOptions={
                expires:new Date(Date.now()+30*24*60*60*1000),
                httpOnly:true,
            };
            res.cookie("Ram",id,cookieOptions);
            res.status(200).redirect("/home");
        }
    }
    catch(err){
        console.log(err)
    }

};
exports.isLoggedIn = async (req,res,next)=>{
    if(req.cookies){
        try{
            let database =await dbo.getDataBase();
            const collection = database.collection('users');
            const result = await collection.findOne({_id:objectId(req.cookies.Ram)});
            if(!result){
                next()
            }
            req.user = result;
            return next()
        }
        catch(err){
            console.log(err);
            next()
        }
    }
    else{
        next()
    }
}
