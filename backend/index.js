import express from "express";
import cors from "cors";
import postsRouter from "./routes/postsRoute.js";
import commentsRouter from "./routes/commentsRoute.js";
import usersRouter from "./routes/usersRoute.js";
import connect from "./config/db.js";
import { config } from "dotenv";
config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);
app.use("/users", usersRouter);

// CONEXION A LA BASE DE DATOS
connect();

// SERVIDOR
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}!`)
});
