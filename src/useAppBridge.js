"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAppBridge = void 0;
var context_1 = require("./context");
function useAppBridge() {
    var appBridge = react_1.useContext(context_1.AppBridgeContext);
    if (!appBridge) {
        throw new Error('No AppBridge context provided. Your component must be wrapped in the <Provider> component from App Bridge Vue.');
    }
    return appBridge;
}
exports.useAppBridge = useAppBridge;
