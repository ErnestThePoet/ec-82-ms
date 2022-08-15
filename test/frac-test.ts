import { assertEquals,assertObjectEquals, runTests } from "./test-core/test-core";
import * as FB from "../modules/math/value-type-basics/frac-basics";

function testTryFromTerminatingDiv() {
    assertObjectEquals({ ok: true, frac: { u: 0, d: 1 } }, FB.tryFromTerminatingDiv(0, 1));
    assertObjectEquals({ ok: true, frac: { u: 0, d: 1 } }, FB.tryFromTerminatingDiv(0, 5));
    assertObjectEquals({ ok: true, frac: { u: 2, d: 5 } }, FB.tryFromTerminatingDiv(2, 5));
    assertObjectEquals({ ok: true, frac: { u: 1, d: 6 } }, FB.tryFromTerminatingDiv(10, 60));
    assertObjectEquals({ ok: true, frac: { u: 0, d: 1 } }, FB.tryFromTerminatingDiv(0, 2.4));
    assertObjectEquals({ ok: true, frac: { u: 1, d: 2 } }, FB.tryFromTerminatingDiv(1.2, 2.4));
    assertObjectEquals({ ok: true, frac: { u: 1, d: 256 } }, FB.tryFromTerminatingDiv(0.00390625, 1));
    assertObjectEquals({ ok: true, frac: { u: -1, d: 256 } }, FB.tryFromTerminatingDiv(-0.00390625, 1));

    assertObjectEquals({ ok: true, frac: { u: 1, d: 3160320 } },
        FB.tryFromTerminatingDiv(0.00390625, 12345));
    
    assertObjectEquals({ ok: true, frac: { u: 1, d: 31604736 } },
        FB.tryFromTerminatingDiv(0.00390625, 123456));
}

function testReduce() {
    assertObjectEquals({ u: 0, d: 1 }, FB.reduce({ u: 0, d: 1 }));
    assertObjectEquals({ u: 0, d: 1 }, FB.reduce({ u: 0, d: 3 }));
    assertObjectEquals({ u: 1, d: 1 }, FB.reduce({ u: 3, d: 3 }));
    assertObjectEquals({ u: 1, d: 3 }, FB.reduce({ u: 3, d: 9 }));
    assertObjectEquals({ u: 3, d: 1 }, FB.reduce({ u: 9, d: 3 }));
}

///////////////////// Operations with frac /////////////////////
function testAddFrac() {
    assertObjectEquals({ u: 0, d: 1 },
        FB.addFrac({ u: 0, d: 2 }, { u: 0, d: 3 }));
    
    assertObjectEquals({ u: 0, d: 1 },
        FB.addFrac({ u: 1, d: 2 }, { u: -1, d: 2 }));
    
    assertObjectEquals({ u: 1, d: 1 },
        FB.addFrac({ u: 1, d: 2 }, { u: 1, d: 2 }));
    
    assertObjectEquals({ u: 5, d: 6 },
        FB.addFrac({ u: 1, d: 2 }, { u: 1, d: 3 }));
    
    assertObjectEquals({ u: 1, d: 6 },
        FB.addFrac({ u: 1, d: 2 }, { u: -1, d: 3 }));
    
    assertObjectEquals({ u: 4595, d: 6 },
        FB.addFrac({ u: 197, d: 2 }, { u: 2002, d: 3 }));
}

function testSubFrac() {
    assertObjectEquals({ u: 0, d: 1 },
        FB.subFrac({ u: 0, d: 2 }, { u: 0, d: 3 }));

    assertObjectEquals({ u: 1, d: 1 },
        FB.subFrac({ u: 1, d: 2 }, { u: -1, d: 2 }));

    assertObjectEquals({ u: 0, d: 1 },
        FB.subFrac({ u: 1, d: 2 }, { u: 1, d: 2 }));

    assertObjectEquals({ u: 1, d: 6 },
        FB.subFrac({ u: 1, d: 2 }, { u: 1, d: 3 }));

    assertObjectEquals({ u: 5, d: 6 },
        FB.subFrac({ u: 1, d: 2 }, { u: -1, d: 3 }));

    assertObjectEquals({ u: -3413, d: 6 },
        FB.subFrac({ u: 197, d: 2 }, { u: 2002, d: 3 }));
}

