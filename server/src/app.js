import express from "express";
import routes from "./routes/index.js";
import cors from "cors";
// import errorHandler from "./middlewares/error.middleware.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", routes);
// app.use(errorHandler);

export default app;
