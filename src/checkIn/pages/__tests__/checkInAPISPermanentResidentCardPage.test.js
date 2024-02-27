import CheckInAPISPermanentResidentCardPage from 'src/checkIn/pages/checkInAPISPermanentResidentCardPage';
import { integrationRender } from 'test/unit/helpers/testingLibraryUtils';

describe('checkInAPISPermanentResidentCardPage', () => {
  it('should render', () => {
    const pageData = {
      expiration: '2019-11-17',
      issuedBy: 'AS',
      number: 'abc-d22-222-222-222',
      type: 'RESIDENT_ALIEN_CARD'
    };
    const { container } = renderComponent(pageData);

    expect(container).toMatchSnapshot();
  });
  it('should pass page data to PermanentResidentCardPage', () => {
    const pageData = {
      expiration: '2019-11-17',
      issuedBy: 'AS',
      number: 'abc-d22-222-222-222',
      type: 'RESIDENT_ALIEN_CARD'
    };
    const { container } = renderComponent(pageData);
    
    expect(container.querySelector('.apis-form').getAttribute('name')).toEqual('passport');
  });

  const renderComponent = (mockPageData) => {
    const initialState = {
      app: {
        checkIn: {
          checkInFlowData: {
            travelDocuments: [
              {
                additionalPassportPageFormData: {
                  permanentResidentCard: mockPageData
                }
              }
            ]
          }
        }
      }
    };

    return integrationRender()(initialState, CheckInAPISPermanentResidentCardPage, {
      location: '/check-in/1/additional-passport-info/green-card',
      path: '/check-in/:paxNumber/additional-passport-info/green-card'
    });
  };
});
