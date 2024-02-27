import _ from 'lodash';
import sinonModule from 'sinon';
import {
  getAirChangeContactMethodContent,
  getSearchRequest
} from 'src/airChange/selectors/airChangeReviewPageSelectors';
import * as ContactMethodHelper from 'src/shared/helpers/contactMethodHelper';

const sinon = sinonModule.sandbox.create();

describe('airChangeReviewPageSelectors', () => {
  beforeEach(() => {
    sinon.stub(ContactMethodHelper, 'generateContactNavigatorLabel').returns('Converted Contact Method Info');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should generate contact method content from contact method info for air booking', () => {
    const state = {};
    const contactMethodInfo = { contactMethod: 'EMAIL', email: 'test@test.com', phoneNumber: '', phoneCountryCode: '' };

    _.set(state, 'app.airChange.contactMethodInfo', contactMethodInfo);

    const result = getAirChangeContactMethodContent(state);

    expect(ContactMethodHelper.generateContactNavigatorLabel).have.been.calledWith(contactMethodInfo);
    expect(result).to.be.equal('Converted Contact Method Info');
  });
  context('getSearchRequest', () => {
    const state = {
      app: {
        airUpgrade: {
          upgradeSelectBoundsPage: {
            searchRequest: {
              from: 'MCO',
              to: 'DAL',
              boundType: 'DEPARTING'
            }
          }
        },
        airChange: {
          changePricingPage: {
            response: {
              _meta: {
                isUpgrade: true
              }
            }
          },
          changeShoppingPage: {
            searchRequest: {
              from: 'ORD',
              to: 'DAL',
              boundType: 'RETURNING'
            }
          }
        }
      }
    };

    it('when flow is airUpgrade', () => {
      const result = getSearchRequest(state);

      expect(result).to.deep.eql({
        from: 'MCO',
        to: 'DAL',
        boundType: 'DEPARTING'
      });
    });

    it('when flow is airChange', () => {
      _.set(state, 'app.airChange.changePricingPage.response._meta.isUpgrade', false);

      const result = getSearchRequest(state);

      expect(result).to.deep.eql({
        from: 'ORD',
        to: 'DAL',
        boundType: 'RETURNING'
      });
    });
  });
});
