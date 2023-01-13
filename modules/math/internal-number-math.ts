// Internal number math functions' responsibility is to:
// 1. calculate InternalNumbers that are guarenteed to be valid for the operation;
// 2. modify E and F in calculator memory for Pol and Rec.

import Decimal from "decimal.js";
import * as FACT from "./calculations/fact";
import * as NCRNPR from "./calculations/ncr-npr";
import * as DB from "./value-type-basics/dec-basics";
import * as FB from "./value-type-basics/frac-basics";
import * as DGB from "./value-type-basics/degree-basics";
import * as DC from "./degree-conversions";
import type {
    DegreeValue,
    FracValue,
    OperationFn
} from "../calc-core/objs/types";
import { InternalNumber } from "../calc-core/objs/internal-number";
import calculatorState from "../../observables/calculator-state";
import calculatorMemory from "../../observables/calculator-memory";

export function getFracValue(x: InternalNumber): FracValue {
    switch (x.type) {
        case "DEC":
            return DB.toFracValue(x.dec);
        case "FRAC":
            return x.frac;
        case "DEGREE":
            return DGB.toFracValue(x.degree);
    }
}

export function getDecValue(x: InternalNumber): Decimal {
    switch (x.type) {
        case "DEC":
            return x.dec;
        case "FRAC":
            return FB.toDecValue(x.frac);
        case "DEGREE":
            return DGB.toDecValue(x.degree);
    }
}

export function getDegreeValue(x: InternalNumber): DegreeValue {
    switch (x.type) {
        case "DEC":
            return DB.toDegreeValue(x.dec);
        case "FRAC":
            return FB.toDegreeValue(x.frac);
        case "DEGREE":
            return x.degree;
    }
}

export function isZero(x: InternalNumber): boolean {
    switch (x.type) {
        case "DEC":
            return x.dec.isZero();
        case "FRAC":
            return x.frac.u.isZero();
        case "DEGREE":
            return (
                x.degree.d.isZero() &&
                x.degree.m.isZero() &&
                x.degree.s.isZero()
            );
    }
}

export function isPositive(x: InternalNumber): boolean {
    switch (x.type) {
        case "DEC":
            return x.dec.gt(0);
        case "FRAC":
            return x.frac.u.gt(0);
        case "DEGREE":
            return !isZero(x) && !x.degree.neg;
    }
}

export function isNegative(x: InternalNumber): boolean {
    switch (x.type) {
        case "DEC":
            return x.dec.lt(0);
        case "FRAC":
            return x.frac.u.lt(0);
        case "DEGREE":
            return !isZero(x) && x.degree.neg;
    }
}

export function isZeroPositive(x: InternalNumber): boolean {
    return isZero(x) || isPositive(x);
}

export function isZeroNegative(x: InternalNumber): boolean {
    return isZero(x) || isNegative(x);
}

export function isNonNegativeInteger(x: InternalNumber): boolean {
    return getDecValue(x).isInteger() && isZeroPositive(x);
}

export function isOdd(x: InternalNumber): boolean {
    const decValue = getDecValue(x);
    return decValue.isInteger() && decValue.abs().mod(2).eq(1);
}

export const negative: OperationFn = (x: InternalNumber) => {
    switch (x.type) {
        case "DEC":
            return new InternalNumber("DEC", x.dec.neg());
        case "FRAC":
            return new InternalNumber("FRAC", {
                u: x.frac.u.neg(),
                d: x.frac.d
            });
        case "DEGREE":
            return new InternalNumber("DEGREE", {
                ...x.degree,
                neg: !x.degree.neg
            });
    }
};

export const cbrt: OperationFn = (x: InternalNumber) => {
    switch (x.type) {
        case "DEC":
            return new InternalNumber("DEC", x.dec.cbrt());
        case "FRAC":
            const resFrac = FB.fromTerminatingDiv(
                x.frac.u.cbrt(),
                x.frac.d.cbrt()
            );
            return new InternalNumber("FRAC", resFrac);
        case "DEGREE":
            return new InternalNumber("DEC", DGB.toDecValue(x.degree).cbrt());
    }
};

