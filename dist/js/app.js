"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const connectDb_1 = require("./db/connectDb");
const index_1 = __importDefault(require("./routes/index"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const cors_1 = __importDefault(require("cors"));
const corsOptions_1 = __importDefault(require("./helpers/corsOptions"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const path_1 = __importDefault(require("path"));
const rateLimit_1 = __importDefault(require("./middlewares/rateLimit"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
moment_timezone_1.default.tz.setDefault("Europe/Istanbul");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 6000;
// middlewares
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use("/uploads", express_1.default.static(__dirname));
app.use((0, cors_1.default)(corsOptions_1.default));
app.use("/api", rateLimit_1.default); //rateLimit
// attack
app.use((0, express_mongo_sanitize_1.default)({
    replaceWith: '_',
}));
// routes
app.use("/api", index_1.default);
// error
app.use(errorHandler_1.default);
app.listen(port, () => {
    (0, connectDb_1.conn)();
    console.log(`Server is running on port: ${port}`);
});
