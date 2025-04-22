import { Request, Response } from "express";
import { User } from "../models/User.model";
import UserDetails from "../types/UserDetails";
import jwt from "jsonwebtoken";
import "dotenv/config";
import bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
  try {
    // Generate a salt for password hashing
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create a user with the req.body and hashed password
    const newUser = new User({ ...req.body, password: hashedPassword });
    // save the user to the DB
    await newUser.save();

    // status 201 for successfully creating
    res.status(201).json(newUser);
  } catch (err: any) {
    res.status(400).send(err.message);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const userDetails: UserDetails = { ...req.body };

    // check if user with supplied details exists
    const user = await User.findOne({ email: userDetails.email });
    if (!user) {
      res.status(404).json({
        message: "User not found. Please check your details and try again.",
      });
      return;
    }

    // check if the password is correct
    const isValidPassword = await bcrypt.compare(
      //compare hashed password to supplied password
      userDetails.password, // password from body
      user.password // password from DB
    );
    if (!isValidPassword) {
      // 401 status if user supplied bad password
      res.status(401).json({
        message: "Invalid password. Please check your details and try again.",
      });
      return;
    }

    // secret from process.env
    const secret = process.env.JWT_SECRET || "weak-secret";

    // generate JWT for user
    const token = jwt.sign({ _id: user._id }, secret, {
      // if user wants to be remembered, set the expiration to 7 days, otherwise set it to 1 hour
      expiresIn: userDetails.remember
        ? 7 * 24 * 60 * 60 * 1000
        : 60 * 60 * 1000,
    });

    // assign the token to a cookie
    res.cookie("token", token, {
      httpOnly: true,
      // 7days or 1hour
      maxAge: userDetails.remember ? 7 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000,
    });

    // no status because 200 is default
    res.json({
      message: "Login successful",
    });
    return;
  } catch (err: any) {
    res.status(500).json({ message: err.message });
    return;
  }
};

export const logoutUser = (req: Request, res: Response) => {
  try {
    //clear the token cookie to effectively log them out
    res.clearCookie("token");
    res.json({ message: "logged out successfully" });
  } catch (err) {
    res.status(500).json({ err });
  }
};

export const getUserByiD = async (req: Request, res: Response) => {
  // getting array of users from DB
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
