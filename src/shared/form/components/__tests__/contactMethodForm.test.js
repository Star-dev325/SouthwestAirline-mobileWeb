import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import ContactMethodForm from 'src/shared/form/components/contactMethodForm';
import * as FullScreenModalHelper from 'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper';
import createMockStore from 'test/unit/helpers/configureMockStore';

const mockStore = createMockStore();

describe('contact method form', () => {
  let goBackMock;
  let hideFullScreenModalFnMock;
  let onChangeMock;
  let onSubmitMock;
  let showFullScreenModalFnMock;

  beforeEach(() => {
    goBackMock = jest.fn();
    hideFullScreenModalFnMock = jest.fn(() => Promise.resolve());
    onChangeMock = jest.fn();
    onSubmitMock = jest.fn();
    showFullScreenModalFnMock = jest.fn();

    jest.spyOn(FullScreenModalHelper, 'showFullScreenModal').mockImplementation(showFullScreenModalFnMock);
    jest.spyOn(FullScreenModalHelper, 'hideFullScreenModal').mockImplementation(hideFullScreenModalFnMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('domestic contact method', () => {
    it('should render correct components', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });

    it('should display phone number field when click Text', () => {
      const { container } = createComponent();

      fireEvent.click(container.querySelectorAll('.contact-method-item')[0]);

      expect(container).toMatchSnapshot();
    });

    it('should display phone number field when click Call', () => {
      const { container } = createComponent();

      fireEvent.click(container.querySelectorAll('.contact-method-item')[1]);

      expect(container).toMatchSnapshot();
    });

    it('should display email field when click Email', () => {
      const { container } = createComponent();

      fireEvent.click(container.querySelectorAll('.contact-method-item')[2]);

      expect(container).toMatchSnapshot();
    });

    it('should call goBackMock when click CANCEL button', () => {
      const { container } = createComponent();

      fireEvent.click(container.querySelector('.action-bar--left-buttons button'));

      expect(goBackMock).toHaveBeenCalled();
    });

    it('should render message when available', () => {
      const { container } = createComponent({
        message: 'Domestic message',
        isInternationalBooking: false
      });

      expect(container).toMatchSnapshot();
    });
  });

  describe('international contact method', () => {
    describe('when default props', () => {
      it('should render correct components', () => {
        const { container } = createComponent({ isInternationalBooking: true, isLoggedIn: true });

        expect(container).toMatchSnapshot();
      });

      it('should render message when available', () => {
        const { container } = createComponent({
          message: 'International message',
          isInternationalBooking: true
        });
        
        expect(container).toMatchSnapshot();
      });
    });

    describe('when not air booking', () => {
      describe('declineNotifications is true', () => {
        it('should not display phone number field when click Text', () => {
          const { container } = createComponent({ isInternationalBooking: true, isLoggedIn: true });

          expect(container).toMatchSnapshot();
        });

        it('should not display email field when click Email', () => {
          const { container } = createComponent({ isInternationalBooking: true, isLoggedIn: true });

          fireEvent.click(container.querySelectorAll('.contact-method-item')[3]);
          fireEvent.click(container.querySelector('.form-radio-field--radio'));

          expect(container).toMatchSnapshot();
        });

        it('should render correctly after radio button is clicked', () => {
          const { container } = createComponent({ isInternationalBooking: true, isLoggedIn: true });

          fireEvent.click(container.querySelector('.form-radio-field--radio'));

          expect(container).toMatchSnapshot();
        });
      });
    });

    describe('when air booking', () => {
      const defaultAirBookingState = {
        app: {
          formData: {
            CONTACT_METHOD_FORM: {
              data: {
                contactMethod: 'TEXT',
                declineNotifications: false,
                isNotificationsEnabled: true,
                phoneCountryCode: '1',
                phoneNumber: '657-567-6759',
                preferredLanguage: 'EN'
              }
            }
          }
        }
      };

      describe('when rendered', () => {
        it('should render correctly', () => {
          const { container } = createComponent(
            { isInternationalBooking: true, isLoggedIn: true, isAirBooking: true },
            defaultAirBookingState
          );

          expect(container).toMatchSnapshot();
        });

        it('should display email form field when the email contact option is selected', () => {
          const { container } = createComponent(
            { isInternationalBooking: true, isLoggedIn: true, isAirBooking: true },
            {
              app: {
                formData: {
                  CONTACT_METHOD_FORM: {
                    data: {
                      contactMethod: 'EMAIL',
                      declineNotifications: false,
                      isNotificationsEnabled: true,
                      email: 'test@gmail.com',
                      preferredLanguage: 'EN'
                    }
                  }
                }
              }
            }
          );
    
          fireEvent.click(screen.getByText('Email'));
          
          expect(container).toMatchSnapshot();
        });

        it('should display PhoneCountryCodeList when click phone number label', () => {
          const { container } = createComponent(
            { isInternationalBooking: true, isLoggedIn: true, isAirBooking: true },
            defaultAirBookingState
          );
    
          fireEvent.click(screen.getByText('Text'));
          fireEvent.click(container.querySelector('.phone-number-field .input--label'));
    
          expect(showFullScreenModalFnMock).toHaveBeenCalled();
        });

        it('should not display PhoneCountryCodeList when click phone number label if the declineNotifications flag is true', () => {
          const { container } = createComponent(
            { isInternationalBooking: true, isLoggedIn: true, isAirBooking: true },
            {
              app: {
                formData: {
                  CONTACT_METHOD_FORM: {
                    data: {
                      contactMethod: 'TEXT',
                      declineNotifications: true,
                      phoneCountryCode: '1',
                      phoneNumber: '657-567-6759',
                      preferredLanguage: 'EN'
                    }
                  }
                }
              }
            }
          );
    
          fireEvent.click(screen.getByText('Text'));
          fireEvent.click(container.querySelector('.phone-number-field .input--label'));
    
          expect(showFullScreenModalFnMock).not.toHaveBeenCalled();
        });

        it('should correctly update phone country code when changed', async () => {
          createComponent(
            { isInternationalBooking: true, isLoggedIn: true, isAirBooking: true },
            {
              router: {
                location: {
                  search: '_modal=countryCode'
                }
              },
              app: {
                formData: {
                  AIR_BOOKING_CONTACT_METHOD_FORM: {
                    data: {
                      contactMethod: 'CALL',
                      phoneCountryCode: '1',
                      phoneNumber: '123-345-6567'
                    },
                    url: '/air/booking/contact-method'
                  }
                }
              }
            }
          );

          await fireEvent.click(screen.getAllByText('Afghanistan - AF (+93)')[0]);

          expect(onChangeMock).toHaveBeenCalledWith('phoneCountryCode', '93');
          expect(onChangeMock).toHaveBeenCalledWith('phoneNumber', '');
        });
    
        it('should click the phoneCountyCode, open the modal, hit the cancel button to close the FullScreenModal', () => {
          createComponent(
            { isInternationalBooking: true, isLoggedIn: true, isAirBooking: true },
            {
              router: {
                location: {
                  search: '_modal=countryCode'
                }
              },
              app: {
                formData: {
                  AIR_BOOKING_CONTACT_METHOD_FORM: {
                    data: {
                      contactMethod: 'CALL',
                      phoneCountryCode: '1',
                      phoneNumber: '123-345-6567'
                    },
                    url: '/air/booking/contact-method'
                  }
                }
              }
            }
          );
    
          fireEvent.click(screen.getByText('Cancel'));
    
          expect(hideFullScreenModalFnMock).toHaveBeenCalled();
        });
      });

      describe('when notifications enabled', () => {
        it('should render correctly', () => {
          const { container } = createComponent(
            { isInternationalBooking: true, isLoggedIn: true, isAirBooking: true },
            {
              app: {
                formData: {
                  CONTACT_METHOD_FORM: {
                    data: {
                      contactMethod: 'TEXT',
                      declineNotifications: false,
                      isNotificationsEnabled: true,
                      phoneCountryCode: '1',
                      phoneNumber: '657-567-6759',
                      preferredLanguage: 'EN'
                    }
                  }
                }
              }
            }
          );

          expect(container).toMatchSnapshot();
        });
      });
    });
  });

  describe('save contact method', () => {
    describe('label', () => {
      it('should render correctly', () => {
        const { container } = createComponent({
          isAlreadyHasContactMethod: true,
          isLoggedIn: true
        });

        expect(container).toMatchSnapshot();
      });
    });

    describe('prefill behaviour', () => {
      it('should prefill save contact method field when user already entered this form', () => {
        const { container } = createComponent({
          initialFormData: {
            contactMethod: 'TEXT',
            declineNotifications: false,
            phoneCountryCode: '1',
            phoneNumber: '111-111-1111',
            preferredLanguage: 'EN',
            saveContactMethod: true
          }
        });

        expect(container).toMatchSnapshot();
      });

      it('should prefill save contact method field to false as default', () => {
        const { container } = createComponent({
          isLoggedIn: true
        });

        expect(container).toMatchSnapshot();
      });
    });

    describe('when user is not logged in', () => {
      it('should not show save contact method toggle ', () => {
        const { container } = createComponent();

        expect(container).toMatchSnapshot();
      });
    });
  });

  function createComponent(props = {}, state = {}) {
    const defaultProps = {
      contactMethodInfo: {},
      formId: 'CONTACT_METHOD_FORM',
      goBack: goBackMock,
      isAirBooking: false,
      isAlreadyHasContactMethod: false,
      isInternationalBooking: false,
      isLoggedIn: false,
      message: null,
      onChange: onChangeMock,
      onSubmit: onSubmitMock
    };
    const store = {
      ...{
        app: {},
        router: {
          location: {
            search: 'search'
          }
        }
      },
      ...state
    };

    const mergedProps = { ...defaultProps, ...props };

    return render(
      <Provider store={mockStore(store)}>
        <ContactMethodForm {...mergedProps} />
      </Provider>
    );
  }
});
