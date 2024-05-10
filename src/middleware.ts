import { NextRequest, NextResponse } from "next/server";

export const middleware = (req: NextRequest) => {
    const path = req.nextUrl.pathname;
    console.log(`pathname`, path);
    const publicPath = path === '/login' || path === "/signup"
    
    const token = req.cookies.get("token")?.value || "";

    if(publicPath && token) {
        return NextResponse.redirect(new URL('/', req.nextUrl))
    }
    
    if(!publicPath && !token) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }
}

export const config = {
    matcher: [
        "/",
        "/signup",
        "/login",
        "/profile",
        "/profile/:path*",
    ]
}