function testMulFrac() {
    assertObjectEquals({ u: 0, d: 1 },
        FB.mulFrac({ u: 0, d: 2 }, { u: 1, d: 3 }));

    assertObjectEquals({ u: -1, d: 4 },
        FB.mulFrac({ u: 1, d: 2 }, { u: -1, d: 2 }));

    assertObjectEquals({ u: 1, d: 1 },
        FB.mulFrac({ u: 5, d: 2 }, { u: 2, d: 5 }));

    assertObjectEquals({ u: 197197, d: 3 },
        FB.mulFrac({ u: 197, d: 2 }, { u: 2002, d: 3 }));
}

function testDivFrac() {
    assertObjectEquals({ u: 0, d: 1 },
        FB.divFrac({ u: 0, d: 2 }, { u: 1, d: 3 }));

    assertObjectEquals({ u: -1, d: 1 },
        FB.divFrac({ u: 1, d: 2 }, { u: -1, d: 2 }));

    assertObjectEquals({ u: 1, d: 1 },
        FB.divFrac({ u: 1, d: 2 }, { u: 1, d: 2 }));

    assertObjectEquals({ u: 3, d: 2 },
        FB.divFrac({ u: 1, d: 2 }, { u: 1, d: 3 }));

    assertObjectEquals({ u: -3, d: 2 },
        FB.divFrac({ u: 1, d: 2 }, { u: -1, d: 3 }));

    assertObjectEquals({ u: 591, d: 4004 },
        FB.divFrac({ u: 197, d: 2 }, { u: 2002, d: 3 }));
}


///////////////////// Operations with dec /////////////////////
function testAddDec() {
    assertObjectEquals({ isFrac: true, value: { u: 1, d: 1 } },
        FB.addDec({ u: 0, d: 1 }, 1));
    
    assertObjectEquals({ isFrac: true, value: { u: -1, d: 1 } },
        FB.addDec({ u: 0, d: 1 }, -1));
    
    assertObjectEquals({ isFrac: true, value: { u: 17, d: 10 } },
        FB.addDec({ u: 1, d: 2 }, 1.2));
    
    assertObjectEquals({ isFrac: true, value: { u: -7, d: 10 } },
        FB.addDec({ u: 1, d: 2 }, -1.2));
    
    assertObjectEquals({ isFrac: true, value: { u: 1_333_333_333_333, d: 1_000_000_000_000 } },
        FB.addDec({ u: 0, d: 1 }, 1.333_333_333_333));
    
    assertObjectEquals({ isFrac: true, value: { u: -1_333_333_333_333, d: 1_000_000_000_000 } },
        FB.addDec({ u: 0, d: 1 }, -1.333_333_333_333));
    
    assertObjectEquals({ isFrac: true, value: { u: 4_999_999_999_999, d: 3_000_000_000_000 } },
        FB.addDec({ u: 1, d: 3 }, 1.333_333_333_333));

    assertObjectEquals({ isFrac: true, value: { u: -2_999_999_999_999, d: 3_000_000_000_000 } },
        FB.addDec({ u: 1, d: 3 }, -1.333_333_333_333));
}

function testSubDec() {
    assertObjectEquals({ isFrac: true, value: { u: -1, d: 1 } },
        FB.subDec({ u: 0, d: 1 }, 1));

    assertObjectEquals({ isFrac: true, value: { u: 1, d: 1 } },
        FB.subDec({ u: 0, d: 1 }, -1));

    assertObjectEquals({ isFrac: true, value: { u: -7, d: 10 } },
        FB.subDec({ u: 1, d: 2 }, 1.2));

    assertObjectEquals({ isFrac: true, value: { u: 17, d: 10 } },
        FB.subDec({ u: 1, d: 2 }, -1.2));

    assertObjectEquals({ isFrac: true, value: { u: -2_999_999_999_999, d: 3_000_000_000_000 } },
        FB.subDec({ u: 1, d: 3 }, 1.333_333_333_333));

    assertObjectEquals({ isFrac: true, value: { u: 4_999_999_999_999, d: 3_000_000_000_000 } },
        FB.subDec({ u: 1, d: 3 }, -1.333_333_333_333));
}

