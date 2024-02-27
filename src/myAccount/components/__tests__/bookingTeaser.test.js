import { fireEvent } from '@testing-library/react';
import BookingTeaser from 'src/myAccount/components/bookingTeaser';
import { createComponent } from 'test/unit/helpers/testingLibraryUtils';

describe('When user navigates to upcoming trips page', () => {
  let onClickBookATripMock;
  let retrieveBookingTeaserFnMock;

  beforeEach(() => {
    onClickBookATripMock = jest.fn();
    retrieveBookingTeaserFnMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch booking teaser from WCM on mount using redux retrieveBookingTeaserFnStub', () => {
    createBookingTeaser();

    expect(retrieveBookingTeaserFnMock).toBeCalled();
  });

  it('should trigger onClickBookATrip when Book a Trip button is clicked', () => {
    const { container } = createBookingTeaser({
      bookingTeaser: {
        alt_text: '',
        image: '/content/mkt/images/product_features/destination_content_icon.jpg',
        product_attributes: [],
        product_description: '',
        product_heading: '',
        product_tagline: '',
        style: 'image'
      }
    });

    fireEvent.click(container.querySelector('Button'));

    expect(onClickBookATripMock).toBeCalled();
  });

  const createBookingTeaser = (newProps = {}) => {
    const defaultProps = {
      bookingTeaser: null,
      onClickBookATrip: onClickBookATripMock,
      retrieveBookingTeaserFn: retrieveBookingTeaserFnMock
    };

    return createComponent(BookingTeaser, { state: {}, props: { ...defaultProps, ...newProps } });
  };
});
