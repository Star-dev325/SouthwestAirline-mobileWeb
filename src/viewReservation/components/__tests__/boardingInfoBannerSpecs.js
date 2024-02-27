import { mount } from 'enzyme';
import React from 'react';
import { sandbox } from 'sinon';
import { REACCOM_VIEW_RESERVATION_MESSAGE } from 'src/airChange/constants/airChangeConstants';
import { BoardingInfoBanner } from 'src/viewReservation/components/boardingInfoBanner';
import { click } from 'test/unit/helpers/enzymeFormTestUtils';

const sinon = sandbox.create();

describe('boardingInfoBanner', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should display generic message when isCancelLinkEmpty is true', () => {
    const instance = render({ isCancelLinkEmpty: true, important: false, hideRightArrow: true });

    expect(instance.find('.alert-banner--arrow-icon')).to.not.exist;
    expect(instance.find('.alert-banner--vertically-centered-icon')).to.not.exist;
    expect(instance).to.contain.text('Travel Advisory in effect');
  });

  it('should display generic message when isChangeLinkEmpty is true', () => {
    const instance = render({ isChangeLinkEmpty: true, important: false, hideRightArrow: true });

    expect(instance.find('.alert-banner--arrow-icon')).to.not.exist;
    expect(instance.find('.alert-banner--vertically-centered-icon')).to.not.exist;
    expect(instance).to.contain.text('Travel Advisory in effect');
  });

  it('should not show reaccom banner when flight is not reaccom', () => {
    const instance = render();

    expect(instance.find('.reaccom-banner')).to.not.exist;
  });

  it('should not be clickable when flight is non-rev PNR', () => {
    const onClickStub = sinon.stub();
    const instance = render({ isNonRevPnr: true });

    click(instance.find('.alert-banner'));
    expect(onClickStub).not.have.been.called;
  });

  it('should display Dynamic Waiver message with right arrow for domestic flight', () => {
    const instance = render({ isDynamicWaiver: true, hideRightArrow: false });

    expect(instance).to.contain.text('You can change your flight');
    expect(instance.find('.alert-banner--arrow-icon')).to.exist;
  });

  it('should display flight cancel message without right arrow', () => {
    const instance = render({ hasAnyCancelledFlights: true });

    expect(instance).to.contain.text('Your flight has been cancelled');
    expect(instance.find('.icon_keyboard-arrow-right')).to.not.exist;
  });

  it('should not display Dynamic Waiver message if change link empty', () => {
    const instance = render({ isDynamicWaiver: true, hasAnyCancelledFlights: true, isChangeLinkEmpty: true });

    expect(instance.find('.icon_keyboard-arrow-right')).to.not.exist;
  });

  it('should clickable when flight is dynamic waiver', () => {
    const onClickStub = sinon.stub();
    const instance = render({ hasAnyCancelledFlights: true, onClick: onClickStub });

    click(instance.find('.alert-banner'));
    expect(onClickStub).have.been.called;
  });

  it('should clickable when flight is cancelled', () => {
    const onClickStub = sinon.stub();
    const instance = render({ isDynamicWaiver: true, onClick: onClickStub });

    click(instance.find('.alert-banner'));
    expect(onClickStub).have.been.called;
  });

  context('is Reaccom', () => {
    it('should display reaccom message when flight is reaccom', () => {
      const instance = render({
        isDynamicWaiver: false,
        messages: [
          {
            key: 'REACCOM_VIEW_RESERVATION',
            icon: '',
            body: 'reaccomBody',
            header: 'reaccomHeader'
          }
        ]
      });

      expect(instance.find('.reaccom-banner')).to.exist;
      expect(instance.find('.reaccom-banner-container--header')).to.contain.text('reaccomHeader');
      expect(instance.find('.reaccom-banner--body')).to.contain.text('reaccomBody');
    });

    it('should display reaccom message when reaccom link is null but contact us message is there', () => {
      const instance = render({
        isDynamicWaiver: false,
        messages: [
          {
            key: 'REACCOM_CONTACT_US_TO_CHANGE_FLIGHT_FREE',
            icon: '',
            body: 'reaccomBody',
            header: 'reaccomHeader'
          }
        ]
      });

      expect(instance.find('.reaccom-banner')).to.exist;
      expect(instance.find('.reaccom-banner-container--header')).to.contain.text('reaccomHeader');
      expect(instance.find('.reaccom-banner--body')).to.contain.text('reaccomBody');
    });

    it('should not display reaccom messaging when the flight is not reaccomed but the toggle is enabled', () => {
      const instance = render({
        isChangeLinkEmpty: true,
        isDynamicWaiver: false,
        important: false,
        hideRightArrow: true
      });

      expect(instance.find('.reaccom-banner')).to.not.exist;
    });

    it('should display travel advisory banner when reaccomed flight falls under dynamic waiver', () => {
      const instance = render({
        isChangeLinkEmpty: true,
        isCancelLinkEmpty: true,
        isDynamicWaiver: true,
        messages: [
          {
            key: 'REACCOM_VIEW_RESERVATION',
            icon: '',
            body: 'reaccomBody',
            header: 'reaccomHeader'
          }
        ]
      });

      expect(instance.find('.reaccom-banner')).to.exist;
      expect(instance.find('.alert-banner')).to.exist;
    });

    it('should display flight disruption warning message for flight which has been disrupted involuntarily (re-accommodated)', () => {
      const instance = render({
        isChangeLinkEmpty: true,
        isCancelLinkEmpty: true,
        isDynamicWaiver: true,
        messages: [
          {
            key: 'REACCOM_VIEW_RESERVATION_GDS',
            icon: 'WARNING',
            body: 'A disruption caused changes to your trip. If you need to make an adjustment to the itinerary',
            header: 'Your trip was modified.'
          }
        ]
      });
  
      expect(instance).toMatchSnapshot();
    });

    it('should display flight disruption warning with FLIX message for flight which has been cancelled but not re-booked', () => {
      const instance = render({
        isCancelLinkEmpty: true,
        isChangeLinkEmpty: true,
        isDynamicWaiver: true,
        messages: [
          {
            body: 'A change was made to your original reservation. We are currently working to rebook your flight, or you can also rebook for free, up to two times.',
            header: "We're sorry, we had to change your flight(s).",
            icon: 'WARNING',
            key: REACCOM_VIEW_RESERVATION_MESSAGE.REACCOM_VIEW_RESERVATION_FLIX,
            textColor: 'DEFAULT'
          }
        ]
      });

      expect(instance).toMatchSnapshot();
    });
  });

  const render = (props) => {
    const defaultProps = {
      isNonRevPnr: false,
      isDynamicWaiver: true,
      hasAnyCancelledFlights: false,
      onClick: sinon.stub(),
      important: true,
      messages: [{ key: '', icon: '', body: '', header: '' }]
    };

    return mount(<BoardingInfoBanner {...defaultProps} {...props} />);
  };
});