function testMulDec() {
    assertObjectEquals({ isFrac: true, value: { u: 0, d: 1 } },
        FB.mulDec({ u: 1, d: 3 }, 0));
    
    assertObjectEquals({ isFrac: true, value: { u: 0, d: 1 } },
        FB.mulDec({ u: 0, d: 1 }, 1));

    assertObjectEquals({ isFrac: true, value: { u: -1, d: 1 } },
        FB.mulDec({ u: 1, d: 1 }, -1));

    assertObjectEquals({ isFrac: true, value: { u: 3, d: 5 } },
        FB.mulDec({ u: 1, d: 2 }, 1.2));

    assertObjectEquals({ isFrac: true, value: { u: -3, d: 5 } },
        FB.mulDec({ u: 1, d: 2 }, -1.2));
}

function testDivDec() {
    assertObjectEquals({ isFrac: true, value: { u: 0, d: 1 } },
        FB.divDec({ u: 0, d: 1 }, 1));

    assertObjectEquals({ isFrac: true, value: { u: -1, d: 1 } },
        FB.divDec({ u: 1, d: 1 }, -1));

    assertObjectEquals({ isFrac: true, value: { u: 5, d: 12 } },
        FB.divDec({ u: 1, d: 2 }, 1.2));

    assertObjectEquals({ isFrac: true, value: { u: -5, d: 12 } },
        FB.divDec({ u: 1, d: 2 }, -1.2));
}

///////////////////// Operations with degree /////////////////////
function testAddDegree() {
    assertObjectEquals({ isFrac: true, value: { u: 0, d: 1 } },
        FB.addDegree({ u: 0, d: 2 }, { d: 0, m: 0, s: 0, neg: false }));
    
    assertObjectEquals({ isFrac: true, value: { u: 1, d: 1 } },
        FB.addDegree({ u: 0, d: 2 }, { d: 1, m: 0, s: 0, neg: false }));
    
    assertObjectEquals({ isFrac: true, value: { u: -1, d: 1 } },
        FB.addDegree({ u: 0, d: 2 }, { d: 1, m: 0, s: 0, neg: true }));
    
    assertObjectEquals({ isFrac: true, value: { u: 5461, d: 3600 } },
        FB.addDegree({ u: 1, d: 2 }, { d: 1, m: 1, s: 1, neg: false }));
    
    assertObjectEquals({ isFrac: true, value: { u: -293, d: 240 } },
        FB.addDegree({ u: 1, d: 3 }, { d: 1.5, m: 2.25, s: 60, neg: true }));
}

function testSubDegree() {
    assertObjectEquals({ isFrac: true, value: { u: 0, d: 1 } },
        FB.subDegree({ u: 0, d: 2 }, { d: 0, m: 0, s: 0, neg: false }));

    assertObjectEquals({ isFrac: true, value: { u: -1, d: 1 } },
        FB.subDegree({ u: 0, d: 2 }, { d: 1, m: 0, s: 0, neg: false }));

    assertObjectEquals({ isFrac: true, value: { u: 1, d: 1 } },
        FB.subDegree({ u: 0, d: 2 }, { d: 1, m: 0, s: 0, neg: true }));

    assertObjectEquals({ isFrac: true, value: { u: -1861, d: 3600 } },
        FB.subDegree({ u: 1, d: 2 }, { d: 1, m: 1, s: 1, neg: false }));

    assertObjectEquals({ isFrac: true, value: { u: 151, d: 80 } },
        FB.subDegree({ u: 1, d: 3 }, { d: 1.5, m: 2.25, s: 60, neg: true }));
}

runTests(
    testTryFromTerminatingDiv,
    testReduce,

    testAddFrac,
    testSubFrac,
    testMulFrac,
    testDivFrac,

    testAddDec,
    testSubDec,
    testMulDec,
    testDivDec,

    testAddDegree,
    testSubDegree
);