import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { defaultHeader } from "utility/apiRequests";
import { JSONObject } from 'utility/interface';
import { isSubset, searchInclude } from "utility/objectUtils";
import { postMapping } from "utility/wiremockUtils";
import { clearMappings } from './utility/wiremockUtils';
import { pgQuery } from "utility/databaseUtils";
const regExGet = new RegExp('get', 'gi')
let scenarioContent: JSONObject, expectSqlContent: JSONObject[]
let method: string, apiPath: string
let stubUuids = []

Given(`Post Mapping request`, () => {
    if (scenarioContent) {
        const responsebody = scenarioContent.response.body
        const httpstatus = scenarioContent.response.status
        const requestBody = (scenarioContent.request) ? scenarioContent.request : []
        const paramType = (scenarioContent.paramType) ? scenarioContent.paramType : ""
        postMapping(method, apiPath, responsebody, requestBody, httpstatus || 200, paramType)
            .then(responseStub => {
                const uuid = responseStub.body.uuid
                stubUuids.push(uuid)
            })
    }
})

Given(`Clear Mapping Server`, () => {
    if (stubUuids.length !== 0) {
        for (const uuid of stubUuids) {
            clearMappings(uuid)
        }
        stubUuids = []
    }
})


Given(`Set request,response feature content {string} step {string} tcNo.{int}`,
    (feature: string, step: string, testCaseNumber: number) => {
        cy.fixture(`feature/${feature}/${step}`)
            .then((stepContent: JSONObject) => {
                scenarioContent = searchInclude(stepContent.scenarios, "tcNo", testCaseNumber)
                method = stepContent.method
                apiPath = stepContent.apiPath
            })
    })


When(`Sending request`, () => {
    const requestContent = scenarioContent.request
    let requestObject: JSONObject = {
        failOnStatusCode: false,
        method: method,
        url: apiPath
    }
    const header = requestContent.headers
    requestObject.headers = (header) ? header : defaultHeader
    if (!regExGet.test(method)) {
        const body = requestContent.body
        if (body) {
            requestObject.body = body
        }
    }
    cy.request(requestObject).as("responseContent")
})

Given(`Execute postgres query feature content {string} step {string} tcNo.{int}`,
    (feature: string, step: string, testCaseNumber: number) => {
        cy.fixture(`feature/${feature}/pg_${step}`)
            .then((pgContent: JSONObject) => {
                const thisScenario = searchInclude(pgContent.scenarios, "tcNo", testCaseNumber)
                if (thisScenario) {
                    const queryMessage = pgContent.sql.replace('?', thisScenario.value)
                    const expectResults = thisScenario.expect
                    if (expectResults) {
                        expectSqlContent = expectResults
                    }
                    pgQuery(queryMessage).as(`sqlResponse`)
                }
            })
    })


Then(`Expecting result`, () => {
    cy.get(`@responseContent`)
        .then((responseApi: any) => {
            const responseBody: object | any[] = responseApi.body
            const httpStatus: number = responseApi.status
            const expectedResult: JSONObject = scenarioContent.response
            const expectedStatus: number = expectedResult.status
            const expectedResponse: object | any[] = expectedResult.body
            const expectResultDescription: string = expectedResult.comment
            expect(expectedStatus, "Http status").equal(httpStatus)
            console.log(expectedResponse)
            isSubset(expectedResponse,responseBody,expectResultDescription)
        })
})

Then(`Expecting query result`, () => {
    cy.get(`@sqlResponse`)
        .then((respose: any) => {
            for (const obj of expectSqlContent) {
                expect(respose.length, "value length").equal(obj.value.length)
                const columnName = obj.column
                for (let i = 0; i < respose.length; i++) {
                    const actualResult = String(respose[i][columnName])
                    const expectedResult = String(obj.value[i])
                    expect(actualResult, `column:${columnName}`).equal(expectedResult)
                }
            }
        })
})