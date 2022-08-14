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

runTests(
    testTryFromTerminatingDiv,
    testReduce,
    testAddFrac,
    testSubFrac
);