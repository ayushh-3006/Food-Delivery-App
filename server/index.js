import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./src/config/dbConnection.config.js";
import AuthRouter from "./src/routers/auth.route.js";
import PublicRouter from "./src/routers/public.route.js";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import UserRouter from "./src/routers/user.route.js";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true}));
app.use(express.json());
app.use(cookieParser());

app.use(morgan("dev"));
app.use("/auth", AuthRouter);
app.use("/public", PublicRouter);
app.use("/user", UserRouter);
// test routes
// app.get("/", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "server is running",
//   });
// });

//Default API
app.get("/", (req, res) => {
  console.log("Default Get API Hit");
  res.json({ message: "Welcome to my cravings project" });
  connectDB();
});

//Default Error Handler

app.use((err, req, res, next) => {
  const ErrMessage = err.message || "Internal Server Error";
  const ErrStausCode = err.statusCode || 500;

  res.status(ErrStausCode).json({ message: ErrMessage });
});

const port = process.env.PORT || 5000;

app.listen(port, async () => {
  console.log("Server Started on port:", port);
  try {
    await connectDB();
    console.log("mongodb connected successsfully");
  } catch (error) {
    console.log("mongodb connection failed");
    console.log(error.message);
  }
});
