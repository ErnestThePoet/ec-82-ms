import { assertEquals, assertObjectEquals, runTests } from "./test-core/test-core";
import * as DB from "../modules/math/value-type-basics/dec-basics";

function testToFrac() {
    console.log(DB.tryToFracValue(0.00390625));
}

runTests(testToFrac);