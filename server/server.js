import express from "express";

// DB Connection
import connectDB from "./db/connect.js";
import dotenv from "dotenv";
import "express-async-errors";
import morgan from "morgan";

//middleware
import notFoundMiddleWare from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/auth.js";
//routers
import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobsRoutes.js";

dotenv.config();
const app = express();

//middlewares
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "Welcome" });
});

app.get("/api/v1", (req, res) => {
  res.json({ msg: "API" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log(`Server is running on port:${PORT}`);
    });
    console.log("Connection to DB successfully!");
  } catch (e) {
    console.log("Error on connection to DB");
  }
};

start();
