import { assertEquals,assertObjectEquals, runTests } from "./test-core";
import * as FB from "../modules/math/frac-basics";

function testReduce() {
    assertObjectEquals({ u: 0, d: 1 }, FB.reduce({ u: 0, d: 1 }));
    assertObjectEquals({ u: 1, d: 1 }, FB.reduce({ u: 3, d: 3 }));
    assertObjectEquals({ u: 1, d: 3 }, FB.reduce({ u: 3, d: 9 }));
    assertObjectEquals({ u: 3, d: 1 }, FB.reduce({ u: 9, d: 3 }));
}

runTests(testReduce);