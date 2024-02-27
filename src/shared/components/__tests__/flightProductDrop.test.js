import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { FlightProductDrop } from 'src/shared/components/flightProductDrop.jsx';
import SameDayShoppingPageResponseBuilder from 'test/builders/apiResponse/sameDayBuilder';

describe('FlightProductDrop', () => {
  let onListForStandbyClickMock;

  beforeEach(()=> {
    onListForStandbyClickMock = jest.fn();
  });

  it('should render page with standbyLabelText', () => {
    const { sameDayShoppingInformation, sameDayFlightDetails } = new SameDayShoppingPageResponseBuilder().build();
    const { expandedDetails, cards } = sameDayShoppingInformation;
    const { container } = createComponent({
      expandedDetails: expandedDetails,
      productCard: cards[0],
      flightDetailsResponse: sameDayFlightDetails
    });

    expect(container).toMatchSnapshot();
  });

  it('should render with standby button subtext', () => {
    const { sameDayFlightDetails, sameDayShoppingInformation } = new SameDayShoppingPageResponseBuilder()
      .withAllowSameDayChangeAndLabelSubText()
      .build();
    const { cards, expandedDetails } = sameDayShoppingInformation;
    const { container } = createComponent({
      expandedDetails,
      flightDetailsResponse: sameDayFlightDetails,
      productCard: cards[0]
    });

    expect(container).toMatchSnapshot();
  });

  it('should render page with standbyUnavailableText', () => {
    const { sameDayFlightDetails, sameDayShoppingInformation } = new SameDayShoppingPageResponseBuilder()
      .withStandbyUnavailableText()
      .build();
    const { expandedDetails, cards } = sameDayShoppingInformation;
    const { container } = createComponent({
      expandedDetails: expandedDetails,
      productCard: cards[0],
      flightDetailsResponse: sameDayFlightDetails
    });

    expect(container).toMatchSnapshot();
  });

  it('should render page with standbyUnavailableText and with empty sameDayFlightDetails', () => {
    const { sameDayShoppingInformation } = new SameDayShoppingPageResponseBuilder()
      .withStandbyUnavailableText()
      .build();
    const { cards, expandedDetails } = sameDayShoppingInformation;
    const { container } = createComponent({
      expandedDetails: expandedDetails,
      productCard: cards[1]
    });

    expect(container).toMatchSnapshot();
  });

  it('should render page with changeUnAvailableText', () => {
    const { sameDayShoppingInformation } = new SameDayShoppingPageResponseBuilder().withChangeUnavailableText().build();
    const { cards, expandedDetails } = sameDayShoppingInformation;
    const { container } = createComponent({
      expandedDetails: expandedDetails,
      productCard: cards[0]
    });

    expect(container).toMatchSnapshot();
  });

  it('should render page with startingPriceDifference', () => {
    const { sameDayShoppingInformation } = new SameDayShoppingPageResponseBuilder().build();
    const { cards, expandedDetails } = sameDayShoppingInformation;
    const { container } = createComponent({
      expandedDetails: expandedDetails,
      productCard: cards[3]
    });

    expect(container).toMatchSnapshot();
  });

  it('should render page with startingFromPriceDiffPointsTax', () => {
    const { sameDayShoppingInformation } = new SameDayShoppingPageResponseBuilder().build();
    const { cards, expandedDetails } = sameDayShoppingInformation;
    const { container } = createComponent({
      expandedDetails: expandedDetails,
      productCard: cards[4]
    });

    expect(container).toMatchSnapshot();
  });

  it('should render page with startingFromPriceDiffPointsTax with purchaseWithPoints true', () => {
    const { sameDayShoppingInformation } = new SameDayShoppingPageResponseBuilder().build();
    const { cards, expandedDetails } = sameDayShoppingInformation;
    const { container } = createComponent({
      expandedDetails: expandedDetails,
      productCard: cards[0],
      purchaseWithPoints: true
    });

    expect(container).toMatchSnapshot();
  });

  it('should render page with startingFromPriceDiffPointsTax with purchaseWithPoints is false', () => {
    const { sameDayShoppingInformation } = new SameDayShoppingPageResponseBuilder().build();
    const { cards, expandedDetails } = sameDayShoppingInformation;
    const { container } = createComponent({
      expandedDetails: expandedDetails,
      productCard: cards[0],
      purchaseWithPoints: false
    });

    expect(container).toMatchSnapshot();
  });

  it('should render page with startingFromPriceDiffPointsTax with purchaseWithPoints is true and tax is false', () => {
    const { sameDayShoppingInformation } = new SameDayShoppingPageResponseBuilder().build();
    const { cards, expandedDetails } = sameDayShoppingInformation;
    const { container } = createComponent({
      expandedDetails: expandedDetails,
      productCard: { ...cards[4], standbyLabelText: 'test' },
      purchaseWithPoints: true
    });

    expect(container).toMatchSnapshot();
  });

  it('should render page with startingFromPriceDiffPointsTax with standbyonly true', () => {
    const { sameDayShoppingInformation } = new SameDayShoppingPageResponseBuilder().build();
    const { cards, expandedDetails } = sameDayShoppingInformation;

    const { container } = createComponent({
      expandedDetails: expandedDetails,
      productCard: cards[4],
      purchaseWithPoints: true,
      isStandbyOnly: true,
      onListForStandbyClick: onListForStandbyClickMock
    });

    fireEvent.click(container.querySelector('.flight-product-drop--standby-only-body_button button'));

    expect(onListForStandbyClickMock).toBeCalled();
  });

  it('should call onListForStandbyClick when isStandbyOnly is true and with webview', () => {
    const { sameDayShoppingInformation } = new SameDayShoppingPageResponseBuilder().build();
    const { cards, expandedDetails } = sameDayShoppingInformation;

    const { container } = createComponent({
      expandedDetails: expandedDetails,
      isStandbyOnly: true,
      isWebView: true,
      onListForStandbyClick: onListForStandbyClickMock,
      productCard: cards[4],
      purchaseWithPoints: true
    });

    fireEvent.click(container.querySelector('.flight-product-drop--standby-only-body_button button'));

    expect(onListForStandbyClickMock).toBeCalled();
  });

  it('should render modal with standbyBaggageMessage when isStandbyOnly is true and with webview', () => {
    const { sameDayShoppingInformation } = new SameDayShoppingPageResponseBuilder().build();
    const { cards, expandedDetails } = sameDayShoppingInformation;
    const showDialogMock = jest.fn();
    const hideDialogMock = jest.fn().mockResolvedValueOnce('done');
    const { container } = createComponent({
      expandedDetails: expandedDetails,
      hideDialogFn: hideDialogMock,
      isStandbyOnly: true,
      isWebView: true,
      onListForStandbyClick: onListForStandbyClickMock,
      productCard: cards[4],
      purchaseWithPoints: true,
      showDialogFn: showDialogMock,
      standbyBaggageMessage: {
        body: 'Stand by message',
        dismissLabelText: 'Leave',
        labelText: 'Continue'
      }
    });

    fireEvent.click(container.querySelector('.flight-product-drop--standby-only-body_button button'));

    expect(showDialogMock.mock.calls[0][0].message).toEqual('Stand by message');
  });

  it('should render modal with standbyBaggageMessage when isStandbyOnly is true and with webview and trigger hide modal on button click', () => {
    const { sameDayShoppingInformation } = new SameDayShoppingPageResponseBuilder().build();
    const { cards, expandedDetails } = sameDayShoppingInformation;
    const showDialogMock = jest.fn();
    const hideDialogMock = jest.fn().mockResolvedValueOnce('done');
    const { container } = createComponent({
      expandedDetails: expandedDetails,
      hideDialogFn: hideDialogMock,
      isStandbyOnly: true,
      isWebView: true,
      onListForStandbyClick: onListForStandbyClickMock,
      productCard: cards[4],
      purchaseWithPoints: true,
      showDialogFn: showDialogMock,
      standbyBaggageMessage: {
        body: 'Stand by baggage message',
        dismissLabelText: 'Never mind',
        key: 'STANDBY_BAGGAGE',
        labelText: 'Remove bags'
      }
    });

    fireEvent.click(container.querySelector('.flight-product-drop--standby-only-body_button button'));

    showDialogMock.mock.calls[0][0].buttons[1].onClick();

    expect(hideDialogMock).toBeCalled();
  });

  it('should render modal with standbyBaggageMessage when isStandbyOnly is true and without webview', () => {
    const { sameDayShoppingInformation } = new SameDayShoppingPageResponseBuilder().build();
    const { cards, expandedDetails } = sameDayShoppingInformation;
    const showDialogMock = jest.fn();
    const hideDialogMock = jest.fn().mockResolvedValueOnce('done');

    const { container } = createComponent({
      expandedDetails: expandedDetails,
      hideDialogFn: hideDialogMock,
      isStandbyOnly: false,
      isWebView: false,
      onListForStandbyClick: onListForStandbyClickMock,
      productCard: cards[4],
      purchaseWithPoints: true,
      showDialogFn: showDialogMock,
      standbyBaggageMessage: {
        body: 'Stand by baggage message',
        dismissLabelText: 'Never mind',
        key: 'STANDBY_BAGGAGE',
        labelText: 'Remove bags'
      }
    });

    fireEvent.click(container.querySelector('.flight-product-drop--header_content-standby'));

    expect(showDialogMock).toBeCalledWith({
      buttons: [
        { label: 'Never mind', onClick: hideDialogMock },
        { label: 'Remove bags', onClick: expect.anything() }
      ],
      message: 'Stand by baggage message',
      name: 'STANDBY_BAGGAGE'
    });
  });

  it('should render page with startingFromPriceDiffPointsTax with standbyonly true and provided standbyLabelText', () => {
    const { sameDayShoppingInformation } = new SameDayShoppingPageResponseBuilder().build();
    const { cards, expandedDetails } = sameDayShoppingInformation;

    const { container } = createComponent({
      expandedDetails: expandedDetails,
      productCard: { ...cards[4], standbyLabelText: 'test' },
      purchaseWithPoints: true,
      isStandbyOnly: true,
      onListForStandbyClick: onListForStandbyClickMock
    });

    fireEvent.click(container.querySelector('.flight-product-drop--standby-only-body_button button'));

    expect(onListForStandbyClickMock).toBeCalled();
  });

  it('should render page with startingFromPriceDiffPointsTax with standby click', () => {
    const { sameDayShoppingInformation } = new SameDayShoppingPageResponseBuilder().build();
    const { cards, expandedDetails } = sameDayShoppingInformation;

    const { container } = createComponent({
      expandedDetails: expandedDetails,
      productCard: { ...cards[4], standbyLabelText: 'test' },
      purchaseWithPoints: true,
      onListForStandbyClick: onListForStandbyClickMock
    });

    fireEvent.click(container.querySelector('.flight-product-drop--button-available'));

    expect(onListForStandbyClickMock).toBeCalled();
  });

  it('should render page with startingFromPriceDiffPointsTax with standby click and available is false', () => {
    const { sameDayShoppingInformation } = new SameDayShoppingPageResponseBuilder().build();
    const { cards, expandedDetails } = sameDayShoppingInformation;

    const { container } = createComponent({
      expandedDetails: { ...expandedDetails, standbyLabel: null },
      productCard: cards[1],
      purchaseWithPoints: true,
      onListForStandbyClick: onListForStandbyClickMock
    });

    fireEvent.click(container.querySelector('.flight-product-drop--unavailable-text'));

    expect(onListForStandbyClickMock).not.toBeCalled();
  });

  describe('when sameDay change is not allowed', () => {
    it('should render flight details page with change unavailable text', () => {
      const { sameDayFlightDetails, sameDayShoppingInformation } = new SameDayShoppingPageResponseBuilder()
        .withoutAllowSameDayChange()
        .withChangeUnavailableText()
        .build();
      const { cards, expandedDetails } = sameDayShoppingInformation;
      const { container } = createComponent({
        expandedDetails: expandedDetails,
        productCard: cards[1],
        flightDetailsResponse: sameDayFlightDetails
      });

      expect(container).toMatchSnapshot();
    });

    it('should render flight details page with standby unavailable text ', () => {
      const { sameDayShoppingInformation } = new SameDayShoppingPageResponseBuilder()
        .withoutAllowSameDayChange()
        .withStandbyUnavailableText()
        .build();
      const { cards, expandedDetails } = sameDayShoppingInformation;
      const { container } = createComponent({
        expandedDetails: expandedDetails,
        productCard: cards[0]
      });

      expect(container).toMatchSnapshot();
    });

    it('should render flight details page with multiple inventory ', () => {
      const { sameDayFlightDetails, sameDayShoppingInformation } = new SameDayShoppingPageResponseBuilder()
        .withoutAllowSameDayChange()
        .build();
      const { cards, expandedDetails } = sameDayShoppingInformation;
      const { container } = createComponent({
        expandedDetails: expandedDetails,
        productCard: cards[3],
        flightDetailsResponse: sameDayFlightDetails
      });

      expect(container).toMatchSnapshot();
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      location: {},
      match: { params: '' },
      flightDetailsResponse: {},
      flightIdentifier: 'flightIdentifier2'
    };
    const mergedProps = { ...defaultProps, ...props };

    return render(
      <div>
        <FlightProductDrop {...mergedProps} />
      </div>
    );
  };
});
