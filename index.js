const express = require('express')
const mongodb = require('./db')
const path = require('path');
const hbs = require('hbs');
const cookieParser = require('cookie-parser');


const app = express();
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
const location = path.join(__dirname,"./public");
app.use(express.static(location));
app.set('view engine','hbs');
const partial = path.join(__dirname,'./views/partials')
hbs.registerPartials(partial);

app.use('/',require('./routs/pages'))
app.use('/auth',require('./routs/auth'))
app.use('/post',require('./routs/post'))
const port = process.env.port || 8000

app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})

