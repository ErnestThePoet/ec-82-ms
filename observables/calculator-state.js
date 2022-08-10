"use strict";
exports.__esModule = true;
var mobx_1 = require("mobx");
var CalculatorState = /** @class */ (function () {
    function CalculatorState() {
        // whether in fraction calculation mode or decimal.
        this.valueType = "DEC";
        // degree, radian or grade
        this.drgMode = "D";
        (0, mobx_1.makeAutoObservable)(this);
    }
    CalculatorState.prototype.setValueType = function (newType) {
        this.valueType = newType;
    };
    CalculatorState.prototype.setDRGMode = function (newMode) {
        this.drgMode = newMode;
    };
    return CalculatorState;
}());
exports["default"] = new CalculatorState();
