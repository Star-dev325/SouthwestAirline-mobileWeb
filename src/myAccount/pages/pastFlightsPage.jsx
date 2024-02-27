// @flow
import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import MyAccountFlightCard from 'src/myAccount/components/myAccountFlightCard';
import ConfirmationNumberSubtitle from 'src/myAccount/components/confirmationNumberSubtitle';
import MyTripsNumberHeader from 'src/myAccount/components/myTripsNumberHeader';
import MyTripsPageHeader from 'src/myAccount/components/myTripsPageHeader';
import BookingTeaser from 'src/myAccount/components/bookingTeaser';
import Container from 'src/shared/components/container';
import Button from 'src/shared/components/button';
import i18n from '@swa-ui/locale';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import { getPastFlights, clearPastFlights } from 'src/myAccount/actions/myAccountActions';
import { buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';
import transformToSearchFlightRequest from 'src/myAccount/transformers/pastFlightTransformer';
import FlowStatusActions from 'src/shared/actions/flowStatusActions';
import { updateFlightSearchRequestAndSyncToFormData } from 'src/airBooking/actions/airBookingActions';
import { showDialog } from 'src/shared/actions/dialogActions';
import { retrieveBookingTeaser } from 'src/wcm/actions/wcmActions';

import MyTripType from 'src/myAccount/constants/myTripType';
import { STATUS } from 'src/shared/constants/flowConstants';

import type {
  PastFlightsPageType,
  PastFlightType,
  TransformedSearchRequestType
} from 'src/myAccount/flow-typed/myAccount.types';
import type { Push } from 'src/shared/flow-typed/shared.types';
import type { BookingTeaserType } from 'src/wcm/flow-typed/wcm.types';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';

type Props = {
  push: Push,
  pastFlightsPage: PastFlightsPageType,
  bookingTeaser: ?BookingTeaserType,
  showDialogFn: (*) => Promise<*>,
  getPastFlightsFn: () => void,
  clearPastFlightsFn: () => void,
  setFlowStatusFn: (string, string) => void,
  updateFlightSearchRequestAndSyncToFormDataFn: (TransformedSearchRequestType) => void,
  retrieveBookingTeaserFn: () => void
};

export class PastFlightsPage extends Component<Props> {
  componentDidMount() {
    const { getPastFlightsFn } = this.props;

    getPastFlightsFn();
  }

  componentWillUnmount() {
    this.props.clearPastFlightsFn();
  }

  _onClickBookATrip = () => {
    this.props.push(
      buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'airBookingIndex' }), null, {
        cleanFlow: true
      })
    );
  };

  _rebook = (flight: PastFlightType) => {
    const { push, setFlowStatusFn, updateFlightSearchRequestAndSyncToFormDataFn, showDialogFn } = this.props;
    const searchRequest = transformToSearchFlightRequest(flight);

    if (searchRequest) {
      setFlowStatusFn('airBooking', STATUS.INITIAL);
      updateFlightSearchRequestAndSyncToFormDataFn(searchRequest);
      push(getNormalizedRoute({ routeName: 'airBookingIndex' }));
    } else {
      showDialogFn({
        active: true,
        name: 'airport-list-international-not-supported',
        title: i18n('SHARED__AIRPORT_LIST__WE_ARE_WORKING_ON_IT'),
        verticalLinks: {
          links: [
            {
              label: i18n('SHARED__AIRPORT_LIST__VISIT_SOUTHWEST_DOT_COM'),
              href: 'http://www.southwest.com/?src=LinkMobileWeb&clk=LinkMobileWeb'
            },
            {
              label: i18n('SHARED__BUTTON_TEXT__PHONE_I_FLY_SWA'),
              href: 'tel:1-800-435-9792'
            }
          ]
        },
        message: i18n('SHARED__AIRPORT_LIST__INTERNATIONAL_NOT_SUPPORTED'),
        closeLabel: i18n('SHARED__BUTTON_TEXT__CANCEL')
      });
    }
  };

  _getComponentsForPastFlights = (pastFlights: Array<PastFlightType>) =>
    // $FlowFixMe - .map<React.Node> Type - Need Babel Update
    pastFlights.map((flight, key: number) => {
      const { dates, originDescription, destinationDescription } = flight;

      return (
        <MyAccountFlightCard
          dates={dates}
          originDescription={originDescription}
          destinationDescription={destinationDescription}
          key={key}
        >
          <ConfirmationNumberSubtitle confirmationNumber={flight.confirmationNumber} />
          <Button size="larger" color="grey" fluid onClick={() => this._rebook(flight)} ref="checkPriceButton">
            {i18n('MY_ACCOUNT__FLIGHT_CARD__REBOOK_IT')}
          </Button>
        </MyAccountFlightCard>
      );
    });

  _onTripTypeSelectChange = (path: string) => {
    this.props.push(path);
  };

  render() {
    const { pastFlightsPage, bookingTeaser, retrieveBookingTeaserFn } = this.props;
    const numberOfPastFlights = _.isEmpty(pastFlightsPage) ? 0 : pastFlightsPage.numberOfPastFlights;

    return (
      <div>
        <MyTripsPageHeader
          currentView={MyTripType.PAST_FLIGHTS.value}
          onTripTypeSelectChange={this._onTripTypeSelectChange}
        />
        <Container>
          <MyTripsNumberHeader value={numberOfPastFlights} type={MyTripType.PAST_FLIGHTS.value} />
          {numberOfPastFlights < 1 ? (
            <BookingTeaser
              bookingTeaser={bookingTeaser}
              retrieveBookingTeaserFn={retrieveBookingTeaserFn}
              onClickBookATrip={this._onClickBookATrip}
            />
          ) : (
            this._getComponentsForPastFlights(pastFlightsPage.pastFlights)
          )}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  pastFlightsPage: _.get(state, 'app.myAccountPages.pastFlightsPage', {}),
  bookingTeaser: _.get(state, 'app.wcmContent.bookingTeaser.product_feature', {})
});

const mapDispatchToProps = {
  getPastFlightsFn: getPastFlights,
  clearPastFlightsFn: clearPastFlights,
  setFlowStatusFn: FlowStatusActions.setFlowStatus,
  updateFlightSearchRequestAndSyncToFormDataFn: updateFlightSearchRequestAndSyncToFormData,
  showDialogFn: showDialog,
  retrieveBookingTeaserFn: retrieveBookingTeaser
};

const enhancers = _.flowRight(withConnectedReactRouter, connect(mapStateToProps, mapDispatchToProps));

export default enhancers(PastFlightsPage);
