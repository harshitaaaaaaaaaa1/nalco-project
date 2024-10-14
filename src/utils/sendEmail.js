import nodemailer from 'nodemailer';
import { ApiError } from './ApiError.js';

const { AUTH_EMAIL, AUTH_PASS } = process.env;

// const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: 'tania.williamson@ethereal.email',
//         pass: 'VPrMqsKtyc3kDKDhXm'
//     }
// });

const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    auth: {
        user: AUTH_EMAIL,
        pass: AUTH_PASS
    }
})

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Ready for messages")
        console.log(success)
    }
});

export const sendEmail = async (mailOptions) => {
    try {
        await transporter.sendMail(mailOptions);
        return;
    } catch (error) {
        throw new ApiError(500, error);

    }
}