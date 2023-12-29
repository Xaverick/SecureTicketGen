const qrCode = require('../models/qrCodeModel');
const otpGenerator = require('otp-generator');
const OTP = require('../models/otpModel');
const User = require('../models/adminModel');
const sendMail = require('../utils/mailSender');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


module.exports.renderLogin = (req, res) => {
    res.render('admins/login');
}

module.exports.adminlogin = async (req, res) => {
    let { email, password } = req.body;
    if(!email || !password) res.status(400).json('missing fields');
    else{
        email = email.toLowerCase();
        const user = await User.findOne({ email: email});
        if(user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ id: user._id }, `${process.env.SECRET}`, { expiresIn: '3h' });
            res.cookie('jwt', token, { signed: true,httpOnly: true ,maxAge: 1000 * 60 * 60 }).json('login');
        } 
        else {
            res.status(400).json('login failed');
        }
    }
}

module.exports.renderRegister = (req, res) => {
    res.render('admins/register');
}

module.exports.adminregister = async (req, res) => {
    let { username, email, password } = req.body;
    email = email.toLowerCase();
    const registeredEmail = await User.findOne({email: email});

    if(registeredEmail){
        res.status(400).json('email already exists');
    }

    else{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const user = await User.create({username, email, password: hash});
        res.json('register');
    }
}


module.exports.adminlogout = (req, res) => {
    res.clearCookie('jwt').json('logout');
};


module.exports.adminHome = async (req, res) => {
    res.render('adminHome');
}

module.exports.renderOTP = async (req, res) => {
    res.render('SendAndVerifyOtp', { ticketid: req.params.ticketid });
}

module.exports.sendOTP = async (req, res) => {
    const { ticketid } = req.params;
    const ticketFound = await qrCode.findOne({ qr_id: ticketid });

    console.log(ticketFound);

    if (!ticketFound) {
        return res.status(400).json({
            success: false,
            message: 'Invalid Ticket ID',
        });
    }

    if (ticketFound.redeemed_count >= 2) {
        return res.status(400).json({
            success: false,
            message: 'Ticket already redeemed twice',
        });
    }

    if(Date.now() - ticketFound.reedeemed_timestamp < 18*60*60*1000 ) {
        return res.status(400).json({
            success: false,
            message: 'Ticket cannot be redeemed before 18 hours',
        });
    }

    const user = await ticketFound.populate('user');

    if (!user) {
        return res.status(400).json({
            success: false,
            message: 'User not found',
        });
    }

    const email = user.user.email;

    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    let result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
      result = await OTP.findOne({ otp: otp });
    }

    const otpPayload = { email, otp };

    const newOTP = new OTP(otpPayload);
    await newOTP.save();

    return res.status(200).json({
        success: true,
        message: 'OTP sent successfully',
    });
    
};


module.exports.validateTicket = async (req, res) => {
    const { otp, ticketid } = req.body;
    if (!otp || !ticketid) {
        return res.status(400).send('Please enter all fields');
    }

    const found = await OTP.findOne({ otp });
    if (!found) {
        return res.status(400).send('Invalid OTP');
    }

    const ticketFound = await qrCode.findOne({ qr_id: ticketid });
    if (!ticketFound) {
        return res.status(400).send('Invalid Ticket ID');
    }

    const user = await ticketFound.populate('user');
    if (!user) {
        return res.status(400).send('User not found');
    }

    const email = user.user.email;

    if (found.email !== email) {
        return res.status(400).send('Invalid OTP');
    }

    const qrCodeUser = await qrCode.findOne({ user: user.user._id });
    if (!qrCodeUser) {
        return res.status(400).send('User does not have a QR Code');
    }

    if(qrCodeUser.redeemed_count >= 2){
        return res.status(400).send('Ticket already redeemed twice');
    }
    qrCodeUser.redeemed_count += 1;
    qrCodeUser.reedeemed_timestamp = Date.now();
    await qrCodeUser.save();
    sendMail(email, 'Ticket Validated', `Your ticket has been validated successfully and redeemed ${qrCodeUser.redeemed_count} times.`);
    await OTP.deleteOne({ otp: otp });
    res.json("Ticket validated successfully");
}

