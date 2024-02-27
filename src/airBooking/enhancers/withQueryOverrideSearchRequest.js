// @flow

import React from 'react';
import type { ComponentType } from 'react';
import _ from 'lodash';
import {
  getSearchRequestFromQuery,
  addDefaultValueOnSearchRequest
} from 'src/airBooking/helpers/shoppingLandingPageHelper';
import type { FlightProductSearchRequest, ShoppingLandingPageQuery } from 'src/airBooking/flow-typed/airBooking.types';

type Props = {
  query: ShoppingLandingPageQuery,
  searchRequest: FlightProductSearchRequest
};

const withQueryOverrideSearchRequest = (Comp: ComponentType<*>) =>
  class WithQueryOverrideSearchRequest extends React.Component<Props> {
    _generateSearchRequest(searchRequest: FlightProductSearchRequest, query: ShoppingLandingPageQuery) {
      let result = searchRequest;
      const searchRequestChangedByUser = !searchRequest.origin || !searchRequest.destination;

      if (searchRequestChangedByUser && !_.isEmpty(query)) {
        result = _.merge({}, searchRequest, getSearchRequestFromQuery(query));
      }

      return addDefaultValueOnSearchRequest(result);
    }

    render() {
      const { query, searchRequest } = this.props;
      const updatedSearchRequest = this._generateSearchRequest(searchRequest, query);
      const restProps = _.omit(this.props, 'searchRequest');

      return <Comp {...restProps} searchRequest={updatedSearchRequest} />;
    }
  };

export default withQueryOverrideSearchRequest;
