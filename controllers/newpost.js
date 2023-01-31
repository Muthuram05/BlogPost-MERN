const express = require('express')
const router = express.Router()
const dbo = require('../db')
exports.new = async (req,res)=>{
    try{
    let database =await dbo.getDataBase();
    const collection = database.collection('datas');
    const name = req.body.name;
    const email = req.body.email;
    const title = req.body.title;
    const content = req.body.content;
    const createdAt = new Date();
    const tags = req.body.tags;
    const image = null;
    const user_image = null;
    const cursor =await collection.insertOne({name,email,title,content,createdAt,tags});
    res.status(200).redirect("/home/?status=1");
}
    catch(e){
        console.log(e)
    }
}
