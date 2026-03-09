import cors from "cors"
import express from "express"
import listEndpoints from "express-list-endpoints" //kolla upp denna
import mongoose from "mongoose"
import authRoutes from "./routes/auth.js";
import thoughtRoutes from "./routes/thoughts.js";
import dotenv from "dotenv";

dotenv.config()

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/project-thoughts"

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

app.use("/api", authRoutes);
app.use("/api", thoughtRoutes);

app.get("/", (req, res) => {
  res.json(listEndpoints(app))
});

// Start the server
mongoose.connect(mongoUrl)
  .then(() => {
    console.log("✅ Succé! Vi har kontakt med MongoDB Atlas.");
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
});
  })
  .catch((err) => {
    console.error("❌ Aj då, kunde inte ansluta till databasen:", err);
  });






