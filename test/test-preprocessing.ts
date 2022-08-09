import * as F from "../modules/calc-core/preprocessing";
import { assertEquals,runTests } from "./test-core";

function testPadBrackets() {
    assertEquals("",F.padBrackets(""));
    assertEquals("1+2",F.padBrackets("1+2"));
    assertEquals("(1)+2",F.padBrackets("(1)+2"));
    assertEquals("(1+2)",F.padBrackets("(1+2"));
    assertEquals("(1+2())",F.padBrackets("(1+2)"));
    assertEquals("1+2)",F.padBrackets("1+2)"));
}


runTests(testPadBrackets);