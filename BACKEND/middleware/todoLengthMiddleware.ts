import { Request, Response, NextFunction } from "express";

export default async function todoLengthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // get the user input from body
  const { message } = req.body;

  if (message.length > 140) {
    res.status(403).json({ message: "Task cannot exceed 140 characters." });
    return;
  }

  next();
}
