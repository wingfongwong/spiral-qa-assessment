import { test, expect } from '@playwright/test';

const BASE_URL: string = 'https://jsonplaceholder.typicode.com';
const PATH: string = '/posts/';

interface TestCase {
    testId: number;
    testTitle: string;
    recordTitle?: string;
    recordBody?: string;
    recordUserId?: number;
    recordId?: number;
    isValid: boolean;
    updateMethod: 'PATCH'|'PUT';
    expectedStatus: number;
}

const testCases: TestCase[] = [
    {
        testId: 1.0,
        testTitle: 'put a record',
        recordId:100,
        recordUserId: 123,
        recordTitle: 'Turtles',
        recordBody: 'Turtles all the way down.',
        updateMethod: 'PUT',
        isValid: true,
        expectedStatus: 200
    },
    {
        testId: 2.0,
        testTitle: 'patch a record',
        recordId:10,
        recordUserId: 123,
        recordTitle: 'Turtles',
        updateMethod: 'PATCH',
        isValid: true,
        expectedStatus: 200
    },
    {
        testId: 3.0,
        testTitle: 'patch an invalid record',
        recordId:-10,
        recordUserId: 123,
        recordTitle: 'Turtles',
        updateMethod: 'PUT',
        isValid: false,
        expectedStatus: 500
    },
];

for(const testCase of testCases) {
    test(`${testCase.testId} PUT and PATCH /posts ${testCase.testTitle}`,async ({ request }) => {
        let url = BASE_URL + PATH;
        if(testCase.recordId) {url += testCase.recordId.toString()};
        
        let jsonBody = {};
        if(testCase.recordUserId) { jsonBody["userId"] = testCase.recordUserId; };
        if(testCase.recordTitle) { jsonBody["title"] = testCase.recordTitle; };
        if(testCase.recordBody) { jsonBody["body"] = testCase.recordBody; };

        const response = testCase.updateMethod === 'PUT'?await request.put(url, {data: jsonBody}):await request.patch(url, {data: jsonBody});
        const resBody = await response.text();
      
        if(testCase.isValid) {
            const resJson = JSON.parse(resBody);
            await expect(resJson).toHaveProperty('id', testCase.recordId);
            if(testCase.recordUserId) { await expect(resJson).toHaveProperty('userId'); };
            if(testCase.recordTitle) { await expect(resJson).toHaveProperty('title'); };
            if(testCase.recordBody) { await expect(resJson).toHaveProperty('body'); };
        };
        await expect(response.status()).toBe(testCase.expectedStatus);
    });
};