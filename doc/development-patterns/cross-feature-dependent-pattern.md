# Cross Feature Dependent Pattern

> Currently in View Reservation page, It's the entry point for different features, such as AirChange, AirCancel, Checkin etc. In this kind of situation, the data flow should looks as follow:

```
                                                                                                  ┌────────────────────┐
                                                                                                  │  Air Cancel Store  │
┌────────────────────┐                             ┌--------> air cancel store listener --------> └────────────────────┘
│  View Reservation  │------- trigger action ------┤
└────────────────────┘                             └--------> async action promise transition --> ┌────────────────────┐
                                                                                                  │     Air Cancel     │
                                                                                                  └────────────────────┘
```

That means the only touch point between 2 features are the actions. There are a few things need to be take care:

1. View Reservation should not listen to other feature's store.
2. If the action is asynchronous, View Reservation should call it as promise, such as AirCancelActions.retrieveReservationForCancel({recordLocator, firstName, lastName}).then(() => { this.\_transitionToCancelPage();}); If the action is synchronous, you can call the transitionToXXX after action directly
3. The feature who will be accessed from other feature, its store must have default value, because there is a time gap between the store update & transitionTo. There is a possibility that transitionTo happens before store update, we must make sure the view will not be broken even store is not updated.
