import { storiesOf } from '@storybook/react';
import React from 'react';
import { UpgradedBoardingPurchasePage } from 'src/upgradedBoarding/pages/upgradedBoardingPurchasePage';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import UpgradedBoardingPurchaseFormBuilder from 'test/builders/model/upgradedBoardingPurchaseFormBuilder';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import { APPLE_PAY_CARD_ID, PAY_PAL_CARD_ID } from 'src/shared/constants/creditCardConstants';
import { promoTop01 } from 'mocks/flexPlacement/upgradedBoardingPurchasePagePlacements';
import { receiptEmail } from 'mocks/templates/reservation/CHFCHK/actionChange';
import { emailReceiptTo } from 'src/shared/form/formValidators/sharedFieldValidatorRules';

const overnightProps = new UpgradedBoardingPurchaseFormBuilder().withUpgradedBoardingExpiredSeconds(null).withOvernight();
const singlePaxSegmentProps = new UpgradedBoardingPurchaseFormBuilder().withUpgradedBoardingExpiredSeconds(null).withSinglePaxSingleSegment();
const multiPaxSingleSegment = new UpgradedBoardingPurchaseFormBuilder().withUpgradedBoardingExpiredSeconds(null).withMultiPaxSingleSegment();
const singlePaxMultiSegment = new UpgradedBoardingPurchaseFormBuilder().withUpgradedBoardingExpiredSeconds(null).withSinglePaxMultiSegment();
const upgradedBoardingPurchaseFormProps = new UpgradedBoardingPurchaseFormBuilder().withUpgradedBoardingExpiredSeconds(null).build();
const store = createMockedFormStore();
const webViewStore = createMockedFormStore({
  app: {
    webView: {
      isWebView: true
    }
  }
});
const placementProps = {
  purchasePagePlacements: {
    promoTop01
  }
};

const WebViewUpgradedBoardingPurchasePage = withBodyClass(['is-webview', 'upgraded-boarding-purchase-page'])(
  UpgradedBoardingPurchasePage
);

storiesOf('pages/upgradedBoarding/upgradedBoardingPurchasePage', module)
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return <UpgradedBoardingPurchasePage {...singlePaxSegmentProps} />;
  })
  .add('with overnight', () => {
    return <UpgradedBoardingPurchasePage {...overnightProps} />;
  })
  .add('multi pax single segment', () => {
    return <UpgradedBoardingPurchasePage {...multiPaxSingleSegment} />;
  })
  .add('single pax multi segment', () => {
    return <UpgradedBoardingPurchasePage {...singlePaxMultiSegment} />;
  })
  .add('multi pax multi segment', () => {
    return <UpgradedBoardingPurchasePage {...upgradedBoardingPurchaseFormProps} />;
  })
  .add('by segment', () => {
    return <UpgradedBoardingPurchasePage {...upgradedBoardingPurchaseFormProps} UPGRADED_BOARDING_BY_SEGMENT={true} />;
  })
  .add('pay pal selected', () => {
    return (
      <UpgradedBoardingPurchasePage
        {...upgradedBoardingPurchaseFormProps}
        paymentInfo={{ selectedCardId: PAY_PAL_CARD_ID }}
      />
    );
  })
  .add('apple pay selected', () => {
    return (
      <UpgradedBoardingPurchasePage
        {...upgradedBoardingPurchaseFormProps}
        paymentInfo={{ selectedCardId: APPLE_PAY_CARD_ID }}
      />
    );
  })
  .add('with placement', () => {
    return <UpgradedBoardingPurchasePage {...upgradedBoardingPurchaseFormProps} {...placementProps} />;
  })
  .add('with valid email when logged in', () => {
    return (
      <UpgradedBoardingPurchasePage
        {...upgradedBoardingPurchaseFormProps}
        paymentInfo={{ selectedCardId: APPLE_PAY_CARD_ID }}
        receiptEmail="test@gmail.com"
        isLoggedIn
      />
    );
  })
  .add('with cvv field when cvv not not verified for selected card', () => {
    return (
      <UpgradedBoardingPurchasePage
        {...upgradedBoardingPurchaseFormProps}
        shouldShowSecurityInputField
        paymentInfo={{ selectedCardId: 'dummy' }}
        savedCreditCards={{
          primaryCard: {
            savedCreditCardId: 'primary_dummy',
            type: 'MASTERCARD',
            cvvVerified: true
          },
          otherCards: {
            savedCreditCardId: 'dummy',
            type: 'DISCOVER',
            name: 'DISCOVER 0000',
            lastFourDigits: '0000',
            cvvVerified: false
          },
          requireSecurityCode: true
        }}
      />
    );
  })
  .add('with invalid email id', () => {
    return (
      <UpgradedBoardingPurchasePage
        {...upgradedBoardingPurchaseFormProps}
        paymentInfo={{ selectedCardId: APPLE_PAY_CARD_ID }}
        receiptEmail="test"
      />
    );
  })
  .add('with blank email field', () => {
    return (
      <UpgradedBoardingPurchasePage
        {...upgradedBoardingPurchaseFormProps}
        paymentInfo={{ selectedCardId: APPLE_PAY_CARD_ID }}
        receiptEmail=""
      />
    );
  });

storiesOf('pages/upgradedBoarding/upgradedBoardingPurchasePage', module)
  .addDecorator(StoryReduxProvider(webViewStore))
  .add('ipad webview', () => <WebViewUpgradedBoardingPurchasePage {...singlePaxSegmentProps} />);
