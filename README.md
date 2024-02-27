# spa-mobile-web

## Getting started

### Install dependencies

`npm install`

### Run on local with mock server

`npm start`

### Run on local point to remote server

`npm run <desired-env> OR npm start -- --proxy=<desired-env>`

## Running tests

### Run unit test

`npm run test:unit`

### Run unit test for a folder:

`npm run test:unit -- --filter contactTracing`

### Run unit test for specific file

`npm run mocha {FILE_PATH}`

### Update unit test JEST SNAPSHOTS for a specific file:

`npm run mocha:update {FILE_PATH}`

### Run unit test in debug mode for a specific file with chrome devtools:

`npm run mocha:debug {FILE_PATH}`

- After running the command, go to this URL `chrome://inspect`
- Click on the inspect link
- Initially it is on the break point, click on <resume script execution button> to make the test running
- You can add break points graphically, if you are not able to find your file, go to your sourcecode and wherever you need to stop add `debugger;`

### Update unit test JEST SNAPSHOTS for a folder:

`npm run test:update -- --filter contactTracing`

### Update unit test all JEST SNAPSHOTS:

`npm run test:update`

### How to run E2E test

#### First Run / Update Selenium

- To update selenium and browser drivers: `npm run test:functionals-update`
  - This step is necessary for first ever run of an e2e test

#### Run Tests by Path

- Run single E2E test file `npm run test:functional -- {FILE_PATH}`
- Run tests of a folder using `npm run test:functionals-group -- {FOLDER_PATH}`

#### Run Test Suite

- Run all E2E test files `npm run test:functionals`
- Run all E2E test files without flaky tests `npm run test:functionals -- --skipFlaky`
- Run all E2E test files that have the 'flaky' tag `npm run test:functionals -- --onlyFlaky`

### Run e2e test in docker(MAC)

- Install Docker For Mac `https://docs.docker.com/desktop/mac/install/`
- Run selenium docker with command `docker run -d -p 4444:4444 selenium/standalone-chrome:3.0.1-aluminum`\*
- Run functional test with docker argument, `npm run test:functionals -- --docker`
  - Note: Make sure the ip address is same as the alias one.

### UI Screenshot Tests with BackstopJS

#### Before Testing

1. Open Docker Desktop

#### Running the UI test suite

1. Compare current ui with ui baseline

```npm run test:ui test```

2. If the failed screenshots are expected changes, then update ui baseline 

```npm run test:ui approve```

Optional - Pass a custom port
```npm run test:ui test --port=9300```

#### Run storybook against a single test

1. Start standalone storybook with: `npm run storybook`
2. Run BackstopJS with a filter flag by running the below command:
```
npm run test:diff "ADD YOUR LABEL HERE"

// Example for all Air Booking tests
npm run test:diff "label property for your scenario"
```

#### Run storybook with multiple capture threads

##### Description

In the development environment, there is a script with the default threads and a way to set custom threads.

##### Threads

There is a specific npm script for devs on their local machines that can be run with the max number of threads:
```
npm run test:ui-dev test
```

##### Custom Threads

There are two ways to pass custom threads on your machine.
1. Create an environment variable that has the desired amount of threads for local development. Range 1-10.
```
export BACKSTOPJS_THREADS=5
```

###### OR

2. Use a flag with the desired amount of threads.
```
npm run test:ui test -- --threads=5
```

#### Docker

#### Docker BackstopJS Image
If you get an error for a missing Docker image, run the following command:
```
docker pull backstopjs/backstopjs:6.3.3
```

#### Docker Configurations
The configurations for memory and cpu usage can be configured in Docker. For example, if you have 4 processors on your machine (i.e. Intel Quad-core), you can allocate up to 4 CPU's for your Docker container to use. You are also able to set the memory allocated. The default shared memory has been set to 2GB. These configurations can speed up the ui test processes.

Example:
--threads=2, 2 cpus = 1065.889s total for test phase
--threads=2, 4 cpus = 949.521s total for test phase
**116.368s time savings**

Can be configured in: Docker > Preferences > Resources

To monitor your resources, run the following Docker command:

```
docker run stats
```

## Useful commands and scripts

### Create PR

`npm run pr`

### Generate autofill scripts

```
cd bin/mweb-fill
npm install
npm run build
```

### Run Storybook

`npm run storybook`

Fastest build/rebuild
`npm run storybook:eval`

Available Environment Variables
STORYBOOK_PORT
STORYBOOK_DEVTOOL
STORYBOOK_SOURCEMAPS

More information on webpack devtool options can be found [here](https://webpack.js.org/configuration/devtool/).

### Run Prettier + Eslint Formatting

`npm run format --path=<file path or directory>`

This command will run Prettier formatting on files/directories at the specified `path` and then follow up with `eslint --fix` for the same `path`.
Sometimes what Prettier does conflicts with eslint so this helps resolve any resulting eslint issues after Prettier is run.

Be sure to include the `--path` flag. Examples:

`npm run format --path=src/airBooking/pages/shoppingLandingPage.jsx`
`npm run format --path=src/airBooking/pages`

## Project patterns

Please check documents in `doc/development-patterns`

## VScode setup

`<PROJECT_ROOT>/jsconfig.json` enables Go To definitions for VScode.

More documentation can be found [here](https://code.visualstudio.com/docs/languages/jsconfig).

It may also be necessary to add this to your `settings.json` file to enable auto imports

```
"javascript.preferences.importModuleSpecifier": "non-relative"
```
