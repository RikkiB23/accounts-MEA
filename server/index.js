import dotenv from "dotenv";
dotenv.config();
import express from "express";
import Router from "./views/router.js";
import accountsController from "./controllers/accountsController.js";
import cors from "cors";

const port = process.env.PORT;
const app = express();

app.use(cors({
  origin: 'http://localhost:5000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(Router);

async function startServer() {
  try {
    app.listen(port, () => console.log(`🤖 Listening on Port: ${port}`));
  } catch (err) {
    console.log("🤖 Oh no something went wrong", err);
  }
}

startServer();