import mongoose from "mongoose";

const mongoUrl = process.env.MONGODB_URL +"/"+process.env.DB_NAME;

if (!mongoUrl) {
  throw new Error("Please provide Mongo Url");
}

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

let isConnected = false;
export async function connectDB() {
   if (mongoose.connection.readyState === 1) {
     return mongoose.connection;
   }
  if (cached.conn) {
    return cached.conn;
  } else if (!cached.promise) {
    cached.promise = mongoose
      .connect(mongoUrl)
      .then((mongo) => mongo.connection);
    console.log("DB connected")
  }
  cached.conn = await cached.promise;
  return cached.conn
}
