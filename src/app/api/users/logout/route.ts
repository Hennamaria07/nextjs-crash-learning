import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const res = NextResponse.json(
            {
                success: true,
                message: "User logout successfully"
            },
            {
                status: 200
            }
        );
        res.cookies.set("token", "", {httpOnly: true, expires: new Date(0)});
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