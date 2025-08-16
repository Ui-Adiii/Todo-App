import Todo from "@/models/todo.model";
import { NextResponse } from "next/server";

export async function PATCH(req,{params}) {
    const { id } = params;

    try {
        const body = await req.json();
        const { text, completed } = body;
        const todo = await Todo.findByIdAndUpdate(
            id,
            { text, completed },
            { new: true }
        );

        if (!todo) {
            return NextResponse.json({
                success: false,
                message: "Todo not found"
            });
        }

        return NextResponse.json({
            success: true,
            todo,
            message: "Todo updated successfully"
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error.message
        });
    }
    
}