# Unit Test Pattern

## Briefing

- Use Mocha as our test framework
- Use Chai as assertion library
- Use Sinon as test spies, stubs and mocks library
- Use Enzyme as testing utilities for React

## How to add unit test

1. Add a test file ends with `Specs.js` in `__test__/` folder relative to source file.
2. Write test content
   - add `describe` as a top level context with the same name of the source file.
   - add `context` (optional) as context to group related test cases.
   - add each test case start with `it('should xxx', () => {})` and describe the scenario clearly.
     like: `it('should stay in pricing page when click cancel on dialog', () => {})`
3. Use test utils to simplify unit test
   - all test utils go to `test/unit/helpers/` folder
     like: `fakeClock.js` helper will help you mock the time.

## How to run unit test

- Run a single unit test file using `npm run mocha /src/path/to/xxxSpecs.js`
- Run all unit test files using `npm run test:unit`
- Run all unit test with coverage using `npm run test:coverage`

## Notice

- if you are using sinon to stub something, remember to restore it in `afterEach()`
  like:

  ```javascript
  afterEach(() => {
    sinon.restore();
  });
  ```

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

    expect(actualResult).to.be.deep.equal(expectResult);
  });
  ```

#### Components

- Connected/enhanced components test refers to [page-level-test-pattern.md](./page-level-test-pattern.md).
- Do not test meaningless DOM node/props without conditional rendering logic.
- Conditional rendering logic should have 100% coverage.
- User interaction should have 100% coverage.

#### Promise

Chai has a library called **chai-as-promised** to aid when testing code that uses Promises. This library
provides more user friendly error messages if a test fails than the unit test approach using done().
See the examples below and refer to earlyBirdActionsSpecs.js for more examples using chai-as-promised.

To test the happy path use

```javascript
  const result = functionThatUsesAPromise();

  return expect(result).to.eventually.be.fulfilled.then(() => {
    expect...
  };
```

To test the sad path when an error is thrown use

```javascript
  const result = functionThatUsesAPromiseAndThrowsError();

  return expect(result).to.eventually.be.rejected.then((e) => {
    expect(e).to.deep.equal(theExpectedError);
  };
```

To test the sad path when an error is not thrown use

```javascript
  const result = functionThatUsesAPromiseAndErrorIsCaught();

  return expect(result).to.eventually.be.fulfilled.then(() => {
    expect...
  };
```

# E2E Test Pattern

## Briefing

- Using Nightwatch as our End-to-End testing solution
- Using local mock server for Nightwatch to do E2E test

## How to add E2E test

- Add mock data of the flow you want to add E2E test first since the E2E test is based on Dev server. Add api response mock data to a sub-folder of `mocks/templates`.
- Files that map URLs to response mock data go in folders `mocks/services/api` or `mocks/services/chapi` based on the api source type.
- Add needed flow page objects to an individual folder in `test/e2e/pages/`. Flow page objects are hooks to access GUI elements.
- Add E2E test for each business scenario and named the file based on the business scenario.
  - Analytics utils for E2E verify go to `test/e2e/analytics/` folder.
  - Each Analytics Store requires a schema which are in sub-folders of `test/analyticsContracts`
  - Custom commands go to `test/e2e/commands` folder. See Nightwatch API: (http://nightwatchjs.org/api/)

## How to run E2E test

- Run single E2E test file `./g e2e --test test/e2e/tests/path/to/xxxTest.js`
- Run tests of a folder using `./g e2e --group test/e2e/tests/path/to/folder`
- Run all E2E test files `npm run test:functionals`

## Notice

- If you want run E2E test in docker locally using `./g e2e --docker --test test/e2e/tests/airBooking/`
  - Make sure `selenium/standalone-chrome` container is running on your docker with version `3.0.1-aluminum`
  - Refer to `README.md` in the root folder for the specific docker commands.

# UI Test Pattern

## Briefing

- Use storybook to render UI
- Use backstop to automates visual regression testing of our responsive web UI by comparing DOM screenshots over time.
- Use docker to run backstop to make sure generate picture in the same environment.

## How to use

### How to add ui test

1. Add flow ui_test file in `test/ui/scenarios` folder.
2. import flow ui_test in `test/ui/scenarios/index.js` file.
3. Add ui_test scenarios.

- `label` is the scenario name and this should be unique since it will be used for bitmap reference file name.
- `selectedKind` should be same with the `story kind name` in storybook file.
- `type` should be same with the `story name` in storybook file.
- `clickAllSelector` for multiple DOM elements with a common selector that should all be clicked prior to a screenshot.
- `clickAllSelectors` for multiple sets of DOM elements that share a selector that should all be clicked prior to a screenshot.
- `clickSelector` selector for click the specified DOM element prior to screen shot.
- `clickSelectors` selectors for simulates multiple sequential click interactions.

```javascript
{
  label: 'Air Booking Price Page(Points)',
  selectedKind: 'pages/airBooking/pricingSummary',
  type: 'points',
  clickSelector: '.stops-detail',
  clickSelectors: ['.stops-detail', 'div[data-qa="toggleBreakdown"]']
}
```

### How to run it

1. Compare current ui with ui baseline `npm run test:ui test`
2. Update ui baseline `npm run test:ui approve`

### Results

- The UI test html report will be generated to `backstop_data/html_report/index.html`
- The test bitmaps goes to `backstop_data/bitmpas_test/`
- The UI test baseline goes to `backstop_data/bitmaps_reference/` folder
