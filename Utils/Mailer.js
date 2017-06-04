'use strict';
const nodemailer = require('nodemailer');
var config = require('../config');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.emailer,
        pass: config.password
    }
});


// send mail with defined transport object
var sent = function(mailOptions, callback) {
    console.log('mailer ',mailOptions);
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, info);
        }

    });
};


module.exports = {sent};