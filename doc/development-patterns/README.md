# Development Patterns

### Overview

The aim of this section is promote patterns, practices, utilities that can help us create more consistent code across the application. In addition, we may simply want to communicate a new/updated pattern and document any known limitations.

Examples might include new mixins, helpers or specific patterns such as back/refresh logic or where to put literal text, constants and messages.

Please also send out a link via HipChat to the entire team so they have the best chance of being aware of the new pattern.

### Recommendation

Working code is often the best example to communicate the implementation of a new pattern so including a link or referencing a folder in stash can help the reader quickly find the example.

That said additional, concise guidance that captures assumptions, limitations or intent is always helpful to clarify a new or updated concept.

### File structure

.
├── backstop_data
│   ├── bitmaps_reference
│   └── engine_scripts
│   └── chromy
├── bin
│   ├── apache-docker
│   │   ├── app
│   │   └── conf
│   │   └── extra
│   ├── api-health-check
│   │   ├── lib
│   │   └── specs
│   ├── book
│   │   └── lib
│   │   ├── account
│   │   ├── flight
│   │   ├── login
│   │   └── utils
│   ├── change-session-timeout
│   ├── create-pr
│   │   └── lib
│   ├── deploy
│   │   ├── config
│   │   └── lib
│   ├── es6
│   ├── eslint_rules
│   │   ├── lib
│   │   └── test
│   ├── in-flight-server
│   │   ├── content
│   │   └── indicator
│   │   └── images
│   ├── jenkins
│   │   ├── gradle
│   │   │   └── wrapper
│   │   └── pipelineAsCode
│   │   └── helpers
│   │   ├── main
│   │   └── test
│   ├── mweb-fill
│   │   ├── data
│   │   ├── forms
│   │   ├── lib
│   │   ├── nginx
│   │   │   └── certs
│   │   └── templates
│   ├── snapshots-diff
│   ├── sonar
│   │   └── docker
│   │   ├── postgres
│   │   └── sonar
│   └── which-api-version
├── chapi
│   └── doc
├── config
├── doc
│   ├── development-patterns
│   │   └── images
│   ├── diagrams
│   └── workflow
├── flow-typed
│   ├── google
│   └── npm
├── gulpfile.js
│   ├── config
│   │   ├── iconfont
│   │   │   └── templates
│   │   └── server
│   │   └── libs
│   ├── libs
│   └── tasks
├── ide
│   └── IntelliJ
├── mocks
├── nightwatch-screenshots
├── src
│   ├── airBooking
│   │   ├── actions
│   │   │   ├── **tests**
│   │   │   │   ├── airBookingActionsSpecs.js
│   │   │   │   └── ...
│   │   │   ├── airBookingActionTypes.js
│   │   │   ├── airBookingActions.js
│   │   │   └── ...
│   │   ├── analytics
│   │   │   ├── **tests**
│   │   │   │   ├── confirmationSelectorSpecs.js
│   │   │   │   └── ...
│   │   │   ├── confirmationSelector.js
│   │   │   ├── index.js
│   │   │   └── ...
│   │   ├── components
│   │   │   ├── **tests**
│   │   │   │   ├── addPassengerFieldSpecs.js
│   │   │   │   └── ...
│   │   │   ├── chase
│   │   │   │   └── chaseInstantCredit.jsx
│   │   │   ├── styles
│   │   │   │   ├── carCrossSell.scss
│   │   │   │   └── ...
│   │   │   ├── addPassengerField.jsx
│   │   │   └── ...
│   │   ├── constants
│   │   │   ├── airBookingConstants.js
│   │   │   └── ...
│   │   ├── enhancers
│   │   │   ├── **tests**
│   │   │   │   ├── withExpressCheckoutSpecs.js
│   │   │   │   └── ...
│   │   │   ├── withExpressCheckout.js
│   │   │   └── ...
│   │   ├── flow-typed
│   │   │   └── airBooking.types.js
│   │   ├── formSchemas
│   │   │   ├── passengerInfoSchema.js
│   │   │   └── ...
│   │   ├── helpers
│   │   │   ├── **tests**
│   │   │   │   ├── compareSearchFlightRequestSpecs.js
│   │   │   │   └── ...
│   │   │   ├── compareSearchFlightRequest.js
│   │   │   └── ...
│   │   ├── pages
│   │   │   ├── **tests**
│   │   │   │   ├── airBookingContactMethodPageSpecs.js
│   │   │   │   └── ...
│   │   │   ├── styles
│   │   │   │   ├── bookingFlightForm.scss
│   │   │   │   └── ...
│   │   │   ├── airBookingContactMethodPage.jsx
│   │   │   └── ...
│   │   ├── reducers
│   │   │   ├── **tests**
│   │   │   │   ├── airBookingReducersSpecs.js
│   │   │   │   ├── indexSpecs.js
│   │   │   │   └── ...
│   │   │   ├── airBookingReducers.js
│   │   │   ├── index.js
│   │   │   └── ...
│   │   ├── selectors
│   │   │   ├── **tests**
│   │   │   │   ├── airBookingContactMethodSelectorsSpecs.js
│   │   │   │   └── ...
│   │   │   ├── airBookingContactMethodSelectors.js
│   │   │   └── ...
│   │   ├── transformers
│   │   │   ├── **tests**
│   │   │   │   ├── flightProductTransformerSpecs.js
│   │   │   │   └── ...
│   │   │   ├── flightProductTransformer.js
│   │   │   └── ...
│   │   ├── viewModels
│   │   │   ├── **tests**
│   │   │   │   ├── flightProductModelSpecs.js
│   │   │   │   └── ...
│   │   │   ├── flightProductModel.js
│   │   │   └── ...
│   │   ├── index.jsx
│   │   └── index.scss
│   ├── airCancel
│   │   └── ...
│   ├── airChange
│   │   └── ...
│   ├── airports
│   │   └── ...
│   ├── app
│   │   ├── **tests**
│   │   │   └── appSpecs.js
│   │   ├── components
│   │   │   ├── **tests**
│   │   │   │   └── connectedHistorySpecs.js
│   │   │   └── connectedHistory.jsx
│   │   ├── helpers
│   │   │   └── urlCleanerHelpers.js
│   │   ├── reducers
│   │   │   ├── **tests**
│   │   │   │   └── appReducersSpecs.js
│   │   │   └── appReducers.js
│   │   ├── stores
│   │   │   └── uuidRepo.js
│   │   ├── app.jsx
│   │   ├── bootstrap.jsx
│   │   ├── index.js
│   │   ├── index.scss
│   │   └── routes.jsx
│   ├── carBooking
│   │   └── ...
│   ├── carCancel
│   │   └── ...
│   ├── chase
│   │   └── ...
│   ├── checkIn
│   │   └── ...
│   ├── companion
│   │   └── ...
│   ├── earlyBird
│   │   └── ...
│   ├── enroll
│   │   └── ...
│   ├── flightStatus
│   │   └── ...
│   ├── homeAndNav
│   │   └── ...
│   ├── images
│   │   └── ...
│   ├── locationServices
│   │   └── ...
│   ├── login
│   │   └── ...
│   ├── lonestar
│   │   └── ...
│   ├── manifest
│   │   └── manifest.json
│   ├── myAccount
│   │   └── ...
│   ├── polyfills
│   │   └── disableSafariScrolling.js
│   ├── rapidRewards
│   │   └── ...
│   ├── shared
│   │   └── ...
│   ├── specialOffers
│   │   └── ...
│   ├── standby
│   │   └── ...
│   ├── svgs
│   │   └── ...
│   ├── travelAdvisory
│   │   └── ...
│   ├── viewReservation
│   │   └── ...
│   ├── wcm
│   │   └── ...
│   └── whereWeFly
│   └── ...
├── storybook
│   ├── libs
│   │   ├── storyReduxProvider.js
│   │   └── withFakeClock.js
│   ├── stories
│   │   ├── base
│   │   ├── components
│   │   │   ├── additionalPassportInfoFormStory.js
│   │   │   └── ...
│   │   └── pages
│   │   ├── airBooking
│   │   │   ├── flightShoppingPageStory.js
│   │   │   └── ...
│   │   ├── airCancel
│   │   │   └── ...
│   │   ├── airChange
│   │   │   └── ...
│   │   ├── carCancel
│   │   │   └── ...
│   │   ├── companion
│   │   │   └── ...
│   │   ├── earlyBird
│   │   │   └── ...
│   │   ├── flightStatus
│   │   │   └── ...
│   │   └── ...
│   ├── addons.js
│   ├── config.js
│   ├── preview-head.html
│   └── webpack.config.js
├── test
│   ├── analyticsContracts
│   │   ├── AirBookingStore
│   │   ├── AirChangeStore
│   │   ├── CarBookingStore
│   │   ├── CompanionBookingStore
│   │   ├── EarlyBirdStore
│   │   └── FlightStatusStore
│   ├── apiContract
│   │   └── schema
│   ├── builders
│   │   ├── apiRequest
│   │   │   └── ...
│   │   ├── apiResponse
│   │   │   └── ...
│   │   ├── formData
│   │   ├── libs
│   │   └── model
│   ├── e2e
│   │   ├── analytics
│   │   │   └── expectations
│   │   │   ├── airBooking
│   │   │   └── companion
│   │   ├── commands
│   │   ├── data
│   │   ├── helpers
│   │   ├── live
│   │   │   └── airBooking
│   │   ├── pages
│   │   │   ├── airBooking
│   │   │   └── ...
│   │   ├── reports
│   │   │   ├── airBooking
│   │   │   └── ...
│   │   └── tests
│   │   ├── airBooking
│   │   └── ...
│   ├── localStorageMock
│   ├── ui
│   │   └── scenarios
│   │   │   ├── airBooking.js
│   │   │   ├── airCancel.js
│   │   │   └── ...
│   │   └── backstop.config.js
│   └── unit
│   ├── assertions
│   │   ├── pathname.js
│   │   └── search.js
│   ├── helpers
│   │   ├── **tests**
│   │   │   ├── clearRequireCacheSpecs.js
│   │   │   └── ...
│   │   ├── aurequire.js
│   │   ├── clearRequireCache.js
│   │   ├── ...
│   │   └── waitFor.js
│   ├── mockImage.js
│   └── setup.js
├── webpack
│   ├── config
│   │   ├── common.js
│   │   ├── dev.js
│   │   └── prod.js
│   ├── environmentConfigGenerator.js
│   ├── index.js
│   └── mainGenerator.js
├── README.md
├── g
├── nexusPromote.gradle
├── nexusPromote.sh
├── package-lock.json
└── package.json
