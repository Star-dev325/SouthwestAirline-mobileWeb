import React from 'react';
import { shallow } from 'enzyme';
import StandbyCard from 'src/standby/components/standbyCard';
import sinon from 'sinon';

const sandbox = sinon.sandbox.create();

describe('StandbyCard', () => {
  let onClickStandbyListStub;
  let wrapper;
  let props;

  beforeEach(() => {
    onClickStandbyListStub = sandbox.stub();
    props = {
      standbyFlight: {
        arrivalAirportCode: 'AUS',
        arrivalTime: '09:55',
        departureTime: '09:00',
        flightNumber: '726',
        viewStandbyList: {
          labelText: null
        }
      },
      onClickStandbyList: onClickStandbyListStub
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('title', () => {
    it('should display the standard title if standby is rev', () => {
      wrapper = shallow(<StandbyCard {...props} />);
      expect(wrapper.find('.standby-card--title')).to.have.text("You're on standby to AUS");
    });

    it('should display the standard title if standby is rev and labelText is set', () => {
      props.standbyFlight.viewStandbyList.labelText = 'Overriding Label Text';
      wrapper = shallow(<StandbyCard {...props} />);
      expect(wrapper.find('.standby-card--title')).to.have.text("You're on standby to AUS");
    });

    it('should display the standard title if standby is non-rev and labelText is not set', () => {
      wrapper = shallow(<StandbyCard isNonRevPnr {...props} />);
      expect(wrapper.find('.standby-card--title')).to.have.text("You're on standby to AUS");
    });

    it('should display the labelText title if standby is non-rev and labelText is set', () => {
      props.standbyFlight.viewStandbyList.labelText = 'Overriding Label Text';
      wrapper = shallow(<StandbyCard isNonRevPnr {...props} />);
      expect(wrapper.find('.standby-card--title')).to.have.text('Overriding Label Text');
    });

    it('should display the enhanced standby message if available and toggle is on', () => {
      const mockEnhancedStandbyMessage = 'Enhanced standby message';
      const enhancedProps = {
        ...props,
        standbyFlight: {
          ...props.standbyFlight,
          enhancedStandbyListMessage: mockEnhancedStandbyMessage
        }
      };

      wrapper = shallow(<StandbyCard useEnhancedStandbyList {...enhancedProps} />);

      expect(wrapper.find('.standby-card--title')).to.have.text(mockEnhancedStandbyMessage);
    });
  });

  describe('flightDetail', () => {
    describe('when is revenue', () => {
      beforeEach(() => {
        wrapper = shallow(<StandbyCard {...props} />);
      });

      it('should display flight detail', () => {
        expect(wrapper.find('FlightNumber')).to.have.props({
          className: 'xlarge bold',
          flightNumber: props.standbyFlight.flightNumber
        });
      });

      it('should display time detail', () => {
        expect(wrapper.find('FlightTimes')).to.have.props({
          departureTime: props.standbyFlight.departureTime,
          arrivalTime: props.standbyFlight.arrivalTime,
          isNextDay: false
        });
      });

      it('should not center the title', () => {
        expect(wrapper.find('.center')).not.to.exist;
      });

      it('should display standby link', () => {
        expect(wrapper.find('StandbyLink')).to.have.props({
          isNonRevPnr: false,
          onClickStandbyList: onClickStandbyListStub
        });
      });
    });

    describe('when should use enhanced standby list', () => {
      beforeEach(() => {
        const mockEnhancedStandbyMessage = 'Enhanced standby message';
        const enhancedProps = {
          ...props,
          standbyFlight: {
            ...props.standbyFlight,
            enhancedStandbyListMessage: mockEnhancedStandbyMessage
          }
        };

        wrapper = shallow(<StandbyCard useEnhancedStandbyList {...enhancedProps} />);
      });

      it('should center the title', () => {
        expect(wrapper.find('.hide-details')).to.exist;
      });

      it('should not show flight details', () => {
        expect(wrapper.find('FlightNumber')).to.not.exist;
        expect(wrapper.find('FlightTimes')).to.not.exist;
      });

      it('should show flight details if enhanced message is available but toggle is off', () => {
        const mockEnhancedStandbyMessage = 'Enhanced standby message';
        const enhancedProps = {
          ...props,
          standbyFlight: {
            ...props.standbyFlight,
            enhancedStandbyListMessage: mockEnhancedStandbyMessage
          }
        };

        wrapper = shallow(<StandbyCard {...enhancedProps} />);

        expect(wrapper.find('FlightNumber')).to.exist;
        expect(wrapper.find('FlightTimes')).to.exist;
      });
    });

    describe('when is non-revenue', () => {
      beforeEach(() => {
        wrapper = shallow(<StandbyCard isNonRevPnr {...props} />);
      });

      it('should not show flight details', () => {
        expect(wrapper.find('FlightNumber')).to.not.exist;
        expect(wrapper.find('FlightTimes')).to.not.exist;
      });

      it('should center the title', () => {
        expect(wrapper.find('.hide-details')).to.exist;
      });

      it('should display standby link', () => {
        expect(wrapper.find('StandbyLink')).to.have.props({
          isNonRevPnr: true,
          viewStandbyList: props.standbyFlight.viewStandbyList,
          onClickStandbyList: onClickStandbyListStub
        });
      });
    });
  });
});
