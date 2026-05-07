import mongoose from "mongoose";

const mongoDbUrl = process.env.MONGO_URL;
if (!mongoDbUrl) throw new Error("db url not found.");

let cached = global.mongooseBox;
if (!cached) {
   cached = global.mongooseBox = {
      successfulConnection: null,
      pendingConnection: null
   };
}

const connectDb = async () => {
   if (cached.successfulConnection) {
      return cached.successfulConnection;
   }

   if (!cached.pendingConnection) {
      cached.pendingConnection = mongoose.connect(mongoDbUrl).then((mongoose) => {
         cached.successfulConnection = mongoose.connection;
         return cached.successfulConnection;
      });
   }

   try {
      return await cached.pendingConnection;
   } catch (err) {
      cached.pendingConnection = null;
      throw err;
   }
};

export default connectDb;
