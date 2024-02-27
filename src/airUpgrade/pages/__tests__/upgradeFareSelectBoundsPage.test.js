import { cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { UpgradeFareSelectBoundsPage } from 'src/airUpgrade/pages/upgradeFareSelectBoundsPage';
import { LOGIN_TYPES } from 'src/shared/constants/webViewConstants';
import AirUpgradeViewReservationApiJsonBuilder from 'test/builders/apiResponse/airUpgradeViewReservationApiJsonBuilder';
import ImagePlacementBuilder from 'test/builders/model/imagePlacementBuilder';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';
import * as AppSelector from 'src/shared/selectors/appSelector';

let hideDialogFnStub;
let mockChangeSelectedBoundFn;
let mockGoToPricingReviewFn;
let pushStub;
let resumeAfterLoginFnStub;
let saveUpgradeTypeFnStub;
let showDialogFnStub;
let showNativeAppLoginFnStub;

describe('UpgradeFareSelectBoundsPage', () => {
  beforeEach(() => {
    hideDialogFnStub = jest.fn().mockResolvedValue();
    mockChangeSelectedBoundFn = jest.fn();
    mockGoToPricingReviewFn = jest.fn();
    pushStub = jest.fn();
    resumeAfterLoginFnStub = jest.fn();
    saveUpgradeTypeFnStub = jest.fn();
    showDialogFnStub = jest.fn();
    showNativeAppLoginFnStub = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { container: UpgradeFareSelectBoundsPage } = createComponent({});

    expect(UpgradeFareSelectBoundsPage).toMatchSnapshot();
  });

  it('should not render header when in a webview', () => {
    const { container: UpgradeFareSelectBoundsPage } = createComponent({ isWebView: true });

    expect(UpgradeFareSelectBoundsPage).toMatchSnapshot();
  });

  it('should render a promo code banner if one is provided', () => {
    const { viewUpgradeReservationPage } = new AirUpgradeViewReservationApiJsonBuilder().withPromoCodeMessage().build();
    const { container } = createComponent({
      viewUpgradeReservationPage
    });

    expect(container).toMatchSnapshot();
  });

  it('should render the placement if promoTop01 exists', () => {
    const imagePlacement = new ImagePlacementBuilder().build();
    const { container } = createComponent({ upgradeFarePagePlacement: { promoTop01: imagePlacement } }, true);

    expect(container).toMatchSnapshot();
  });

  it('should make a call to changeSelectedBoundFn when a checkbox is clicked', () => {
    const {
      viewUpgradeReservationPage: {
        pricingDataList: [pricingData]
      }
    } = new AirUpgradeViewReservationApiJsonBuilder().withPromoCodeMessage().build();
    const { container } = createComponent({});

    expect(pricingData.isSelected).toBeFalsy();

    fireEvent.click(container.querySelector('.field .checkbox-button'));

    expect(mockChangeSelectedBoundFn).toHaveBeenCalledWith({
      productId: pricingData.productId,
      isSelected: true
    });
  });

  it('should not call goToPricingReviewFn if no bounds are selected', () => {
    const props = new AirUpgradeViewReservationApiJsonBuilder().build();
    const { container } = createComponent(props);

    fireEvent.submit(container.querySelector('form'));

    expect(mockGoToPricingReviewFn).not.toHaveBeenCalled();
  });

  it('should call goToPricingReviewFn if both products are selected', () => {
    const props = new AirUpgradeViewReservationApiJsonBuilder().withBothBoundsSelected().build();
    const { container } = createComponent(props);
    const {
      pricingDataList,
      _links: { changePricingPage }
    } = props.viewUpgradeReservationPage;

    fireEvent.click(container.querySelector('.field .checkbox-button'));
    fireEvent.submit(container.querySelector('form'));

    expect(mockGoToPricingReviewFn).toHaveBeenCalledWith(changePricingPage, pricingDataList, false);
  });

  it('should call goToPricingReviewFn if one product is selected', () => {
    const props = new AirUpgradeViewReservationApiJsonBuilder().withFirstBoundSelected().build();
    const { container } = createComponent(props);
    const {
      pricingDataList,
      _links: { changePricingPage }
    } = props.viewUpgradeReservationPage;

    fireEvent.click(container.querySelector('.field .checkbox-button'));
    fireEvent.submit(container.querySelector('form'));

    expect(mockGoToPricingReviewFn).toHaveBeenCalledWith(changePricingPage, pricingDataList, false);
  });

  it('should set default value for changePricingPage if _links are not present in the response', () => {
    const props = new AirUpgradeViewReservationApiJsonBuilder().withFirstBoundSelectedAndNoLinks().build();
    const { container } = createComponent(props);
    const { pricingDataList } = props.viewUpgradeReservationPage;

    fireEvent.click(container.querySelector('.field .checkbox-button'));
    fireEvent.submit(container.querySelector('form'));

    expect(mockGoToPricingReviewFn).toHaveBeenCalledWith({}, pricingDataList, false);
  });

  it('should call showDialogFn if checkedInNotice is available', () => {
    const props = new AirUpgradeViewReservationApiJsonBuilder().withFirstBoundSelectedAndNoLinks().build();

    props.viewUpgradeReservationPage.checkedInNotice = {
      title: 'checkedInNotice'
    };
    const { container } = createComponent(props);

    fireEvent.click(container.querySelector('.field .checkbox-button'));
    fireEvent.submit(container.querySelector('form'));

    expect(showDialogFnStub).toHaveBeenCalled();
  });

  it('on click of Ok in dialog hideDialogFnStub & showNativeAppLoginFnStub should be called', async () => {
    const props = new AirUpgradeViewReservationApiJsonBuilder().withFirstBoundSelectedAndNoLinks().build();

    props.viewUpgradeReservationPage.checkedInNotice = {
      title: 'checkedInNotice'
    };
    props.pointsBooking = true;
    props.isWebView = true;
    const { container } = createComponent(props);

    fireEvent.click(container.querySelector('.field .checkbox-button'));
    fireEvent.submit(container.querySelector('form'));

    const okButton = showDialogFnStub.mock.calls[0][0].buttons[0];

    await okButton.onClick();

    expect(hideDialogFnStub).toHaveBeenCalled();
    expect(showNativeAppLoginFnStub).toHaveBeenCalled();
  });

  it('on click of Cancel in dialog hideDialogFnStub & showNativeAppLoginFnStub should be called', async () => {
    const props = new AirUpgradeViewReservationApiJsonBuilder().withFirstBoundSelectedAndNoLinks().build();

    props.viewUpgradeReservationPage.checkedInNotice = {
      title: 'checkedInNotice'
    };
    const { container } = createComponent(props);

    fireEvent.click(container.querySelector('.field .checkbox-button'));
    fireEvent.submit(container.querySelector('form'));
    const cancelButton = showDialogFnStub.mock.calls[0][0].buttons[1];

    await cancelButton.onClick();

    expect(hideDialogFnStub).toHaveBeenCalled();
  });

  describe('loadUpgradeFarePagePlacementsFn', () => {
    it('should call loadUpgradeFarePagePlacementsFn if it has an upgradeType but does not have a promoTop01', () => {
      const upgradeType = 'upgradeToPLU';
      const loadUpgradeFarePagePlacementsFn = jest.fn();

      createComponent({ upgradeType, loadUpgradeFarePagePlacementsFn });

      expect(loadUpgradeFarePagePlacementsFn).toHaveBeenCalled();
    });

    describe('saveUpgradeTypeFn', () => {
      it('should call saveUpgradeTypeFn if upgradeType in store is different from value provided in URL', () => {
        const location = { search: '?upgradeType=upgradeToBUS' };
        const upgradeType = 'upgradeToPLU';
        const saveUpgradeTypeFn = jest.fn();
        const imagePlacement = new ImagePlacementBuilder().build();
        const upgradeFarePagePlacement = { promoTop01: imagePlacement };

        createComponent({ location, upgradeType, saveUpgradeTypeFn, upgradeFarePagePlacement });

        expect(saveUpgradeTypeFn).toHaveBeenCalled();
      });
    });

    it('should call loadUpgradeFarePagePlacementsFn if it has an upgradeType in store but not in URL', () => {
      const upgradeType = 'upgradeToPLU';
      const loadUpgradeFarePagePlacementsFn = jest.fn();

      createComponent({ upgradeType, loadUpgradeFarePagePlacementsFn });

      expect(loadUpgradeFarePagePlacementsFn).toHaveBeenCalled();
    });

    it('should not call loadUpgradeFarePagePlacements if it already has promoTop01', () => {
      const imagePlacement = new ImagePlacementBuilder().build();
      const upgradeFarePagePlacement = { promoTop01: imagePlacement };
      const location = { search: '?upgradeType=upgradeToPLU' };
      const loadUpgradeFarePagePlacementsFn = jest.fn();

      createComponent({ location, upgradeFarePagePlacement, loadUpgradeFarePagePlacementsFn });

      expect(loadUpgradeFarePagePlacementsFn).not.toHaveBeenCalled();
    });

    it('should not call loadUpgradeFarePagePlacements if it does not have a upgradeType', () => {
      const imagePlacement = new ImagePlacementBuilder().build();
      const upgradeFarePagePlacement = { promoTop01: imagePlacement };
      const location = {};
      const loadUpgradeFarePagePlacementsFn = jest.fn();

      createComponent({ location, upgradeFarePagePlacement, loadUpgradeFarePagePlacementsFn });

      expect(loadUpgradeFarePagePlacementsFn).not.toHaveBeenCalled();
    });
  });

  describe('useEffect', () => {
    it('should goToPricingReviewFn if user isLoggedIn and shouldResumeAfterLogin is true', () => {
      const props = new AirUpgradeViewReservationApiJsonBuilder().withBothBoundsSelected().build();
      const {
        pricingDataList,
        _links: { changePricingPage }
      } = props.viewUpgradeReservationPage;

      createComponent({ ...props, isLoggedIn: true, shouldResumeAfterLogin: true });

      expect(mockGoToPricingReviewFn).toHaveBeenCalledWith(changePricingPage, pricingDataList, true);
      expect(resumeAfterLoginFnStub).toHaveBeenCalledWith(false);
    });

    it('should not call goToPricingReviewFn if user is not LoggedIn', () => {
      createComponent({ shouldResumeAfterLogin: true });

      expect(mockGoToPricingReviewFn).not.toHaveBeenCalled();
      expect(resumeAfterLoginFnStub).not.toHaveBeenCalledWith(false);
    });

    it('should not call goToPricingReviewFn if shouldResumeAfterLogin is false', () => {
      createComponent({ isLoggedIn: true });

      expect(mockGoToPricingReviewFn).not.toHaveBeenCalled();
      expect(resumeAfterLoginFnStub).not.toHaveBeenCalledWith(false);
    });
  });

  describe('when points booking', () => {
    it('should goToPricingReviewFn if user isLoggedIn and has enough points', () => {
      const props = new AirUpgradeViewReservationApiJsonBuilder().withBothBoundsSelected().build();
      const { container } = createComponent({ ...props, isLoggedIn: true, pointsBooking: true });
      const {
        pricingDataList,
        _links: { changePricingPage }
      } = props.viewUpgradeReservationPage;

      fireEvent.click(container.querySelector('.field .checkbox-button'));
      fireEvent.submit(container.querySelector('form'));

      expect(mockGoToPricingReviewFn).toHaveBeenCalledWith(changePricingPage, pricingDataList, true);
    });

    it('should push to login page if user is not LoggedIn', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/upgrade');
      const { container } = createComponent({ pointsBooking: true });

      fireEvent.click(container.querySelector('.field .checkbox-button'));
      fireEvent.submit(container.querySelector('form'));

      expect(pushStub).toHaveBeenCalledWith('/login', null, {
        to: '/air/upgrade/select.html',
        simpleLogin: true,
        withPoints: true
      });
      expect(mockGoToPricingReviewFn).not.toHaveBeenCalled();
      expect(resumeAfterLoginFnStub).toHaveBeenCalledWith(true);
    });

    it('should showNativeAppLoginFn if user is not LoggedIn and webView is true', () => {
      const { container } = createComponent({ isWebView: true, pointsBooking: true });

      fireEvent.click(container.querySelector('.field .checkbox-button'));
      fireEvent.submit(container.querySelector('form'));

      expect(showNativeAppLoginFnStub).toHaveBeenCalledWith({ loginType: LOGIN_TYPES.POINTS });
      expect(mockGoToPricingReviewFn).not.toHaveBeenCalled();
      expect(resumeAfterLoginFnStub).toHaveBeenCalledWith(true);
    });

    it("should show not enough points popup if user is loggedIn but doesn't have enough points", () => {
      const { container } = createComponent({ pointsBooking: true, accountRedeemablePoints: 0, isLoggedIn: true });

      fireEvent.click(container.querySelector('.field .checkbox-button'));
      fireEvent.submit(container.querySelector('form'));

      expect(showDialogFnStub).toHaveBeenCalled();
      expect(pushStub).not.toHaveBeenCalled();
      expect(mockGoToPricingReviewFn).not.toHaveBeenCalled();
      expect(resumeAfterLoginFnStub).not.toHaveBeenCalled();
    });
  });

  describe('when unMount', () => {
    it('should call saveUpgradeTypeFn on component load', () => {
      const props = new AirUpgradeViewReservationApiJsonBuilder().withBothBoundsSelected().build();

      createComponent({ ...props, isLoggedIn: true, pointsBooking: true });
      cleanup();

      expect(saveUpgradeTypeFnStub).toHaveBeenCalledWith('');
    });
  });

  const createComponent = (props = {}) => {
    const { viewUpgradeReservationPage } = new AirUpgradeViewReservationApiJsonBuilder().build();
    const combinedProps = {
      accountRedeemablePoints: 15000,
      changeSelectedBoundFn: mockChangeSelectedBoundFn,
      goToAirChangePricingReviewFn: mockGoToPricingReviewFn,
      hideDialogFn: hideDialogFnStub,
      isLoggedIn: false,
      isWebView: false,
      loadUpgradeFarePagePlacementsFn: () => {},
      location: {},
      pointsBooking: false,
      push: pushStub,
      resumeAfterLoginFn: resumeAfterLoginFnStub,
      saveUpgradeTypeFn: saveUpgradeTypeFnStub,
      shouldResumeAfterLogin: false,
      showDialogFn: showDialogFnStub,
      showNativeAppLoginFn: showNativeAppLoginFnStub,
      upgradeFarePagePlacement: {},
      viewUpgradeReservationPage,
      ...props
    };

    const store = createMockStoreWithRouterMiddleware()();

    return render(
      <Provider store={store}>
        <UpgradeFareSelectBoundsPage {...combinedProps} />
      </Provider>
    );
  };
});
