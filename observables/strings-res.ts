import { makeAutoObservable } from "mobx";

const STRINGS_ZH_CN_ERROR_PREFIXES = {
    PARSE: "语法解析错误:",
    CALC: "计算错误:"
};

const STRINGS_ZH_CN = {
    APP_TITLE:"EC-82MS Web计算器",
    PARSE_ERROR_MSGS: {
        MISSING_L_BRACKET: STRINGS_ZH_CN_ERROR_PREFIXES.PARSE+"缺少左括号 (",
        MISSING_R_BRACKET: STRINGS_ZH_CN_ERROR_PREFIXES.PARSE + "缺少右括号 )",
        UNEXPECTED_ENTRY: STRINGS_ZH_CN_ERROR_PREFIXES.PARSE + "不合法的按键输入",
        INSUFFICENT_OPERANDS: STRINGS_ZH_CN_ERROR_PREFIXES.PARSE + "操作数数量不足",
        MISSING_COMMA: STRINGS_ZH_CN_ERROR_PREFIXES.PARSE + "缺少逗号 ,",
        TOO_MANY_DEGREE_SYMBOL: STRINGS_ZH_CN_ERROR_PREFIXES.PARSE + "度数 °符号过多",
        TOO_MANY_DECIMAL_POINT: STRINGS_ZH_CN_ERROR_PREFIXES.PARSE + "小数点 .过多",
        EMPTY_BRACKETS: STRINGS_ZH_CN_ERROR_PREFIXES.PARSE + "不允许空括号",
    },
    CALC_CK_ERROR_MSGS: {
        GOT_NOT_POSITIVE: STRINGS_ZH_CN_ERROR_PREFIXES.CALC + "接收到了非正值",
        SQRT: STRINGS_ZH_CN_ERROR_PREFIXES.CALC + "sqrt()接收到了负值",
        TAN: STRINGS_ZH_CN_ERROR_PREFIXES.CALC + "tan()接收到了π/2的奇数倍",
        ASINACOS: STRINGS_ZH_CN_ERROR_PREFIXES.CALC + "arcsin()或arccos()接收到了[-1,1]以外的值",
        FACT: STRINGS_ZH_CN_ERROR_PREFIXES.CALC + "阶乘操作数不是非负整数",
        INV: STRINGS_ZH_CN_ERROR_PREFIXES.CALC + "不能求0的倒数",
        COMBINE_NOT_NNINT: STRINGS_ZH_CN_ERROR_PREFIXES.CALC + "排列组合操作数不是非负整数",
        COMBINE_X_LT_Y: STRINGS_ZH_CN_ERROR_PREFIXES.CALC + "排列组合操作数n<m",
        POW: STRINGS_ZH_CN_ERROR_PREFIXES.CALC + "求负数的幂时指数不是整数",
        ROOT_X_ZERO: STRINGS_ZH_CN_ERROR_PREFIXES.CALC + "不能求0次根",
        ROOT_Y_NEG_X_NOT_ODD_INT: STRINGS_ZH_CN_ERROR_PREFIXES.CALC + "被开根数为负时,只能求其奇数次根",
        DIV: STRINGS_ZH_CN_ERROR_PREFIXES.CALC + "不能除以0",
        REC: STRINGS_ZH_CN_ERROR_PREFIXES.CALC + "Rec()转换的第一个参数(极径)不能为负",
        
        CREATE_DEGREE: STRINGS_ZH_CN_ERROR_PREFIXES.CALC + "创建度数时,分、秒不能为负",
        CREATE_FRAC: STRINGS_ZH_CN_ERROR_PREFIXES.CALC + "分数分母不能为0"
    }
}

const STRINGS_EN = {
    ERROR_MSGS: {
        GOT_NOT_POSITIVE: "接收到了非正值",
        SQRT: "sqrt()接收到了负值",
        TAN: "tan()接收到了π/2的奇数倍",
        ASINACOS: "arcsin()或arccos()接收到了[-1,1]以外的值",
        FACT: "阶乘操作数不是非负整数"

    }
}

class StringsRes{
    constructor() {
        makeAutoObservable(this);
    }

    strings = STRINGS_ZH_CN;

    switchLanguage(lang: "ZH_CN" | "EN") {
        switch (lang) {
            case "ZH_CN":
                this.strings = STRINGS_ZH_CN;
                break;
            case "EN":
                //this.strings = STRINGS_EN;
                break;
        }
    }
}

export default new StringsRes();