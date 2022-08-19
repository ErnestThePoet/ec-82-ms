import Decimal from "decimal.js";
import type { FracValue, DegreeValue } from "./types";

type InternalNumberType = "DEC" | "FRAC" | "DEGREE";

interface StorageFracValue { u: string; d: string; }
interface StorageDegreeValue { neg: boolean; d: string; m: string; s: string }

interface StorageObject{
    type: InternalNumberType;
    value: string
    | StorageFracValue
    | StorageDegreeValue;
}

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
        this.numberType = type;
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
                if (this.decValue.abs().lt("1000_000_000")) {
                    return this.decValue.toString();
                }
                else {
                    return this.decValue.toExponential(9);
                }
            case "FRAC":
                return this.fracValue.u.toString() + "/" + this.fracValue.d.toString();
            case "DEGREE":
                return `${this.degreeValue.neg ? "-" : ""}${this.degreeValue.d.toString()}°`
                    + `${this.degreeValue.m.toString()}'`
                    + `${this.degreeValue.s.toString()}"`;
        }
    }

    toStorageObjectString(): string{
        const storageObject: StorageObject = {
            type: this.numberType,
            value: ""
        };

        switch (this.numberType) {
            case "DEC":
                storageObject.value = this.decValue.toString();
                break;
            case "FRAC":
                storageObject.value = {
                    u: this.fracValue.u.toString(),
                    d: this.fracValue.d.toString()
                };
                break;
            case "DEGREE":
                storageObject.value = {
                    neg: this.degreeValue.neg,
                    d: this.degreeValue.d.toString(),
                    m: this.degreeValue.m.toString(),
                    s: this.degreeValue.s.toString(),
                };
                break;
        }

        return JSON.stringify(storageObject);
    }
}

export function fromStorageObjectString(str: string): InternalNumber{
    const storageObject:StorageObject = JSON.parse(str);

    switch (storageObject.type) {
        case "DEC":
            return new InternalNumber("DEC", new Decimal(storageObject.value as string));
        case "FRAC":
            return new InternalNumber("FRAC", {
                u: new Decimal((<StorageFracValue>storageObject.value).u),
                d: new Decimal((<StorageFracValue>storageObject.value).d),
            });
        case "DEGREE":
            return new InternalNumber("DEGREE", {
                neg: (<StorageDegreeValue>storageObject.value).neg,
                d: new Decimal((<StorageDegreeValue>storageObject.value).d),
                m: new Decimal((<StorageDegreeValue>storageObject.value).m),
                s: new Decimal((<StorageDegreeValue>storageObject.value).s),
            });
    }
}