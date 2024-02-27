# Unit Test Pattern

## Briefing

- Use Jest as our test framework
- Use Jest mock as test spies, stubs and mocks library
- Use Enzyme as testing utilities for React

## How to add unit test

1. Add a test file ends with `.test.js` in `__tests__/` folder relative to source file.
2. Write test content
   - add `describe` as a top level context with the same name of the source file.
   - add `describe` (optional) as context to group related test cases.
   - add each test case start with `it('should xxx', () => {})` and describe the scenario clearly.
     like: `it('should stay in pricing page when click cancel on dialog', () => {})`
3. Use test utils to simplify unit test
   - all test utils go to `test/unit/helpers/` folder
     like: `fakeClock.js` helper will help you mock the time.

## How to run unit test

- Run a single unit test file using `npm run test:jest /src/path/to/xxx.test.js`
- Run all unit test files using `npm run test:jest`
- Run all unit test with coverage using `npm run test:jest`

- We have a global `beforeEach()` to ensure that each test case run independently.

  ```javascript
  // test/unit/setup.js
  beforeEach(function () {
    clearRequireCache();
    resetHistory();
  });
  ```

## Good unit test recommendation

- **Independent**

  Should only fail if the logic you test breaks.

- **Fast and stable**

  No unnecessary dependencies.
  Should always provide with expected output with targeted input.

- **No side effect**

  Do not call real API.
  Do not write to real database/file systems.
  Do not use imported actions. Imported actions should be mocked.

## How to do unit testing with React

### Terms of React unit test

| Type                | Test Strategy                                                                       |
| ------------------- | ----------------------------------------------------------------------------------- |
| Actions             | Test actions, test async actions logic                                              |
| Reducers            | Test core logic                                                                     |
| Selectors(Reselect) | Test core logic                                                                     |
| Helpers             | Test logic                                                                          |
| Components          | Test render logic(includes conditional rendering, key props pass), test interaction |

### Detail takeaways

#### Selectors

- Test each selector separately using `xxxSelector.resultFunc`. like:

  ```javascript
  it('should return downgrade as true when it is downgrade', () => {
    const actualResult = getChangeType.resultFunc(fareSummary);

    expect(actualResult).toBe(expectResult);
  });
  ```

#### Components

- Connected/enhanced components test refers to [page-level-test-pattern.md](./page-level-test-pattern.md).
- Do not test meaningless DOM node/props without conditional rendering logic.
- Conditional rendering logic should have 100% coverage.
- Shallow rendering is preferred, except when mount is absolutely necessary. (Testing <Providers />)
- Click handlers should be tested using a shallow render, not a mount that is deeply nested.

#### Promise

To test the happy path use

```javascript
  const result = functionThatUsesAPromise();

  return expect(result).resolves.toEqual(..);
```

To test the sad path when an error is thrown use

```javascript
  const result = functionThatUsesAPromiseAndThrowsError();

  return expect(result).rejects.toEqual(..)
```

To test the sad path when an error is not thrown use

```javascript
  const result = functionThatUsesAPromiseAndErrorIsCaught();

  return expect(result).resolves.toEqual(..);
```

#### Things to be considered while writing/converting to Jest

- While writing jest test cases make sure to add the file path to jest.config.js collectCoverageFrom.

```javascript
collectCoverageFrom: ['src/shared/helpers/pathUtils.js', '!<rootDir>/node_modules/', '!<rootDir>/path/to/dir/'];
```

- To mock store use configureMockStore

```javascript
import createMockStore from 'test/unit/helpers/configureMockStore';

const mockStore = createMockStore();
```