export const sqrt: OperationFn = (x: InternalNumber) => {
    switch (x.type) {
        case "DEC":
            return new InternalNumber("DEC", x.dec.sqrt());
        case "FRAC":
            const resFrac = FB.fromTerminatingDiv(
                x.frac.u.sqrt(),
                x.frac.d.sqrt()
            );
            return new InternalNumber("FRAC", resFrac);
        case "DEGREE":
            return new InternalNumber("DEC", DGB.toDecValue(x.degree).sqrt());
    }
};

export const log10: OperationFn = (x: InternalNumber) =>
    new InternalNumber("DEC", Decimal.log10(getDecValue(x)));
export const ln: OperationFn = (x: InternalNumber) =>
    new InternalNumber("DEC", Decimal.ln(getDecValue(x)));
export const exp10: OperationFn = (x: InternalNumber) =>
    new InternalNumber("DEC", Decimal.pow(10, getDecValue(x)));
export const exp: OperationFn = (x: InternalNumber) =>
    new InternalNumber("DEC", Decimal.exp(getDecValue(x)));

export const sin: OperationFn = (x: InternalNumber) =>
    new InternalNumber(
        "DEC",
        Decimal.sin(DC.fromCurrentDegreeToRad(getDecValue(x)))
    );
export const cos: OperationFn = (x: InternalNumber) =>
    new InternalNumber(
        "DEC",
        Decimal.cos(DC.fromCurrentDegreeToRad(getDecValue(x)))
    );
export const tan: OperationFn = (x: InternalNumber) =>
    new InternalNumber(
        "DEC",
        Decimal.tan(DC.fromCurrentDegreeToRad(getDecValue(x)))
    );

export const sinh: OperationFn = (x: InternalNumber) =>
    new InternalNumber("DEC", Decimal.sinh(getDecValue(x)));
export const cosh: OperationFn = (x: InternalNumber) =>
    new InternalNumber("DEC", Decimal.cosh(getDecValue(x)));
export const tanh: OperationFn = (x: InternalNumber) =>
    new InternalNumber("DEC", Decimal.tanh(getDecValue(x)));

export const asin: OperationFn = (x: InternalNumber) =>
    new InternalNumber(
        "DEC",
        DC.toCurrentDegreeFromRad(Decimal.asin(getDecValue(x)))
    );
export const acos: OperationFn = (x: InternalNumber) =>
    new InternalNumber(
        "DEC",
        DC.toCurrentDegreeFromRad(Decimal.acos(getDecValue(x)))
    );
export const atan: OperationFn = (x: InternalNumber) =>
    new InternalNumber(
        "DEC",
        DC.toCurrentDegreeFromRad(Decimal.atan(getDecValue(x)))
    );

export const fact: OperationFn = (x: InternalNumber) =>
    new InternalNumber("DEC", FACT.fact(getDecValue(x)));

export const inv: OperationFn = (x: InternalNumber) => {
    switch (x.type) {
        case "DEC":
            return new InternalNumber("FRAC", DB.divDec(new Decimal(1), x.dec));
        case "FRAC":
            return new InternalNumber("FRAC", FB.invert(x.frac));
        case "DEGREE":
            return new InternalNumber(
                "FRAC",
                DB.divDegree(new Decimal(1), x.degree)
            );
    }
};
export const cube: OperationFn = (x: InternalNumber) => {
    switch (x.type) {
        case "DEC":
            return new InternalNumber("DEC", x.dec.pow(3));
        case "FRAC":
            return new InternalNumber(
                "FRAC",
                FB.intPower(x.frac, new Decimal(3))
            );
        case "DEGREE":
            return new InternalNumber("DEC", DGB.toDecValue(x.degree).pow(3));
    }
};
export const sqr: OperationFn = (x: InternalNumber) => {
    switch (x.type) {
        case "DEC":
            return new InternalNumber("DEC", x.dec.pow(2));
        case "FRAC":
            return new InternalNumber(
                "FRAC",
                FB.intPower(x.frac, new Decimal(2))
            );
        case "DEGREE":
            return new InternalNumber("DEC", DGB.toDecValue(x.degree).pow(2));
    }
};
export const percent: OperationFn = (x: InternalNumber) => {
    switch (x.type) {
        case "DEC":
            return new InternalNumber("DEC", x.dec.div(100));
        case "FRAC":
            return new InternalNumber(
                "FRAC",
                FB.divDec(x.frac, new Decimal(100))
            );
        case "DEGREE":
            return new InternalNumber("DEC", DGB.toDecValue(x.degree).div(100));
    }
};

