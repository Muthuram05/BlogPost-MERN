exports.register= (req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;
    console.log(name,email,password,confirm_password)
}