import dayjs from 'dayjs';
import { mount } from 'enzyme';
import React from 'react';
import { sandbox } from 'sinon';
import SearchFlightsSummaryHeader from 'src/shared/components/searchFlightsSummaryHeader';
import { click } from 'test/unit/helpers/enzymeFormTestUtils';
import FakeClock from 'test/unit/helpers/fakeClock';

const sinon = sandbox.create();

describe('searchFlightsSummaryHeader', () => {
  let header;
  let onShareClickedCbStub;

  beforeEach(() => {
    onShareClickedCbStub = sinon.stub();
    FakeClock.setTimeTo('2022-11-30');
  });

  afterEach(() => {
    sinon.restore();
    FakeClock.restore();
  });

  it('should format the search date from the search request for yesterday', () => {
    const yesterday = dayjs().startOf('day').subtract(1, 'days').format('YYYY-MM-DD');

    header = createComponent({ date: yesterday });
    expect(header.find('.header.date')).to.contains.text('Yesterday');
  });

  it('should format the search date from the search request for today', () => {
    header = createComponent();
    expect(header.find('.header.date')).to.contains.text('Today');
  });

  it('should format the search date from the search request for tomorrow', () => {
    const tomorrow = dayjs().startOf('day').add(1, 'days').format('YYYY-MM-DD');

    header = createComponent({ date: tomorrow });
    expect(header.find('.header.date')).to.contains.text('Tomorrow');
  });

  context('render', () => {
    it('should render correct airports', () => {
      header = createComponent();

      const fromTag = header.find('.flight-search-summary p').at(1);
      const toTag = header.find('.flight-search-summary p').at(2);

      expect(fromTag).to.have.text('From: Dallas, TX (DAL)');
      expect(toTag).to.have.text('To: Austin, TX (AUS)');
    });

    it('should render Share button when onShareClickedCb is specified', () => {
      header = createComponent({ onShareClickedCb: onShareClickedCbStub });

      expect(header.find('.share-button')).to.exist;
    });

    it('should not render Share button when onShareClickedCb is not specified', () => {
      header = createComponent();

      expect(header.find('.share-button')).to.not.exist;
    });
  });

  it('should call onShareClickedCb when Share button is clicked', () => {
    header = createComponent({ onShareClickedCb: onShareClickedCbStub });
    click(header.find('.share-button'));
    expect(onShareClickedCbStub).to.be.called;
  });

  it('should render enhanced standby header view', () => {
    const props = {
      date: dayjs().startOf('day').format('YYYY-MM-DD'),
      from: 'Dallas, TX (DAL)',
      isEnhancedStandby: true,
      onShareClickedCb: undefined,
      to: 'Austin, TX (AUS)'
    };

    header = createComponent({ ...props, onShareClickedCb: onShareClickedCbStub });

    expect(header).toMatchSnapshot();
  });

  it('should render enhanced standby header view previous day', () => {
    const props = {
      date: dayjs().startOf('day').add(1, 'day').format('YYYY-MM-DD'),
      from: 'Dallas, TX (DAL)',
      isEnhancedStandby: true,
      onShareClickedCb: undefined,
      to: 'Austin, TX (AUS)'
    };

    header = createComponent({ ...props, onShareClickedCb: onShareClickedCbStub });

    expect(header).toMatchSnapshot();
  });

  it('should render enhanced standby header view next day', () => {
    const props = {
      date: dayjs().startOf('day').subtract(1, 'day').format('YYYY-MM-DD'),
      from: 'Dallas, TX (DAL)',
      isEnhancedStandby: true,
      onShareClickedCb: undefined,
      to: 'Austin, TX (AUS)'
    };

    header = createComponent({ ...props, onShareClickedCb: onShareClickedCbStub });

    expect(header).toMatchSnapshot();
  });

  const createComponent = (props = {}) => {
    const today = dayjs().startOf('day').format('YYYY-MM-DD');
    const defaultProps = {
      date: today,
      from: 'Dallas, TX (DAL)',
      onShareClickedCb: undefined,
      to: 'Austin, TX (AUS)'
    };

    return mount(<SearchFlightsSummaryHeader {...defaultProps} {...props} />);
  };
});
