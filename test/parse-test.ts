import { KeyEntry, KEY_ENTRIES } from "../modules/calc-core/objs/key-entry";
import { Operator } from "../modules/calc-core/objs/operators";
import { preprocess } from "../modules/calc-core/preprocessing";
import { parse } from "../modules/calc-core/parse";
import { InternalNumber } from "../modules/calc-core/objs/internal-number";

function test() {
    // 3*(5+3sin(-5.5--6
    const ke1: KeyEntry[] = [
        KEY_ENTRIES.n3,
        KEY_ENTRIES.mul,
        KEY_ENTRIES.lBracket,
        KEY_ENTRIES.n5,
        KEY_ENTRIES.add,
        KEY_ENTRIES.n3,
        KEY_ENTRIES.sin,
        KEY_ENTRIES.sub,
        KEY_ENTRIES.n5,
        KEY_ENTRIES.nDot,
        KEY_ENTRIES.n5,
        KEY_ENTRIES.sub,
        KEY_ENTRIES.sub,
        KEY_ENTRIES.n6
    ];

    preprocess(ke1);

    console.log(ke1.map(x => x.id).join(" "));

    const pr1 = parse(ke1);

    if (pr1.success) {
        console.log(pr1.lexems.map(
            x => x.type === "NBR"
                ? (<InternalNumber>x.obj).toString()
                : (<Operator>x.obj).id).join(" "));
    }
    else {
        console.log(pr1.msg);
    }
}

test();