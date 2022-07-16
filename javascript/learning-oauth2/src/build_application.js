import Express from "express";
import bodyParser from "body-parser";

export default function buildApplication(oauthFilter, todoFilter, healthcheckFilter) {
    const app = Express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(function (err, req, res, next) {
        oauthLogger.log({level: "error", message: err.stack});
        res.status(500).send("Internal Service Error - Please try again later.");
    });

    app.get("/healthcheck", healthcheckFilter);
    app.use("/oauth", oauthFilter);
    app.use("/todo", todoFilter);

    return app;
}