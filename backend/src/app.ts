import express from "express";

import cors from "cors";
import authRoutes from "./routes/auth.route";
import adminRoutes from "./routes/admin.route";
import userRoutes from "./routes/user.route";
const app = express();

app.use(cors({
    origin: 'http://localhost:5174',
    credentials: true,
}))
app.use(express.json());
app.use("/api", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

export default app;
