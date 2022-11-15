import express from "express";
import dotenv from "dotenv";

dotenv.config();

import router from "./routes";
import database from "./utilities/database.utilities";

database();

const app = express();
app.use(express.json());

// Router
app.use("/", router);

// Set port, listen for requests
const PORT: number = parseInt(process.env.PORT!) || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
