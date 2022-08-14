import { assertEquals, runTests } from "./test-core/test-core";
import { gcd,lcm } from "../modules/math/algorithm";

function testGcd() {
    assertEquals(3, gcd(3, 0));
    assertEquals(3, gcd(0, 3));
    assertEquals(1, gcd(1, 3));
    assertEquals(1, gcd(3, 1));
    assertEquals(3, gcd(3, 3));
    assertEquals(2, gcd(2, 4));
    assertEquals(2, gcd(4, 2));
    assertEquals(25, gcd(125, 175));
    assertEquals(1, gcd(12345, 12346));

    assertEquals(3, gcd(-3, 0));
    assertEquals(1, gcd(-1, 3));
    assertEquals(1, gcd(1, -3));
    assertEquals(1, gcd(-1, -3));
    assertEquals(25, gcd(-125, 175));
}

function testLcm() {
    assertEquals(0, lcm(3, 0));
    assertEquals(3, lcm(3, 1));
    assertEquals(6, lcm(3, 2));
    assertEquals(0, lcm(-3, 0));
    assertEquals(3, lcm(3, -1));
    assertEquals(3, lcm(-3, 1));
    assertEquals(6, lcm(-3, -2));
}

runTests(testGcd,testLcm);