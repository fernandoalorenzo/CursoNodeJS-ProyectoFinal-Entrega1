import express from "express";
import cors from "cors";
import postsRouter from "./routes/postsRoute.js";
import commentsRouter from "./routes/commentsRoute.js";
import connect from "./config/db.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);

// CONEXION A LA BASE DE DATOS
connect();

// SERVIDOR
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}!`)
});
