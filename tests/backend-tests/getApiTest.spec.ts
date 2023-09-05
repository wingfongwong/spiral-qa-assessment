import { test, expect } from '@playwright/test';

const BASE_URL: string = 'https://jsonplaceholder.typicode.com';
const PATH: string = '/posts/';

interface TestCase {
    testId: number;
    testTitle: string;
    recordId?: number;
    isSingleRecord?: boolean;
    isValid: boolean;
}

const testCases: TestCase[] = [
    {
        testId: 1.0,
        testTitle: 'get all records',
        isValid: true
    },
    {
        testId: 2.0,
        testTitle: 'get one records',
        recordId: 3,
        isSingleRecord: true,
        isValid: true
    },
    {
        testId: 3.0,
        testTitle: 'get one records',
        recordId: -3,
        isSingleRecord: true,
        isValid: false
    }
];

for(const testCase of testCases) {
    test(`${testCase.testId} GET /posts ${testCase.testTitle}`,async ({ request }) => {
        let url = BASE_URL + PATH;
        
        if(testCase.recordId) {
            url += testCase.recordId.toString();
        };
        
        const result = await request.get(url);
        
        let jsonData: Array<{}> = [];
        if(testCase.isSingleRecord) {
            jsonData.push(await result.json());
        } else {
            jsonData = await result.json();
        }

        await expect(jsonData.length).toBeGreaterThanOrEqual(1);

        if(testCase.isValid) {
            for(const record of jsonData) {
                await expect(record).toHaveProperty('id');
                await expect(record).toHaveProperty('userId');
                await expect(record).toHaveProperty('title');
                await expect(record).toHaveProperty('body');
            };
        };
    });
};