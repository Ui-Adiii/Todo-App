import { NextResponse } from "next/server";
import User from "@/models/user.model";
import { connectDB } from "@/lib/connectDB";

export async function GET(req) {
  try {
    
    const response = NextResponse.json({
      success: true,
      message: "Logout successfully",
    });
    response.cookies.delete("access_token");
    return response;

  } catch (error) {
    return NextResponse.json({ message:error.message });
  }
}
