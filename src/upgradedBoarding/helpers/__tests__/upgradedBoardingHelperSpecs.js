import _ from 'lodash';
import {
  getPaxCountForSegment,
  generateSegmentFormFieldName,
  getDefaultSelectedUpgradedBoardingProducts,
  getUpgradedBoardingPriceTotal,
  getUpgradedBoardingReservationLink
} from 'src/upgradedBoarding/helpers/upgradedBoardingHelper';
import UpgradedBoardingPurchaseFormBuilder from 'test/builders/model/upgradedBoardingPurchaseFormBuilder';

describe('upgradedBoardingHelper', () => {
  describe('getPaxCountForSegment', () => {
    const segment = {
      passengers: [
        {
          name: 'Pax 1',
          accountNumber: '123',
          _meta: {
            productId: 'abc'
          }
        },
        {
          name: 'Pax 1',
          accountNumber: '123',
          _meta: {
            productId: 'def'
          }
        }
      ]
    };

    it('should return correct paxCount given segment and formData', () => {
      const formData = {
        abc: true,
        def: true
      };
      const result = getPaxCountForSegment(formData, segment);

      expect(result).to.eq(2);
    });

    it('should return correct paxCount given segment and formData', () => {
      const formData = {
        abc: true,
        def: false
      };
      const result = getPaxCountForSegment(formData, segment);

      expect(result).to.eq(1);
    });

    it('should return correct paxCount given segment and formData', () => {
      const formData = {
        abc: true,
        def: true
      };
      const segmentWithDiffProductId = {
        passengers: [
          {
            name: 'Pax 1',
            accountNumber: '123',
            _meta: {
              productId: 'abc'
            }
          },
          {
            name: 'Pax 1',
            accountNumber: '123',
            _meta: {
              productId: 'ghi'
            }
          }
        ]
      };
      const result = getPaxCountForSegment(formData, segmentWithDiffProductId);

      expect(result).to.eq(1);
    });

    it('should return correct paxCount given undefined segment and formData', () => {
      const formData = {
        abc: true,
        def: true
      };
      const result = getPaxCountForSegment(formData, {});

      expect(result).to.eq(0);
    });

    it('should return correct paxCount given segment and undefined formData', () => {
      const result = getPaxCountForSegment({}, segment);

      expect(result).to.eq(0);
    });
  });

  describe('getUpgradedBoardingPriceTotal', () => {
    it('should return correct total', () => {
      const formData = {
        abcdefghi: true
      };
      const {
        upgradedBoardingPurchasePage: { upgradedBoardingSegment }
      } = new UpgradedBoardingPurchaseFormBuilder().build();
      const result = getUpgradedBoardingPriceTotal(formData, upgradedBoardingSegment);

      expect(result).to.eq('40.00');
    });

    it('should return correct total for multi pax', () => {
      const formData = {
        abcdefghi: true,
        jklmnopqr: true
      };
      const {
        upgradedBoardingPurchasePage: { upgradedBoardingSegment }
      } = new UpgradedBoardingPurchaseFormBuilder().build();
      const result = getUpgradedBoardingPriceTotal(formData, upgradedBoardingSegment);

      expect(result).to.eq('80.00');
    });

    it('should return correct total for no pax selected', () => {
      const formData = {};
      const {
        upgradedBoardingPurchasePage: { upgradedBoardingSegment }
      } = new UpgradedBoardingPurchaseFormBuilder().build();
      const result = getUpgradedBoardingPriceTotal(formData, upgradedBoardingSegment);

      expect(result).to.eq('0.00');
    });

    it('should return correct total for no pax selected', () => {
      const formData = {};
      const {
        upgradedBoardingPurchasePage: { upgradedBoardingSegment }
      } = new UpgradedBoardingPurchaseFormBuilder().build();
      const result = getUpgradedBoardingPriceTotal(formData, upgradedBoardingSegment);

      expect(result).to.eq('0.00');
    });

    it('should return correct total for missing amount', () => {
      const formData = {};
      const {
        upgradedBoardingPurchasePage: { upgradedBoardingSegment }
      } = new UpgradedBoardingPurchaseFormBuilder().build();

      _.unset(upgradedBoardingSegment, 'upgradedBoardingPrice.amount');
      const result = getUpgradedBoardingPriceTotal(formData, upgradedBoardingSegment);

      expect(result).to.eq('0.00');
    });
  });

  describe('generateSegmentFormFieldName', () => {
    it('should return correctly generated form key', () => {
      const result = generateSegmentFormFieldName(0);

      expect(result).to.eq('ubBoundCheckbox_0');
    });

    it('should return empty string when key missing', () => {
      const result = generateSegmentFormFieldName();

      expect(result).to.eq('');
    });
  });

  describe('getDefaultSelectedUpgradedBoardingProducts', () => {
    const paxOne = {
      name: 'Bobby Blaine (C1))',
      accountNumber: '0123456789',
      _meta: {
        productId: 'abcdefghi'
      }
    };
    const paxTwo = {
      name: 'Brenda Blaine (C2)',
      accountNumber: '0123456789',
      _meta: {
        productId: 'jklmnopqr'
      }
    };
    const defaultUbSegmentList = [
      {
        passengers: [paxOne]
      }
    ];

    it('should return empty object when passenger list is empty', () => {
      const result = getDefaultSelectedUpgradedBoardingProducts(false, [{ passengers: [] }]);

      expect(result).to.deep.eq({});
    });

    it('should return empty object when segment list is empty', () => {
      const result = getDefaultSelectedUpgradedBoardingProducts(false, []);

      expect(result).to.deep.eq({});
    });

    it('should return generated formData for productIds in passenger list', () => {
      const result = getDefaultSelectedUpgradedBoardingProducts(false, defaultUbSegmentList);

      expect(result).to.deep.eq({ abcdefghi: true });
    });

    it('should return generated formData for productIds in passenger list for more than one segment', () => {
      const ubSegmentList = [
        {
          passengers: [paxOne]
        },
        {
          passengers: [paxTwo]
        }
      ];
      const result = getDefaultSelectedUpgradedBoardingProducts(false, ubSegmentList);

      expect(result).to.deep.eq({ abcdefghi: true, jklmnopqr: true });
    });

    it('should return generated formData for productIds in passenger list for more than one passenger in segment', () => {
      const ubSegmentListWithTwoSegments = [
        {
          passengers: [paxOne, paxTwo]
        }
      ];
      const result = getDefaultSelectedUpgradedBoardingProducts(false, ubSegmentListWithTwoSegments);

      expect(result).to.deep.eq({ abcdefghi: true, jklmnopqr: true });
    });

    it('should return empty object when segment list is empty and UPGRADED_BOARDING_BY_SEGMENT is true', () => {
      const result = getDefaultSelectedUpgradedBoardingProducts(true, []);

      expect(result).to.deep.eq({});
    });

    it('should return segment only when passenger list is empty', () => {
      const result = getDefaultSelectedUpgradedBoardingProducts(true, [{ passengers: [] }]);

      expect(result).to.deep.eq({ ubBoundCheckbox_0: true });
    });

    it('should return generated formData for productIds in passenger list and segment list when UPGRADED_BOARDING_BY_SEGMENT is true', () => {
      const ubSegmentList = [
        {
          passengers: [paxOne]
        },
        {
          passengers: [paxTwo]
        }
      ];
      const result = getDefaultSelectedUpgradedBoardingProducts(true, ubSegmentList);

      expect(result).to.deep.eq({
        abcdefghi: true,
        jklmnopqr: true,
        ubBoundCheckbox_0: true,
        ubBoundCheckbox_1: true
      });
    });
  });

  describe('getUpgradedBoardingReservationLink', () => {
    it('should return correct link object', () => {
      const pnr = {
        firstName: 'Joe',
        lastName: 'Rogan',
        recordLocator: 'D23M9T'
      };
      const linkObj = {
        href: `/v1/mobile-air-operations/page/upgraded-boarding/D23M9T`,
        body: {
          firstName: 'Joe',
          lastName: 'Rogan'
        },
        method: 'POST'
      };

      expect(getUpgradedBoardingReservationLink(pnr)).to.deep.eq(linkObj);
    });
  });
});
