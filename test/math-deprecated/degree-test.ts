import { assertEquals, assertObjectEquals, runTests } from "../test-core/test-core";
import * as DGB from "../../modules/math/value-type-basics/degree-basics";

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

function testIsAbsGreaterThan() {
    assertEquals(false, DGB.isAbsGreaterThan(
        { d: 0, m: 0, s: 0, neg: false },
        { d: 0, m: 0, s: 0, neg: false }
    ));

    assertEquals(false, DGB.isAbsGreaterThan(
        { d: 0, m: 0, s: 0, neg: false },
        { d: 1, m: 0, s: 0, neg: false }
    ));

    assertEquals(false, DGB.isAbsGreaterThan(
        { d: 0, m: 0, s: 0, neg: false },
        { d: 0, m: 1, s: 0, neg: false }
    ));

    assertEquals(false, DGB.isAbsGreaterThan(
        { d: 0, m: 0, s: 0, neg: false },
        { d: 0, m: 0, s: 1, neg: false }
    ));

    assertEquals(true, DGB.isAbsGreaterThan(
        { d: 1, m: 0, s: 0, neg: false },
        { d: 0, m: 0, s: 0, neg: false }
    ));

    assertEquals(true, DGB.isAbsGreaterThan(
        { d: 0, m: 1, s: 0, neg: false },
        { d: 0, m: 0, s: 0, neg: false }
    ));

    assertEquals(true, DGB.isAbsGreaterThan(
        { d: 0, m: 0, s: 1, neg: false },
        { d: 0, m: 0, s: 0, neg: false }
    ));

    assertEquals(true, DGB.isAbsGreaterThan(
        { d: 2, m: 0, s: 0, neg: false },
        { d: 1, m: 59, s: 59.9, neg: false }
    ));

    assertEquals(true, DGB.isAbsGreaterThan(
        { d: 0, m: 59, s: 58, neg: false },
        { d: 0, m: 58, s: 59, neg: false }
    ));

    assertEquals(true, DGB.isAbsGreaterThan(
        { d: 0, m: 59, s: 58, neg: false },
        { d: 0, m: 59, s: 57.5, neg: false }
    ));
}

function testAddDegree() {
    // simple cases
    assertObjectEquals({ d: 0, m: 0, s: 0, neg: false },
        DGB.addDegree({ d: 0, m: 0, s: 0, neg: false }, { d: 0, m: 0, s: 0, neg: false }));
    
    assertObjectEquals({ d: 0, m: 0, s: 0, neg: false },
        DGB.addDegree({ d: 0, m: 0, s: 0, neg: false }, { d: 0, m: 0, s: 0, neg: true }));
    
    assertObjectEquals({ d: 1, m: 2, s: 3, neg: false },
        DGB.addDegree({ d: 0, m: 0, s: 0, neg: false }, { d: 1, m: 2, s: 3, neg: false }));
    
    // both !neg
    assertObjectEquals({ d: 18, m: 29, s: 40, neg: false },
        DGB.addDegree({ d: 1, m: 2, s: 3, neg: false }, { d: 17, m: 27, s: 37, neg: false }));
    
    assertObjectEquals({ d: 45, m: 7, s: 28, neg: false },
        DGB.addDegree({ d: 11, m: 22, s: 33, neg: false }, { d: 33, m: 44, s: 55, neg: false }));

    // both neg
    assertObjectEquals({ d: 18, m: 29, s: 40, neg: true },
        DGB.addDegree({ d: 1, m: 2, s: 3, neg: true }, { d: 17, m: 27, s: 37, neg: true }));

    assertObjectEquals({ d: 45, m: 7, s: 28, neg: true },
        DGB.addDegree({ d: 11, m: 22, s: 33, neg: true }, { d: 33, m: 44, s: 55, neg: true }));

    // one neg, one !neg
    // abs(neg) greater
    assertObjectEquals({ d: 10, m: 20, s: 30, neg: true },
        DGB.addDegree({ d: 0, m: 0, s: 0, neg: false }, { d: 10, m: 20, s: 30, neg: true }));
    
    assertObjectEquals({ d: 10, m: 20, s: 30, neg: true },
        DGB.addDegree({ d: 10, m: 20, s: 30, neg: true }, { d: 0, m: 0, s: 0, neg: false }));
    
    assertObjectEquals({ d: 3, m: 57, s: 56, neg: true },
        DGB.addDegree({ d: 1, m: 7, s: 9, neg: false }, { d: 5, m: 5, s: 5, neg: true }));
    
    assertObjectEquals({ d: 3, m: 57, s: 56, neg: true },
        DGB.addDegree({ d: 5, m: 5, s: 5, neg: true }, { d: 1, m: 7, s: 9, neg: false }));
    
    assertObjectEquals({ d: 0, m: 0, s: 11, neg: true },
        DGB.addDegree({ d: 3, m: 1, s: 50, neg: false }, { d: 3, m: 2, s: 1, neg: true }));
    
    assertObjectEquals({ d: 0, m: 0, s: 11, neg: true },
        DGB.addDegree({ d: 3, m: 2, s: 1, neg: true }, { d: 3, m: 1, s: 50, neg: false }));
    
    // abs(!neg) greater
    assertObjectEquals({ d: 2, m: 38, s: 48, neg: false },
        DGB.addDegree({ d: 3, m: 52, s: 4, neg: false }, { d: 1, m: 13, s: 16, neg: true }));
    
    assertObjectEquals({ d: 2, m: 38, s: 48, neg: false },
        DGB.addDegree({ d: 1, m: 13, s: 16, neg: true },{ d: 3, m: 52, s: 4, neg: false }));
    
    assertObjectEquals({ d: 1, m: 52, s: 58, neg: false },
        DGB.addDegree({ d: 3, m: 52, s: 4, neg: false }, { d: 1, m: 59, s: 6, neg: true }));
    
    assertObjectEquals({ d: 1, m: 52, s: 58, neg: false },
        DGB.addDegree({ d: 1, m: 59, s: 6, neg: true }, { d: 3, m: 52, s: 4, neg: false }));
    
    // abs equal
    assertObjectEquals({ d: 0, m: 0, s: 0, neg: false },
        DGB.addDegree({ d: 3, m: 1, s: 50, neg: false }, { d: 3, m: 1, s: 50, neg: true }));
}

runTests(
    testTryToFracValue,
    testFromDmsNeg,

    testIsAbsGreaterThan,
    testAddDegree
);