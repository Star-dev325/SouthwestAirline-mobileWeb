import _ from 'lodash';
import React from 'react';
import { storiesOf } from '@storybook/react';
import FlightSegmentBuilder from 'test/builders/model/flightSegmentBuilder';
import { SegmentDetails } from 'src/myAccount/components/segmentDetails';
import FlightStatusBuilder from 'test/builders/model/flightStatusBuilder';
import Segment from 'src/shared/components/segment';

const props = {
  onViewBoardingPassButtonClickCb: () => {},
  onViewBoardingPositionsButtonClick: () => {},
  onCheckInButtonClick: () => {},
  onClickDetailsButton: () => {},
  onSelectNewFlightForCancelledFlight: () => {},
  onClickStandbyList: () => {},
  onClickEBCheckInButton: () => {},
  pnr: {},
  segment: {},
  links: {},
  confirmationNumber: '',
  _v1_infoNeededToAddEarlyBirdLink: null,
  toggles: {}
};

storiesOf('components/segmentDetails', module)
  .add('message information', () => {
    const newProps = _.cloneDeep(props);

    newProps.segment = new FlightSegmentBuilder().withEBEligible(true).build();

    return (
      <Segment>
        <SegmentDetails {...newProps} />
      </Segment>
    );
  })
  .add('withMobileBoardingPassAndFlightStatus', () => {
    const newProps = _.cloneDeep(props);

    newProps.links = { viewBoardingPass: 'someLink' };
    newProps.segment = new FlightSegmentBuilder()
      .withWifiAvailable(true)
      .withHasCheckedIn(true)
      .withFlightStatus(new FlightStatusBuilder().withNowBoarding().build())
      .build();

    return (
      <Segment>
        <SegmentDetails {...newProps} />
      </Segment>
    );
  })
  .add('departed', () => {
    const newProps = _.cloneDeep(props);

    newProps.segment = new FlightSegmentBuilder()
      .withFlightStatus(new FlightStatusBuilder().withDepartureStatus(FlightStatusBuilder.DEPARTED).build())
      .build();

    return (
      <Segment>
        <SegmentDetails {...newProps} />
      </Segment>
    );
  })
  .add('cancelled', () => {
    const newProps = _.cloneDeep(props);

    newProps.segment = new FlightSegmentBuilder()
      .withFlightStatus(new FlightStatusBuilder().withCancelledStatus().build())
      .build();

    props.links = {
      checkInViewReservationPage: 'fakelink'
    };

    return (
      <Segment>
        <SegmentDetails {...newProps} />
      </Segment>
    );
  })
  .add('non-rev standby', () => {
    const newProps = _.cloneDeep(props);

    newProps.segment = new FlightSegmentBuilder().withStandbyFlight().withNonRevenue(true).build();
    return (
      <Segment>
        <SegmentDetails {...newProps} />
      </Segment>
    );
  });
