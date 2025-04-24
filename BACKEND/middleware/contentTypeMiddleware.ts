import { Request, Response, NextFunction } from "express";

export default async function contentTypeMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // get content-type header from request
  const contentType = req.headers["content-type"];

  if (contentType !== "application/json") {
    res.status(403).json({ message: "requests must be of JSON content type." });
    return;
  }

  next();
}
