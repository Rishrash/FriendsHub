import express from "express";
import cors from "cors";
import { readdirSync } from "fs";
import dotenv from "dotenv";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";

dotenv.config();

const app = express();
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
const PORT = process.env.PORT || 8000;

// Read all files in the "routes" directory
const routes = readdirSync("./routes");

// Dynamically include each route
routes.forEach((r) => {
  import(`./routes/${r}`).then((module) => {
    const route = module.default;
    app.use("/", route);
  });
});

// setting up cors
const corsOptions = {
  origin: ["http://localhost:3000"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Connect to MongoDB
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.get("/", (req, res) => {
  res.send("Welcome to HomePage");
});

app.listen(PORT, () => {
  console.log(`Server is Listening to Port ${PORT}`);
});
