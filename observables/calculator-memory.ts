import { makeAutoObservable } from "mobx";

class CalculatorMemory {
    constructor() {
        makeAutoObservable(this);
    }

    
}

export default new CalculatorMemory();