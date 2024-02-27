// @flow
import i18n from '@swa-ui/locale';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as CarCancelActions from 'src/carCancel/actions/carCancelActions';
import { getCarCancelInfo } from 'src/carCancel/selectors/carCancelConfirmationPageSelector';
import type { CarPickUpProps } from 'src/shared/components/carPickUpInfo';
import CarPickUpInfo from 'src/shared/components/carPickUpInfo';
import Container from 'src/shared/components/container';
import type { DriverProps } from 'src/shared/components/driverInfo';
import DriverInfo from 'src/shared/components/driverInfo';
import Message from 'src/shared/components/message';
import NavItemLink from 'src/shared/components/navItemLink';
import PageHeader from 'src/shared/components/pageHeader';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import { flowRight, isEmpty } from 'src/shared/helpers/jsUtils';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';

type Props = {
  carCancelInfo: DriverProps & CarPickUpProps,
  retrieveAndCancelCarReservationWithSearchTokenFn: (string) => void,
  query: {
    searchToken?: string
  }
};

export const CarCancelConfirmationPage = (props: Props) => {
  const { 
    carCancelInfo, 
    retrieveAndCancelCarReservationWithSearchTokenFn, 
    query: { searchToken } = {} } = props;
  const { cityName, cityState, confirmationNumber, driver, pickUpTime, vendorImage } = carCancelInfo;

  useEffect(() => {
    if (searchToken && isEmpty(carCancelInfo)) {
      retrieveAndCancelCarReservationWithSearchTokenFn(searchToken);
    }
  }, []);

  return (
    !isEmpty(carCancelInfo) && (
      <div>
        <PageHeader>{i18n('CAR_CANCEL__HEADER')}</PageHeader>

        <Container inverted>
          <Message status="success" className="p0">
            <h3 className="xxlarge bold white inline-block">{i18n('CAR_CANCEL__MESSAGE')}</h3>
          </Message>
        </Container>

        <div className="bgwhite px0 py4">
          <p className="large gray5 py2 mt2 bdb px5" data-qa="cancelTitle">
            {i18n('CAR_CANCEL__CANCEL_TITLE')}
          </p>
          <DriverInfo className="bdb mb4 mx5" driver={driver} confirmationNumber={confirmationNumber} />

          <CarPickUpInfo
            className="px5 bdb py4"
            vendorImage={vendorImage}
            pickUpTime={pickUpTime}
            cityName={cityName}
            cityState={cityState}
          />
        </div>

        <div className="m5 pb5">
          <NavItemLink className="link-bar" link={getNormalizedRoute({ routeName: 'carBookingIndex' })}>
            {i18n('CAR_CANCEL__NAV_LINK')}
          </NavItemLink>
        </div>
      </div>)
  );
};

const mapStateToProps = (state) => ({
  carCancelInfo: getCarCancelInfo(state)
});

const mapDispatchToProps = {
  retrieveAndCancelCarReservationWithSearchTokenFn: CarCancelActions.retrieveAndCancelCarReservationWithSearchToken
};

export default flowRight(
  withRouter,
  withConnectedReactRouter,
  withBodyClass('bgwhite'),
  connect(mapStateToProps, mapDispatchToProps)
)(CarCancelConfirmationPage);
