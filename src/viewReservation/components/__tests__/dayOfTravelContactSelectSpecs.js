import React from 'react';
import DayOfTravelContactSelect from 'src/viewReservation/components/dayOfTravelContactSelect';
import { shallow } from 'enzyme';
import sinonModule from 'sinon';
import { click } from 'test/unit/helpers/enzymeFormTestUtils';

const sinon = sinonModule.sandbox.create();

describe('Day of Travel Contact Select', () => {
  let pushStub;

  beforeEach(() => {
    pushStub = sinon.stub();
  });

  it('should push to next route on click', () => {
    const component = createComponent();

    click(component.find('.day-of-travel-wrapper'));
    expect(pushStub).to.have.been.called;
  });

  const createComponent = () => {
    const defaultProps = {
      dayOfTravelContactInfo: 'Text: 555-555-5555',
      onContactInfoClick: pushStub
    };

    return shallow(<DayOfTravelContactSelect {...Object.assign({}, defaultProps)} />);
  };
});
