export const numChars: string = '0123456789';
export const charChars: string = 'abcdefghijklmnopqrstuvwxyz';
export const allChars: string = 'abcdefghijklmnopqrstuvwxyz0123456789';
export const charDict: { [key: string]: string } = {
    'num': numChars,
    'char': charChars,
    'all': allChars,
};
const regexStringNumber = /^\d+(\.\d+)?$/

export const relation: string[] = ['บุตร', 'ลูก', 'น้อง', 'แฟน', 'แฟนเก่า', 'ชู้', 'เพื่อน', 'ญาติ'
    , 'กิ๊ก', 'ภารยา', 'สามี', 'ลูกสะใภ้', 'ลุง', 'ป้า', 'น้า', 'อา', 'พ่อ', 'แม่'];
export const thaiCharacters = 'กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮ';

export const randomRelation = (): string => {
    return relation[Math.floor(Math.random() * relation.length)];
}

export const makeString = (length: number, type: string = 'all'): string =>{
    const characters = charDict[type.toLowerCase()] || allChars;
    const charactersLength = characters.length;
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const generateIntegerChar = (length: number): string => {
    return makeString(length, 'num');
}

export const generateIdCard = (): string =>{
    let result = '';
    let sum = 0;
    for (let i = 0; i < 12; i++) {
        result += i === 0 ? numChars[Math.floor(Math.random() * 8) + 1] : numChars[Math.floor(Math.random() * 10)];
        sum += parseInt(result[i]) * (13 - i);
    }
    result += numChars[(11 - (sum % 11)) % 10];
    return result;
}

export const generatePhonenumber = (): string => {
    return '0' + generateIntegerChar(9);
}

export const generatecontractNumber = (): string => {
    return generateIntegerChar(11);
}

export const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export const generateThaiString = (length: number): string => {
    const charactersLength = thaiCharacters.length;
    let result = ''
    for (let i = 0; i < length; i++) {
        result += thaiCharacters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const generateLicensePlate = (): string=> {
    return generateIntegerChar(2) + generateThaiString(2) + generateIntegerChar(4)
}

export const generateBankAccount = (): string=> {
    return generateIntegerChar(10)
}

export const boolToUpperFirst = (flag: boolean): string => {
    return capitalizeFirstLetter(flag.toString())
}

export const isStringNumber = (input :any):boolean=>{
    if(typeof input !== 'string'){
        return false
    }
    return regexStringNumber.test(input)
}