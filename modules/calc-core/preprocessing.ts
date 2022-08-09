export function padBrackets(expr: string): string{
    const diffCount = (expr.match(/\(/g) ?? []).length
        - (expr.match(/\)/g) ?? []).length;
    
    if (diffCount > 0) {
        expr = expr.padEnd(expr.length + diffCount, ")");
    }

    return expr;
}