import { connectDB } from "@/lib/connectDB";
import User from "@/models/user.model";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { email, name, password } = body;
    if (
      !email ||
      email === "" ||
      !name ||
      name === "" ||
      password === "" ||
      !password
    ) {
      return Response.json({
        success: false,
        message: "All Fields are required",
      });
    }
    if (password.length < 6) {
      return NextResponse.json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }
    const existerUser = await User.findOne({
      email,
    });

    if (existerUser) {
      return NextResponse.json({
        success: false,
        message: "User already exist",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) {
      return NextResponse.json({
        success: false,
        message: "Password not hashed",
      });
    }
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return NextResponse.json({
      success: true,
      user,
      message: "User Created Successfully",
    });
  } catch (error) {
    Response.json({
      success: false,
      message: error.message,
    });
  }
}
