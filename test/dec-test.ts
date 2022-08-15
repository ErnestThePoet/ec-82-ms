import { assertEquals, assertObjectEquals, runTests } from "./test-core/test-core";
import * as DB from "../modules/math/value-type-basics/dec-basics";

function testTryToFracValue() {
    assertObjectEquals({ ok: true, frac: { u: 0, d: 1 } },
        DB.tryToFracValue(0));
    
    assertObjectEquals({ ok: true, frac: { u: 1, d: 1 } },
        DB.tryToFracValue(1));
    
    assertObjectEquals({ ok: true, frac: { u: -1, d: 1 } },
        DB.tryToFracValue(-1));
    
    assertObjectEquals({ ok: true, frac: { u: 2, d: 1 } },
        DB.tryToFracValue(2));
    
    assertObjectEquals({ ok: true, frac: { u: -1, d: 2 } },
        DB.tryToFracValue(-0.5));
    
    assertObjectEquals({ ok: true, frac: { u: 1, d: 256 } },
        DB.tryToFracValue(0.00390625));
    
    assertObjectEquals({ ok: true, frac: { u: 333_333, d: 1000000 } },
        DB.tryToFracValue(0.333_333));
    
    assertObjectEquals({ ok: true, frac: { u: 333_333_333_333, d: 1_000_000_000_000 } },
        DB.tryToFracValue(0.333_333_333_333));
    
    assertObjectEquals({ ok: true, frac: { u: -333_333_333_333, d: 1_000_000_000_000 } },
        DB.tryToFracValue(-0.333_333_333_333));
    
    assertObjectEquals({ ok: false },
        DB.tryToFracValue(0.3_333_333_333_333));
    
    assertObjectEquals({ ok: true, frac: { u: 1_333_333_333_333, d: 1_000_000 } },
        DB.tryToFracValue(1_333_333.333_333));
    
    assertObjectEquals({ ok: true, frac: { u: -1_333_333_333_333, d: 1_000_000 } },
        DB.tryToFracValue(-1_333_333.333_333));

    assertObjectEquals({ ok: false },
        DB.tryToFracValue(1_333_333.3_333_333));
    
    assertObjectEquals({ ok: true, frac: { u: 1_333_333_333_333, d: 10 } },
        DB.tryToFracValue(133_333_333_333.3));

    assertObjectEquals({ ok: false },
        DB.tryToFracValue(1_333_333_333_333.3));
    
    assertObjectEquals({ ok: true, frac: { u: 1_333_333_333_333, d: 1 } },
        DB.tryToFracValue(1_333_333_333_333));
}

runTests(testTryToFracValue);