jest.mock('src/shared/api/restClient', () => ({
  ajax: jest.fn().mockResolvedValue({ data: { name: 'value from the api' } })
}));

import { ajax } from 'src/shared/api/restClient';
import {
  retrieveCancelStandbyListing,
  retrieveSameDayBoundInformation,
  retrieveSameDayFlightDetails,
  retrieveSameDayPricingInformation,
  retrieveSameDayShoppingInformation,
  updateSameDayConfirmation,
  updateSameDayConfirmationRefund
} from 'src/shared/api/sameDayApi';
import url from 'url';

describe('SameDayApi', () => {
  const token =
    'b9QEIPa_TRN31EWdqA6gYDyB9pu3ktdW89IUhvYnIxFoWCiKrOU3R-RSjDggfPr0N2pZxX0k1GtpcWb28okHxM9yEPt6Nic3LbR1NTQyTsl8afOXxewf1G8B-8J2fgRo_UX0MlsMY7SOtlJmbg==';
  const reference = 'b9QEIPa_TRN31EWdqA6gYDyB9pu3ktdW89IUhvYnIxFoWCiKrOU3R';
  const flightIdentifierInfo = '8923FDFDSERWDFSGBVVNHGBNHJHUJHNMJHMNHJHTREW';
  const productIdInfo = 'productId';
  const recipientEmail = 'tester@test.com';
  const refundMethod = null;
  const sameDayShopping = {
    href: '/v1/mobile-air-operations/page/same-day/shopping/4ENWXX',
    method: 'POST'
  };
  const expectedRequest = {
    url: '/sameDayTest',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json'
  };
  const expectedPUTRequest = {
    url: '/sameDayTest',
    type: 'PUT',
    dataType: 'json',
    contentType: 'application/json'
  };
  const expectedRefundPUTRequestCreditDue = {
    url: '/x-confirmation-refund',
    type: 'PUT',
    dataType: 'json',
    contentType: 'application/json'
  };
  const expectedRefundPUTRequestNoCreditDue = {
    url: '/confirmation-refund',
    type: 'PUT',
    dataType: 'json',
    contentType: 'application/json'
  };
  const sameDayPricing = {
    href: '/v1/mobile-air-operations/page/same-day/pricing/3BLRDE',
    method: 'POST'
  };
  const sameDayConfirmation = {
    href: '/v1/mobile-air-operations/page/same-day/confirmation',
    method: 'PUT'
  };
  const sameDayConfirmationRefund = {
    href: '/v1/mobile-air-operations/page/same-day/3BLRDE/confirmation-refund',
    method: 'PUT',
    xhref: '/v1/mobile-air-operations/page/same-day/3BLRDE/x-confirmation-refund'
  };
  const sameDayCancellation = {
    href: '/v1/mobile-air-operations/page/standby/ABLDXY',
    method: 'PUT'
  };
  const sameDayFlightDetails = {
    href: '/v1/mobile-air-operations/feature/same-day/flight-details/79ABCD',
    method: 'POST'
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(url, 'resolve').mockReturnValue('/sameDayTest');
  });

  describe('sameDayBoundApi', () => {
    it('should retrieveSameDayBoundInformation when samedayUpdates object is available', () => {
      const sameDayUpdates = {
        href: '/v1/mobile-air-operations/page/same-day/4ENWXX',
        method: 'POST',
        body: {
          passengerSearchToken:
            'DiP1aMwftceY4qdxOYj_nnNGJX0YFN1S2MzSTzImhWXOgCjxzvyVC4IxTc4sclK_ImTFcwoS0AbjZpGPA1Z5Y09cPPeLGUWY2ZKpbZfoOPrb7T-vZ8JHlYHnb85UbRd3R5p2MP-YnJdGJSJS'
        },
        labelText: 'Same-day change and standby'
      };

      retrieveSameDayBoundInformation(sameDayUpdates);
      expect(ajax).toHaveBeenCalledWith({
        url: '/sameDayTest',
        type: 'POST',
        body: {
          passengerSearchToken:
            'DiP1aMwftceY4qdxOYj_nnNGJX0YFN1S2MzSTzImhWXOgCjxzvyVC4IxTc4sclK_ImTFcwoS0AbjZpGPA1Z5Y09cPPeLGUWY2ZKpbZfoOPrb7T-vZ8JHlYHnb85UbRd3R5p2MP-YnJdGJSJS'
        },
        dataType: 'json',
        contentType: 'application/json'
      });
    });

    it('should make the request when no body is present in sameDayUpdates object  ', () => {
      const sameDayUpdates = {
        href: '/v1/mobile-air-operations/page/same-day/4ENWXX',
        method: 'POST',
        labelText: 'Same-day change and standby'
      };

      retrieveSameDayBoundInformation(sameDayUpdates);
      expect(ajax).toHaveBeenCalledWith({
        url: '/sameDayTest',
        type: 'POST',
        body: {
          passengerSearchToken: undefined
        },
        dataType: 'json',
        contentType: 'application/json'
      });
    });

    it('should make the request when the body is {} in sameDayUpdates object ', () => {
      const sameDayUpdates = {
        href: '/v1/mobile-air-operations/page/same-day/4ENWXX',
        method: 'POST',
        body: {},
        labelText: 'Same-day change and standby'
      };

      retrieveSameDayBoundInformation(sameDayUpdates);
      expect(ajax).toHaveBeenCalledWith({
        url: '/sameDayTest',
        type: 'POST',
        body: {
          passengerSearchToken: undefined
        },
        dataType: 'json',
        contentType: 'application/json'
      });
    });

    it('should make the request when body is undefined in sameDayUpdates object', () => {
      const sameDayUpdates = {
        href: '/v1/mobile-air-operations/page/same-day/4ENWXX',
        method: 'POST',
        body: undefined,
        labelText: 'Same-day change and standby'
      };

      retrieveSameDayBoundInformation(sameDayUpdates);
      expect(ajax).toHaveBeenCalledWith({
        url: '/sameDayTest',
        type: 'POST',
        body: {
          passengerSearchToken: undefined
        },
        dataType: 'json',
        contentType: 'application/json'
      });
    });
  });

  describe('sameDayShoppingApi', () => {
    it('should retrieveSameDayShoppingInformation when sameDayShopping object is available', () => {
      const sameDayShoppingInfo = {
        ...sameDayShopping,
        body: {
          sameDayToken: token
        }
      };

      retrieveSameDayShoppingInformation(sameDayShoppingInfo, reference);
      expect(ajax).toHaveBeenCalledWith({
        ...expectedRequest,
        body: {
          sameDayToken: token,
          boundReference: reference
        }
      });
    });

    it('should make the api call even when the request has a sameDayShopping object with body has only sameDayToken property available and boundReference is {}', () => {
      const sameDayShoppingInfo = {
        ...sameDayShopping,
        body: {
          sameDayToken: token
        }
      };
      const reference = {};

      retrieveSameDayShoppingInformation(sameDayShoppingInfo, reference);
      expect(ajax).toHaveBeenCalledWith({
        ...expectedRequest,
        body: {
          sameDayToken: token,
          boundReference: reference
        }
      });
    });

    it('should make the api call even when the request has a sameDayShopping object with body has only boundReference property available and sameDayToken is not available', () => {
      const sameDayShoppingInfo = {
        ...sameDayShopping,
        body: {}
      };

      retrieveSameDayShoppingInformation(sameDayShoppingInfo, reference);
      expect(ajax).toHaveBeenCalledWith({
        ...expectedRequest,
        body: {
          boundReference: reference
        }
      });
    });

    it('should make the api call even when the request has a sameDayShopping object with body has only sameDayToken property undefined and boundReference is available', () => {
      const sameDayShoppingInfo = {
        ...sameDayShopping,
        body: {
          sameDayToken: undefined
        }
      };

      retrieveSameDayShoppingInformation(sameDayShoppingInfo, reference);
      expect(ajax).toHaveBeenCalledWith({
        ...expectedRequest,
        body: {
          sameDayToken: undefined,
          boundReference: reference
        }
      });
    });

    it('should make the api call even when the request has a sameDayShopping object with body has only sameDayToken  property available and boundReference is {}', () => {
      const sameDayShoppingInfo = {
        ...sameDayShopping,
        body: {
          sameDayToken: token
        }
      };
      const reference = {};

      retrieveSameDayShoppingInformation(sameDayShoppingInfo, reference);
      expect(ajax).toHaveBeenCalledWith({
        ...expectedRequest,
        body: {
          sameDayToken: token,
          boundReference: reference
        }
      });
    });

    it('should make the api call even when the request has a sameDayShopping object with body has only boundReference property {} and sameDayToken is undefined', () => {
      const sameDayShoppingInfo = {
        ...sameDayShopping,
        body: {
          sameDayToken: undefined
        }
      };
      const reference = {};

      retrieveSameDayShoppingInformation(sameDayShoppingInfo, reference);
      expect(ajax).toHaveBeenCalledWith({
        ...expectedRequest,
        body: {
          sameDayToken: undefined,
          boundReference: reference
        }
      });
    });

    it('should make the api call even when the request has a sameDayShopping object with body {} ', () => {
      const sameDayShoppingInfo = { ...sameDayShopping, body: {} };

      retrieveSameDayShoppingInformation(sameDayShoppingInfo, reference);
      expect(ajax).toHaveBeenCalledWith({
        ...expectedRequest,
        body: {
          sameDayToken: undefined,
          boundReference: reference
        }
      });
    });

    it('should make the api call even when the request has a sameDayShopping object with body undefined ', () => {
      const sameDayShoppingInfo = { ...sameDayShopping, body: undefined };

      retrieveSameDayShoppingInformation(sameDayShoppingInfo, reference);
      expect(ajax).toHaveBeenCalledWith({
        ...expectedRequest,
        body: {
          sameDayToken: undefined,
          boundReference: reference
        }
      });
    });
  });

  describe('sameDayPricingApi', () => {
    it('should retrieveSameDayPricingInformation when sameDayPricing object is available', () => {
      const sameDayPricingInfo = {
        ...sameDayPricing,
        body: {
          sameDayToken: token,
          boundReference: reference,
          productId: productIdInfo
        }
      };

      retrieveSameDayPricingInformation(sameDayPricingInfo);
      expect(ajax).toHaveBeenCalledWith({
        ...expectedRequest,
        body: {
          sameDayToken: token,
          boundReference: reference,
          productId: productIdInfo
        }
      });
    });

    it('should make the api call even when the request has a sameDayPricing object with body has only sameDayToken, productId are available and boundReference is {}', () => {
      const sameDayPricingInfo = {
        ...sameDayPricing,
        body: {
          sameDayToken: token,
          boundReference: {},
          productId: productIdInfo
        }
      };

      retrieveSameDayPricingInformation(sameDayPricingInfo);
      expect(ajax).toHaveBeenCalledWith({
        ...expectedRequest,
        body: {
          sameDayToken: token,
          boundReference: {},
          productId: productIdInfo
        }
      });
    });
    it('should make the api call even when the request has a sameDayPricing object with body has only sameDayToken, boundReference are available and productId is {}', () => {
      const sameDayPricingInfo = {
        ...sameDayPricing,
        body: {
          sameDayToken: token,
          boundReference: reference,
          productId: {}
        }
      };

      retrieveSameDayPricingInformation(sameDayPricingInfo);
      expect(ajax).toHaveBeenCalledWith({
        ...expectedRequest,
        body: {
          sameDayToken: token,
          boundReference: reference,
          productId: {}
        }
      });
    });

    it('should make the api call even when the request has a sameDayPricing object with body has only productId, boundReference are available and sameDayToken is {}', () => {
      const sameDayPricingInfo = {
        ...sameDayPricing,
        body: {
          sameDayToken: {},
          boundReference: reference,
          productId: productIdInfo
        }
      };

      retrieveSameDayPricingInformation(sameDayPricingInfo);
      expect(ajax).toHaveBeenCalledWith({
        ...expectedRequest,
        body: {
          sameDayToken: {},
          boundReference: reference,
          productId: productIdInfo
        }
      });
    });

    it('should make the api call even when the request has a sameDayPricing object with body has only sameDayToken is available and boundReference, productId is {}', () => {
      const sameDayPricingInfo = {
        ...sameDayPricing,
        body: {
          sameDayToken: token,
          boundReference: {},
          productId: {}
        }
      };

      retrieveSameDayPricingInformation(sameDayPricingInfo);
      expect(ajax).toHaveBeenCalledWith({
        ...expectedRequest,
        body: {
          sameDayToken: token,
          boundReference: {},
          productId: {}
        }
      });
    });

    it('should make the api call even when the request has a sameDayPricing object with body has only boundReference is available and sameDayToken, productId is {}', () => {
      const sameDayPricingInfo = {
        ...sameDayPricing,
        body: {
          sameDayToken: {},
          boundReference: reference,
          productId: {}
        }
      };

      retrieveSameDayPricingInformation(sameDayPricingInfo);
      expect(ajax).toHaveBeenCalledWith({
        ...expectedRequest,
        body: {
          sameDayToken: {},
          boundReference: reference,
          productId: {}
        }
      });
    });

    it('should make the api call even when the request has a sameDayPricingInfo object with body has only productId is available and sameDayToken, boundReference is {}', () => {
      const sameDayPricingInfo = {
        ...sameDayPricing,
        body: {
          sameDayToken: {},
          boundReference: reference,
          productId: productIdInfo
        }
      };

      retrieveSameDayPricingInformation(sameDayPricingInfo);
      expect(ajax).toHaveBeenCalledWith({
        ...expectedRequest,
        body: {
          sameDayToken: {},
          boundReference: reference,
          productId: productIdInfo
        }
      });
    });

    it('should make the api call even when the request has a sameDayPricingInfo object with body has sameDayToken,boundReference are available and productId is not available', () => {
      const sameDayPricingInfo = {
        ...sameDayPricing,
        body: {
          sameDayToken: token,
          boundReference: reference
        }
      };

      retrieveSameDayPricingInformation(sameDayPricingInfo);
      expect(ajax).toHaveBeenCalledWith({
        ...expectedRequest,
        body: {
          sameDayToken: token,
          boundReference: reference,
          productId: undefined
        }
      });
    });

    it('should make the api call even when the request has a sameDayPricingInfo object with body has sameDayToken,productId are available and boundReference is not available', () => {
      const sameDayPricingInfo = {
        ...sameDayPricing,
        body: {
          sameDayToken: token,
          productId: productIdInfo
        }
      };

      retrieveSameDayPricingInformation(sameDayPricingInfo);
      expect(ajax).toHaveBeenCalledWith({
        ...expectedRequest,
        body: {
          sameDayToken: token,
          boundReference: undefined,
          productId: productIdInfo
        }
      });
    });

    it('should make the api call even when the request has a sameDayPricingInfo object with body has boundReference,productId are available and sameDayToken is not available', () => {
      const sameDayPricingInfo = {
        ...sameDayPricing,
        body: {
          productId: productIdInfo,
          boundReference: reference
        }
      };

      retrieveSameDayPricingInformation(sameDayPricingInfo);
      expect(ajax).toHaveBeenCalledWith({
        ...expectedRequest,
        body: {
          sameDayToken: undefined,
          boundReference: reference,
          productId: productIdInfo
        }
      });
    });

    it('should make the api call even when the request has a sameDayPricingInfo object with body has sameDayToken is available and boundReference,productId are not available', () => {
      const sameDayPricingInfo = {
        ...sameDayPricing,
        body: {
          sameDayToken: token
        }
      };

      retrieveSameDayPricingInformation(sameDayPricingInfo);
      expect(ajax).toHaveBeenCalledWith({
        ...expectedRequest,
        body: {
          sameDayToken: token,
          boundReference: undefined,
          productId: undefined
        }
      });
    });

    it('should make the api call even when the request has a sameDayPricingInfo object with body has boundReference is available and sameDayToken,productId are not available', () => {
      const sameDayPricingInfo = {
        ...sameDayPricing,
        body: {
          boundReference: reference
        }
      };

      retrieveSameDayPricingInformation(sameDayPricingInfo);
      expect(ajax).toHaveBeenCalledWith({
        ...expectedRequest,
        body: {
          sameDayToken: undefined,
          boundReference: reference,
          productId: undefined
        }
      });
    });

    it('should make the api call even when the request has a sameDayPricingInfo object with body has productId is available and sameDayToken,boundReference are not available', () => {
      const sameDayPricingInfo = {
        ...sameDayPricing,
        body: {
          productId: productIdInfo
        }
      };

      retrieveSameDayPricingInformation(sameDayPricingInfo);
      expect(ajax).toHaveBeenCalledWith({
        ...expectedRequest,
        body: {
          sameDayToken: undefined,
          boundReference: undefined,
          productId: productIdInfo
        }
      });
    });

    it('should make the api call even when the request has a sameDayPricingInfo object with body has sameDayToken is available and boundReference,productId are not available', () => {
      const sameDayPricingInfo = {
        ...sameDayPricing,
        body: {
          boundReference: undefined
        }
      };

      retrieveSameDayPricingInformation(sameDayPricingInfo);
      expect(ajax).toHaveBeenCalledWith({
        ...expectedRequest,
        body: {
          sameDayToken: undefined,
          boundReference: undefined,
          productId: undefined
        }
      });
    });

    it('should make the api call even when the request has a sameDayPricing object with body has boundReference,productId are available and sameDayToken is undefined', () => {
      const sameDayPricingInfo = {
        ...sameDayPricing,
        body: {
          sameDayToken: undefined,
          boundReference: reference,
          productId: productIdInfo
        }
      };

      retrieveSameDayPricingInformation(sameDayPricingInfo);
      expect(ajax).toHaveBeenCalledWith({
        ...expectedRequest,
        body: {
          sameDayToken: undefined,
          boundReference: reference,
          productId: productIdInfo
        }
      });
    });

    it('should make the api call even when the request has a sameDayShopping object with body has only boundReference property {} and sameDayToken is undefined', () => {
      const sameDayPricingInfo = {
        ...sameDayPricing,
        body: {
          sameDayToken: undefined
        }
      };

      retrieveSameDayPricingInformation(sameDayPricingInfo);
      expect(ajax).toHaveBeenCalledWith({
        ...expectedRequest,
        body: {
          sameDayToken: undefined,
          boundReference: undefined,
          productId: undefined
        }
      });
    });

    it('should make the api call even when the request has a sameDayPricingInfo object with body {} ', () => {
      const sameDayPricingInfo = {
        ...sameDayPricing,
        body: {}
      };

      retrieveSameDayPricingInformation(sameDayPricingInfo);
      expect(ajax).toHaveBeenCalledWith({
        ...expectedRequest,
        body: {
          sameDayToken: undefined,
          boundReference: undefined,
          productId: undefined
        }
      });
    });

    it('should make the api call even when the request has a sameDayPricingInfo object with body undefined ', () => {
      const sameDayPricingInfo = {
        ...sameDayPricing,
        body: undefined
      };

      retrieveSameDayPricingInformation(sameDayPricingInfo);
      expect(ajax).toHaveBeenCalledWith({
        ...expectedRequest,
        body: {
          sameDayToken: undefined,
          boundReference: undefined,
          productId: undefined
        }
      });
    });
  });

  describe('sameDayConfirmationApi', () => {
    const isLoggedIn = true;
    let sameDayConfirmationObj;

    beforeEach(() => {
      sameDayConfirmationObj = {
        ...sameDayConfirmation,
        body: {
          sameDayToken: token,
          boundReference: reference,
          productId: productIdInfo,
          payment: {
            savedCreditCard: {
              savedCreditCardId: 'testCardID',
              securityCode: '123',
              intentToStore: true
            }
          },
          recipientEmail
        }
      };
    });

    it('should updateSameDayConfirmation when sameDayConfirmation complete object is available', () => {
      updateSameDayConfirmation(isLoggedIn, sameDayConfirmationObj);
      expect(ajax).toHaveBeenCalledWith({
        ...expectedPUTRequest,
        body: {
          sameDayToken: token,
          boundReference: reference,
          productId: productIdInfo,
          payment: {
            savedCreditCard: {
              savedCreditCardId: 'testCardID',
              securityCode: '123',
              intentToStore: true
            }
          },
          recipientEmail,
          refundMethod
        }
      });
    });

    it('should updateSameDayConfirmation when payment is null in sameDayConfirmation object', () => {
      sameDayConfirmationObj.body.payment = null;

      updateSameDayConfirmation(isLoggedIn, sameDayConfirmationObj);
      expect(ajax).toHaveBeenCalledWith({
        ...expectedPUTRequest,
        body: {
          sameDayToken: token,
          boundReference: reference,
          productId: productIdInfo,
          payment: null,
          recipientEmail,
          refundMethod
        }
      });
    });

    it('should updateSameDayConfirmation with explicit null value for payment when it is undefined', () => {
      sameDayConfirmationObj.body.payment = undefined;
      const isLoggedIn = false;

      updateSameDayConfirmation(isLoggedIn, sameDayConfirmationObj);
      expect(ajax).toHaveBeenCalledWith({
        ...expectedPUTRequest,
        body: {
          sameDayToken: token,
          boundReference: reference,
          productId: productIdInfo,
          payment: null,
          recipientEmail,
          refundMethod
        }
      });
    });

    it('should updateSameDayConfirmation when boundReference is undefined in sameDayConfirmation object', () => {
      sameDayConfirmationObj.body.boundReference = undefined;

      updateSameDayConfirmation(isLoggedIn, sameDayConfirmationObj);
      expect(ajax).toHaveBeenCalledWith({
        ...expectedPUTRequest,
        body: {
          sameDayToken: token,
          boundReference: undefined,
          productId: productIdInfo,
          payment: {
            savedCreditCard: {
              savedCreditCardId: 'testCardID',
              securityCode: '123',
              intentToStore: true
            }
          },
          recipientEmail,
          refundMethod
        }
      });
    });

    it('should updateSameDayConfirmation when boundReference,recipientEmail are undefined in sameDayConfirmation object', () => {
      sameDayConfirmationObj.body.boundReference = undefined;
      sameDayConfirmationObj.body.recipientEmail = undefined;

      updateSameDayConfirmation(isLoggedIn, sameDayConfirmationObj);
      expect(ajax).toHaveBeenCalledWith({
        ...expectedPUTRequest,
        body: {
          sameDayToken: token,
          boundReference: undefined,
          productId: productIdInfo,
          payment: {
            savedCreditCard: {
              savedCreditCardId: 'testCardID',
              securityCode: '123',
              intentToStore: true
            }
          },
          recipientEmail: null,
          refundMethod
        }
      });
    });
  });

  describe('sameDayConfirmationRefund', () => {
    let sameDayConfirmationRefundObj;

    beforeEach(() => {
      jest.spyOn(url, 'resolve').mockReturnValueOnce('/confirmation-refund');
      sameDayConfirmationRefundObj = {
        body: {
          sameDayToken: token,
          boundReference: reference,
          productId: productIdInfo,
          refundMethod: refundMethod,
          payment: {
            savedCreditCard: {
              savedCreditCardId: 'testCardID',
              securityCode: '123',
              intentToStore: true
            }
          },
          recipientEmail
        },
        ...sameDayConfirmationRefund,
        ...{ boundSelection: 'testBound', labelText: 'testLabel' }
      };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should updateSameDayConfirmationRefund with recipientEmail from sameDayPriceDifferenceForm data when available', () => {
      const sameDayPriceDifferenceForm = {
        recipientEmail: 'testUser@wnco.com'
      };
      const sameDayConfirmationRefundRequest = {
        body: {
          boundReference: reference,
          payment: {
            savedCreditCard: {
              intentToStore: true,
              savedCreditCardId: 'testCardID',
              securityCode: '123'
            }
          },
          productId: productIdInfo,
          refundMethod: refundMethod,
          sameDayToken: token
        },
        ...sameDayConfirmationRefund,
        ...{ boundSelection: 'testBound', labelText: 'testLabel' }
      };

      updateSameDayConfirmationRefund(sameDayConfirmationRefundRequest, null, sameDayPriceDifferenceForm);
      
      expect(ajax).toHaveBeenCalledWith({
        ...expectedRefundPUTRequestNoCreditDue,
        body: {
          boundReference: reference,
          payment: {
            savedCreditCard: {
              intentToStore: true,
              savedCreditCardId: 'testCardID',
              securityCode: '123'
            }
          },
          productId: productIdInfo,
          recipientEmail: 'testUser@wnco.com',
          refundMethod: refundMethod,
          sameDayToken: token
        }
      });
    });

    it('should updateSameDayConfirmationRefund when sameDayConfirmationRefund complete object is available', () => {
      updateSameDayConfirmationRefund(sameDayConfirmationRefundObj);
      expect(ajax).toHaveBeenCalledWith({
        ...expectedRefundPUTRequestNoCreditDue,
        body: {
          sameDayToken: token,
          boundReference: reference,
          productId: productIdInfo,
          refundMethod: refundMethod,
          payment: {
            savedCreditCard: {
              savedCreditCardId: 'testCardID',
              securityCode: '123',
              intentToStore: true
            }
          },
          recipientEmail
        }
      });
    });

    it('should updateSameDayConfirmationRefund when payment is null in sameDayConfirmationRefund object', () => {
      sameDayConfirmationRefundObj.body.payment = null;

      updateSameDayConfirmationRefund(sameDayConfirmationRefundObj);
      expect(ajax).toHaveBeenCalledWith({
        ...expectedRefundPUTRequestNoCreditDue,
        body: {
          sameDayToken: token,
          boundReference: reference,
          productId: productIdInfo,
          refundMethod: refundMethod,
          payment: null,
          recipientEmail
        }
      });
    });

    it('should updateSameDayConfirmationRefund when boundReference is undefined in sameDayConfirmationRefund object', () => {
      sameDayConfirmationRefundObj.body.boundReference = undefined;

      updateSameDayConfirmationRefund(sameDayConfirmationRefundObj);
      expect(ajax).toHaveBeenCalledWith({
        ...expectedRefundPUTRequestNoCreditDue,
        body: {
          sameDayToken: token,
          boundReference: undefined,
          productId: productIdInfo,
          refundMethod: refundMethod,
          payment: {
            savedCreditCard: {
              savedCreditCardId: 'testCardID',
              securityCode: '123',
              intentToStore: true
            }
          },
          recipientEmail
        }
      });
    });

    it('should updateSameDayConfirmationRefund with href when no credit is due', () => {
      updateSameDayConfirmationRefund(sameDayConfirmationRefundObj, false);
      expect(ajax).toHaveBeenCalledWith({
        ...expectedRefundPUTRequestNoCreditDue,
        body: {
          sameDayToken: token,
          boundReference: reference,
          productId: productIdInfo,
          refundMethod: refundMethod,
          payment: {
            savedCreditCard: {
              savedCreditCardId: 'testCardID',
              securityCode: '123',
              intentToStore: true
            }
          },
          recipientEmail
        }
      });
    });

    it('should updateSameDayConfirmationRefund with xhref when credit is due', () => {
      jest.restoreAllMocks();
      jest.spyOn(url, 'resolve').mockReturnValueOnce('/x-confirmation-refund');
      updateSameDayConfirmationRefund(sameDayConfirmationRefundObj, true);
      expect(ajax).toHaveBeenCalledWith({
        ...expectedRefundPUTRequestCreditDue,
        body: {
          sameDayToken: token,
          boundReference: reference,
          productId: productIdInfo,
          refundMethod: refundMethod,
          payment: {
            savedCreditCard: {
              savedCreditCardId: 'testCardID',
              securityCode: '123',
              intentToStore: true
            }
          },
          recipientEmail
        }
      });
    });
  });

  describe('sameDayCancellationApi', () => {
    let sameDayCancellationObj;

    beforeEach(() => {
      jest.restoreAllMocks();
      jest.spyOn(url, 'resolve').mockReturnValueOnce('/sameDayTest');
      sameDayCancellationObj = {
        ...sameDayCancellation,
        body: {
          standbyToken: token
        }
      };
    });

    it('should retrieveCancelStandbyListing when sameDayCancellation complete object is available', () => {
      retrieveCancelStandbyListing(sameDayCancellationObj);
      expect(ajax).toHaveBeenCalledWith({
        ...expectedPUTRequest,
        body: {
          standbyToken: token
        }
      });
    });

    it('should retrieveCancelStandbyListing when payment is null in sameDayCancellation object', () => {
      sameDayCancellationObj.body.payment = null;

      retrieveCancelStandbyListing(sameDayCancellationObj);
      expect(ajax).toHaveBeenCalledWith({
        ...expectedPUTRequest,
        body: {
          standbyToken: token
        }
      });
    });

    it('should retrieveCancelStandbyListing with explicit null value for payment when it is undefined', () => {
      sameDayCancellationObj.body.payment = undefined;

      retrieveCancelStandbyListing(sameDayCancellationObj);
      expect(ajax).toHaveBeenCalledWith({
        ...expectedPUTRequest,
        body: {
          standbyToken: token
        }
      });
    });

    it('should retrieveCancelStandbyListing when boundReference is undefined in sameDayCancellation object', () => {
      sameDayCancellationObj.body.boundReference = undefined;

      retrieveCancelStandbyListing(sameDayCancellationObj);
      expect(ajax).toHaveBeenCalledWith({
        ...expectedPUTRequest,
        body: {
          standbyToken: token
        }
      });
    });
  });

  describe('SameDayFlightDetails', () => {
    describe('should retrieveSameDayFlightDetails when SameDayFlightDetails', () => {
      it('object is available', () => {
        const sameDayFlightDetailsRequest = {
          ...sameDayFlightDetails,
          body: {
            sameDayToken: token,
            flightIdentifier: flightIdentifierInfo
          }
        };

        retrieveSameDayFlightDetails(sameDayFlightDetailsRequest);

        expect(ajax).toHaveBeenCalledWith({
          ...expectedRequest,
          body: {
            sameDayToken: token,
            flightIdentifier: flightIdentifierInfo
          }
        });
      });

      it('object with body has only sameDayToken property available and flightIdentifier is {}', () => {
        const sameDayFlightDetailsRequest = {
          ...sameDayFlightDetails,
          body: {
            sameDayToken: token,
            flightIdentifier: {}
          }
        };

        retrieveSameDayFlightDetails(sameDayFlightDetailsRequest);

        expect(ajax).toHaveBeenCalledWith({
          ...expectedRequest,
          body: {
            sameDayToken: token,
            flightIdentifier: {}
          }
        });
      });

      it('object with body has only sameDayToken is available and flightIdentifier property is undefined ', () => {
        const sameDayFlightDetailsRequest = {
          ...sameDayFlightDetails,
          body: {
            sameDayToken: token,
            flightIdentifier: undefined
          }
        };

        retrieveSameDayFlightDetails(sameDayFlightDetailsRequest);

        expect(ajax).toHaveBeenCalledWith({
          ...expectedRequest,
          body: {
            sameDayToken: token,
            flightIdentifier: undefined
          }
        });
      });

      it('object with body has only sameDayToken is available and flightIdentifier property is not available ', () => {
        const sameDayFlightDetailsRequest = {
          ...sameDayFlightDetails,
          body: {
            sameDayToken: token
          }
        };

        retrieveSameDayFlightDetails(sameDayFlightDetailsRequest);

        expect(ajax).toHaveBeenCalledWith({
          ...expectedRequest,
          body: {
            sameDayToken: token,
            flightIdentifier: undefined
          }
        });
      });

      it('object with body which has flightIdentifier is available and sameDayToken is not available', () => {
        const sameDayFlightDetailsRequest = {
          ...sameDayFlightDetails,
          body: {
            flightIdentifier: flightIdentifierInfo
          }
        };

        retrieveSameDayFlightDetails(sameDayFlightDetailsRequest);

        expect(ajax).toHaveBeenCalledWith({
          ...expectedRequest,
          body: {
            sameDayToken: undefined,
            flightIdentifier: flightIdentifierInfo
          }
        });
      });

      it('object with body has sameDayToken as undefined and flightIdentifier is available', () => {
        const sameDayFlightDetailsRequest = {
          ...sameDayFlightDetails,
          body: {
            sameDayToken: undefined,
            flightIdentifier: flightIdentifierInfo
          }
        };

        retrieveSameDayFlightDetails(sameDayFlightDetailsRequest);

        expect(ajax).toHaveBeenCalledWith({
          ...expectedRequest,
          body: {
            sameDayToken: undefined,
            flightIdentifier: flightIdentifierInfo
          }
        });
      });

      it('object with body has sameDayToken as {} and flightIdentifier is available', () => {
        const sameDayFlightDetailsRequest = {
          ...sameDayFlightDetails,
          body: {
            sameDayToken: {},
            flightIdentifier: flightIdentifierInfo
          }
        };

        retrieveSameDayFlightDetails(sameDayFlightDetailsRequest);

        expect(ajax).toHaveBeenCalledWith({
          ...expectedRequest,
          body: {
            sameDayToken: {},
            flightIdentifier: flightIdentifierInfo
          }
        });
      });

      it('object with body has flightIdentifier as {} and sameDayToken is undefined', () => {
        const sameDayFlightDetailsRequest = {
          ...sameDayShopping,
          body: {
            sameDayToken: undefined,
            flightIdentifier: {}
          }
        };

        retrieveSameDayFlightDetails(sameDayFlightDetailsRequest);

        expect(ajax).toHaveBeenCalledWith({
          ...expectedRequest,
          body: {
            sameDayToken: undefined,
            flightIdentifier: {}
          }
        });
      });

      it('object with body has sameDayToken as {} and flightIdentifier is undefined', () => {
        const sameDayFlightDetailsRequest = {
          ...sameDayShopping,
          body: {
            sameDayToken: {},
            flightIdentifier: undefined
          }
        };

        retrieveSameDayFlightDetails(sameDayFlightDetailsRequest);

        expect(ajax).toHaveBeenCalledWith({
          ...expectedRequest,
          body: {
            sameDayToken: {},
            boundReference: undefined
          }
        });
      });

      it('object has both sameDayToken,flightIdentifier are {}', () => {
        const sameDayFlightDetailsRequest = {
          ...sameDayShopping,
          body: {
            sameDayToken: {},
            flightIdentifier: {}
          }
        };

        retrieveSameDayFlightDetails(sameDayFlightDetailsRequest);

        expect(ajax).toHaveBeenCalledWith({
          ...expectedRequest,
          body: {
            sameDayToken: {},
            flightIdentifier: {}
          }
        });
      });

      it('object has both sameDayToken,flightIdentifier are undefined', () => {
        const sameDayFlightDetailsRequest = {
          ...sameDayShopping,
          body: {
            sameDayToken: undefined,
            flightIdentifier: undefined
          }
        };

        retrieveSameDayFlightDetails(sameDayFlightDetailsRequest);

        expect(ajax).toHaveBeenCalledWith({
          ...expectedRequest,
          body: {
            sameDayToken: undefined,
            boundReference: undefined
          }
        });
      });

      it('object with body {} ', () => {
        const sameDayFlightDetailsRequest = { ...sameDayFlightDetails, body: {} };

        retrieveSameDayFlightDetails(sameDayFlightDetailsRequest);

        expect(ajax).toHaveBeenCalledWith({
          ...expectedRequest,
          body: {
            sameDayToken: undefined,
            boundReference: undefined
          }
        });
      });

      it('object with body undefined ', () => {
        const sameDayFlightDetailsRequest = { ...sameDayFlightDetails, body: undefined };

        retrieveSameDayFlightDetails(sameDayFlightDetailsRequest);

        expect(ajax).toHaveBeenCalledWith({
          ...expectedRequest,
          body: {
            sameDayToken: undefined,
            boundReference: undefined
          }
        });
      });
    });
  });
});
