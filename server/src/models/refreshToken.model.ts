import mongoose, { Types, Model, HydratedDocument } from "mongoose";
import { tokenConfig } from "../config/auth.config";
const Schema = mongoose.Schema;

import { v4 as uuid4 } from "uuid";
import {
  RefreshToken,
  RefreshTokenDocument,
  RefreshTokenModel,
  UserDocument,
} from "../global";

const refreshTokenSchemaFields: Record<keyof RefreshToken, unknown> = {
  token: {
    type: String,
    required: true,
  },
  expiry: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
};

const RefreshTokenSchema = new mongoose.Schema(refreshTokenSchemaFields);

RefreshTokenSchema.statics.createToken = async function (user: UserDocument) {
  let expireAt = new Date();
  expireAt.setSeconds(expireAt.getSeconds() + tokenConfig.refreshExpiration);
  const _token = uuid4();

  const _newToken = await this.create({
    token: _token,
    user: user._id,
    expiry: expireAt,
  });

  const refreshToken = await _newToken.save();

  return refreshToken.token;
};

RefreshTokenSchema.statics.verifyExpiration = (token) => {
  return token.expiry < new Date();
};

export default mongoose.model<RefreshTokenDocument, RefreshTokenModel>(
  "RefreshToken",
  RefreshTokenSchema
);
