import { getDataFromToken } from "@/utils/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { dbConnect } from "@/dbConfig/dbConnect";

dbConnect();

export const GET = async (req: NextRequest) => {
    try {
        const userId = await getDataFromToken(req);
        const user = await User.findById(userId).select("-password");
        return NextResponse.json(
            {
                success: true,
                message: "User found",
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