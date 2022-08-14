import { assertEquals, assertObjectEquals, runTests } from "./test-core";
import * as DB from "../modules/math/dec-basics";

function testToFrac() {
    console.log(DB.tryToFracValue(0.00390625));
}

runTests(testToFrac);