import React from 'react';
import { mount } from 'enzyme';
import BoundCheckInCard from 'src/checkIn/components/boundCheckInCard';

describe('BoundCheckInCard', () => {
  let wrapper;

  const createComponent = (props) =>
    mount(
      <BoundCheckInCard
        boundCheckInInfo={[
          {
            flightNumber: '181',
            hasWifi: true,
            travelTime: '0h 55m',
            gate: '---',
            passengers: [{}]
          },
          {
            flightNumber: '181',
            hasWifi: true,
            travelTime: '0h 55m',
            gate: '---',
            passengers: [{}]
          }
        ]}
        onViewBoardingPassButtonClickCb={() => null}
        isReturning={false}
        UPGRADED_BOARDING={false}
        onUpgradedBoardingButtonClick={() => {}}
        {...props}
      />
    );

  context('when is departs', () => {
    beforeEach(() => {
      wrapper = createComponent();
    });

    it('should pass DEPARTS when is not change planes', () => {
      expect(wrapper.find('FlightInfoBar').at(0)).have.prop('title', 'DEPARTING');
    });

    it('should pass CHANGE PLANES when is change planes', () => {
      expect(wrapper.find('FlightInfoBar').at(1)).have.prop('title', 'CHANGE PLANES');
    });
  });

  context('when is returning', () => {
    beforeEach(() => {
      wrapper = createComponent({ isReturning: true });
    });

    it('should pass DEPARTS when is not change planes', () => {
      expect(wrapper.find('FlightInfoBar').at(0)).have.prop('title', 'RETURNING');
    });

    it('should pass CHANGE PLANES when is change planes', () => {
      expect(wrapper.find('FlightInfoBar').at(1)).have.prop('title', 'CHANGE PLANES');
    });
  });
});
