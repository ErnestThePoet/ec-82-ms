import { KeyEntry, KEY_ENTRIES } from "../modules/calc-core/objs/key-entry";
import { Operator } from "../modules/calc-core/objs/operators";
import { preprocess } from "../modules/calc-core/preprocessing";
import { parse } from "../modules/calc-core/parse";
import { InternalNumber } from "../modules/calc-core/objs/internal-number";

function printResult(ke: KeyEntry[]) {
    ke=preprocess(ke);

    console.log(ke.map(x => x.id).join(" "));

    const pr = parse(ke);

    if (pr.success) {
        console.log(pr.lexems.map(
            x => x.type === "NBR"
                ? (<InternalNumber>x.obj).toString()
                : (<Operator>x.obj).id).join(" "));
    }
    else {
        console.log(pr.msg);
    }
}

function test1() {
    // 3*(5+3sin(-(5.5--6
    // =>3*(5+3*sin(neg((-5.5+6))))
    const ke: KeyEntry[] = [
        KEY_ENTRIES.n3,
        KEY_ENTRIES.mul,
        KEY_ENTRIES.lBracket,
        KEY_ENTRIES.n5,
        KEY_ENTRIES.add,
        KEY_ENTRIES.n3,
        KEY_ENTRIES.sin,
        KEY_ENTRIES.sub,
        KEY_ENTRIES.lBracket,
        KEY_ENTRIES.n5,
        KEY_ENTRIES.nDot,
        KEY_ENTRIES.n5,
        KEY_ENTRIES.sub,
        KEY_ENTRIES.sub,
        KEY_ENTRIES.n6
    ];

    printResult(ke);
}

function test2() {
    // 6E
    const ke: KeyEntry[] = [
        KEY_ENTRIES.n6,
        KEY_ENTRIES.E
    ];

    printResult(ke);
}

function test3() {
    // 5-Pol(5,6
    const ke: KeyEntry[] = [
        KEY_ENTRIES.n5,
        KEY_ENTRIES.sub,
        KEY_ENTRIES.pol,
        KEY_ENTRIES.n5,
        KEY_ENTRIES.comma,
        KEY_ENTRIES.n6
    ];

    printResult(ke);
}

function test4() {
    // 5-Pol(+5,6Ccos(A+B))
    const ke: KeyEntry[] = [
        KEY_ENTRIES.n5,
        KEY_ENTRIES.sub,
        KEY_ENTRIES.pol,
        KEY_ENTRIES.add,
        KEY_ENTRIES.n5,
        KEY_ENTRIES.comma,
        KEY_ENTRIES.n6,
        KEY_ENTRIES.C,
        KEY_ENTRIES.cos,
        KEY_ENTRIES.A,
        KEY_ENTRIES.add,
        KEY_ENTRIES.B,
        KEY_ENTRIES.rBracket,
        KEY_ENTRIES.rBracket
    ];

    printResult(ke);
}

function test5() {
    // 5-Pol(5,6)%
    const ke: KeyEntry[] = [
        KEY_ENTRIES.n5,
        KEY_ENTRIES.sub,
        KEY_ENTRIES.pol,
        KEY_ENTRIES.n5,
        KEY_ENTRIES.comma,
        KEY_ENTRIES.n6,
        KEY_ENTRIES.rBracket,
        KEY_ENTRIES.percent
    ];

    printResult(ke);
}

function test6() {
    // 5-Pol(,7³
    const ke: KeyEntry[] = [
        KEY_ENTRIES.n5,
        KEY_ENTRIES.sub,
        KEY_ENTRIES.pol,
        KEY_ENTRIES.comma,
        KEY_ENTRIES.n7,
        KEY_ENTRIES.cube
    ];

    printResult(ke);
}

function test7() {
    // 5'66'
    const ke: KeyEntry[] = [
        KEY_ENTRIES.n5,
        KEY_ENTRIES.degree,
        KEY_ENTRIES.n6,
        KEY_ENTRIES.n6,
        KEY_ENTRIES.degree
    ];

    printResult(ke);
}

function test8() {
    // 3+5/(7+8(1+2))²
    const ke: KeyEntry[] = [
        KEY_ENTRIES.n3,
        KEY_ENTRIES.add,
        KEY_ENTRIES.n5,
        KEY_ENTRIES.div,
        KEY_ENTRIES.lBracket,
        KEY_ENTRIES.n7,
        KEY_ENTRIES.add,
        KEY_ENTRIES.n8,
        KEY_ENTRIES.lBracket,
        KEY_ENTRIES.n1,
        KEY_ENTRIES.add,
        KEY_ENTRIES.n2,
        KEY_ENTRIES.rBracket,
        KEY_ENTRIES.rBracket,
        KEY_ENTRIES.sqrt
    ];

    printResult(ke);
}

function test9() {
    // 5-Pol(5,Pol(7,9))
    const ke: KeyEntry[] = [
        KEY_ENTRIES.n5,
        KEY_ENTRIES.sub,
        KEY_ENTRIES.pol,
        KEY_ENTRIES.n5,
        KEY_ENTRIES.comma,
        KEY_ENTRIES.pol,
        KEY_ENTRIES.n7,
        KEY_ENTRIES.comma,
        KEY_ENTRIES.n9,
        KEY_ENTRIES.rBracket
    ];

    printResult(ke);
}

function test10() {
    // Pol(Pol(1,2),Pol(3,4
    const ke: KeyEntry[] = [
        KEY_ENTRIES.pol,
        KEY_ENTRIES.pol,
        KEY_ENTRIES.n1,
        KEY_ENTRIES.comma,
        KEY_ENTRIES.n2,
        KEY_ENTRIES.rBracket,
        KEY_ENTRIES.comma,
        KEY_ENTRIES.pol,
        KEY_ENTRIES.n3,
        KEY_ENTRIES.comma,
        KEY_ENTRIES.n4
    ];

    printResult(ke);
}

test10();