"use strict";
exports.__esModule = true;
exports.runTests = exports.assertEquals = void 0;
function assertEquals(expected, actual) {
    if (actual !== expected) {
        throw "Test Failed:\n*** Expected:".concat(expected, "\n*** Actual:  ").concat(actual);
    }
}
exports.assertEquals = assertEquals;
function runTests() {
    var testFns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        testFns[_i] = arguments[_i];
    }
    console.log("Test Start");
    console.log("======================");
    for (var i = 0; i < testFns.length; i++) {
        testFns[i]();
        console.log("TestFn ".concat(i, " passed."));
    }
    console.log("======================");
    console.log("Test Complete");
}
exports.runTests = runTests;
