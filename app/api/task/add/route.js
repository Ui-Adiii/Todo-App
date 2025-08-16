import Todo from "@/models/todo.model";
import User from "@/models/user.model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { text, userId } = body;
    if (!text || text === null) {
      return NextResponse.json({
        success: false,
        message: "text is required",
      });
    }
    if (!userId || userId === null) {
      return NextResponse.json({
        success: false,
        message: "Login First"
      });
    }
    const todo = await Todo.create({
      text,
      userId,
    });
    const user = await User.findById(userId);
    if (!user)
      return NextResponse.json({
        success: false,
        message: "unauthorized user",
      });
    user.todos.push(todo._id);
    await user.save();
    return NextResponse.json({
      success: true,
      todo,
      message: "Todo created successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
