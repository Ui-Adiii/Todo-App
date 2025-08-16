import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/user.model";
import { connectDB } from "@/lib/connectDB";

export async function GET(req) {
  await connectDB();

  const token = req.cookies.get("access_token")?.value;
  if (!token) {
    return NextResponse.json({ user: null });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("name email");
    return NextResponse.json({success:true, message:"user fetched successfully", user });
  } catch (error) {
    return NextResponse.json({ user: null });
  }
}
