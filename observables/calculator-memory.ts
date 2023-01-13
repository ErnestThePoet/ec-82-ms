import Decimal from "decimal.js";
import {
    InternalNumber,
    fromStorageObjectString
} from "../modules/calc-core/objs/internal-number";

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

    get ans(): InternalNumber {
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
        localStorage.setItem("memAns", this.ans_.toStorageObjectString());
    }
    set A(value: InternalNumber) {
        this.A_ = value;
        localStorage.setItem("memA", this.A_.toStorageObjectString());
    }
    set B(value: InternalNumber) {
        this.B_ = value;
        localStorage.setItem("memB", this.B_.toStorageObjectString());
    }
    set C(value: InternalNumber) {
        this.C_ = value;
        localStorage.setItem("memC", this.C_.toStorageObjectString());
    }
    set D(value: InternalNumber) {
        this.D_ = value;
        localStorage.setItem("memD", this.D_.toStorageObjectString());
    }
    set E(value: InternalNumber) {
        this.E_ = value;
        localStorage.setItem("memE", this.E_.toStorageObjectString());
    }
    set F(value: InternalNumber) {
        this.F_ = value;
        localStorage.setItem("memF", this.F_.toStorageObjectString());
    }
    set X(value: InternalNumber) {
        this.X_ = value;
        localStorage.setItem("memX", this.X_.toStorageObjectString());
    }
    set Y(value: InternalNumber) {
        this.Y_ = value;
        localStorage.setItem("memY", this.Y_.toStorageObjectString());
    }
    set M(value: InternalNumber) {
        this.M_ = value;
        localStorage.setItem("memM", this.M_.toStorageObjectString());
    }

    clear() {
        this.ans = new InternalNumber("DEC", new Decimal(0));
        this.A = new InternalNumber("DEC", new Decimal(0));
        this.B = new InternalNumber("DEC", new Decimal(0));
        this.C = new InternalNumber("DEC", new Decimal(0));
        this.D = new InternalNumber("DEC", new Decimal(0));
        this.E = new InternalNumber("DEC", new Decimal(0));
        this.F = new InternalNumber("DEC", new Decimal(0));
        this.X = new InternalNumber("DEC", new Decimal(0));
        this.Y = new InternalNumber("DEC", new Decimal(0));
        this.M = new InternalNumber("DEC", new Decimal(0));
    }

    loadFromLocalStorage() {
        let key = "memAns";
        if (localStorage.getItem(key) !== null) {
            this.ans_ = fromStorageObjectString(localStorage.getItem(key)!);
        } else {
            this.ans = new InternalNumber("DEC", new Decimal(0));
        }

        key = "memA";
        if (localStorage.getItem(key) !== null) {
            this.A_ = fromStorageObjectString(localStorage.getItem(key)!);
        } else {
            this.A = new InternalNumber("DEC", new Decimal(0));
        }

        key = "memB";
        if (localStorage.getItem(key) !== null) {
            this.B_ = fromStorageObjectString(localStorage.getItem(key)!);
        } else {
            this.B = new InternalNumber("DEC", new Decimal(0));
        }

        key = "memC";
        if (localStorage.getItem(key) !== null) {
            this.C_ = fromStorageObjectString(localStorage.getItem(key)!);
        } else {
            this.C = new InternalNumber("DEC", new Decimal(0));
        }

        key = "memD";
        if (localStorage.getItem(key) !== null) {
            this.D_ = fromStorageObjectString(localStorage.getItem(key)!);
        } else {
            this.D = new InternalNumber("DEC", new Decimal(0));
        }

        key = "memE";
        if (localStorage.getItem(key) !== null) {
            this.E_ = fromStorageObjectString(localStorage.getItem(key)!);
        } else {
            this.E = new InternalNumber("DEC", new Decimal(0));
        }

        key = "memF";
        if (localStorage.getItem(key) !== null) {
            this.F_ = fromStorageObjectString(localStorage.getItem(key)!);
        } else {
            this.F = new InternalNumber("DEC", new Decimal(0));
        }

        key = "memX";
        if (localStorage.getItem(key) !== null) {
            this.X_ = fromStorageObjectString(localStorage.getItem(key)!);
        } else {
            this.X = new InternalNumber("DEC", new Decimal(0));
        }

        key = "memY";
        if (localStorage.getItem(key) !== null) {
            this.Y_ = fromStorageObjectString(localStorage.getItem(key)!);
        } else {
            this.Y = new InternalNumber("DEC", new Decimal(0));
        }

        key = "memM";
        if (localStorage.getItem(key) !== null) {
            this.M_ = fromStorageObjectString(localStorage.getItem(key)!);
        } else {
            this.M = new InternalNumber("DEC", new Decimal(0));
        }
    }
}

export default new CalculatorMemory();
