import path from "path";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import organizerRoutes from "./routes/organizerRoutes.js";
import tokenRoutes from "./routes/tokenRoutes.js";
import postsRoutes from "./routes/postsRoutes.js";
import bookmarksRoutes from "./routes/bookmarksRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/users", userRoutes);
app.use("/api/organizers", organizerRoutes);
app.use("/api/token", tokenRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/bookmark", bookmarksRoutes);
app.use("/api/admin", adminRoutes);

app.use(express.static("backend/public/images"));
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
