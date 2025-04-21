import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import "dotenv/config";
import cookieParser from "cookie-parser";
import listRoutes from "./routes/listRoutes";

const app = express();

const PORT = process.env.PORT || 5000;

const MONGO_URI = process.env.MONGODB_URI;

// using mongoose to connect to atlas cluster
if (MONGO_URI) {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB", err.message);
    });
}

// enabling cors
// using cookies means I need to set the origin and credentials as so
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// enabling express to parse json data in the request bodies
app.use(express.json());

// enable cookie parsing
app.use(cookieParser());

// starting all user routes with "/users"
app.use("/users", userRoutes);

// starting all list routes with "/lists"
app.use("/lists", listRoutes);

// enabling the server to listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
