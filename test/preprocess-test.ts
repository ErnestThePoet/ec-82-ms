import { KeyEntry, KEY_ENTRIES } from "../modules/calc-core/objs/key-entry";
import { preprocess } from "../modules/calc-core/preprocessing";

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

    console.log(preprocess(ke1).map(x => x.id).join(" "));
}

test();