export const fromD: OperationFn = (x: InternalNumber) => {
    switch (calculatorState.drgMode) {
        case "D":
            return x;
        case "R":
            return new InternalNumber("DEC", DC.degreeToRad(getDecValue(x)));
        case "G":
            return new InternalNumber(
                "FRAC",
                FB.mulFrac(getFracValue(x), {
                    u: new Decimal(10),
                    d: new Decimal(9)
                })
            );
    }
};

export const fromR: OperationFn = (x: InternalNumber) => {
    switch (calculatorState.drgMode) {
        case "D":
            return new InternalNumber("DEC", DC.radToDegree(getDecValue(x)));
        case "R":
            return x;
        case "G":
            return new InternalNumber("DEC", DC.radToGrade(getDecValue(x)));
    }
};

export const fromG: OperationFn = (x: InternalNumber) => {
    switch (calculatorState.drgMode) {
        case "D":
            return new InternalNumber(
                "FRAC",
                FB.mulFrac(getFracValue(x), {
                    u: new Decimal(9),
                    d: new Decimal(10)
                })
            );
        case "R":
            return new InternalNumber("DEC", DC.gradeToRad(getDecValue(x)));
        case "G":
            return x;
    }
};

export const nCr: OperationFn = (x: InternalNumber, y: InternalNumber) =>
    new InternalNumber("DEC", NCRNPR.nCr(getDecValue(x), getDecValue(y)));
export const nPr: OperationFn = (x: InternalNumber, y: InternalNumber) =>
    new InternalNumber("DEC", NCRNPR.nPr(getDecValue(x), getDecValue(y)));

export const pow: OperationFn = (x: InternalNumber, y: InternalNumber) => {
    const yDec = getDecValue(y);

    switch (x.type) {
        case "DEC":
            return new InternalNumber("DEC", x.dec.pow(yDec));
        case "FRAC":
            if (yDec.isInteger()) {
                return new InternalNumber("FRAC", FB.intPower(x.frac, yDec));
            }
            return new InternalNumber("DEC", FB.toDecValue(x.frac).pow(yDec));
        case "DEGREE":
            return new InternalNumber(
                "DEC",
                DGB.toDecValue(x.degree).pow(yDec)
            );
    }
};

export const root: OperationFn = (x: InternalNumber, y: InternalNumber) => {
    const xDec = getDecValue(x);

    if (isZeroPositive(y)) {
        if (xDec.eq(2)) {
            return sqrt(y);
        }

        if (xDec.eq(3)) {
            return cbrt(y);
        }

        return pow(y, inv(x));
    } else {
        const yNeg = negative(y);

        return negative(root(x, yNeg));
    }
};

