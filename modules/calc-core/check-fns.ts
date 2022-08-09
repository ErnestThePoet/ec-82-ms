import calculatorState from "../../observables/calculator-state";
import stringsRes from "../../observables/strings-res";
import { isInteger,isNonNegativeInteger, isOdd } from "./utils";

export interface CheckFn{
    (...operands: number[]): { ok: boolean, msg: string };
}

const gzCheck: (funcName: string) => CheckFn
    = (funcName: string) => (
    (...operands: number[]) => (
        {
            ok: operands[0] > 0,
            msg: funcName+stringsRes.strings.ERROR_MSGS.GOT_NOT_POSITIVE
        }
    )
);

interface CheckFns{
    alwaysTrue: CheckFn;
    ///// taking 1 arg
    sqrtCheck: CheckFn; // >=0
    logCheck: CheckFn; // >0
    lnCheck: CheckFn; // >0
    tanCheck: CheckFn; // !=odd multiples of pi/2
    asinAcosCheck: CheckFn; // -1<=x<=1
    factCheck: CheckFn; // >=0, integer
    ///// taking 2 args
    combineCheck: CheckFn; // both integer, both >=0 and x>=y
    powCheck: CheckFn; // when x<0, y can only be integer
    rootCheck: CheckFn; // x!=0; when y<0, x can only be odd integer
    divCheck: CheckFn; // y!=0
    recCheck: CheckFn; // x>=0
};

export const CHECK_FNS: CheckFns = {
    alwaysTrue: () => ({ ok: true, msg: "" }),
    sqrtCheck: (...operands: number[]) => ({
        ok: operands[0] >= 0,
        msg: stringsRes.strings.ERROR_MSGS.SQRT
    }),
    logCheck: gzCheck("log()"),
    lnCheck: gzCheck("ln()"),
    tanCheck: (...operands: number[]) => {
        let halfPi = 90;

        switch (calculatorState.drgMode) {
            case "R":
                halfPi = Math.PI / 2;
                break;
            case "G":
                halfPi = 50;
                break;
        }

        return {
            ok: !isOdd(operands[0] / halfPi),
            msg: stringsRes.strings.ERROR_MSGS.TAN
        }
    },
    asinAcosCheck: (...operands: number[]) => ({
        ok: -1 <= operands[0] && operands[0] <= 1,
        msg: stringsRes.strings.ERROR_MSGS.ASINACOS
    }),
    factCheck: (...operands: number[]) => ({
        ok: isNonNegativeInteger(operands[0]),
        msg: stringsRes.strings.ERROR_MSGS.FACT
    }),
    combineCheck: (...operands: number[]) => {
        if (!isNonNegativeInteger(operands[0])
            || !isNonNegativeInteger(operands[1])) {
            return {
                ok: false,
                msg: stringsRes.strings.ERROR_MSGS.COMBINE_NOT_NNINT
            }
        }
        
        if (operands[0] < operands[1]) {
            return {
                ok: false,
                msg: stringsRes.strings.ERROR_MSGS.COMBINE_X_LT_Y
            }
        }

        return {
            ok: true,
            msg: ""
        }
    },
    powCheck: (...operands: number[]) => ({
        ok: operands[0] >= 0 || isInteger(operands[1]),
        msg: stringsRes.strings.ERROR_MSGS.POW
    }),
    rootCheck: (...operands: number[]) => {
        if (operands[0] === 0) {
            return {
                ok: false,
                msg: stringsRes.strings.ERROR_MSGS.ROOT_X_ZERO
            }
        }
        
        if (operands[1] < 0 && !isOdd(operands[0])) {
            return {
                ok: false,
                msg: stringsRes.strings.ERROR_MSGS.ROOT_Y_NEG_X_NOT_ODD_INT
            }
        }
        
        return {
            ok: true,
            msg: ""
        }
    },
    divCheck: (...operands: number[]) => ({
        ok: operands[1] !== 0,
        msg: stringsRes.strings.ERROR_MSGS.DIV
    }),
    recCheck: (...operands: number[]) => ({
        ok: operands[0] >= 0,
        msg: stringsRes.strings.ERROR_MSGS.REC
    })
};
