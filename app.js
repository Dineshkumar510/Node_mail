require('dotenv').config();
const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const path = require('path');
const port = process.env.PORT || 8050;


app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/', (req, res)=> {
    res.sendFile(__dirname + "/public/contactform.html");
});

app.post('/',(req, res)=> {
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USERNAME,
            pass: process.env.PASSWORD
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: process.env.USERNAME,
        subject: `Message from ${req.body.email}: from country "${req.body.country}"`,
        text: req.body.subject
    }

    transporter.sendMail(mailOptions, (error, info)=> {
        if(error){
            console.log(error);
            res.send("Something went Wrong, Check in Backend");
        }
        else{
            console.log('Email sent' + info); 
            res.send("success");
        }
    })

})


app.listen(port, ()=> {
    console.log(`App is running on port: ${port}`);
});