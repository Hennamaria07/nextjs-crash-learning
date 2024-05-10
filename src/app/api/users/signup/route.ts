import { dbConnect } from "@/dbConfig/dbConnect";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { UserType } from "@/utils/modelTypes";
import { sendEmail } from "@/utils/mailer";

dbConnect();

export const POST = async (req: NextRequest) => {
    try {
        const { username, email, password } = await req.json() as UserType
        if([username, email, password].some((field) => !field)) {
            return NextResponse.json(
                {
                    success: false,
                    error: "All fields are required"
                },
                {
                    status: 400
                }
            )
        }

        // check if user already exists
        const userExist = await User.findOne({$or: [{email}, {username}]});
        if(userExist) {
            return NextResponse.json(
                {
                    success: false,
                    error: "User already exist"
                },
                {
                    status: 409
                }
            )
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create user
        const user= new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await user.save();
        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})
        return NextResponse.json(
            {
                success: true,
                message:"User registered successfully",
                data: savedUser
            },
            {
                status: 201
            }
        )
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                error: error.message
            },
            {
                status: 500
            }
        )
    }
}