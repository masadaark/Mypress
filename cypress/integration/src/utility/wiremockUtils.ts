import { callApiDelete, callApiPost } from "./apiRequests";
import { JSONObject } from "./interface";
import { isBlankObject } from "./objectUtils";

export const mockUrl = "http://localhost:8888/__admin/mappings/";

const mappingsHeader = {
    "access-control-allow-headers": "Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token",
    "access-control-allow-origin": "*",
    'Content-Type': "application/json"
}

export const postMapping =
    (method: string, apiPath: string, responseBody: any, requestPattern: any[] | object
        , status: number = 200, paramType: string = "")
        : any => {
        let request: JSONObject = { method: method.toUpperCase() }
        if (paramType.toLowerCase() === "query") {
            request.urlPath = apiPath
            request.queryParameters = queryParamBody(requestPattern)
        } else {
            if (!(Array.isArray(requestPattern) && requestPattern.length === 0 || isBlankObject(requestPattern))) {
                request.bodyPatterns = jsonToMatchesJsonPath(requestPattern)
            }
            request.urlPathPattern = apiPath
        }
        let requestPost = {
            request: request,
            response: {
                jsonBody: responseBody,
                transformers: ["response-template"],
                headers: mappingsHeader,
                status: status
            }
        }
        return callApiPost(mockUrl, requestPost)
    }


export const clearMappings = (uuid: string = ""): any => {
    return callApiDelete(mockUrl + uuid, [])
}


export const wireMockContent = (service: string, apiName: string): any => {
    try {
        const jsonContent = cy.fixture(`wiremock/${service.toLowerCase()}/${apiName.toLowerCase()}`);
        return jsonContent;
    } catch (error) {
        console.error(`Error occurred while retrieving JSON content: ${error}`);
        return null;
    }
};


export function jsonToMatchesJsonPath(input: unknown): JSONObject[] {
    const matchesJsonPathArray: JSONObject[] = [];
    function parseJson(obj: any, path: string) {
        for (const [key, value] of Object.entries(obj)) {
            if (Array.isArray(value)) {
                const matchesJsonPathStr = `${path}.${key}[?(@ == ${JSON.stringify(value[0])})]`;
                matchesJsonPathArray.push({ matchesJsonPath: `$${matchesJsonPathStr}` });
            } else if (typeof value === "object") {
                const subKeys = Object.keys(value);
                const subValues = Object.values(value);
                const subPath = subKeys.map((subKey, index) => {
                    const subPush = (typeof subValues[index] === "string") ? `'${subValues[index]}'` : subValues[index]
                    return `${subKey} == ${subPush}`;
                });
                const matchesJsonPathStr = `${path}.${key}[?(@.${subPath.join(" && @.")})]`;
                matchesJsonPathArray.push({ matchesJsonPath: `$${matchesJsonPathStr}` });
            } else {
                const matchesJsonPathStr = `${path}.${key} == ${JSON.stringify(value)}`;
                matchesJsonPathArray.push({ matchesJsonPath: `$${matchesJsonPathStr}` });
            }
        }
    }
    if (Array.isArray(input)) {
        for (const obj of input) {
            parseJson(obj, "");
        }
    } else {
        parseJson(input, "");
    }
    return matchesJsonPathArray;
}


export function queryParamBody(input :JSONObject){
    const newObj = {}
    for(const key in input){
        newObj[key] = {
            "matches": input[key]
        }
    }
    return newObj
}