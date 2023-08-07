const nodemailer = require("nodemailer");

module.exports.sendMail = async function sendMail(str,data) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,                  // true fpr 465, false for other ports
        auth: {
            user: 'harshniet16@gmail.com',
            pass: 'dtqvbtarwlhbpsim'
        }
    });

    var Osubject, Ohtml;    
    if(str == 'signup') {
        Osubject = `Thank you for signing ${data.name}`;
        Ohtml = `
        <h1>Welcome to Food App<h1>
        Hope you have a good time
        Here your details-
        Name - ${data.name}
        Email - ${data.email}`;
    }
    else if(str == 'resetpassword') {
        Osubject = 'Reset Password';
        Ohtml = `
        <h1>Food App<h1>
        Here is your link to reset password !
        ${data.resetPasswordLink}`;
    }

    let info = await transporter.sendMail({
        from: '"Food App 👻" <harshniet16@gmail.com>', // sender address
        to: data.email, // list of receivers
        subject: Osubject, // Subject line
        // text: "Hello world", // plain text body
        html: Ohtml, // html body
    });

    console.log("Message sent: %s", info.messageId);
}