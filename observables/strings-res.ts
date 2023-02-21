import { makeAutoObservable } from "mobx";

const STRINGS_ZH_CN_ERROR_PREFIXES = {
    PARSE: "语法解析错误: ",
    CALC: "计算错误: "
};

const STRINGS_ZH_CN = {
    APP_TITLE: "EC-82MS Web科学计算器",
    DEG: "角度",
    RAD: "弧度",
    GRA: "斜度",
    CLEAR: ["清除存储", "清除模式", "清除全部"],
    PARSE_ERROR_MSGS: {
        MISSING_L_BRACKET: STRINGS_ZH_CN_ERROR_PREFIXES.PARSE + "缺少左括号 (",
        MISSING_R_BRACKET: STRINGS_ZH_CN_ERROR_PREFIXES.PARSE + "缺少右括号 )",
        UNEXPECTED_ENTRY:
            STRINGS_ZH_CN_ERROR_PREFIXES.PARSE + "不合法的按键输入",
        INSUFFICENT_OPERANDS:
            STRINGS_ZH_CN_ERROR_PREFIXES.PARSE + "操作数数量不足",
        MISSING_COMMA: STRINGS_ZH_CN_ERROR_PREFIXES.PARSE + "缺少逗号 ,",
        TOO_MANY_DEGREE_SYMBOL:
            STRINGS_ZH_CN_ERROR_PREFIXES.PARSE + "度数 °符号过多",
        TOO_MANY_DECIMAL_POINT:
            STRINGS_ZH_CN_ERROR_PREFIXES.PARSE + "小数点 .过多",
        EMPTY_BRACKETS: STRINGS_ZH_CN_ERROR_PREFIXES.PARSE + "不允许空括号"
    },
    CALC_CK_ERROR_MSGS: {
        GOT_NOT_POSITIVE: STRINGS_ZH_CN_ERROR_PREFIXES.CALC + "接收到了非正值",
        SQRT: STRINGS_ZH_CN_ERROR_PREFIXES.CALC + "sqrt()接收到了负值",
        TAN: STRINGS_ZH_CN_ERROR_PREFIXES.CALC + "tan()接收到了π/2的奇数倍",
        ASINACOS:
            STRINGS_ZH_CN_ERROR_PREFIXES.CALC +
            "arcsin()或arccos()接收到了[-1,1]以外的值",
        ACOSH:
            STRINGS_ZH_CN_ERROR_PREFIXES.CALC + "acosh()接收到了[1,+∞)以外的值",
        ATANH:
            STRINGS_ZH_CN_ERROR_PREFIXES.CALC + "atanh()接收到了(-1,1)以外的值",
        FACT: STRINGS_ZH_CN_ERROR_PREFIXES.CALC + "阶乘操作数不是非负整数",
        INV: STRINGS_ZH_CN_ERROR_PREFIXES.CALC + "不能求0的倒数",
        COMBINE_NOT_NNINT:
            STRINGS_ZH_CN_ERROR_PREFIXES.CALC + "排列组合操作数不是非负整数",
        COMBINE_X_LT_Y: STRINGS_ZH_CN_ERROR_PREFIXES.CALC + "排列组合操作数n<m",
        POW: STRINGS_ZH_CN_ERROR_PREFIXES.CALC + "求负数的幂时指数不是整数",
        ROOT_X_ZERO: STRINGS_ZH_CN_ERROR_PREFIXES.CALC + "不能求0次根",
        ROOT_Y_NEG_X_NOT_ODD_INT:
            STRINGS_ZH_CN_ERROR_PREFIXES.CALC +
            "被开根数为负时,只能求其奇数次根",
        DIV: STRINGS_ZH_CN_ERROR_PREFIXES.CALC + "不能除以0",
        REC:
            STRINGS_ZH_CN_ERROR_PREFIXES.CALC +
            "Rec()转换的第一个参数(极径)不能为负",

        CREATE_DEGREE:
            STRINGS_ZH_CN_ERROR_PREFIXES.CALC + "创建度数时,分、秒不能为负",
        CREATE_FRAC: STRINGS_ZH_CN_ERROR_PREFIXES.CALC + "分数分母不能为0",

        INSUFFICENT_OPERANDS:
            STRINGS_ZH_CN_ERROR_PREFIXES.CALC + "操作数数量不足",
        OPERAND_STACK:
            STRINGS_ZH_CN_ERROR_PREFIXES.CALC + "操作数栈终止长度不为1"
    }
};

const STRINGS_EN_ERROR_PREFIXES = {
    PARSE: "Parsing Error: ",
    CALC: "Calculation Error: "
};

