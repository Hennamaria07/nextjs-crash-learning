import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer"

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const user = await User.findById(userId);
        // generate token
        const token = await bcrypt.hash(userId.toString(), 10);
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifiedToken: token,
                verifiedTokenExpiry: Date.now() + 3600000
            })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: token,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            })
        }
        console.log(Date.now() + 3600000)
        // mail config
        const transport = nodemailer.createTransport({
            host: process.env.EMAIL_AUTH_HOST,
            port: 2525,
            auth: {
                user: process.env.EMAIL_AUTH_USER,
                pass: process.env.EMAIL_AUTH_PASSWORD
            }
        });

        // create mailoptions
        const mailoptions = {
            from: "unknown@ai.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Hi ${user?.username},</p>
            <p>
              ${
                emailType === "VERIFY"
                  ? "Thank you for signing up for [App Name]!"
                  : "We received a request to reset your password for your [App Name] account."
              }
            </p>
            <p>
              ${
                emailType === "VERIFY"
                  ? "To complete your registration and access all the features of [App Name], please verify your email address by clicking on the link below:"
                  : "To reset your password, please click on the link below:"
              }
            </p>
            <a href="${`${process.env.DOMAIN}/verifyemail?token=${token}`
            }">${emailType === "VERIFY" ? "Verify Email" : "Reset Password"}</a>
            <p>
              ${
                emailType === "VERIFY"
                  ? "This link will expire in 24 hours."
                  : "This link will expire in 1 hour."
              }
            </p>
            <p>
              ${
                emailType === "VERIFY"
                  ? "If you did not create an account with [App Name], please ignore this email."
                  : "If you did not request a password reset, please ignore this email."
              }
            </p>
            <p>Sincerely,</p>
            <p>The [App Name] Team</p>`
            //provide the body
        }

        const mailResponse = await transport.sendMail(mailoptions);
        return mailResponse;
    } catch (error: any) {
        throw new Error(error.message)
    }
}