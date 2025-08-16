import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema);

export default Todo;