export const add: OperationFn = (x: InternalNumber, y: InternalNumber) => {
    switch (x.type) {
        case "DEC":
            switch (y.type) {
                case "DEC":
                    return new InternalNumber("DEC", x.dec.add(y.dec));
                case "DEGREE":
                    return new InternalNumber(
                        "DEC",
                        DB.addDegree(x.dec, y.degree)
                    );
                case "FRAC":
                    return new InternalNumber("FRAC", FB.addDec(y.frac, x.dec));
            }
        case "DEGREE":
            switch (y.type) {
                case "DEC":
                    return new InternalNumber(
                        "DEC",
                        DB.addDegree(y.dec, x.degree)
                    );
                case "DEGREE":
                    return new InternalNumber(
                        "DEGREE",
                        DGB.addDegree(x.degree, y.degree)
                    );
                case "FRAC":
                    return new InternalNumber(
                        "FRAC",
                        FB.addDegree(y.frac, x.degree)
                    );
            }
        case "FRAC":
            switch (y.type) {
                case "DEC":
                    return new InternalNumber("FRAC", FB.addDec(x.frac, y.dec));
                case "DEGREE":
                    return new InternalNumber(
                        "FRAC",
                        FB.addDegree(x.frac, y.degree)
                    );
                case "FRAC":
                    return new InternalNumber(
                        "FRAC",
                        FB.addFrac(x.frac, y.frac)
                    );
            }
    }
};

export const sub: OperationFn = (x: InternalNumber, y: InternalNumber) => {
    switch (x.type) {
        case "DEC":
            switch (y.type) {
                case "DEC":
                    return new InternalNumber("DEC", x.dec.sub(y.dec));
                case "DEGREE":
                    return new InternalNumber(
                        "DEC",
                        DB.subDegree(x.dec, y.degree)
                    );
                case "FRAC":
                    return new InternalNumber(
                        "FRAC",
                        DB.subFrac(x.dec, y.frac)
                    );
            }
        case "DEGREE":
            switch (y.type) {
                case "DEC":
                    return new InternalNumber(
                        "DEC",
                        DGB.subDec(x.degree, y.dec)
                    );
                case "DEGREE":
                    return new InternalNumber(
                        "DEGREE",
                        DGB.subDegree(x.degree, y.degree)
                    );
                case "FRAC":
                    return new InternalNumber(
                        "FRAC",
                        DGB.subFrac(x.degree, y.frac)
                    );
            }
        case "FRAC":
            switch (y.type) {
                case "DEC":
                    return new InternalNumber("FRAC", FB.subDec(x.frac, y.dec));
                case "DEGREE":
                    return new InternalNumber(
                        "FRAC",
                        FB.subDegree(x.frac, y.degree)
                    );
                case "FRAC":
                    return new InternalNumber(
                        "FRAC",
                        FB.subFrac(x.frac, y.frac)
                    );
            }
    }
};

export const mul: OperationFn = (x: InternalNumber, y: InternalNumber) => {
    switch (x.type) {
        case "DEC":
            switch (y.type) {
                case "DEC":
                    return new InternalNumber("DEC", x.dec.mul(y.dec));
                case "DEGREE":
                    return new InternalNumber(
                        "DEGREE",
                        DB.mulDegree(x.dec, y.degree)
                    );
                case "FRAC":
                    return new InternalNumber("FRAC", FB.mulDec(y.frac, x.dec));
            }
        case "DEGREE":
            switch (y.type) {
                case "DEC":
                    return new InternalNumber(
                        "DEGREE",
                        DB.mulDegree(y.dec, x.degree)
                    );
                case "DEGREE":
                    return new InternalNumber(
                        "DEC",
                        DGB.mulDegree(x.degree, y.degree)
                    );
                case "FRAC":
                    return new InternalNumber(
                        "FRAC",
                        FB.mulDegree(y.frac, x.degree)
                    );
            }
        case "FRAC":
            switch (y.type) {
                case "DEC":
                    return new InternalNumber("FRAC", FB.mulDec(x.frac, y.dec));
                case "DEGREE":
                    return new InternalNumber(
                        "FRAC",
                        FB.mulDegree(x.frac, y.degree)
                    );
                case "FRAC":
                    return new InternalNumber(
                        "FRAC",
                        FB.mulFrac(x.frac, y.frac)
                    );
            }
    }
};

