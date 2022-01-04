"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
//import xss from "xss-clean";
const logger_1 = require("./logger");
const path = require("path");
function server() {
    logger_1.logger.level = "silly";
    logger_1.logger.info("Starting newsServer...");
    const port = process.env.PORT || 80;
    const app = (0, express_1.default)();
    app.use(express_1.default.json({ limit: "10kb" })); // Body limit is 10
    app.use((0, cors_1.default)());
    //app.use(xss());
    app.listen(port);
    //const basicAuth = require('express-basic-auth')
    // app.use(basicAuth({
    //    users: { 'ken': 'olivia' }
    // }))
    // Rate Limiting
    // const limit = rateLimit({
    //   max: 100,// max requests
    //   windowMs: 60 * 60 * 1000, // 1 Hour of 'ban' / lockout
    //   message: 'Too many requests' // message to send
    // });
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    app.disable("etag"); // Don't check cache, return a new item each time. Prevents http status 304
    app.use((req, res, next) => {
        // http://expressjs.com/en/4x/api.html
        logger_1.logger.info("Request:  " + req.originalUrl);
        res.on("finish", () => {
            logger_1.logger.info("Response: " + res.statusCode);
        });
        next();
    });
    //const routes = require('./api/routes/setsRoutes'); //importing route
    //routes(app); //register the route
    app.use("/images", express_1.default.static(path.join(__dirname, "../images")));
    app.use("/config", express_1.default.static(path.join(__dirname, "../config")));
    logger_1.logger.info("NewsServer started on port: " + port);
}
exports.server = server;
server();
//# sourceMappingURL=server.js.map