import { shallow } from 'enzyme';
import React from 'react';
import StandbyList from 'src/standby/components/standbyList';

describe('StandbyList', () => {
  let StandbyListComponent;

  beforeEach(() => {
    const standbyListProps = {
      standbyList: [
        {
          isConfirmed: true,
          displayName: 'OTHER / TI'
        },
        {
          isConfirmed: false,
          displayName: 'ONVAC / SI',
          number: '1'
        }
      ]
    };

    StandbyListComponent = shallow(<StandbyList {...standbyListProps} />);
  });

  it('should render standby list', () => {
    expect(StandbyListComponent.find('.confirmed')).to.have.length(1);
    expect(StandbyListComponent).to.contain.text('OTHER / TI');

    expect(StandbyListComponent.find('.unconfirmed')).to.have.length(1);
    expect(StandbyListComponent).to.contain.text('ONVAC / SI');
  });

  it('should render standby list enhanced view', () => {
    const standbyListProps = {
      isEnhancedStandby: true,
      standbyList: [
        {
          isConfirmed: true,
          displayName: 'OTHER / TI',
          isPnrPassenger: true
        },
        {
          isConfirmed: false,
          displayName: 'ONVAC / SI',
          number: '1'
        }
      ]
    };

    StandbyListComponent = shallow(<StandbyList {...standbyListProps} />);

    expect(StandbyListComponent).toMatchSnapshot();
  });
});