export const div: OperationFn = (x: InternalNumber, y: InternalNumber) => {
    switch (x.type) {
        case "DEC":
            switch (y.type) {
                case "DEC":
                    return new InternalNumber("FRAC", DB.divDec(x.dec, y.dec));
                case "DEGREE":
                    return new InternalNumber(
                        "FRAC",
                        DB.divDegree(x.dec, y.degree)
                    );
                case "FRAC":
                    return new InternalNumber(
                        "FRAC",
                        DB.divFrac(x.dec, y.frac)
                    );
            }
        case "DEGREE":
            switch (y.type) {
                case "DEC":
                    return new InternalNumber(
                        "FRAC",
                        DGB.divDec(x.degree, y.dec)
                    );
                case "DEGREE":
                    return new InternalNumber(
                        "FRAC",
                        DGB.divDegree(x.degree, y.degree)
                    );
                case "FRAC":
                    return new InternalNumber(
                        "FRAC",
                        DGB.divFrac(x.degree, y.frac)
                    );
            }
        case "FRAC":
            switch (y.type) {
                case "DEC":
                    return new InternalNumber("FRAC", FB.divDec(x.frac, y.dec));
                case "DEGREE":
                    return new InternalNumber(
                        "FRAC",
                        FB.divDegree(x.frac, y.degree)
                    );
                case "FRAC":
                    return new InternalNumber(
                        "FRAC",
                        FB.divFrac(x.frac, y.frac)
                    );
            }
    }
};

export const pol: OperationFn = (x: InternalNumber, y: InternalNumber) => {
    if (isZero(x)) {
        if (isZero(y)) {
            calculatorMemory.E = new InternalNumber("DEC", new Decimal(0));
            calculatorMemory.F = new InternalNumber("DEC", new Decimal(0));
            return new InternalNumber("DEC", new Decimal(0));
        } else if (isPositive(y)) {
            calculatorMemory.E = y;
            calculatorMemory.F = acos(
                new InternalNumber("DEC", new Decimal(0))
            );
            return y;
        } else {
            const negY = negative(y);
            calculatorMemory.E = negY;
            calculatorMemory.F = negative(
                acos(new InternalNumber("DEC", new Decimal(0)))
            );
            return negY;
        }
    }

    if (isNegative(x) && isZero(y)) {
        const negX = negative(x);
        calculatorMemory.E = negX;
        calculatorMemory.F = acos(new InternalNumber("DEC", new Decimal(-1)));
        return negX;
    }

    const dis = sqrt(add(sqr(x), sqr(y)));
    const angle = atan(div(y, x));

    calculatorMemory.E = dis;
    calculatorMemory.F = angle;
    return dis;
};

export const rec: OperationFn = (x: InternalNumber, y: InternalNumber) => {
    // coord x
    calculatorMemory.E = mul(x, cos(y));
    // coord y
    calculatorMemory.F = mul(x, sin(y));
    return calculatorMemory.E;
};

export const createDegree: OperationFn = (
    d: InternalNumber,
    m: InternalNumber,
    s: InternalNumber
) => {
    const neg = isNegative(d);
    return new InternalNumber(
        "DEGREE",
        DGB.fromDmsNeg(
            getDecValue(d).abs(),
            getDecValue(m),
            getDecValue(s),
            neg
        )
    );
};

// export const createFrac: OperationFn
//     = (a: InternalNumber, b: InternalNumber, c: InternalNumber) => {
//         // follow Casio behaviour: odd negatives make result negative
//         let isResultNegative: boolean = false;

//         // first make all components non-negative
//         if (isNegative(a)) {
//             isResultNegative = !isResultNegative;
//             a = negative(a);
//         }

//         if (isNegative(b)) {
//             isResultNegative = !isResultNegative;
//             b = negative(b);
//         }

//         if (isNegative(c)) {
//             isResultNegative = !isResultNegative;
//             c = negative(c);
//         }

//         const result: FracValue = FB.addFrac(getFracValue(a),
//             FB.divFrac(getFracValue(b), getFracValue(c)));

//         if (isResultNegative) {
//             result.u = result.u.neg();
//         }

//         return new InternalNumber("FRAC", result);
//     }
