# spiral-qa-assessment
## Testing approach
### Frontend Tests
One happy path was selected for the front end test. The test spec contains exactly one scenario run through sequentially. So I've taken a user journey approach to testing front end.

### Backend Tests
Back end tests are separated out into each function of the Create, Read, Update, and Delete operations of the API. With in them a selection of happy path tests were implemented. With the back end tests, the aim was to have a more data driven approach to running tests. Every spec file has a suite of test cases with one test runner. The result is new test data can be added to without changing the way the test is run.

Things I could do to improve the back end tests would be:
1. Separate the test data from the tests.
2. Create a base testCase interface with each test extending it.
3. Create a base test class for common code and functionality.
4. Create a utility class to contain shared methods.