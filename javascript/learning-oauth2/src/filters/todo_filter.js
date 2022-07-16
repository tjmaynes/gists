import Express from "express";

export function todoFilterFactory(todoService, verifyToken, todoLogger) {
    const todoRouter = Express.Router();

    todoRouter.get("/todo", (req, res) => {
        // get token
        // const { token } = res.locals.oauth;

        // verify token

        // get user_id
        const userId = "";

        // call getAllTodos
        todoLogger.log({level: "info", message: "Started /todo call."});
        todoService.getAllTodos(userId)
            .then(results => {
                todoLogger.log({level: "info", message: "Finished /todo call."});
                res.locals.oauth = { token: token };
                next();
            })
            .catch((error) => {
                oauthLogger.log({level: "error", message: JSON.stringify(error)});
                res.status(500).send(error);
            });
    });

    return todoRouter;
}