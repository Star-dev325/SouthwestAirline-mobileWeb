// @flow
import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import i18n from '@swa-ui/locale';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import { getSavedFlights, clearSavedFlights } from 'src/myAccount/actions/myAccountActions';
import { resetAirBookingFlowData, searchForFlights } from 'src/airBooking/actions/airBookingActions';
import { retrieveBookingTeaser } from 'src/wcm/actions/wcmActions';
import { showDialog, hideDialog } from 'src/shared/actions/dialogActions';
import { buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';
import transformToCHAPICheckPriceRequest from 'src/myAccount/transformers/savedFlightTransformer';
import { getFirstShoppingPageParams } from 'src/airBooking/helpers/flightShoppingPageHelper';
import MyAccountFlightCard from 'src/myAccount/components/myAccountFlightCard';
import PaxSubtitle from 'src/myAccount/components/paxSubtitle';
import Button from 'src/shared/components/button';
import Container from 'src/shared/components/container';
import MyTripsNumberHeader from 'src/myAccount/components/myTripsNumberHeader';
import BookingTeaser from 'src/myAccount/components/bookingTeaser';
import MyTripsPageHeader from 'src/myAccount/components/myTripsPageHeader';
import MyTripType from 'src/myAccount/constants/myTripType';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';

import type { SavedFlightsPageType, SavedFlightType } from 'src/myAccount/flow-typed/myAccount.types';
import type { Push } from 'src/shared/flow-typed/shared.types';
import type { BookingTeaserType } from 'src/wcm/flow-typed/wcm.types';
import type { FlightProductSearchRequest } from 'src/airBooking/flow-typed/airBooking.types';

type SearchForFlightsParameters = {
  searchRequest: FlightProductSearchRequest,
  nextPagePath: string
};

type Props = {
  push: Push,
  savedFlightsPage: SavedFlightsPageType,
  bookingTeaser: ?BookingTeaserType,
  getSavedFlightsFn: () => void,
  clearSavedFlightsFn: () => void,
  resetAirBookingFlowDataFn: () => void,
  searchForFlightsFn: (SearchForFlightsParameters) => void,
  retrieveBookingTeaserFn: () => void,
  showDialogFn: (*) => void,
  hideDialogFn: () => void
};

export class SavedFlightsPage extends Component<Props> {
  componentDidMount() {
    this.props.getSavedFlightsFn();
  }

  componentWillUnmount() {
    this.props.clearSavedFlightsFn();
  }

  _checkPrice = (savedFlight: SavedFlightType) => {
    const { resetAirBookingFlowDataFn, searchForFlightsFn, showDialogFn, hideDialogFn } =
      this.props;
    const { checkPriceMessage } = savedFlight;

    if (checkPriceMessage) {
      showDialogFn({
        name: 'CHECK_PRICE_MESSAGE',
        message: checkPriceMessage,
        buttons: [
          {
            label: i18n('SHARED__BUTTON_TEXT__OK'),
            onClick: () => hideDialogFn()
          }
        ]
      });
    } else {
      resetAirBookingFlowDataFn();
      const searchRequest = transformToCHAPICheckPriceRequest(savedFlight);
      const nextPagePath = buildPathWithParamAndQuery(
        getNormalizedRoute({ routeName: 'airBookingFlightShopping' }),
        getFirstShoppingPageParams()
      );

      searchForFlightsFn({ searchRequest, nextPagePath });
    }
  };

  _getComponentsForSavedFlights = (savedFlights: Array<SavedFlightType>) =>
    // $FlowFixMe - .map<React.Node> Type - Need Babel Update
    savedFlights.map((savedFlight, key: number) => {
      const {
        passengers: { adults },
        dates,
        originDescription,
        destinationDescription
      } = savedFlight;

      return (
        <MyAccountFlightCard
          dates={dates}
          originDescription={originDescription}
          destinationDescription={destinationDescription}
          key={key}
        >
          <PaxSubtitle numberOfAdult={adults} />
          <Button
            size="larger"
            color="grey"
            fluid
            onClick={this._checkPrice.bind(this, savedFlight)}
            ref="checkPriceButton"
          >
            {i18n('MY_ACCOUNT__FLIGHT_CARD__CHECK_PRICE')}
          </Button>
        </MyAccountFlightCard>
      );
    });

  _onClickBookATrip = () => {
    const { push } = this.props;

    push(
      buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'airBookingIndex' }), null, {
        cleanFlow: true
      })
    );
  };

  _onTripTypeSelectChange = (path: string) => {
    this.props.push(path);
  };

  render() {
    const { bookingTeaser, savedFlightsPage, retrieveBookingTeaserFn } = this.props;
    const numberOfSavedFlights = _.isEmpty(savedFlightsPage) ? 0 : savedFlightsPage.numberOfSavedFlights;

    return (
      <div>
        <MyTripsPageHeader
          currentView={MyTripType.SAVED_FLIGHTS.value}
          onTripTypeSelectChange={this._onTripTypeSelectChange}
        />
        <Container>
          <MyTripsNumberHeader value={numberOfSavedFlights} type={MyTripType.SAVED_FLIGHTS.value} />
          {numberOfSavedFlights < 1 ? (
            <BookingTeaser
              bookingTeaser={bookingTeaser}
              retrieveBookingTeaserFn={retrieveBookingTeaserFn}
              onClickBookATrip={this._onClickBookATrip}
            />
          ) : (
            this._getComponentsForSavedFlights(savedFlightsPage.savedFlights)
          )}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  savedFlightsPage: _.get(state, 'app.myAccountPages.savedFlightsPage', {}),
  bookingTeaser: _.get(state, 'app.wcmContent.bookingTeaser.product_feature', {})
});

const mapDispatchToProps = {
  getSavedFlightsFn: getSavedFlights,
  clearSavedFlightsFn: clearSavedFlights,
  resetAirBookingFlowDataFn: resetAirBookingFlowData,
  searchForFlightsFn: searchForFlights,
  retrieveBookingTeaserFn: retrieveBookingTeaser,
  showDialogFn: showDialog,
  hideDialogFn: hideDialog
};

const enhancers = _.flowRight(withConnectedReactRouter, connect(mapStateToProps, mapDispatchToProps));

export default enhancers(SavedFlightsPage);
