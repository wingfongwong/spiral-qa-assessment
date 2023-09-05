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
}

const testCases: TestCase[] = [
    {
        testId: 1.0,
        testTitle: 'post records with empty body',
        isValid: true
    },
    {
        testId: 2.0,
        testTitle: 'post record with only userId',
        recordUserId: 31415,
        isValid: true
    },
    {
        testId: 1.0,
        testTitle: 'post record with all fields',
        recordUserId: 31415,
        recordTitle: 'All the fields',
        recordBody: 'All I need is someBODY to love',
        isValid: true
    },
];

for(const testCase of testCases) {
    test(`${testCase.testId} POST /posts ${testCase.testTitle}`,async ({ request }) => {
        let url = BASE_URL + PATH;
        
        let jsonBody = {};
        if(testCase.recordUserId) { jsonBody["userId"] = testCase.recordUserId; };
        if(testCase.recordTitle) { jsonBody["title"] = testCase.recordTitle; };
        if(testCase.recordBody) { jsonBody["body"] = testCase.recordBody; };

        const response = await request.post(url, { data: jsonBody});
        const jsonResponse = await response.json();
    
        await expect(jsonResponse).toHaveProperty('id', 101);
        if(testCase.recordUserId) { await expect(jsonResponse).toHaveProperty('userId', testCase.recordUserId); };
        if(testCase.recordTitle) { await expect(jsonResponse).toHaveProperty('title', testCase.recordTitle); };
        if(testCase.recordBody) { await expect(jsonResponse).toHaveProperty('body', testCase.recordBody); };
    });
};