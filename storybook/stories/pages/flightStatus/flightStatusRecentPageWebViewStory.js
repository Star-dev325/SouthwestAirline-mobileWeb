import { storiesOf } from '@storybook/react';
import React from 'react';
import dayjs from 'dayjs';
import configureMockStore from 'redux-mock-store';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { withFakeClock } from 'storybook/libs/withFakeClock';
import { FlightStatusRecentPage } from 'src/flightStatus/pages/flightStatusRecentPage';
import FlightSearchHistoryLocalStorageHelper from 'src/flightStatus/helper/flightSearchHistoryLocalStorageHelper';
import { transformToFlightSearchRequest } from 'src/flightStatus/transformers/flightStatusTransformer';
import withBodyClass from 'src/shared/enhancers/withBodyClass';

const EnhancedFlightStatusRecentPage = withBodyClass('is-webview')(FlightStatusRecentPage);

const store = configureMockStore()({
  app: {
    webView: { isWebView: true }
  }
});

storiesOf('pages/flightStatus/FlightStatusRecentPageWebView', module)
  .addDecorator(StoryReduxProvider(store))
  .addDecorator(withFakeClock('2018-03-23'))
  .add('webview', () => {
    prepareSearchRequestInStore();
    const props = {
      searches: FlightSearchHistoryLocalStorageHelper.get()
    };

    return <EnhancedFlightStatusRecentPage {...props} />;
  });

function prepareSearchRequestInStore() {
  FlightSearchHistoryLocalStorageHelper.save(
    transformToFlightSearchRequest('AUS', 'BWL', dayjs().subtract(3, 'days').format('YYYY-MM-DD'), '321')
  );
  FlightSearchHistoryLocalStorageHelper.save(
    transformToFlightSearchRequest('AUS', 'BWL', dayjs().subtract(2, 'days').format('YYYY-MM-DD'), '221')
  );
  FlightSearchHistoryLocalStorageHelper.save(
    transformToFlightSearchRequest('AUS', 'BWL', dayjs().subtract(1, 'days').format('YYYY-MM-DD'))
  );
  FlightSearchHistoryLocalStorageHelper.save(
    transformToFlightSearchRequest('AUS', 'BWL', dayjs().format('YYYY-MM-DD'), '121')
  );
}