const STRINGS_EN = {
    APP_TITLE: "EC-82MS Web Calculator",
    DEG: "Degree",
    RAD: "Radian",
    GRA: "Grade",
    CLEAR: ["ClearMem", "ClearMode", "ClearAll"],
    PARSE_ERROR_MSGS: {
        MISSING_L_BRACKET:
            STRINGS_EN_ERROR_PREFIXES.PARSE + "Missing L bracket (",
        MISSING_R_BRACKET:
            STRINGS_EN_ERROR_PREFIXES.PARSE + "Missing R bracket )",
        UNEXPECTED_ENTRY: STRINGS_EN_ERROR_PREFIXES.PARSE + "Invalid key entry",
        INSUFFICENT_OPERANDS:
            STRINGS_EN_ERROR_PREFIXES.PARSE + "Insufficient operand(s)",
        MISSING_COMMA: STRINGS_EN_ERROR_PREFIXES.PARSE + "Missing comma ,",
        TOO_MANY_DEGREE_SYMBOL:
            STRINGS_EN_ERROR_PREFIXES.PARSE + "Too many degree symbols °",
        TOO_MANY_DECIMAL_POINT:
            STRINGS_EN_ERROR_PREFIXES.PARSE + "Too many decimal points .",
        EMPTY_BRACKETS: STRINGS_EN_ERROR_PREFIXES.PARSE + "Empty brackets"
    },
    CALC_CK_ERROR_MSGS: {
        GOT_NOT_POSITIVE:
            STRINGS_EN_ERROR_PREFIXES.CALC + "Got zero or negative",
        SQRT: STRINGS_EN_ERROR_PREFIXES.CALC + "sqrt() got negative",
        TAN: STRINGS_EN_ERROR_PREFIXES.CALC + "tan() got odd multiples of π/2",
        ASINACOS:
            STRINGS_EN_ERROR_PREFIXES.CALC +
            "arcsin() or arccos() got operand out of [-1,1]",
        ACOSH:
            STRINGS_EN_ERROR_PREFIXES.CALC +
            "acosh() got operand out of [1,+∞)",
        ATANH:
            STRINGS_EN_ERROR_PREFIXES.CALC +
            "atanh() got operand out of (-1,1)",
        FACT:
            STRINGS_EN_ERROR_PREFIXES.CALC +
            "factorial did not get non-negative integer",
        INV: STRINGS_EN_ERROR_PREFIXES.CALC + "Cannot invert 0",
        COMBINE_NOT_NNINT:
            STRINGS_EN_ERROR_PREFIXES.CALC +
            "nPr or nCr did not get non-negative integers",
        COMBINE_X_LT_Y: STRINGS_EN_ERROR_PREFIXES.CALC + "nPr or nCr got n<r",
        POW:
            STRINGS_EN_ERROR_PREFIXES.CALC +
            "Cannot calculate non-integer power of a negative number",
        ROOT_X_ZERO: STRINGS_EN_ERROR_PREFIXES.CALC + "Cannot calculate 0 root",
        ROOT_Y_NEG_X_NOT_ODD_INT:
            STRINGS_EN_ERROR_PREFIXES.CALC +
            "Cannot calculate non-odd root of a negative number",
        DIV: STRINGS_EN_ERROR_PREFIXES.CALC + "Cannot divide by zero",
        REC:
            STRINGS_EN_ERROR_PREFIXES.CALC +
            "First arg of Rec() cannot be negative",

        CREATE_DEGREE:
            STRINGS_EN_ERROR_PREFIXES.CALC +
            "Minutes and seconds cannot be negative",
        CREATE_FRAC:
            STRINGS_EN_ERROR_PREFIXES.CALC + "Denominator cannot be zero",

        INSUFFICENT_OPERANDS:
            STRINGS_EN_ERROR_PREFIXES.CALC + "Insufficient operands",
        OPERAND_STACK:
            STRINGS_EN_ERROR_PREFIXES.CALC +
            "Operand stack remaining count is not 1"
    }
};

export type LangType = "ZH_CN" | "EN";

class StringsRes {
    constructor() {
        makeAutoObservable(this);
    }

    strings = STRINGS_ZH_CN;

    switchLanguage(lang: LangType) {
        switch (lang) {
            case "ZH_CN":
                this.strings = STRINGS_ZH_CN;
                break;
            case "EN":
                this.strings = STRINGS_EN;
                break;
        }
        localStorage.setItem("lang", lang);
    }

    switchLangFromStorage() {
        const lang = localStorage.getItem("lang");
        if (lang !== null) {
            this.switchLanguage(lang as LangType);
        }
    }
}

export default new StringsRes();
