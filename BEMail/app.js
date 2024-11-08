const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4500;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'phanhuy2ka4@gmail.com',
        pass: 'jfdjhyfhaghcopgu'
    }
});

app.post('/send-email', (req, res) => {
    const userInfo = req.body;
    const mailOptions = {
        from: 'phanhuy2ka4@gmail.com',
        to: userInfo.email,
        subject: 'Welcome to Dotnet Edu',
        text: `Hello ${userInfo.name}, welcom to Dotnet Edu.`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).send('An error occurred while sending email');
        } else {
            res.status(200).send('Email sent successfully');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
});