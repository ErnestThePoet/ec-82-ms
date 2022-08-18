import Decimal from "decimal.js";
import type { FracValue, DegreeValue } from "./types";

type InternalNumberType = "DEC" | "FRAC" | "DEGREE";

// Immutable
export class InternalNumber{
    // an InternalNumber object only maintains the value of its current type.
    private numberType: InternalNumberType = "DEC";

    private decValue: Decimal = new Decimal(0);

    // if evaluates to integer,
    // or if u or d exceeds Number.MAX_SAFE_INTEGER,
    // frac value is still preserved.
    private fracValue:FracValue = {
        u: new Decimal(0),
        d: new Decimal(1)
    };

    private degreeValue:DegreeValue = {
        d: new Decimal(0),
        m: new Decimal(0),
        s: new Decimal(0),
        neg:false
    };

    constructor(type: InternalNumberType, value: Decimal | FracValue | DegreeValue) {
        switch (type) {
            case "DEC":
                this.decValue = <Decimal>value;
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

    get dec(): Decimal{
        return this.decValue;
    }

    get frac(): FracValue{
        return this.fracValue;
    }

    get degree(): DegreeValue{
        return this.degreeValue;
    }

    toString(): string{
        switch (this.numberType) {
            case "DEC":
                return this.decValue.toString();
            case "FRAC":
                return this.fracValue.u.toString() + "/" + this.fracValue.d.toString();
            case "DEGREE":
                return `${this.degreeValue.neg ? "-" : ""}${this.degreeValue.d.toString()}°`
                    + `${this.degreeValue.m.toString()}'`
                    + `${this.degreeValue.s.toString()}"`;
        }
    }
}