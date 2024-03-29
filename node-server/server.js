import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import formData from "express-form-data";
import authRouter from "./routes/auth.router.js";
import userRouter from "./routes/users.router.js";
import profileRouter from "./routes/profile.router.js";
import vehicleRouter from "./routes/vehicle.router.js";
import stsRouter from "./routes/sts.router.js";
import landfillRouter from "./routes/landfill.router.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(helmet());
app.use(cookieParser());
app.use(formData.parse());
app.use(formData.format());
app.use(formData.stream());
app.use(formData.union());

app.use("/sts", stsRouter);
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/profile", profileRouter);
app.use("/vehicles", vehicleRouter);
app.use("/landfills", landfillRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log("server is running!");
});
