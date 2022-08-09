"use strict";
exports.__esModule = true;
var F = require("../modules/calc-core/preprocessing");
var test_core_1 = require("./test-core");
function testPadBrackets() {
    (0, test_core_1.assertEquals)("", F.padBrackets(""));
    (0, test_core_1.assertEquals)("1+2", F.padBrackets("1+2"));
    (0, test_core_1.assertEquals)("(1)+2", F.padBrackets("(1)+2"));
    (0, test_core_1.assertEquals)("(1+2)", F.padBrackets("(1+2"));
    (0, test_core_1.assertEquals)("(1+2())", F.padBrackets("(1+2)"));
    (0, test_core_1.assertEquals)("1+2)", F.padBrackets("1+2)"));
}
(0, test_core_1.runTests)(testPadBrackets);
