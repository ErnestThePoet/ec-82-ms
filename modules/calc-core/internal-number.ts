import type { FracValue, DegreeValue } from "./types";

type InternalNumberType = "DEC" | "FRAC" | "DEGREE";

export class InternalNumber{
    // an InternalNumber object only maintains the value of its current type.
    private numberType: InternalNumberType = "DEC";

    private decValue: number = 0;

    // if evaluates to integer,
    // or if u or d exceeds Number.MAX_SAFE_INTEGER,
    // frac value is still preserved.
    private fracValue:FracValue = {
        u: 0,
        d: 1
    };

    private degreeValue:DegreeValue = {
        d: 0,
        m: 0,
        s: 0,
        neg:false
    };

    constructor(type: InternalNumberType, value: number | FracValue | DegreeValue) {
        switch (type) {
            case "DEC":
                this.decValue = <number>value;
                break;
            case "FRAC":
                Object.assign(this.fracValue, <FracValue>value);
                break;
            case "DEGREE":
                Object.assign(this.degreeValue, <DegreeValue>value);
                break;
        }
    }

    get type():InternalNumberType {
        return this.numberType;
    }
}