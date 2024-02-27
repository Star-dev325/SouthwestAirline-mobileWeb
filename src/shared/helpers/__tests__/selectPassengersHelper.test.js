import {
  getRefundQuoteRequestData,
  getSelectedPassengerIds,
  getShowEmailFieldWithTexts,
  getSplitPnrLinkObjWithSelectedIdsAndEmail
} from 'src/shared/helpers/selectPassengersHelper.js';
import {
  getSplitPnrDetails,
  refundQuoteLinkObject,
  splitPnrLinkObjWithSelectedIdsAndEmail
} from 'test/builders/model/selectPassengersPageBuilder';

describe('selectPassengersHelper', () => {
  describe('getSelectedPassengerIds', () => {
    it('should return only selected passenger ids', () => {
      const formData = {
        receiptEmail: 'test@test.com',
        id1: true,
        id2: false,
        id3: true
      };

      expect(getSelectedPassengerIds(formData)).toEqual(['id1', 'id3']);
    });

    it('should return empty array if there are no selected passenger ids', () => {
      const formData = {
        receiptEmail: 'test@test.com',
        id1: false,
        id2: false,
        id3: false
      };

      expect(getSelectedPassengerIds(formData)).toEqual([]);
    });
  });

  describe('getShowEmailFieldWithTexts', () => {
    const { passengerSelections } = getSplitPnrDetails();

    it('should return true when selectedPassengerIds length is not equal to passengerSelections length', () => {
      const selectedPassengerIds = ['id1'];

      expect(getShowEmailFieldWithTexts(passengerSelections, selectedPassengerIds)).toEqual(true);
    });

    describe('should return false', () => {
      it('when selectedPassengerIds length is equal to passengerSelections length', () => {
        const selectedPassengerIds = ['id1', 'id2'];

        expect(getShowEmailFieldWithTexts(passengerSelections, selectedPassengerIds)).toEqual(false);
      });

      it('when selectedPassengerIds length is zero', () => {
        const selectedPassengerIds = [];

        expect(getShowEmailFieldWithTexts(passengerSelections, selectedPassengerIds)).toEqual(false);
      });
    });
  });

  describe('getSplitPnrLinkObjWithSelectedIdsAndEmail', () => {
    it('should return link object with selected ids and email', () => {
      const formData = {
        id1: true,
        receiptEmail: 'test@test.com'
      };
      const linkObject = {
        body: {
          passengerSearchToken: 'testToken'
        },
        href: '/v1/mobile-air-booking/page/flights/change/split-pnr/PPUWKZ',
        method: 'PUT'
      };
      const selectedPassengerIds = ['id1'];

      expect(getSplitPnrLinkObjWithSelectedIdsAndEmail(formData, linkObject, selectedPassengerIds)).toEqual(
        splitPnrLinkObjWithSelectedIdsAndEmail
      );
    });
  });

  describe('getRefundQuoteRequestData', () => {
    it('should return link object with refundRequested null value', () => {
      const expectedResult = {
        ...refundQuoteLinkObject,
        body: {
          ...refundQuoteLinkObject.body,
          refundRequested: null
        }
      };

      expect(getRefundQuoteRequestData(refundQuoteLinkObject)).toEqual(expectedResult);
    });
  });
});
