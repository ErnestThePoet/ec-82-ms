import { assertEquals, runTests } from "./test-core";
import { nCr, nPr } from "../modules/math/ncr-npr";

function testnPr() {
    assertEquals(1, nPr(0, 0));
    assertEquals(1, nPr(1, 0));
    assertEquals(1, nPr(5, 0));
    assertEquals(1, nPr(1, 1));
    assertEquals(5, nPr(5, 1));
    assertEquals(20, nPr(5, 2));
    assertEquals(60, nPr(5, 3));
    assertEquals(120, nPr(5, 4));
    assertEquals(120, nPr(5, 5));
}

function testnCr() {
    assertEquals(1, nCr(0, 0));
    assertEquals(1, nCr(1, 0));
    assertEquals(1, nCr(5, 0));
    assertEquals(1, nCr(1, 1));
    assertEquals(5, nCr(5, 1));
    assertEquals(10, nCr(5, 2));
    assertEquals(10, nCr(5, 3));
    assertEquals(5, nCr(5, 4));
    assertEquals(1, nCr(5, 5));
}

runTests(testnPr,testnCr);