"use strict";
exports.__esModule = true;
var test_core_1 = require("./test-core");
var ncr_npr_1 = require("../modules/math/ncr-npr");
function testnPr() {
    (0, test_core_1.assertEquals)(1, (0, ncr_npr_1.nPr)(0, 0));
    (0, test_core_1.assertEquals)(1, (0, ncr_npr_1.nPr)(1, 0));
    (0, test_core_1.assertEquals)(1, (0, ncr_npr_1.nPr)(5, 0));
    (0, test_core_1.assertEquals)(1, (0, ncr_npr_1.nPr)(1, 1));
    (0, test_core_1.assertEquals)(5, (0, ncr_npr_1.nPr)(5, 1));
    (0, test_core_1.assertEquals)(20, (0, ncr_npr_1.nPr)(5, 2));
    (0, test_core_1.assertEquals)(60, (0, ncr_npr_1.nPr)(5, 3));
    (0, test_core_1.assertEquals)(120, (0, ncr_npr_1.nPr)(5, 4));
    (0, test_core_1.assertEquals)(120, (0, ncr_npr_1.nPr)(5, 5));
}
function testnCr() {
    (0, test_core_1.assertEquals)(1, (0, ncr_npr_1.nCr)(0, 0));
    (0, test_core_1.assertEquals)(1, (0, ncr_npr_1.nCr)(1, 0));
    (0, test_core_1.assertEquals)(1, (0, ncr_npr_1.nCr)(5, 0));
    (0, test_core_1.assertEquals)(1, (0, ncr_npr_1.nCr)(1, 1));
    (0, test_core_1.assertEquals)(5, (0, ncr_npr_1.nCr)(5, 1));
    (0, test_core_1.assertEquals)(10, (0, ncr_npr_1.nCr)(5, 2));
    (0, test_core_1.assertEquals)(10, (0, ncr_npr_1.nCr)(5, 3));
    (0, test_core_1.assertEquals)(5, (0, ncr_npr_1.nCr)(5, 4));
    (0, test_core_1.assertEquals)(1, (0, ncr_npr_1.nCr)(5, 5));
}
(0, test_core_1.runTests)(testnPr, testnCr);
