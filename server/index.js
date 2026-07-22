import express from "express";
import connectDB from "./src/config/dbConnection.config.js";
import AuthRouter from "./src/routers/auth.route.js";
import PublicRouter from "./src/routers/public.route.js";
import RestaurantRouter from "./src/routers/restaurant.route.js";
import AdminRouter from "./src/routers/admin.route.js";
import CustomerRouter from "./src/routers/customer.route.js";
import RiderRouter from "./src/routers/rider.route.js";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import UserRouter from "./src/routers/user.route.js";
import cloudinary from "./src/config/cloudinary.config.js";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use(morgan("dev"));
app.use("/auth", AuthRouter);
app.use("/public", PublicRouter);
app.use("/user", UserRouter);
app.use("/admin", AdminRouter);
app.use("/restaurant", RestaurantRouter);
app.use("/customer", CustomerRouter);
app.use("/rider", RiderRouter);
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
  connectDB();
  try {
    const result = await cloudinary.api.ping();
    console.log("Cloudinary Connected :");
    console.log(result);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
});
