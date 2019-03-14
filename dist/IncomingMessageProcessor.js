"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IncomingMessageProcessor {
    constructor(response, dataCallback, dataEndCallback, errorCallback) {
        response.on("data", (data) => {
            dataCallback(data, response);
        });
        response.on("end", () => {
            dataEndCallback();
        });
        response.on("error", (err) => {
            errorCallback(err);
        });
    }
}
exports.IncomingMessageProcessor = IncomingMessageProcessor;
//# sourceMappingURL=IncomingMessageProcessor.js.map