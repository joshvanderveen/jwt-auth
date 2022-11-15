import { NextFunction, Request, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { tokenConfig } from "../config/auth.config";

const catchError = (err: Error, res: Response) => {
  if (err instanceof TokenExpiredError) {
    return res
      .status(401)
      .send({ message: "Unauthorized! Access Token was expired!" });
  }
  return res.sendStatus(401).send({ message: "Unauthorized!" });
};

export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["x-auth-token"] as string | undefined;

  if (!token) {
    return res.status(403).json({
      message: "Token not provided",
    });
  }

  jwt.verify(token, tokenConfig.secret, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    req.user = decoded;
    return next();
  });
};
