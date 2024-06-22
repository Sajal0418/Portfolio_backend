const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  // Replace with your email provider
  //   host: 'smtp.gmail.com',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Route to handle form submission
app.post('/send', (req, res) => {
  const {
    name,
    email,
    subject,
    message
  } = req.body;
  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    replTo: email,
    subject: `Message from ${name}: ${subject}`,
    text: `Message: ${message}\n\n Email:(${email})`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Message sent!');
  });
});
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});