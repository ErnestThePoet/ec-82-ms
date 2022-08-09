export function assertEquals(expected: any, actual: any) {
    if (actual !== expected) {
        throw `Test Failed:\n*** Expected:${expected}\n*** Actual:  ${actual}`;
    }
}

export function runTests(...testFns: Array<() => void>) {
    console.log("Test Start");
    console.log("======================");

    for (let i = 0; i < testFns.length; i++){
        testFns[i]();
        console.log(`TestFn ${i} passed.`);
    }

    console.log("======================");
    console.log("Test Complete");
}