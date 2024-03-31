"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const whiteList = ["http://localhost:6000"];
const corsOptions = (req, callback) => {
    let corsOptions;
    if (whiteList.indexOf(req.header("Origin")) !== -1) {
        corsOptions = { origin: true };
    }
    else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};
exports.default = corsOptions;
