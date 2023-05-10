import { JSONObject } from "./interface";
import { isStringNumber } from "./stringUtils";
const _ = require('lodash');

export const isObject = (val: unknown): val is JSONObject => {
    return typeof val === 'object' && val !== null;
};

export const isBlankObject = (val: unknown): boolean => {
    if (isObject(val)) {
        return Object.keys(val).length === 0;
    } else {
        return false;
    }
};

export const mapEnumByKey = (jsonArray: JSONObject[], columnName: string): JSONObject => {
    let enumMap: JSONObject = {};
    for (const jsonObject of jsonArray) {
        enumMap[jsonObject[columnName]] = parseInt(jsonObject.id);
    }
    return enumMap;
};

export const binarySearchFilter = (arr: JSONObject[], key: keyof JSONObject, value: JSONObject[keyof JSONObject]): JSONObject[] => {
    let left = 0;
    let right = arr.length - 1;
    let result: JSONObject[] = [];
    while (left <= right) {
        const middle = Math.floor((left + right) / 2);
        const element = arr[middle];
        if (element[key] < value) {
            left = middle + 1;
        } else if (element[key] > value) {
            right = middle - 1;
        } else {
            result.push(element);
            let l = middle - 1;
            while (l >= 0 && arr[l][key] === value) {
                result.push(arr[l]);
                l--;
            }
            let r = middle + 1;
            while (r < arr.length && arr[r][key] === value) {
                result.push(arr[r]);
                r++;
            }
            return result;
        }
    }
    return result;
}

export const getKeysByValue = (obj: JSONObject, value: any): string[] => {
    let keys: string[] = [];
    for (const key in obj) {
        if (obj[key] === value) {
            keys.push(key);
        }
    }
    return keys;
}

export const getUniqueKeyByValue = (obj: JSONObject, value: any): string => {
    for (const key in obj) {
        if (obj[key] === value) {
            return key;
        }
    }
    return '';
}

export function binarySearch(array: JSONObject[], key: string, searchValue: any): JSONObject {
    const comparator = (obj) => obj[key];
    const index = _.sortedIndexBy(array, { [key]: searchValue }, comparator);

    if (index < array.length && array[index][key] === searchValue) {
        return array[index];
    } else {
        return undefined;
    }
}

export function searchInclude(array: JSONObject[], key: string, searchValue: number): JSONObject {
    return array.find(s => s[key].includes(searchValue));
}

export function deleteKeyFromJson(jsonObj: JSONObject[] | JSONObject, keyToDelete: string) {
    if (typeof jsonObj !== "object") {
        return jsonObj;
    }
    if (Array.isArray(jsonObj)) {
        for (let i = 0; i < jsonObj.length; i++) {
            jsonObj[i] = deleteKeyFromJson(jsonObj[i], keyToDelete);
        }
    } else {
        for (let prop in jsonObj) {
            if (prop === keyToDelete) {
                delete jsonObj[prop];
            } else if (typeof jsonObj[prop] === "object") {
                jsonObj[prop] = deleteKeyFromJson(jsonObj[prop], keyToDelete);
            }
        }
    }
    return jsonObj;
}


export function isSubset(A: any, B: any, comment: string) {
    const typeA = typeof A
    const isArray = Array.isArray(A)
    if (isArray) {
        for (let i = 0; i < A.length; i++) {
            isSubset(A[i], B[i], comment + `idx:${i}`)
        }
    }
    else if (typeA === 'object') {
        for (const key in A) {
            isSubset(A[key], B[key], key)
        }
    }else {
        if (typeA === 'number' || isStringNumber(A)) {
            expect(Number(A), comment).equal(Number(B))
        }
        else {
            expect(String(A), comment).equal(String(B))
        }
    }
}






