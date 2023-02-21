import Decimal from "decimal.js";
import calculatorState from "../../../observables/calculator-state";
import stringsRes from "../../../observables/strings-res";
import { InternalNumber } from "./internal-number";
import { PI } from "../../math/constants";
import {
    getDecValue,
    isNegative,
    isZero,
    isPositive,
    isZeroPositive,
    isNonNegativeInteger,
    isOdd,
    div
} from "../../math/internal-number-math";
import type { CheckFn } from "./types";

const gzCheck: (funcName: string) => CheckFn =
    (funcName: string) =>
    (...operands: InternalNumber[]) => ({
        ok: isPositive(operands[0]),
        msg: funcName + stringsRes.strings.CALC_CK_ERROR_MSGS.GOT_NOT_POSITIVE
    });

interface CheckFns {
    alwaysTrue: CheckFn;
    ///// taking 1 arg
    sqrtCheck: CheckFn; // >=0
    logCheck: CheckFn; // >0
    lnCheck: CheckFn; // >0
    tanCheck: CheckFn; // !=odd multiples of pi/2
    asinAcosCheck: CheckFn; // -1<=x<=1
    acoshCheck: CheckFn; // >=1
    atanhCheck: CheckFn; // -1<x<1
    factCheck: CheckFn; // >=0, integer
    invCheck: CheckFn; // !=0
    ///// taking 2 args
    nCrnPrCheck: CheckFn; // both integer, both >=0 and x>=y
    powCheck: CheckFn; // when x<0, y can only be integer
    rootCheck: CheckFn; // x!=0; when y<0, x can only be odd integer
    divCheck: CheckFn; // y!=0
    recCheck: CheckFn; // x>=0

    createDegreeCheck: CheckFn; // m and s non-negative
    createFracCheck: CheckFn; // d!=0
}

export const CHECK_FNS: CheckFns = {
    alwaysTrue: () => ({ ok: true, msg: "" }),
    sqrtCheck: (...operands: InternalNumber[]) => ({
        ok: isZeroPositive(operands[0]),
        msg: stringsRes.strings.CALC_CK_ERROR_MSGS.SQRT
    }),
    logCheck: gzCheck("log() "),
    lnCheck: gzCheck("ln() "),
    tanCheck: (...operands: InternalNumber[]) => {
        let halfPi = new Decimal(90);

        switch (calculatorState.drgMode) {
            case "R":
                halfPi = new Decimal(PI).div(2);
                break;
            case "G":
                halfPi = new Decimal(50);
                break;
        }

        return {
            ok: !isOdd(div(operands[0], new InternalNumber("DEC", halfPi))),
            msg: stringsRes.strings.CALC_CK_ERROR_MSGS.TAN
        };
    },
    asinAcosCheck: (...operands: InternalNumber[]) => {
        const decValue = getDecValue(operands[0]);
        return {
            ok: decValue.gte(-1) && decValue.lte(1),
            msg: stringsRes.strings.CALC_CK_ERROR_MSGS.ASINACOS
        };
    },
    acoshCheck: (...operands: InternalNumber[]) => {
        const decValue = getDecValue(operands[0]);
        return {
            ok: decValue.gte(1),
            msg: stringsRes.strings.CALC_CK_ERROR_MSGS.ACOSH
        };
    },
    atanhCheck: (...operands: InternalNumber[]) => {
        const decValue = getDecValue(operands[0]);
        return {
            ok: decValue.gt(-1) && decValue.lt(1),
            msg: stringsRes.strings.CALC_CK_ERROR_MSGS.ATANH
        };
    },
    factCheck: (...operands: InternalNumber[]) => ({
        ok: isNonNegativeInteger(operands[0]),
        msg: stringsRes.strings.CALC_CK_ERROR_MSGS.FACT
    }),
    invCheck: (...operands: InternalNumber[]) => ({
        ok: !isZero(operands[0]),
        msg: stringsRes.strings.CALC_CK_ERROR_MSGS.INV
    }),
    nCrnPrCheck: (...operands: InternalNumber[]) => {
        if (
            !isNonNegativeInteger(operands[0]) ||
            !isNonNegativeInteger(operands[1])
        ) {
            return {
                ok: false,
                msg: stringsRes.strings.CALC_CK_ERROR_MSGS.COMBINE_NOT_NNINT
            };
        }

        if (getDecValue(operands[0]).lt(getDecValue(operands[1]))) {
            return {
                ok: false,
                msg: stringsRes.strings.CALC_CK_ERROR_MSGS.COMBINE_X_LT_Y
            };
        }

        return {
            ok: true,
            msg: ""
        };
    },
    powCheck: (...operands: InternalNumber[]) => ({
        ok: isZeroPositive(operands[0]) || getDecValue(operands[1]).isInteger(),
        msg: stringsRes.strings.CALC_CK_ERROR_MSGS.POW
    }),
    rootCheck: (...operands: InternalNumber[]) => {
        if (isZero(operands[0])) {
            return {
                ok: false,
                msg: stringsRes.strings.CALC_CK_ERROR_MSGS.ROOT_X_ZERO
            };
        }

        if (isNegative(operands[1]) && !isOdd(operands[0])) {
            return {
                ok: false,
                msg: stringsRes.strings.CALC_CK_ERROR_MSGS
                    .ROOT_Y_NEG_X_NOT_ODD_INT
            };
        }

        return {
            ok: true,
            msg: ""
        };
    },
    divCheck: (...operands: InternalNumber[]) => ({
        ok: !isZero(operands[1]),
        msg: stringsRes.strings.CALC_CK_ERROR_MSGS.DIV
    }),
    recCheck: (...operands: InternalNumber[]) => ({
        ok: isZeroPositive(operands[0]),
        msg: stringsRes.strings.CALC_CK_ERROR_MSGS.REC
    }),

    createDegreeCheck: (...operands: InternalNumber[]) => ({
        ok: isZeroPositive(operands[1]) && isZeroPositive(operands[2]),
        msg: stringsRes.strings.CALC_CK_ERROR_MSGS.CREATE_DEGREE
    }),
    createFracCheck: (...operands: InternalNumber[]) => ({
        ok: !isZero(operands[1]),
        msg: stringsRes.strings.CALC_CK_ERROR_MSGS.CREATE_FRAC
    })
};
