import { fireEvent } from '@testing-library/react';
import footer from 'mocks/templates/content-delivery/footer';
import transferTravelFundsConfirmation from 'mocks/templates/travelFunds/transferTravelFundsConfirmation';
import transferTravelFundsConfirmationWithPartialSuccess from 'mocks/templates/travelFunds/transferTravelFundsConfirmationWithPartialSuccess';
import { TransferTravelFundsConfirmationPage } from 'src/travelFunds/pages/transferTravelFundsConfirmationPage';
import { createComponentRender } from 'test/unit/helpers/testUtils';

describe('TransferTravelFundsConfirmationPage', () => {
  let clock;
  let pathMock;

  beforeEach(() => {
    clock = jest.useFakeTimers();
    pathMock = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
    clock.resetAllMocks();
  });

  it('should render the page', () => {
    const { container } = createPageComponent();

    expect(container).toMatchSnapshot();
  });

  it('should render the page as a webview', () => {
    const { container } = createPageComponent({ props: { isWebView: true } });

    expect(container).toMatchSnapshot();
  });

  it('should push home when done is clicked', () => {
    const { container } = createPageComponent({ renderShallow: false });

    fireEvent.click(container.querySelectorAll('.page-header .button')[0]);

    expect(pathMock).toHaveBeenCalledWith('/');
  });

  it('should render a partial success header when transfer is incomplete', () => {
    const { container } = createPageComponent({
      props: {
        transferTravelFundsConfirmation: transferTravelFundsConfirmationWithPartialSuccess
      }
    });

    expect(container).toMatchSnapshot();
  });

  it('should show PageFooterWcmSourced by default', () => {
    const footerLinkRows = footer.results.footer.content.placement.linkRows;
    const { container } = createPageComponent({ props: { footerLinkRows } });

    expect(container).toMatchSnapshot();
  });

  it('should not show PageFooterWcmSourced when in a webview', () => {
    const footerLinkRows = footer.results.footer.content.placement.linkRows;
    const { container } = createPageComponent({ props: { footerLinkRows, isWebView: true } });

    expect(container).toMatchSnapshot();
  });

  const createPageComponent = ({ props = {} } = {}) => {
    const defaultProps = {
      footerLinkRows: [],
      isWebView: false,
      push: pathMock,
      transferTravelFundsConfirmation
    };
    const mergedProps = { ...defaultProps, ...props };

    const state = {
      app: {},
      router: {
        location: {
          search: 'search'
        }
      }
    };

    return createComponentRender(TransferTravelFundsConfirmationPage, { state, props: mergedProps });
  };
});
