const express = require('express')
const bodyParser = require('body-parser')
const userRouter = require('./controller/user.route')
require('./lib/dbconnect')
const flash = require('connect-flash'); //1
const session = require('express-session') //4
const app = express();

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:false}))
app.use('/user',userRouter)

app.use(session({  //5
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}))
app.use(flash()) //2
app.use((req,res,next)=>{ //3
    res.locals.error_message = req.flash('error_message')
    next()
})


app.listen(3000,()=>{console.log('Server started!')})