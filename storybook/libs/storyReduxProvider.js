import React from 'react';
import { Provider } from 'react-redux';

export const StoryReduxProvider = (store) => (story) => {
  return <Provider store={store}>{story()}</Provider>;
};
