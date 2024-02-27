# Page Level Test Pattern

## Summary

The tests of page level are divided into two parts, one part is called **presentational component test**, we test that all sub components of the page can render correctly. The other one is called **container component test** which used to test the connected page have right behaviors.

## Naming

Overall, for page level there would be two kinds of tests in two different \*Specs.js files. For example, in shoppingLandingPage:

- `shoppingLandingPageSpecs.js` is presentational component test for shoppingLandingPage
- `shoppingLandingPageEnhancedSpecs.js` is container component test for shoppingLandingPage

And bellow is the file structure:

```
|-- src
	|-- airBooking
		|-- pages
			|-- __tests__
				|-- shoppingLandingPageSpecs.js
				|-- shoppingLandingPageEnhancedSpecs.js
			|-- shoppingLandingPage.jsx
```

## League

For **presentational component test**, it will test:

- Sub-components render correctly
- Behaviors which not involved with URL change or API call

For **container component test**, it will test:

- Behaviors which contain URL change
- Behaviors which contain API call
- Behaviors of error popup
- All the enhancers work well together

## How to write

- For presentational component test, it's easy to write and same with our pure component test. Notice: we should only use the `mount` method to make sure we can test the sub components of page.

- For container component test, we add a `integrationMount` function to help us mount connected page. Here is the source code of `integrationMount`.

```
export const integrationMount = ({withDialog = false, location = '/', path = '/'} = {}) => {
  const memoryHistory = createMemoryHistory({
    initialEntries: [location]
  });

  return (state, Component, props = {}) => {
    const store = createMockStoreWithRouterMiddleware(memoryHistory)(state);
    return mount(
      <Router history={memoryHistory}>
        <div>
          <Provider store={store}>
            <div>
              {withDialog && <Dialog />}
              <Route
                render={routeProps => (
                  <Component
                    {...routeProps}
                    {...props}
                  />
                )}
                path={path}
              />
            </div>
          </Provider>
        </div>
      </Router>
    );
  };
};
```

In tests， we can use this `integrationMount` to
mount a connected page, like this:

```
connectedShoppingLandingPage = integrationMount()(store, ShoppingLandingPage, props);
```

or

```
connectedShoppingLandingPage = integrationMount({withDialog: true})(store, ShoppingLandingPage, props);
```

or

```
const location = '?fromCity=CAK&toCity=ATL&departDate=08/23/2016&returnDate=08/25/2016&tripType=RT';
connectedShoppingLandingPage = integrationMount({location})(initialState, ShoppingLandingPage, props);

```

the parameter `store` is build by `createMockStoreWithRouterMiddleware`, and the data is corresponding to the props of each page. You also can get more information about how to write the integration test refer to the code in `shoppingLandingPageEnhancedSpecs.js`.

## Why not use renderHelpers

In our code base, there are many old tests which import `renderHelpers`. The reason why we don't use it in our new tests is that it import all the routes every time inside it by `const RegisteredRoutes = require('src/app/routes'); `. In the routes component, it import index files of all the features, which means it will import all the pages and stores. This will cause two problems:

- It imports many things which may cause memory issue.
- Besides, cause it imports all the stores, it's hard for us to mock or stub the stores during the tests.

So It's better to use `mount` or `shallow` from `enzyme.js` directly. That's the reason why we add `integrationMount` to help us mount connected page with route.
