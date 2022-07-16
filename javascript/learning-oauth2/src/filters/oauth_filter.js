import Express from "express";
import { Request, Response } from "oauth2-server";

export function oauthFilterFactory(oauthService, oauthLogger) {
    const oauthRouter = Express.Router();

    oauthRouter.post("/authenticate", (req, res, next) => {
        const request = new Request(req);
        const response = new Response(res);

        oauthLogger.log({ level: "info", message: "Started /oauth/authenticate call." });
        oauthService.authenticate(request, response)
            .then((token) => {
                oauthLogger.log({ level: "info", message: "Finished /oauth/authenticate call." });
                res.locals.oauth = { token: token };
                next();
            })
            .catch((err) => {
                oauthLogger.log({ level: "error", message: JSON.stringify(err) });
                res.status(500).send(err);
            });
    });

    oauthRouter.post("/authorize", (req, res, next) => {
        const request = new Request(req);
        const response = new Response(res);

        oauthLogger.log({ level: "info", message: "Started /oauth/authorize call." });
        oauthService.authorize(request, response)
            .then((token) => {
                oauthLogger.log({ level: "info", message: "Finished /oauth/authorize call." });
                res.locals.oauth = { token: token };
                next();
            })
            .catch((err) => {
                oauthLogger.log({ level: "error", message: JSON.stringify(err) });
                res.status(500).send(err);
            });
    });

    oauthRouter.post("/token", (req, res, next) => {
        const request = new Request(req);
        const response = new Response(res);

        oauthLogger.log({level: "info", message: "Started /oauth/token call."});
        oauthService.token(request, response)
            .then((token) => {
                oauthLogger.log({level: "info", message: "Finished /oauth/token call."});
                res.locals.oauth = { token: token };
                next();
            })
            .catch((err) => {
                oauthLogger.log({level: "error", message: JSON.stringify(err)});
                res.status(500).send(err);
            });
    });

    return oauthRouter;
}