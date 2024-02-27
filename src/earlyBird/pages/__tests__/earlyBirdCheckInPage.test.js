import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/react';
import { EarlyBirdCheckInPage } from 'src/earlyBird/pages/earlyBirdCheckInPage';
import ChaseAndPromoBannerContent from 'test/builders/apiResponse/v1/content-delivery/query/placements';
import { integrationRender } from 'test/unit/helpers/testingLibraryUtils';

describe('earlyBirdCheckInPage', () => {
  let fetchEarlyBirdPlacementsFnMock;
  let getEarlyBirdReservationFnMock;
  let retrieveEarlyBirdBannerFnMock;

  beforeEach(() => {
    fetchEarlyBirdPlacementsFnMock = jest.fn();
    getEarlyBirdReservationFnMock = jest.fn();
    retrieveEarlyBirdBannerFnMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call retrieveEarlyBirdBanner to retrieve early bird banner when data of banner is empty', () => {
    createComponent({ banner: {} });

    expect(retrieveEarlyBirdBannerFnMock).toHaveBeenCalled();
    expect(fetchEarlyBirdPlacementsFnMock).not.toHaveBeenCalled();
  });

  it('should call fetchEarlyBirdPlacementsFnStub to retrieve early bird banner when data of banner is empty', () => {
    createComponent({ ENABLE_TARGET_CONFIG: true });

    expect(fetchEarlyBirdPlacementsFnMock).toHaveBeenCalled();
    expect(retrieveEarlyBirdBannerFnMock).not.toHaveBeenCalled();
  });

  it('should not call retrieveEarlyBirdBanner when data of banner is not empty', () => {
    createComponent();

    expect(retrieveEarlyBirdBannerFnMock).not.toHaveBeenCalled();
  });

  it('should contain subHeader components', () => {
    const { container } = createComponent();

    expect(container.querySelector('.page-header')).toBeInTheDocument();
  });

  it('should contain ReservationRetrievalForm components', () => {
    const { container } = createComponent();

    expect(container.querySelector('.reservation-retrieval-form')).toBeInTheDocument();
  });

  it('should contain EarlyBirdCheckInBanner components', () => {
    const { container } = createComponent();

    expect(container.querySelector('.early-bird-check-in-banner--background-image')).toBeInTheDocument();
  });

  it('should invoke getEarlyBirdReservationFn when submit', () => {
    const { container } = createComponent();

    fireEvent.submit(container.querySelector('form'));

    expect(getEarlyBirdReservationFnMock).toHaveBeenCalled();
    expect(getEarlyBirdReservationFnMock).toHaveBeenCalledWith(
      {
        href: '/v1/mobile-air-booking/page/early-bird/M23VX8',
        method: 'GET',
        query: {
          'first-name': 's',
          'last-name': 'Jackie'
        }
      },
      'M23VX8',
      false
    );
  });

  it('and not render promoTop01 if it does not exist', () => {
    const { container } = createComponent({ promoBannerConfig: {} });

    expect(container).toMatchSnapshot();
  });

  it('and render promoTop01 if it exists', () => {
    const promoTop01 = new ChaseAndPromoBannerContent().getContentOf('promoTop01');

    const { container } = createComponent({
      ENABLE_TARGET_CONFIG: true,
      promoBannerConfig: { promoTop01 }
    });

    expect(container).toMatchSnapshot();
  });

  const createComponent = (props) => {
    const defaultProps = {
      banner: { alt: 'EarlyBird', image: 'test/image/url' },
      ENABLE_TARGET_CONFIG: false,
      fetchEarlyBirdPlacementsFn: fetchEarlyBirdPlacementsFnMock,
      getEarlyBirdReservationFn: getEarlyBirdReservationFnMock,
      isLoggedIn: false,
      promoBannerConfig: {},
      retrieveEarlyBirdBannerFn: retrieveEarlyBirdBannerFnMock
    };

    const state = {
      app: {
        formData: {
          EARLY_BIRD_CHECK_IN_FORM: {
            data: {
              firstName: 's',
              lastName: 'Jackie',
              recordLocator: 'M23VX8'
            },
            url: '/earlybird/checkin?cleanFlow=true'
          }
        }
      },
      router: {
        location: {
          search: 'search'
        }
      }
    };

    return integrationRender()(state, EarlyBirdCheckInPage, { ...defaultProps, ...props });
  };
});
