import Decimal from "decimal.js";
import { InternalNumber } from "../modules/calc-core/objs/internal-number";

class CalculatorMemory {
    ans_: InternalNumber = new InternalNumber("DEC", new Decimal(0));
    A_: InternalNumber = new InternalNumber("DEC", new Decimal(0));
    B_: InternalNumber = new InternalNumber("DEC", new Decimal(0));
    C_: InternalNumber = new InternalNumber("DEC", new Decimal(0));
    D_: InternalNumber = new InternalNumber("DEC", new Decimal(0));
    E_: InternalNumber = new InternalNumber("DEC", new Decimal(0));
    F_: InternalNumber = new InternalNumber("DEC", new Decimal(0));
    X_: InternalNumber = new InternalNumber("DEC", new Decimal(0));
    Y_: InternalNumber = new InternalNumber("DEC", new Decimal(0));
    M_: InternalNumber = new InternalNumber("DEC", new Decimal(0));

    get ans(): InternalNumber{
        return this.ans_;
    }
    get A(): InternalNumber {
        return this.A_;
    }
    get B(): InternalNumber {
        return this.B_;
    }
    get C(): InternalNumber {
        return this.C_;
    }
    get D(): InternalNumber {
        return this.D_;
    }
    get E(): InternalNumber {
        return this.E_;
    }
    get F(): InternalNumber {
        return this.F_;
    }
    get X(): InternalNumber {
        return this.X_;
    }
    get Y(): InternalNumber {
        return this.Y_;
    }
    get M(): InternalNumber {
        return this.M_;
    }

    set ans(value: InternalNumber) {
        this.ans_ = value;
    }
    set A(value: InternalNumber) {
        this.A_ = value;
    }
    set B(value: InternalNumber) {
        this.B_ = value;
    }
    set C(value: InternalNumber) {
        this.C_ = value;
    }
    set D(value: InternalNumber) {
        this.D_ = value;
    }
    set E(value: InternalNumber) {
        this.E_ = value;
    }
    set F(value: InternalNumber) {
        this.F_ = value;
    }
    set X(value: InternalNumber) {
        this.X_ = value;
    }
    set Y(value: InternalNumber) {
        this.Y_ = value;
    }
    set M(value: InternalNumber) {
        this.M_ = value;
    }
}

export default new CalculatorMemory();