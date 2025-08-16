import Todo from "@/models/todo.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const { id } =await params;
    if (!id) {
      return NextResponse.json({
        success: false,
        message: "Todo ID is required",
      });
    }

    const todo = await Todo.findById(id);
    if (!todo) {
      return NextResponse.json({
        success: false,
        message: "Todo not found",
      });
    }

    await Todo.deleteOne({ _id: id });
    const user = await User.findById(todo.userId);
    if (user) {
      user.todos.pull(todo._id);
      await user.save();
    }

    return NextResponse.json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}