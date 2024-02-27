import { shallow } from 'enzyme';
import _ from 'lodash';
import React from 'react';
import FlightSummaryCard from 'src/shared/components/flightSummaryCard/flightSummaryCard';
import BoundDetailBuilder from 'test/builders/model/boundDetailBuilder';
import ViewReservationBuilder from 'test/builders/model/viewReservationBuilder';

describe('flightSummaryCard', () => {
  let flightSummaryCard;
  const boundDetail = new BoundDetailBuilder().build();

  beforeEach(() => {
    flightSummaryCard = createComponent({ boundDetail });
  });

  context('when initialize', () => {
    it('should render properly', () => {
      expect(flightSummaryCard).to.be.present();
    });

    it('should render with correct class name', () => {
      expect(flightSummaryCard).to.have.className('flight-summary-card');
    });
  });

  context('when check the flight summary card header', () => {
    it('should render departure header when bound type is DEPARTING', () => {
      expect(flightSummaryCard.find('FlightSummaryCardHeader')).to.have.prop('isReturning').which.is.false;
      expect(flightSummaryCard.find('FlightSummaryCardHeader'))
        .to.have.prop('departureDate')
        .which.equal('Wed, Nov 1, 2017');
    });

    it('should render returning header when bound type is RETURNING', () => {
      const returningBound = _.set(_.cloneDeep(boundDetail), 'boundType', 'RETURNING');

      flightSummaryCard = createComponent({ boundDetail: returningBound });

      expect(flightSummaryCard.find('FlightSummaryCardHeader')).to.have.prop('isReturning').which.is.true;
      expect(flightSummaryCard.find('FlightSummaryCardHeader'))
        .to.have.prop('departureDate')
        .which.equal('Wed, Nov 1, 2017');
    });
  });

  context('when bound is cancelled', () => {
    let cancelledFlightBound;

    beforeEach(() => {
      cancelledFlightBound = _.merge({}, boundDetail, {
        departureStatus: 'CANCELLED',
        departureStatusType: 'NEGATIVE',
        arrivalStatus: 'CANCELLED',
        arrivalStatusType: 'NEGATIVE'
      });
      flightSummaryCard = createComponent({ boundDetail: cancelledFlightBound });
    });

    it('should have flight-summary-card--cancelled style', () => {
      expect(flightSummaryCard.find('.flight-summary-card--cancelled')).to.be.present();
    });

    it('should show flight cancelled icon', () => {
      expect(flightSummaryCard.find('FlightStatusIcon')).to.have.prop('status').which.equal('Cancelled');
    });
  });

  context('when check the flight info', () => {
    it('should contain flightInfo with correct prop', () => {
      const flightInfo = flightSummaryCard.find('FlightInfo');

      expect(flightInfo)
        .to.have.props(['flights', 'travelTime', 'isTotalTravelDuration'])
        .to.deep.equal([
          [
            {
              flightNumber: '1504',
              aircraftInfo: {
                aircraftType: 'Boeing 777'
              }
            }
          ],
          '02:00',
          true
        ]);
    });
  });

  describe('when there is a standby flight', () => {
    const boundDetailWithStandbyFlight = new BoundDetailBuilder().withStandby().build();
    const props = {
      boundDetail: boundDetailWithStandbyFlight,
      isNonRevPnr: false,
      standbyToggle: true,
      onClickStandbyList: _.noop
    };

    it('should show the standby card', () => {
      flightSummaryCard = createComponent(props);

      expect(flightSummaryCard.find('StandbyCard')).to.have.props({
        standbyFlight: props.boundDetail.standbyFlight,
        isNonRevPnr: props.isNonRevPnr
      });
    });
  });

  describe('when there is a disrupted bound message', () => {
    const props = {
      isNonRevPnr: false,
      onClickStandbyList: () => {},
      standbyToggle: false
    };

    it('should render with disrupted FLIX bound message', () => {
      const boundDetailWithDisruptedFLIXBoundMessage = new ViewReservationBuilder()
        .withReaccom()
        .withDisruptedFLIXBoundMessage()
        .build().viewReservationViewPage.bounds[0];

      flightSummaryCard = createComponent({ ...props, boundDetail: boundDetailWithDisruptedFLIXBoundMessage });

      expect(flightSummaryCard).toMatchSnapshot();
    });

    it('should render with disrupted OPR bound message', () => {
      const boundDetailWithDisruptedOPRBoundMessage = new ViewReservationBuilder()
        .withReaccom()
        .withDisruptedOPRBoundMessage()
        .build().viewReservationViewPage.bounds[0];

      flightSummaryCard = createComponent({ ...props, boundDetail: boundDetailWithDisruptedOPRBoundMessage });

      expect(flightSummaryCard).toMatchSnapshot();
    });

    it('should render correctly when disrupted bound message icon is undefined', () => {
      const boundDetail = new ViewReservationBuilder().withReaccom().build().viewReservationViewPage.bounds[0];

      boundDetail.disruptedBoundMessage = { icon: undefined, label: 'test' };

      flightSummaryCard = createComponent({ ...props, boundDetail });

      expect(flightSummaryCard).toMatchSnapshot();
    });
  });

  describe('when there is a early bird purchased', () => {
    const boundDetailWithEarlyBirdPurchased = new ViewReservationBuilder().withEarlyBirdPurchased().build()
      .viewReservationViewPage.bounds[0];
    const props = {
      isNonRevPnr: false,
      onClickStandbyList: () => {},
      standbyToggle: false
    };

    it('should render with early bird purchased', () => {
      flightSummaryCard = createComponent({ ...props, boundDetail: boundDetailWithEarlyBirdPurchased });

      expect(flightSummaryCard).toMatchSnapshot();
    });

    it('should render with early bird purchased correctly when AIRCRAFT_TYPE_VIEWRES is true', () => {
      flightSummaryCard = createComponent({ 
        ...props, 
        AIRCRAFT_TYPE_VIEWRES: true,
        boundDetail: boundDetailWithEarlyBirdPurchased
      });

      expect(flightSummaryCard).toMatchSnapshot();
    });

    it('should render with early bird purchased without passengers when passengerLabel and passengersList do not exist', () => {
      delete boundDetailWithEarlyBirdPurchased.earlyBirdPurchased.passengerLabel;
      delete boundDetailWithEarlyBirdPurchased.earlyBirdPurchased.passengersList;

      flightSummaryCard = createComponent({ ...props, boundDetail: boundDetailWithEarlyBirdPurchased });

      expect(flightSummaryCard).toMatchSnapshot();
    });
  });

  describe('when there is no standby flight', () => {
    it('should not show the standby card', () => {
      expect(flightSummaryCard.find('StandbyCard')).to.not.exist;
    });
  });

  describe('when there is no flight aircraft info', () => {
    const boundDetailWithStandbyFlight = new BoundDetailBuilder().withNoFlightAircraftInfo().build();
    const props = {
      boundDetail: boundDetailWithStandbyFlight
    };

    it('should not show the flight ', () => {
      flightSummaryCard = createComponent(props);

      expect(flightSummaryCard).to.be.present();
    });
  });

  it('should render children elements when have a children component', () => {
    flightSummaryCard = shallow(
      <FlightSummaryCard boundDetail={boundDetail}>
        <div className="class-for-test">any children</div>
      </FlightSummaryCard>
    );

    expect(flightSummaryCard.find('.class-for-test')).to.be.present();
  });

  it('should not directly mutate boundDetail.stops', () => {
    const nullStopsBoundDetail = { ...boundDetail, ...{ stops: null } };

    flightSummaryCard = createComponent({ boundDetail: nullStopsBoundDetail });

    expect(nullStopsBoundDetail.stops).to.be.null;
  });

  const createComponent = (props = {}) => shallow(<FlightSummaryCard {...props} />);
});
