"use strict";
exports.__esModule = true;
exports.padBrackets = void 0;
function padBrackets(expr) {
    var _a, _b;
    var diffCount = ((_a = expr.match(/\(/g)) !== null && _a !== void 0 ? _a : []).length
        - ((_b = expr.match(/\)/g)) !== null && _b !== void 0 ? _b : []).length;
    if (diffCount > 0) {
        expr = expr.padEnd(expr.length + diffCount, ")");
    }
    return expr;
}
exports.padBrackets = padBrackets;
