import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "src/types/user";

export interface IUserDocument extends IUser, Document {}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    isSupabaseSetup: { type: Boolean, required: true, default: false },
    supabaseUrl: { type: String },
    supabaseAnonKey: { type: String },
    supabaseApiKey: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IUserDocument>("User", UserSchema);
