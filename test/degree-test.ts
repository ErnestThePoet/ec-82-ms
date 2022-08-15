import { assertEquals, assertObjectEquals, runTests } from "./test-core/test-core";
import * as DGB from "../modules/math/value-type-basics/degree-basics";

function testTryToFracValue() {
    assertObjectEquals({ ok: true, frac: { u: 0, d: 1 } },
        DGB.tryToFracValue({ d: 0, m: 0, s: 0, neg: false }));
    
    assertObjectEquals({ ok: true, frac: { u: 1, d: 1 } },
        DGB.tryToFracValue({ d: 1, m: 0, s: 0, neg: false }));
    
    assertObjectEquals({ ok: true, frac: { u: -1, d: 1 } },
        DGB.tryToFracValue({ d: 1, m: 0, s: 0, neg: true }));
    
    assertObjectEquals({ ok: true, frac: { u: 5, d: 4 } },
        DGB.tryToFracValue({ d: 1, m: 15, s: 0, neg: false }));
    
    assertObjectEquals({ ok: true, frac: { u: 1, d: 3 } },
        DGB.tryToFracValue({ d: 0, m: 20, s: 0, neg: false }));
    
    assertObjectEquals({ ok: true, frac: { u: -1, d: 3 } },
        DGB.tryToFracValue({ d: 0, m: 20, s: 0, neg: true }));
    
    assertObjectEquals({ ok: true, frac: { u: 1, d: 120 } },
        DGB.tryToFracValue({ d: 0, m: 0, s: 30, neg: false }));
    
    assertObjectEquals({ ok: true, frac: { u: 12359, d: 3600 } },
        DGB.tryToFracValue({ d: 3, m: 25, s: 59, neg: false }));
    
    assertObjectEquals({ ok: true, frac: { u: -3001, d: 3000 } },
        DGB.tryToFracValue({ d: 1, m: 0, s: 1.2, neg: true }));
}

function testFromDmsNeg() {
    assertObjectEquals({ d: 0, m: 0, s: 0, neg: false },
        DGB.fromDmsNeg(0, 0, 0, false));
    
    assertObjectEquals({ d: 1, m: 0, s: 0, neg: false },
        DGB.fromDmsNeg(1, 0, 0, false));
    
    assertObjectEquals({ d: 1, m: 12, s: 0, neg: true },
        DGB.fromDmsNeg(1.2, 0, 0, true));
    
    assertObjectEquals({ d: 1, m: 13, s: 19.4, neg: false },
        DGB.fromDmsNeg(1.2, 1.3, 1.4, false));
    
    assertObjectEquals({ d: 2, m: 0, s: 0, neg: false },
        DGB.fromDmsNeg(1, 60, 0, false));
    
    assertObjectEquals({ d: 2, m: 5, s: 0, neg: false },
        DGB.fromDmsNeg(1, 65, 0, false));
    
    assertObjectEquals({ d: 2, m: 1, s: 2.5, neg: false },
        DGB.fromDmsNeg(1, 60, 62.5, false));
    
    assertObjectEquals({ d: 5, m: 46, s: 28.5, neg: true },
        DGB.fromDmsNeg(1.5, 250.8, 340.5, true));
}

runTests(
    testTryToFracValue,
    testFromDmsNeg
);