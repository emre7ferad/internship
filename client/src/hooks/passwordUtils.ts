export const evaluatePasswordStrength = (pwd: string) => {
    if (pwd.length === 0) return 0;
    if (pwd.length < 6) return 1;
    const hasLetter = /[A-Za-z]/.test(pwd);
    const hasDigit = /\d/.test(pwd);

    if (hasLetter && hasDigit && pwd.length >=12 ) return 4;
    if (hasLetter && hasDigit && pwd.length >= 6) return 3;
    if (hasLetter || hasDigit && pwd.length >= 6) return 2;

    return 0;
};

export const isPasswordValid = (pwd: string, strength: number) => {
    if (!/^[\x00-\x7F]*$/.test(pwd)) return false;
    if (pwd.length < 6) return false;
    if (!/[A-Za-z]/.test(pwd)) return false;
    if (!/\d/.test(pwd)) return false;

    if (strength < 3) return false;
    return (
        pwd.length >= 6 &&
        /[A-Za-z]/.test(pwd) &&
        /\d/.test(pwd) &&
        /^[\x00-\x7F]*$/.test(pwd)
    );
};