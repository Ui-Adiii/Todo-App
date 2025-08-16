import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength:3
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minlength:6
    },
    password: {
      type: String,
      required: true,
      select:false
    },
    todos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todo"
      }
    ]
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User",userSchema);

export default User
