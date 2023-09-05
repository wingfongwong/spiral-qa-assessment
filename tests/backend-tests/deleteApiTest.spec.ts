import { test, expect } from '@playwright/test';

const BASE_URL: string = 'https://jsonplaceholder.typicode.com';
const PATH: string = '/posts/';

interface TestCase {
    testId: number;
    testTitle: string;
    recordId?: number;
    expectedStatus: number;
}

const testCases: TestCase[] = [
    {
        testId: 1.0,
        testTitle: 'delete without id',
        expectedStatus: 404
    },
    {
        testId: 2.0,
        testTitle: 'delete with id',
        recordId: 1,
        expectedStatus: 200
    },
];

for(const testCase of testCases) {
    test(`${testCase.testId} DELETE /posts ${testCase.testTitle}`,async ({ request }) => {
        let url = BASE_URL + PATH;
        if(testCase.recordId) { url += testCase.recordId.toString; };
        const response = await request.delete(url);

        await expect(response.status()).toBe(testCase.expectedStatus);
    });
};