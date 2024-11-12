const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // Create a Nodemailer transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'danielle1kedem1@gmail.com',
            pass: 'DKDDF1113'
        }
    });

    // Send mail with defined transport object
    let info = transporter.sendMail({
        from: '"Your Name" <your-email@gmail.com>',
        to: email,
        subject: 'Message from Your Website',
        text: `Hello ${name},\n\nThank you for your message:\n${message}`
    });

    res.send('Email sent');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
