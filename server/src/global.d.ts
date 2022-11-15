import mongoose, { Model, Document } from "mongoose";

enum RoleEnum {
  "ROLE_ROOT",
  "ROLE_ADMIN",
  "ROLE_USER",
}

interface User {
  username: string;
  password: string;
  active: boolean;
  role: RoleEnum;
}

interface UserDocument extends User, Document {
  isAdmin(): boolean;
  isRoot(): boolean;
}

interface UserModel extends Model<UserDocument> {}

interface RefreshToken {
  token: string;
  expiry: Date;
  user: mongoose.Schema.Types.ObjectId & UserDocument;
}

interface RefreshTokenDocument extends RefreshToken, Document {}

interface RefreshTokenModel extends Model<RefreshTokenDocument> {
  createToken(user: UserDocument): Promise<string>;
  verifyExpiration(token: RefreshTokenDocument): Promise<boolean>;
}

declare global {
  namespace Express {
    export interface Request {
      user?: any;
    }
  }
}
