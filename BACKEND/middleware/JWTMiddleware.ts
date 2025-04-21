import { User } from "../models/User.model";
import UserDetails from "../types/UserDetails";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

const secret = process.env.JWT_SECRET || "weak-secret";

export default async function JWTMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // get the token from cookies
    // parsed in server.ts
    const token = req.cookies.token;

    if (!token) {
      res.status(403).json({ message: "Access denied, no token provided" });
      return;
    }

    // verify the token
    const verified = jwt.verify(token, secret);

    // store the decoded payload on the request object
    req.user = verified;
  } catch (err: any) {
    res.status(403).json({ message: "Invalid token" });
  }

  next();
}
