import Todo from "@/models/todo.model";
import User from "@/models/user.model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId } = body;
    if (!userId || userId === null) {
      return NextResponse.json({
        success: false,
        message: "Login First"
      });
    }
    const todos = await User.findById(userId).populate('todos')
    if(!todos){
        return NextResponse.json({
            success: false,
            message: "No todos found"
        });
    }
    return NextResponse.json({
      success: true,
      todos,
      message: "Todo created successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
