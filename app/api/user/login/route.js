import User from "@/models/user.model";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { connectDB } from "@/lib/connectDB";
export async function POST(req) {
  await connectDB()
  try {
    const body = await req.json();
    const { email, password } = body;
    if (!email || email === "" || password === "" || !password) {
      return Response.json({
        success: false,
        message: "All Fields are required",
      });
    }
    const user = await User.findOne({
      email,
    }).select("+password");

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    const res = NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

    res.cookies.set({
      name: "access_token",
      value: token,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return res;
  } catch (error) {
    NextResponse.json({
      success: false,
      message: error.message ||"Internal Server Error",
    });
  }
}
