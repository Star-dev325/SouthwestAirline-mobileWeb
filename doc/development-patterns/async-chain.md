# Async Chain Pattern in mWeb

### Overview

The async chain concept is a way to group multiple asynchronous actions
into a logical group. The primary reason is to let the application know
that multiple calls made in quick succession should be presented to the 
user as a single asynchronous call. This prevents the "loading spinner"
from flashing temporarily, and also allows multiple loading messages to
be presented to the user during a longer than average AJAX call.

For example, the Same Day flow makes
a call to determine whether it should the bound selection page to the 
user. If the screen does not need to be shown then the subsequent call 
for shopping information is made immediately. This is presented to the 
user as a single call to gather shopping information.

### Creating an Async Chain

An async chain is very simple to create. In the initiating action creator
add `dispatch(SharedActions.asyncChainStart())` to begin the chain. This
will start an async chain with no spinner messages. 

The chain will then continue until 
`dispatch(SharedActions.asyncChainFinish())` is called. This will end the
chain and tell the application that all asynchronous actions are 
finished. The finish action can be dispatched if the first call fails,
the first call completes without needing any more calls, or if the final 
call in the chain completes. 


```javascript
import { asyncChainStart, asyncChainFinish } from 'src/shared/actions/sharedActions';
import { fetchSomeData, fetchMoreData } from 'src/data/api';

export const getSomeDataInit = () => ({ type: 'SOME_INIT' });
export const getSomeDataSuccess = (response) => ({ type: 'SOME_SUCCESS', response });
export const getSomeDataFailure = (error) => ({ type: 'SOME_FAILURE', error });

export const getMoreDataInit = () => ({ type: 'MORE_INIT' });
export const getMoreDataSuccess = (response) => ({ type: 'MORE_SUCCESS', response });
export const getMoreDataFailure = (error) => ({ type: 'MORE_FAILURE', error });


export const getSomeData = (query) => (dispatch) => {
  dispatch(asyncChainStart());
  dispatch(getSomeDataInit());

  return fetchSomeData(query)
    .then((response) => {
      if (response.shouldGetMoreData) {
        dispatch(getMoreData(response.moreDataQuery));
      } else {
        dispatch(asyncChainFinish());
      }

      dispatch(getSomeDataSuccess(response));
    })
    .catch((error) => {
      dispatch(asyncChainFinish());
      dispatch(getSomeDataFailure());
    });
};

export const getMoreData = (query) => (dispatch) => {
  dispatch(getMoreDataInit());

  return fetchMoreData(query)
    .then((response) => {
      dispatch(asyncChainFinish());
      disaptch(getMoreDataSuccess(response));
    })
    .catch((error) => {
      dispatch(asyncChainFinish());
      dispatch(getMoreDataFailure(error));
    }
};
```

### Presenting multiple spinner messages

If the chain of asynchronous calls take an especially long time we may
want to present multiple messages to the user to indicate that the app 
remains responsive. This can be done by passing an array of strings as 
the first argument to the `asyncChainStart` action creator. The second 
argument can tell the application how often to update the messages. The 
default value is 5 seconds.
