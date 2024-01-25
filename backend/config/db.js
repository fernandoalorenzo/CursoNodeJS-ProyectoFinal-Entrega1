import mongoose from "mongoose";
import { config } from "dotenv";
config();

const mongoDBURL = process.env.MONGO_URL;

export default () =>
    mongoose
        .connect(mongoDBURL)
        .then(() => {
            console.log("Aplicación conectada a la Base de Datos");
        })
        .catch((error) => {
            console.log(error);
    });