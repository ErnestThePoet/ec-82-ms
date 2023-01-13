export function assertEquals(expected: any, actual: any) {
    if (actual !== expected) {
        throw `Test Failed:\n*** Expected:${expected}\n*** Actual:  ${actual}`;
    }
}

interface StringIndexable {
    [_: string]: any;
}
function isObjectEqual(a: object, b: object): boolean {
    const aProps = Object.getOwnPropertyNames(a);
    const bProps = Object.getOwnPropertyNames(b);

    if (aProps.length !== bProps.length) {
        return false;
    }

    for (const i of aProps) {
        if (!(i in b)) {
            return false;
        }

        const aValue = (<StringIndexable>a)[i];
        const bValue = (<StringIndexable>b)[i];

        if (typeof aValue !== typeof bValue) {
            return false;
        }

        // now a,b has the common member of same type.

        if (typeof aValue === "object") {
            if (!isObjectEqual(aValue, bValue)) {
                return false;
            }
        } else {
            if (aValue !== bValue) {
                return false;
            }
        }
    }

    return true;
}

export function assertObjectEquals(expected: object, actual: object) {
    if (!isObjectEqual(expected, actual)) {
        throw (
            `Test Failed:\n*** Expected:` +
            `${JSON.stringify(expected)}\n*** Actual:  ` +
            `${JSON.stringify(actual)}`
        );
    }
}

export function runTests(...testFns: Array<() => void>) {
    console.log(`Test Start - total ${testFns.length} tests`);
    console.log("======================");

    for (let i = 0; i < testFns.length; i++) {
        testFns[i]();
        console.log(`TestFn ${i} passed.`);
    }

    console.log("======================");
    console.log("Test Complete");
}
