// @flow
import i18n from '@swa-ui/locale';
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as AirChangeActions from 'src/airChange/actions/airChangeActions';
import type { FareProductionSelection, FlightDetails } from 'src/airChange/flow-typed/airChange.types';
import { raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';
import FareProductList from 'src/shared/components/fareProductList';
import FlightHeader from 'src/shared/components/flightHeader';
import Footnotes from 'src/shared/components/footnotes';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import type { FareProduct, ProductDefinitions } from 'src/shared/flow-typed/shared.types';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import { fetchFareDetailsJson } from 'src/wcm/actions/wcmActions';

type Props = FlightDetails & {
  productDefinitions: ProductDefinitions,
  fareDetailsLink: { href: string, labelText: string },
  fareSelectedFn: (selection: FareProductionSelection) => void,
  fetchFareDetailsJsonFn: (string, string) => void,
  goBack: () => void
};

export const AirChangeSelectFarePage = ({
  productDefinitions,
  fareDetailsLink,
  card: { arrivalTime, departureTime, fares, flightNumbers, isNextDayArrival, isOvernight, stopDescriptionOnSelect },
  page: {
    _meta: { isPromoCodeApplied = false },
    disclaimerWithLinks
  },
  flightCardIndex,
  selectedBounds,
  selectedProducts,
  isLoggedIn,
  isReaccom,
  sortByValue,
  page,
  fareSelectedFn,
  goBack,
  fetchFareDetailsJsonFn
}: Props) => {
  const { disclaimers } = productDefinitions;
  const { href: fareDetailsHREF, labelText: fareDetailsLabel } = fareDetailsLink ?? {};

  const _onClickCancel = () => {
    goBack();
  };

  const _transitionToFareDetails = () => {
    fetchFareDetailsJsonFn(fareDetailsHREF, getNormalizedRoute({ routeName: 'fareDetails' }));
    raiseSatelliteEvent('fare details page');
  };

  const _fareSelected = (fareProduct: FareProduct) => {
    fareSelectedFn({
      flightCardIndex,
      sortByValue,
      fareProduct,
      selectedBounds,
      selectedProducts,
      isLoggedIn,
      isReaccom,
      page,
      isDynamicWaiver: false
    });
  };

  const renderFooter = () => (
    <div className="py5 bdt large">
      <a data-qa="fare-details-link" className="block pblue" onClick={_transitionToFareDetails}>
        {fareDetailsLabel}
      </a>
    </div>
  );

  return (
    <div className="flight-select-fare--container">
      <PageHeaderWithButtons
        title={'Select Fare'}
        rightButtons={[{ name: i18n('SHARED__BUTTON_TEXT__CANCEL'), className: 'cancel', onClick: _onClickCancel }]}
      />
      <FlightHeader
        departureTime={departureTime}
        arrivalTime={arrivalTime}
        flightNumbers={flightNumbers}
        stopDescription={stopDescriptionOnSelect}
        isNextDay={isNextDayArrival}
        isOvernight={isOvernight}
      />
      <div className={'bgwhite pt4 px4'}>
        {disclaimerWithLinks && (
          <div className={'bgltblue px4 py4 mb5'} data-qa="disclaimerWithLinks">
            <p dangerouslySetInnerHTML={{ __html: disclaimerWithLinks }} />
          </div>
        )}
        <FareProductList
          fares={fares}
          productDefinitions={productDefinitions}
          isPromoCodeApplied={isPromoCodeApplied}
          onFareSelected={_fareSelected}
          showPriceDifference
        />
        {renderFooter()}
      </div>
      <div className="white px4 py5">
        <Footnotes footnotes={disclaimers} />
      </div>
    </div>
  );
};

export const mapStateToProps = (state: any, props: any) => ({
  fareDetailsLink: _.get(state, 'app.airChange.changeShoppingPage.response._links.fareDetailsJson'),
  productDefinitions: _.get(state, 'app.airChange.changeShoppingPage.response.productDefinitions'),
  ..._.get(state, `app.airChange.selectFarePage.selectedFlight.${props.params.direction}`)
});

const mapDispatchToProps = {
  fareSelectedFn: AirChangeActions.fareSelected,
  fetchFareDetailsJsonFn: fetchFareDetailsJson
};

const enhancers = _.flowRight(withRouter, withConnectedReactRouter, connect(mapStateToProps, mapDispatchToProps));

export default enhancers(AirChangeSelectFarePage);
