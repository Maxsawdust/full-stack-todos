import { Request, Response, NextFunction } from "express";
import { User } from "../models/User.model";

interface UserDetails {
  username: string;
  email: string;
  password: string;
}

// middleware to check for existing user details before signup
export default async function signupMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // get userDetails from body
    const userDetails: UserDetails = { ...req.body };

    // if the username exists then throw an err
    if (await User.findOne({ username: userDetails.username })) {
      res
        .status(400)
        .json({ message: "Username already exists", type: "username" });
      return;
    }

    // if the email exists, then throw an err
    if (await User.findOne({ email: userDetails.email.toLowerCase() })) {
      res.status(400).json({ message: "Email already exists", type: "email" });
      return;
    }

    next();
  } catch (err: any) {
    res.status(500).send(err.message);
  }
}
