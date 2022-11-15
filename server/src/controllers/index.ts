import { Request, Response, NextFunction } from "express";

import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

import Users from "../models/user.model";
import Tokens from "../models/refreshToken.model";
import { tokenConfig } from "../config/auth.config";
import { UserDocument } from "../global";

type LoginType = {
  username: string;
  password: string;
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password }: LoginType = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Required parameters not supplied" });
  }

  const user: UserDocument | null = await Users.findOne({ username });

  if (!user) {
    return res.status(400).json({ mesage: "User does not exist" });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    res.status(400).json({ mesage: "Invalid Credentials" });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      role: user.role,
    },
    tokenConfig.secret,
    {
      expiresIn: tokenConfig.jwtExpiration,
    }
  );

  const refreshToken = await Tokens.createToken(user);

  res.json({ message: "SUCCESS", data: { token, refreshToken } });
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password }: LoginType = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Required parameters not supplied" });
  }

  const existingUser = await Users.findOne({ username });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await Users.create({
    username,
    password: hashedPassword,
  });

  res.json({ message: "SUCCESS" });
};

export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = req.body.token;

  const existingToken = await Tokens.findOne({ token: refreshToken });

  if (!existingToken) {
    return res.status(400).json({ message: "Invalid token" });
  }

  if (await Tokens.verifyExpiration(existingToken)) {
    await Tokens.findOneAndRemove(existingToken._id, {
      useFindAndModify: false,
    });
    return res.status(403).json({
      message: "Refresh token was expired. Please make a new signin request",
    });
  }

  const token = jwt.sign(
    {
      id: existingToken.user._id,
      username: existingToken.user.username,
      role: existingToken.user.role,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: tokenConfig.jwtExpiration,
    }
  );

  return res.json({ message: "SUCCESS", data: { token } });
};

export const authRoute = async (req: Request, res: Response) => {
  return res.json({ message: "SUCCESS" });
};
