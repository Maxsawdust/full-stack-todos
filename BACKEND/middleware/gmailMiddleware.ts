import UserDetails from "../types/UserDetails";
import { Request, Response, NextFunction } from "express";

export default function gmailMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userDetails: UserDetails = { ...req.body };

  // if the email doesn't end with "@gmail.com" send forbidden
  if (!userDetails.email.endsWith("@gmail.com")) {
    res
      .status(403)
      .json({ message: "Email must end with @gmail.com", type: "email" });
    return;
  }

  next();
}
