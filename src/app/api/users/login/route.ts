import { dbConnect } from "@/dbConfig/dbConnect";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { UserType } from "@/utils/modelTypes";
import jwt from "jsonwebtoken"

dbConnect();

export const POST = async (req: NextRequest) => {
    try {
        const {email, password} = await req.json() as UserType;
        if([email, password].some((field) => !field)) {
            return NextResponse.json({
                success: false,
                error: "All fields are required"
            })
        }

        // check user exist
        const user = await User.findOne({email}) as UserType;
        if(!user) {
            return NextResponse.json(
                {
                    success: false,
                    error: "User not found"
                },
                {
                    status: 404
                }
            )
        }

        // check password
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Invalid credentials"
                },
                {
                    status: 401 //Unauthorized
                }
            )
        }

        // generate access token
        const accessToken = jwt.sign(
            {
                _id: user._id
            },
            process.env.ACCESS_TOKEN_SECRET_KEY!,
            {
                expiresIn: "1d"
            }
        )

        const res = NextResponse.json(
            {
                success: true,
                message: "User login successfully"
            },
            {
                status: 200
            }
        )
        res.cookies.set("token", accessToken, {httpOnly: true, secure: true});
        return res;
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