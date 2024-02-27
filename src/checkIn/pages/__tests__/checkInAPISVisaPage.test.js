import CheckInAPISVisaPage from 'src/checkIn/pages/checkInAPISVisaPage';
import { integrationRender } from 'test/unit/helpers/testingLibraryUtils';

describe('checkInAPISVisaPageSpecs', () => {
  it('should render', () => {
    const pageData = {
      country: 'AL',
      expiration: '2018-11-17',
      issuedBy: 'AS',
      number: 'number'
    };
    const { container } = renderComponent(pageData);

    expect(container).toMatchSnapshot();
  });
  it('should pass page data to VisaPage', () => {
    const pageData = {
      country: 'AL',
      expiration: '2018-11-17',
      issuedBy: 'AS',
      number: 'number'
    };
    const { container } = renderComponent(pageData);

    expect(container.querySelector('.apis-form').getAttribute('name')).toEqual('passport');
  });

  const renderComponent = (pageData) => {
    const initialState = {
      app: {
        checkIn: {
          checkInFlowData: {
            travelDocuments: [
              {
                additionalPassportPageFormData: {
                  visa: pageData
                }
              }
            ]
          }
        }
      }
    };

    return integrationRender()(initialState, CheckInAPISVisaPage, {
      location: '/check-in/1/additional-passport-info/green-card',
      path: '/check-in/:paxNumber/additional-passport-info/green-card'
    });
  };
});
