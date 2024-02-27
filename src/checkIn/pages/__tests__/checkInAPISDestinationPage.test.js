import CheckInAPISDestinationPage, { transformAdditionalProps } from 'src/checkIn/pages/checkInAPISDestinationPage';
import { integrationRender } from 'test/unit/helpers/testingLibraryUtils';

describe('checkInAPISDestinationPage', () => {
  const destinationConfig = {
    addressTextWIthLinks: 'Enter the address you can be reached at during your stay in the United States.',
    allowApplyToAll: true,
    applyToAllLabel: 'Use the contact tracing information for all passengers',
    contactEmailRequired: true,
    contactPhone1Label: 'Phone number 1',
    contactPhone1Required: true,
    contactPhone2Label: 'Phone number 2',
    contactPhone2Required: true,
    includeContactTracingFields: true,
    title: 'Contact Tracing'
  };
  const travelDocument = { destinationConfig };

  describe('transformAdditionalProps', () => {
    it('should transform props for first passenger of multiple passenger travel docs', () => {
      const result = transformAdditionalProps(travelDocument);

      expect(result).toEqual({
        destinationConfig
      });
    });

    it('should transform props for 2nd passenger of multiple passenger travel docs', () => {
      const result = transformAdditionalProps(travelDocument);

      expect(result).toEqual({
        destinationConfig
      });
    });

    it('should transform props for single passenger travel doc', () => {
      const result = transformAdditionalProps(travelDocument);

      destinationConfig.allowApplyToAll = false;

      expect(result).toEqual({
        destinationConfig
      });
    });
  });

  it('should pass page data to DestinationPage', () => {
    const pageData = {
      addressLine: 'address',
      city: 'Dallas',
      isoCountryCode: 'US',
      stateProvinceRegion: 'Texas',
      zipOrPostalCode: '12344'
    };
    const { container } = renderComponent(pageData);
    
    expect(container).toMatchSnapshot();
  });

  const renderComponent = (pageData) => {
    const initialState = {
      app: {
        checkIn: {
          checkInFlowData: {
            travelDocuments: [
              {
                additionalPassportPageFormData: {
                  destination: pageData
                }
              }
            ]
          }
        }
      }
    };

    return integrationRender()(initialState, CheckInAPISDestinationPage, {
      location: '/check-in/1/additional-passport-info/destination',
      path: '/check-in/:paxNumber/additional-passport-info/destination'
    });
  };
});
