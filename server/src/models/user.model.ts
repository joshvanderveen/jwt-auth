import mongoose from "mongoose";
import { User, UserDocument, UserModel } from "../global";
const Schema = mongoose.Schema;

const userSchemaFields: Record<keyof User, unknown> = {
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
  role: {
    type: String,
    required: true,
    default: "ROLE_USER",
    enum: ["ROLE_ROOT", "ROLE_ADMIN", "ROLE_USER"],
  },
};

const UserTokenSchema = new mongoose.Schema(userSchemaFields);

export default mongoose.model<UserDocument, UserModel>(
  "Users",
  UserTokenSchema
);
