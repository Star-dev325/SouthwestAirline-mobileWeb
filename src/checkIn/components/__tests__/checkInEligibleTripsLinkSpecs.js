import React from 'react';
import { sandbox } from 'sinon';
import { shallow } from 'enzyme';

import CheckInEligibleTripsLink from 'src/checkIn/components/checkInEligibleTripsLink';

const sinon = sandbox.create();

describe('CheckInEligibleTripsLink', () => {
  context('onClick prop', () => {
    it('should be called when the link is clicked', () => {
      const onClickSpy = sinon.spy();

      const component = shallow(<CheckInEligibleTripsLink numberOfCheckInEligibleTrips={1} onClick={onClickSpy} />);

      component.simulate('click');

      expect(onClickSpy).to.have.been.called;
    });
  });
});
