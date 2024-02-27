import { transformToCorporateInfo } from 'src/shared/transformers/corporateInfoTransformer';
import dayjs from 'dayjs';

describe('CorporateInfoTransformer', () => {
  const CORPORATE_INFO_TIMEOUT_MIN = '30';

  context('transformToCorporateInfo', () => {
    it('should return data with correct structure when there is corporate info in the response', () => {
      const mockExpiration = dayjs().add(CORPORATE_INFO_TIMEOUT_MIN, 'minutes').format('YYYY-MM-DDTHH:mm:ss');
      const activeCompanyIdAssociations = [{ companyId: '99587574', companyName: 'Dunder Mifflin Paper Company' }];
      const response = {
        id_token: 'id_token',
        'corporate.customerUserInformation.activeCompanyIdAssociations': activeCompanyIdAssociations,
        'corporate.corporateUserInformation.role': 'TRAVELER',
        'corporate.companyUserInformation.travelPolicies.hotelOptionAvailable': true
      };

      expect(transformToCorporateInfo(response, CORPORATE_INFO_TIMEOUT_MIN)).to.deep.equal({
        activeCompanyIdAssociations,
        role: 'TRAVELER',
        travelPolicies: { hotelOptionAvailable: true },
        expirationDate: mockExpiration
      });
    });

    it('should extract selected company when in a webview', () => {
      const mockExpiration = dayjs().add(CORPORATE_INFO_TIMEOUT_MIN, 'minutes').format('YYYY-MM-DDTHH:mm:ss');
      const activeCompanyIdAssociations = [{ companyId: '99587574', companyName: 'Dunder Mifflin Paper Company' }];
      const response = {
        id_token: 'id_token',
        'corporate.customerUserInformation.activeCompanyIdAssociations': activeCompanyIdAssociations,
        'corporate.companyUserInformation.companyId': '99587574',
        'corporate.companyUserInformation.name': 'Dunder Mifflin Paper Company'
      };

      expect(transformToCorporateInfo(response, CORPORATE_INFO_TIMEOUT_MIN, true)).to.deep.equal({
        activeCompanyIdAssociations,
        companyId: '99587574',
        name: 'Dunder Mifflin Paper Company',
        selectedCompany: { companyId: '99587574', companyName: 'Dunder Mifflin Paper Company' },
        expirationDate: mockExpiration
      });
    });

    it('should extract selected company when using cookies', () => {
      const mockExpiration = dayjs().add(CORPORATE_INFO_TIMEOUT_MIN, 'minutes').format('YYYY-MM-DDTHH:mm:ss');
      const response = {
        id_token: 'id_token',
        'corporate.customerUserInformation.companyInformation.companyId': '99587574',
        'corporate.customerUserInformation.name': 'Dunder Mifflin Paper Company'
      };

      expect(transformToCorporateInfo(response, CORPORATE_INFO_TIMEOUT_MIN, true)).to.deep.equal({
        companyInformation: { companyId: '99587574' },
        selectedCompany: { companyId: '99587574', companyName: 'Dunder Mifflin Paper Company' },
        name: 'Dunder Mifflin Paper Company',
        expirationDate: mockExpiration
      });
    });

    it('should return selected company when provided as argument', () => {
      const mockExpiration = dayjs().add(CORPORATE_INFO_TIMEOUT_MIN, 'minutes').format('YYYY-MM-DDTHH:mm:ss');
      const mockCompany = { companyId: '99587574', companyName: 'Dunder Mifflin Paper Company' };
      const activeCompanyIdAssociations = [mockCompany];
      const response = {
        id_token: 'id_token',
        'corporate.customerUserInformation.activeCompanyIdAssociations': activeCompanyIdAssociations,
        'corporate.corporateUserInformation.role': 'TRAVELER',
        'corporate.companyUserInformation.travelPolicies.hotelOptionAvailable': true
      };

      expect(transformToCorporateInfo(response, CORPORATE_INFO_TIMEOUT_MIN, false, mockCompany)).to.deep.equal({
        activeCompanyIdAssociations,
        role: 'TRAVELER',
        travelPolicies: { hotelOptionAvailable: true },
        selectedCompany: mockCompany,
        expirationDate: mockExpiration
      });
    });

    it('should return undefined when there is no corporate info in the response', () => {
      const response = { id_token: 'id_token' };

      expect(transformToCorporateInfo(response, CORPORATE_INFO_TIMEOUT_MIN)).to.be.null;
    });
  });
});
