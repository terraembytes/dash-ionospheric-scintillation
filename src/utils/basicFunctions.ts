export function verifyString(str: string): boolean {
    return str.trim().length === 0 || str === null || str === undefined;
}