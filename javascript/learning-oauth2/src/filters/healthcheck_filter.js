export function healthcheckFilterFactory(healthcheckLogger) {
    return ((_, res) => {
        healthcheckLogger.log({ level: "info", message: "Requested /healthcheck." });
        res.status(200).send("Healthy!");
    });
}