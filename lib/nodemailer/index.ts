import nodemailer from "nodemailer";
import { WELCOME_EMAIL_TEMPLATE } from "./template";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.NODEMAILER_EMAIL!,
        pass: process.env.NODEMAILER_PASSWORD!
    }
})

export const sendWelcomeEmial = async ({email, name, intro}: WelcomeEmailData) => {
    const htmlTemplate = WELCOME_EMAIL_TEMPLATE.replace("{{name}}", name).replace("{{intro}}", intro);

    const mailOptions = {
        from: `"Signalist" <SIgnalist@support.com>`,
        to: email,
        subject: "Welcome to Signalist - your stock market toolkit is ready!",
        text: 'Tanks for joining signalist.',
        html: htmlTemplate
    }

    await transporter.sendMail(mailOptions);
}