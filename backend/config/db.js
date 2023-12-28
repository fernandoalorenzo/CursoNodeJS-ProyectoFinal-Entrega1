import mongoose from "mongoose";

const mongoDBURL = "mongodb://127.0.0.1:27017/sistema";

export default () =>
    mongoose
        .connect(mongoDBURL)
        .then(() => {
            console.log("Aplicación conectada a la Base de  Datos");
        })
        .catch((error) => {
            console.log(error);
    });