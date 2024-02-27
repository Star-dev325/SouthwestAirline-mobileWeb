import { cleanup, fireEvent } from '@testing-library/react';
import { AIR_UPGRADE_FARE_OPTIONS } from 'src/airUpgrade/constants/airUpgradeConstants';
import { UpgradeFarePage } from 'src/airUpgrade/pages/upgradeFarePage';
import { AIR_UPGRADE_INDEX_PAGE_ID } from 'src/wcm/constants/wcmConstants';
import ImagePlacementBuilder from 'test/builders/model/imagePlacementBuilder';
import { integrationRender } from 'test/unit/helpers/testingLibraryUtils';

describe('UpgradeFarePage', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  const location = {};

  describe('render', () => {
    it('should render correctly', () => {
      const { container: UpgradeFarePage } = createComponent({});

      expect(UpgradeFarePage).toMatchSnapshot();
    });

    it('should not render header when in a webview', () => {
      const { container: UpgradeFarePage } = createComponent({ isWebView: true });

      expect(UpgradeFarePage).toMatchSnapshot();
    });

    it('should should render the placement if promoTop01 exists', () => {
      const imagePlacement = new ImagePlacementBuilder().build();
      const { container } = createComponent({
        upgradeFarePagePlacement: { promoTop01: imagePlacement }
      });

      expect(container).toMatchSnapshot();
    });
  });

  describe('useEffect', () => {
    it('should invoke saveUpgradeTypeFnStub on mounted also if no upgradeType is present in the URL', () => {
      const saveUpgradeTypeFnStub = jest.fn();

      createComponent({ saveUpgradeTypeFn: saveUpgradeTypeFnStub });

      expect(saveUpgradeTypeFnStub).toHaveBeenCalledWith(null);
    });

    it('should invoke saveUpgradeTypeFnStub on mounted with UPGRADE_TO_PLU when upgradeToPLU query param is present', () => {
      const saveUpgradeTypeFnStub = jest.fn();

      createComponent({ saveUpgradeTypeFn: saveUpgradeTypeFnStub, location: { search: '?upgradeType=upgradeToPLU' } });

      expect(saveUpgradeTypeFnStub).toHaveBeenCalledWith(AIR_UPGRADE_FARE_OPTIONS.UPGRADE_TO_PLU);
    });
  });

  describe('loadUpgradeFarePagePlacementsFn', () => {
    it('should call loadUpgradeFarePagePlacementsFn if it has an upgradeType but does not have a promoTop01', () => {
      const upgradeType = AIR_UPGRADE_FARE_OPTIONS.UPGRADE_TO_BUS;
      const loadUpgradeFarePagePlacementsFn = jest.fn();

      createComponent({
        upgradeType,
        loadUpgradeFarePagePlacementsFn,
        location
      });

      expect(loadUpgradeFarePagePlacementsFn).toHaveBeenCalledWith(AIR_UPGRADE_FARE_OPTIONS.UPGRADE_TO_BUS, AIR_UPGRADE_INDEX_PAGE_ID);
    });

    it('should not call loadUpgradeFarePagePlacements if it does not have a upgradeType', () => {
      const location = {};
      const loadUpgradeFarePagePlacementsFn = jest.fn();

      createComponent({
        location,
        loadUpgradeFarePagePlacementsFn
      });

      expect(loadUpgradeFarePagePlacementsFn).not.toHaveBeenCalled();
    });
  });

  describe('onSubmit', () => {
    it('should invoke getUpgradeFareReservationFn when submit', () => {
      const getUpgradeFareReservationFnStub = jest.fn();
      const { container: UpgradeFarePage } = createComponent({
        getUpgradeFareReservationFn: getUpgradeFareReservationFnStub
      });

      fireEvent.submit(UpgradeFarePage.querySelector('form'));

      expect(getUpgradeFareReservationFnStub).toHaveBeenCalled();
      expect(getUpgradeFareReservationFnStub).toHaveBeenCalledWith({
        firstName: 'Joe',
        lastName: 'Rogan',
        recordLocator: '4NWG2V'
      });
    });
  });

  describe('loadUpgradeIndexFn', () => {
    it('should call loadUpgradeIndexFn on component load', () => {
      const upgradeType = AIR_UPGRADE_FARE_OPTIONS.UPGRADE_TO_BUS;
      const loadUpgradeFarePagePlacementsFn = jest.fn();
      const loadUpgradeIndexFn = jest.fn();

      createComponent({
        upgradeType,
        loadUpgradeFarePagePlacementsFn,
        loadUpgradeIndexFn,
        location
      });

      expect(loadUpgradeIndexFn).toHaveBeenCalled();
    });
  });

  describe('unMount', () => {
    it('should call saveUpgradeTypeFn on component load', () => {
      const upgradeType = AIR_UPGRADE_FARE_OPTIONS.UPGRADE_TO_BUS;
      const loadUpgradeFarePagePlacementsFn = jest.fn();
      const loadUpgradeIndexFn = jest.fn();
      const saveUpgradeTypeFnStub = jest.fn();

      createComponent({
        upgradeType,
        loadUpgradeFarePagePlacementsFn,
        loadUpgradeIndexFn,
        location,
        saveUpgradeTypeFn: saveUpgradeTypeFnStub
      });
      cleanup();

      expect(saveUpgradeTypeFnStub).toHaveBeenCalledWith('');
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      query: {},
      upgradeFarePagePlacement: {},
      saveUpgradeTypeFn: () => {},
      getUpgradeFareReservationFn: () => {},
      loadUpgradeFarePagePlacementsFn: () => {},
      loadUpgradeIndexFn: () => {},
      isWebView: false,
      location: ''
    };
    const combinedProps = { ...defaultProps, ...props };

    const state = {
      app: {
        formData: {
          UPGRADE_FARE_RETRIEVE_RESERVATION_FORM: {
            url: '/air/upgrade',
            data: {
              recordLocator: '4NWG2V',
              firstName: 'Joe',
              lastName: 'Rogan'
            }
          }
        }
      }
    };

    return integrationRender()(state, UpgradeFarePage, { ...combinedProps });
  };
});
