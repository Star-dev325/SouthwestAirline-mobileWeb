# HOC(Higher-Order Components) pattern

### Motivation:

A higher-order component ([HOC](https://facebook.github.io/react/docs/higher-order-components.html)) is an advanced technique in React for reusing component logic. HOCs are not part of the React API, per se. They are a pattern that emerges from React’s compositional nature.

Concretely, a higher-order component is a function that takes a component and returns a new component.

```js
const EnhancedComponent = withEnhancedAbility(WrappedComponent);
```

React community previously recommended mixins as a way to handle cross-cutting concerns. But they realized that mixins create more trouble than they are worth.

You can get more detail information from here.

#### Practice:

So when we use HOC, we need to follow the same pattern in our project. Below is the details:

#### Folder structure:

Because the HOC is not a general component, we shouldn't put it in the components folder. We should create a folder named in `enhancers` the same level with components.

#### Function name:

Previously we always name the function as `connectXXXXX` which has the prefix `connect` , but it’s not meaningful. From the react blog site, we can see it use the prefix `with`. e.g. `withLogging`.

So, we should use the prefix `with` and add the ability name which you want to enhance.

#### HOC component name

In the HOC function, we will return a new enhanced component which wrapped the original one. So the new enhanced component should name as `Enhanced +.original component name` .e.g. `EnhancedCheckInAPISPage`.

It will help us recognize the enhanced component quickly when we debug our code in the browser.

#### HOC function style

Currently, in our code base, we have two ways to use the HOC.

The first way to use it like:

```javascript
const withForm = (options: Options) => (Component: *): ComponentType<*> => {
    const {XXX} = _.merge({}, defaultOptions, options);
    class WithForm extends React.Component<Props, State> {
       ...
       render() {
            return this.state.shouldRenderChildren && (<Component />);
          }
       }
    }
    const mapStateToProps = (state, props) => {...};

    const mapDispatchToProps = {...};

    return connect(mapStateToProps, mapDispatchToProps)(WithForm);
}
```

The second way to use it like:

```js
connectPaymentEditMode(Payment, options) {
    return React.createClass({})
}

connectPaymentEditMode(PaymentEdit, {
    fullScreenModalId: 'airBookingCreditCardUpdate',
    shouldUpdateGlobalHeader: false,
    transitionParams: () => {...},
    initPaymentInfoAndCreditCards: () => {...},
    clearData: () => {...}
});
```

The difference between these two ways:

1. the first way use [currying](https://en.wikipedia.org/wiki/Currying).
2. the second one pass multiple parameters into the function.

We prefer to use the first one so that we can use currying and it’s easy to compose multiple HOCs.
