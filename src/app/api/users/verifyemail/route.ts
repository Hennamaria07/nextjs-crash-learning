import { dbConnect } from "@/dbConfig/dbConnect";
import User from "@/models/userModel";
import { UserType } from "@/utils/modelTypes";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

export const POST = async (req: NextRequest) => {
    try {
        const {token} = await req.json();
        console.log(token)
        const user = await User.findOne(
            {
                verifiedToken: token,
                verifiedTokenExpiry: {$gt: Date.now()}
            }
        )
        if(!user) {
            NextResponse.json(
                {
                    success: false,
                    error: "Invalid token"
                },
                {
                    status: 401
                }
            )
        }
        user.isVerified = true;
        user.verifiedToken = undefined;
        user.verifiedTokenExpiry = undefined;
        await user.save();
        return NextResponse.json(
            {
                success: true,
                message: "user email verified successfully",
                data: user
            },
            {
                status: 200
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