"use strict";
exports.__esModule = true;
var test_core_1 = require("./test-core");
var fact_1 = require("../modules/math/fact");
function test() {
    (0, test_core_1.assertEquals)(1, (0, fact_1.fact)(0));
    (0, test_core_1.assertEquals)(1, (0, fact_1.fact)(1));
    (0, test_core_1.assertEquals)(2, (0, fact_1.fact)(2));
    (0, test_core_1.assertEquals)(720, (0, fact_1.fact)(6));
    (0, test_core_1.assertEquals)(6227020800, (0, fact_1.fact)(12));
}
(0, test_core_1.runTests)(test);
