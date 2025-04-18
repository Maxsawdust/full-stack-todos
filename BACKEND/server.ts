import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import "dotenv/config";

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
app.use(cors());

// enabling express to parse json data in the request bodies
app.use(express.json());

// starting all user routes with "/users"
app.use("/users", userRoutes);

// enabling the server to listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
