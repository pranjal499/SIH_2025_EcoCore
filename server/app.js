import express from 'express'   
import cors from 'cors'
import moduleRoutes from "./routes/moduleRoutes.js"
import { connectDB } from "./setup/db.js";
const app = express()

await connectDB();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use("/api/modules", moduleRoutes);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).json({ error: "Something went wrong!" });
});
app.listen(3000, () => {
  console.log(`Server Started at 3000`);
});