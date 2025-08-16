import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export function middleware(req) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/api/task")) {
    const token = req.cookies.get("access_token")?.value;
    if (!token) {
      return NextResponse.json({
        success: false,
        message: "Not Authorized. Login Again",
      });
    }
   return NextResponse.next(); 
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
