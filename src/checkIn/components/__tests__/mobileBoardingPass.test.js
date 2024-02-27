import i18n from '@swa-ui/locale';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import MobileBoardingPass from 'src/checkIn/components/mobileBoardingPass';
import * as analyticsEventHelper from 'src/shared/analytics/helpers/analyticsEventHelper';
import CheckInRetrieveBoardingPassBuilder from 'test/builders/apiResponse/v1/mobile-air-operations/page/check-in/checkInRetrieveBoardingPassBuilder';

describe('MobileBoardingPass', () => {
  let mobileBoardingPassViewData;

  describe('render', () => {
    beforeEach(() => {
      mobileBoardingPassViewData = new CheckInRetrieveBoardingPassBuilder().withSecurityDocument().build()
        .checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView[0];
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should display Apple Wallet and not Google Play if iOS', () => {
      const { container } = createComponent({
        mobileBoardingPass: mobileBoardingPassViewData,
        isAndroidDevice: false,
        isIOSDevice: true
      });

      expect(container.querySelector('.add-to-apple-wallet')).not.toBeNull();
      expect(container.querySelector('.add-to-google-pay')).toBeNull();
    });

    it('should raise satellite event "add to digital wallet" when Apple Wallet is clicked on', () => {
      const { container } = createComponent({
        mobileBoardingPass: mobileBoardingPassViewData,
        isAndroidDevice: false,
        isIOSDevice: true
      });

      const raiseSatelliteEventMock = jest.spyOn(analyticsEventHelper, 'raiseSatelliteEvent');

      fireEvent.click(container.querySelector('[data-qa="apple-wallet"]'));
      expect(raiseSatelliteEventMock).toHaveBeenCalledWith('add to digital wallet');
    });

    it('should display Google Play and not Apple Wallet if Android', () => {
      const { container } = createComponent({
        mobileBoardingPass: mobileBoardingPassViewData,
        isAndroidDevice: true,
        isIOSDevice: false
      });

      expect(container.querySelector('.add-to-apple-wallet')).toBeNull();
      expect(container.querySelector('.add-to-google-pay')).not.toBeNull();
    });

    it('should raise satellite event "add to digital wallet" when Google Pay is clicked on', () => {
      const { container } = createComponent({
        mobileBoardingPass: mobileBoardingPassViewData,
        isAndroidDevice: true,
        isIOSDevice: false
      });

      jest.spyOn(analyticsEventHelper, 'raiseSatelliteEvent');

      fireEvent.click(container.querySelector('[data-qa="google-pay"]'));
      expect(analyticsEventHelper.raiseSatelliteEvent).toHaveBeenCalledWith('add to digital wallet');
    });

    it('should display neither Apple Wallet nor Google Play if not iOS nor Android', () => {
      const { container } = createComponent({
        mobileBoardingPass: mobileBoardingPassViewData,
        isAndroidDevice: false,
        isIOSDevice: false
      });

      expect(container.querySelector('.add-to-apple-wallet')).toBeNull();
      expect(container.querySelector('.add-to-google-pay')).toBeNull();
    });

    it('should display Apple Wallet and not Google Play if both iOS and Android (should not be possible to achieve this)', () => {
      const { container } = createComponent({
        mobileBoardingPass: mobileBoardingPassViewData,
        isAndroidDevice: true,
        isIOSDevice: true
      });

      expect(container.querySelector('.add-to-apple-wallet')).not.toBeNull();
      expect(container.querySelector('.add-to-google-pay')).toBeNull();
    });

    it('should have associated adult text if isInfant is true', () => {
      mobileBoardingPassViewData = new CheckInRetrieveBoardingPassBuilder().withLapInfant().build().checkInRetrieveBoardingPassPage
        .mobileBoardingPassViewPage.mobileBoardingPassView[0];

      const { container } = createComponent({
        isAndroidDevice: false,
        isIOSDevice: false,
        mobileBoardingPass: mobileBoardingPassViewData
      });

      expect(container).toMatchSnapshot();
    });

    it('should not have security header text if documentType is not SECURITY_DOCUMENT', () => {
      const { container } = createComponent({
        isAndroidDevice: false,
        isIOSDevice: false,
        mobileBoardingPass: mobileBoardingPassViewData
      });

      expect(container.querySelector('.mbp-security-header').textContent).toEqual(
        `${i18n('CHECK_IN__MOBILE_BOARDING_PASS__SECURITY_DOCUMENT')}${i18n(
          'CHECK_IN__MOBILE_BOARDING_PASS__PROCEED_TO_GATE'
        )}`
      );
    });

    it('should have security header text if documentType is SECURITY_DOCUMENT', () => {
      mobileBoardingPassViewData = new CheckInRetrieveBoardingPassBuilder().build().checkInRetrieveBoardingPassPage
        .mobileBoardingPassViewPage.mobileBoardingPassView[0];

      const { container } = createComponent({
        isAndroidDevice: false,
        isIOSDevice: false,
        mobileBoardingPass: mobileBoardingPassViewData
      });

      expect(container.querySelector('.mbp-security-header')).toBeNull();
    });

    it('should not have drinks subinfo if documentType is SECURITY_DOCUMENT', () => {
      const { container } = createComponent({
        isAndroidDevice: false,
        isIOSDevice: false,
        mobileBoardingPass: mobileBoardingPassViewData
      });

      expect(container).toMatchSnapshot();
    });

    it('should have drinks subinfo if documentType is not SECURITY_DOCUMENT', () => {
      const drinkCouponText = 'DrinkCouponText';

      mobileBoardingPassViewData = new CheckInRetrieveBoardingPassBuilder()
        .setDrinkCoupon(false, drinkCouponText)
        .build().checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView[0];

      const { container } = createComponent({
        isAndroidDevice: false,
        isIOSDevice: false,
        mobileBoardingPass: mobileBoardingPassViewData
      });

      expect(container).toMatchSnapshot();
    });

    it('should have drinks subinfo but with no coupon if documentType is not SECURITY_DOCUMENT and eligibleForDrinkCoupon false', () => {
      const drinkCouponText = 'DrinkCouponText';

      mobileBoardingPassViewData = new CheckInRetrieveBoardingPassBuilder()
        .setDrinkCoupon(false, drinkCouponText)
        .build().checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView[0];

      const { container } = createComponent({
        isAndroidDevice: false,
        isIOSDevice: false,
        mobileBoardingPass: mobileBoardingPassViewData
      });

      expect(container).toMatchSnapshot();
    });

    it('should have drinks subinfo but with no coupon if documentType is not SECURITY_DOCUMENT and eligibleForDrinkCoupon false and drinkCouponText null', () => {
      const drinkCouponText = null;

      mobileBoardingPassViewData = new CheckInRetrieveBoardingPassBuilder()
        .setDrinkCoupon(false, drinkCouponText)
        .build().checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView[0];

      const { container } = createComponent({
        isAndroidDevice: false,
        isIOSDevice: false,
        mobileBoardingPass: mobileBoardingPassViewData
      });

      expect(container).toMatchSnapshot();
    });

    it('should have drinks subinfo but with no coupon if documentType is not SECURITY_DOCUMENT and eligibleForDrinkCoupon true and drinkCouponText null', () => {
      const drinkCouponText = null;

      mobileBoardingPassViewData = new CheckInRetrieveBoardingPassBuilder()
        .setDrinkCoupon(true, drinkCouponText)
        .build().checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView[0];

      const { container } = createComponent({
        isAndroidDevice: false,
        isIOSDevice: false,
        mobileBoardingPass: mobileBoardingPassViewData
      });

      expect(container).toMatchSnapshot();
    });

    it('should have drinks subinfo but with no coupon if documentType is not SECURITY_DOCUMENT and eligibleForDrinkCoupon true and drinkCouponText undefined', () => {
      const drinkCouponText = undefined;

      mobileBoardingPassViewData = new CheckInRetrieveBoardingPassBuilder()
        .setDrinkCoupon(true, drinkCouponText)
        .build().checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView[0];

      const { container } = createComponent({
        isAndroidDevice: false,
        isIOSDevice: false,
        mobileBoardingPass: mobileBoardingPassViewData
      });

      expect(container).toMatchSnapshot();
    });

    it('should have attributes in the boarding pass: “EarlyBird Check-In ®”, “Priority & Express Lanes”, “Priority Boarding”.', () => {
      mobileBoardingPassViewData = new CheckInRetrieveBoardingPassBuilder()
        .build().checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView[0];

      const { container } = createComponent({
        mobileBoardingPass: mobileBoardingPassViewData
      });

      expect(container).toMatchSnapshot();
    });

    it('should have drink coupon text displayed in the boarding pass', () => {
      mobileBoardingPassViewData = new CheckInRetrieveBoardingPassBuilder()
        .setDrinkCouponHeaderInfo('You have 2 Drink Coupons', 'Just show your screen to one of your flight attendants. Cheers!')
        .build().checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView[0];

      const { container } = createComponent({
        mobileBoardingPass: mobileBoardingPassViewData
      });

      expect(container).toMatchSnapshot();
    });
  });

  const createComponent = (props = {}) => render(<MobileBoardingPass {...props} />);
});
