import "express-async-errors";
import express, {Express} from "express";
import dotenv from "dotenv";
import {conn} from "./db/connectDb";
import indexRoute from "./routes/index";
import errorHandlerMiddleware from "./middlewares/errorHandler";
import cors from "cors";
import corsOptions from "./helpers/corsOptions";
import mongoSanitize from "express-mongo-sanitize";
import path from "path";
import apiLimiter from "./middlewares/rateLimit";
import moment from "moment-timezone";
moment.tz.setDefault("Europe/Istanbul")


dotenv.config();

const app : Express = express();
const port  = process.env.PORT || 6000;


// middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")))
app.use("/uploads", express.static(__dirname))
app.use(cors(corsOptions));
app.use("/api", apiLimiter);   //rateLimit

// attack
app.use(mongoSanitize({
    replaceWith: '_',
}))

// routes
app.use("/api", indexRoute);

// error
app.use(errorHandlerMiddleware);

app.listen(port, () : void => { //yeni eklenen void verisi
    conn();
    console.log(`Server is running on port: ${port}`);
});