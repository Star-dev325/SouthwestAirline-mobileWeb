import { storiesOf } from '@storybook/react';
import sameDayConfirmation from 'mocks/templates/wcm/flexPlacements/sameDay/sameDayConfirmation';
import React from 'react';
import { SameDayPurchaseConfirmationPage } from 'src/sameDay/pages/sameDayPurchaseConfirmationPage';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import { toDynamicPlacement } from 'src/wcm/transformers/wcmTransformer';
import StoryRouter from 'storybook-router';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import SameDayPurchaseConfirmationPageBuilder from 'test/builders/apiResponse/sameDayPurchaseConfirmationPageBuilder';
import configureMockStore from 'test/unit/helpers/configureMockStore';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

const sameDayConfirmationCreditDueAndStandByResponse = new SameDayPurchaseConfirmationPageBuilder().withTotalCreditDueStandBy().build().sameDayConfirmationPage;
const sameDayConfirmationTaxCreditDueAndStandByResponse = new SameDayPurchaseConfirmationPageBuilder().withTaxCreditDueStandBy().build().sameDayConfirmationPage;
const sameDayConfirmationCreditDueResponse = new SameDayPurchaseConfirmationPageBuilder().withTotalCreditDue().build().sameDayConfirmationPage;
const sameDayConfirmationCreditPointsWithNoTaxResponse = new SameDayPurchaseConfirmationPageBuilder().withPointsTotalCreditDue().build().sameDayConfirmationPage;
const sameDayConfirmationDollarResponse = new SameDayPurchaseConfirmationPageBuilder().build().sameDayConfirmationPage;
const sameDayConfirmationPlacement = toDynamicPlacement(sameDayConfirmation, 'ContentModule1');
const sameDayConfirmationPointsWithNoTaxResponse = new SameDayPurchaseConfirmationPageBuilder().withPointsNoTaxAmountDue().build().sameDayConfirmationPage;
const sameDayConfirmationPointsWithTaxResponse = new SameDayPurchaseConfirmationPageBuilder().withPointsAmountDue().build().sameDayConfirmationPage;
const EnhancedSameDayPurchaseConfirmationPage = _.flowRight(withBodyClass('same-day-purchase-confirmation-page'))(SameDayPurchaseConfirmationPage);
const sameDayConfirmationPointsAndTaxDue = new SameDayPurchaseConfirmationPageBuilder().withPointsAndTaxDue().build().sameDayConfirmationPage;
const sameDayConfirmationPointsEvenExchangeAndTaxCreditDueChange = new SameDayPurchaseConfirmationPageBuilder().withEvenExchangeAndTaxCreditDue().build().sameDayConfirmationPage;
const sameDayConfirmationPointsEvenExchangeAndTaxCreditDueStandby = new SameDayPurchaseConfirmationPageBuilder().withEvenExchangeAndTaxCreditDueStandby().build().sameDayConfirmationPage;
const sameDayConfirmationPointsEvenExchangeAndTaxDue = new SameDayPurchaseConfirmationPageBuilder().withEvenExchangeAndTaxDue().build().sameDayConfirmationPage;
const sameDayConfirmationPointsAndTaxCredit = new SameDayPurchaseConfirmationPageBuilder().withPointsAndTaxCredit().build().sameDayConfirmationPage;
const sameDayConfirmationNoPointsDueAndTaxCredit = new SameDayPurchaseConfirmationPageBuilder().withNoPointsDueAndTaxCredit().build().sameDayConfirmationPage;
const sameDayConfirmationPointsCreditTaxDue = new SameDayPurchaseConfirmationPageBuilder().withPointsCreditAndTaxDue().build().sameDayConfirmationPage;
const sameDayConfirmationPointsDueAndTaxCredit = new SameDayPurchaseConfirmationPageBuilder().withPointsDueAndTaxCredit().build().sameDayConfirmationPage;
const sameDayConfirmationPointsDueAndNoTaxDue = new SameDayPurchaseConfirmationPageBuilder().withPointsDueAndNoTaxDue().build().sameDayConfirmationPage;
const sameDayConfirmationOnlyPointsDueChange = new SameDayPurchaseConfirmationPageBuilder().withOnlyPointsDue().build().sameDayConfirmationPage;
const sameDayConfirmationOnlyAmountDueChange = new SameDayPurchaseConfirmationPageBuilder().withOnlyAmountDue().build().sameDayConfirmationPage;
const sameDayConfirmationOnlyPointsEvenExchangeChange = new SameDayPurchaseConfirmationPageBuilder().withOnlyEvenExchange().build().sameDayConfirmationPage;
const sameDayConfirmationOnlyPointsEvenExchangeStandby = new SameDayPurchaseConfirmationPageBuilder().withOnlyEvenExchangeStandby().build().sameDayConfirmationPage;
const sameDayConfirmationOnlyPointsCredit = new SameDayPurchaseConfirmationPageBuilder().withOnlyPointsCredit().build().sameDayConfirmationPage;

const defaultProps = {
  isLoggedIn: true,
  location: {},
  match: { params: '' },
  passengerRequestDetails: {},
  retrieveSameDayPurchaseConfirmationPlacementFn: () => {},
  sameDayConfirmationInformation: sameDayConfirmationDollarResponse,
  sameDayConfirmationPagePlacement: sameDayConfirmationPlacement
};

const withCreditDueAndStandByProps = {
  location: {},
  match: { params: '' },
  passengerRequestDetails: {},
  retrieveSameDayPurchaseConfirmationPlacementFn: () => {},
  sameDayConfirmationInformation: sameDayConfirmationCreditDueAndStandByResponse,
  sameDayConfirmationPagePlacement: sameDayConfirmationPlacement
};

const withTaxCreditDueAndStandByProps = {
  location: {},
  match: { params: '' },
  passengerRequestDetails: {},
  retrieveSameDayPurchaseConfirmationPlacementFn: () => {},
  sameDayConfirmationInformation: sameDayConfirmationTaxCreditDueAndStandByResponse,
  sameDayConfirmationPagePlacement: sameDayConfirmationPlacement
};

const withCreditDueProps = {
  location: {},
  match: { params: '' },
  passengerRequestDetails: {},
  retrieveSameDayPurchaseConfirmationPlacementFn: () => {},
  sameDayConfirmationInformation: sameDayConfirmationCreditDueResponse,
  sameDayConfirmationPagePlacement: sameDayConfirmationPlacement
};

const withPointsAndNoTaxAmountDueProps = {
  location: {},
  match: { params: '' },
  passengerRequestDetails: {},
  retrieveSameDayPurchaseConfirmationPlacementFn: () => {},
  sameDayConfirmationInformation: sameDayConfirmationPointsWithNoTaxResponse,
  sameDayConfirmationPagePlacement: sameDayConfirmationPlacement
};

const withPointsAndTaxAmountDueProps = {
  location: {},
  match: { params: '' },
  passengerRequestDetails: {},
  retrieveSameDayPurchaseConfirmationPlacementFn: () => {},
  sameDayConfirmationInformation: sameDayConfirmationPointsWithTaxResponse,
  sameDayConfirmationPagePlacement: sameDayConfirmationPlacement
};

const withPointsAndTaxCreditDueProps = {
  location: {},
  match: { params: '' },
  passengerRequestDetails: {},
  retrieveSameDayPurchaseConfirmationPlacementFn: () => {},
  sameDayConfirmationInformation: sameDayConfirmationCreditPointsWithNoTaxResponse,
  sameDayConfirmationPagePlacement: sameDayConfirmationPlacement
};

const withPointsAndTaxDueProps = {
  location: {},
  match: { params: '' },
  passengerRequestDetails: {},
  retrieveSameDayPurchaseConfirmationPlacementFn: () => {},
  sameDayConfirmationInformation: sameDayConfirmationPointsAndTaxDue,
  sameDayConfirmationPagePlacement: sameDayConfirmationPlacement
};

const withPointsEvenExchangeAndTaxCreditDueChangeProps = {
  location: {},
  match: { params: '' },
  passengerRequestDetails: {},
  retrieveSameDayPurchaseConfirmationPlacementFn: () => {},
  sameDayConfirmationInformation: sameDayConfirmationPointsEvenExchangeAndTaxCreditDueChange,
  sameDayConfirmationPagePlacement: sameDayConfirmationPlacement
};

const withPointsEvenExchangeAndTaxCreditDueStandbyProps = {
  location: {},
  match: { params: '' },
  passengerRequestDetails: {},
  retrieveSameDayPurchaseConfirmationPlacementFn: () => {},
  sameDayConfirmationInformation: sameDayConfirmationPointsEvenExchangeAndTaxCreditDueStandby,
  sameDayConfirmationPagePlacement: sameDayConfirmationPlacement
};
const withPointsEvenExchangeAndTaxDueProps = {
  location: {},
  match: { params: '' },
  passengerRequestDetails: {},
  retrieveSameDayPurchaseConfirmationPlacementFn: () => {},
  sameDayConfirmationInformation: sameDayConfirmationPointsEvenExchangeAndTaxDue,
  sameDayConfirmationPagePlacement: sameDayConfirmationPlacement
};

const withPointsAndTaxCreditProps = {
  location: {},
  match: { params: '' },
  passengerRequestDetails: {},
  retrieveSameDayPurchaseConfirmationPlacementFn: () => {},
  sameDayConfirmationInformation: sameDayConfirmationPointsAndTaxCredit,
  sameDayConfirmationPagePlacement: sameDayConfirmationPlacement
};

const withNoPointsDueAndTaxCreditProps = {
  location: {},
  match: { params: '' },
  passengerRequestDetails: {},
  retrieveSameDayPurchaseConfirmationPlacementFn: () => {},
  sameDayConfirmationInformation: sameDayConfirmationNoPointsDueAndTaxCredit,
  sameDayConfirmationPagePlacement: sameDayConfirmationPlacement
};

const withPointsCreditTaxDueProps = {
  location: {},
  match: { params: '' },
  passengerRequestDetails: {},
  retrieveSameDayPurchaseConfirmationPlacementFn: () => {},
  sameDayConfirmationInformation: sameDayConfirmationPointsCreditTaxDue,
  sameDayConfirmationPagePlacement: sameDayConfirmationPlacement
};

const withPointsDueAndTaxCreditProps = {
  location: {},
  match: { params: '' },
  passengerRequestDetails: {},
  retrieveSameDayPurchaseConfirmationPlacementFn: () => {},
  sameDayConfirmationInformation: sameDayConfirmationPointsDueAndTaxCredit,
  sameDayConfirmationPagePlacement: sameDayConfirmationPlacement
};

const withPointsDueAndNoTaxDueChangeProps = {
  location: {},
  match: { params: '' },
  passengerRequestDetails: {},
  retrieveSameDayPurchaseConfirmationPlacementFn: () => {},
  sameDayConfirmationInformation: sameDayConfirmationPointsDueAndNoTaxDue,
  sameDayConfirmationPagePlacement: sameDayConfirmationPlacement
};

const withOnlyPointsDueChangeProps = {
  location: {},
  match: { params: '' },
  passengerRequestDetails: {},
  retrieveSameDayPurchaseConfirmationPlacementFn: () => {},
  sameDayConfirmationInformation: sameDayConfirmationOnlyPointsDueChange,
  sameDayConfirmationPagePlacement: sameDayConfirmationPlacement
};

const withOnlyAmountDueChangeProps = {
  location: {},
  match: { params: '' },
  passengerRequestDetails: {},
  retrieveSameDayPurchaseConfirmationPlacementFn: () => {},
  sameDayConfirmationInformation: sameDayConfirmationOnlyAmountDueChange,
  sameDayConfirmationPagePlacement: sameDayConfirmationPlacement
};

const withOnlyPointsEvenExchangeChangeProps = {
  location: {},
  match: { params: '' },
  passengerRequestDetails: {},
  retrieveSameDayPurchaseConfirmationPlacementFn: () => {},
  sameDayConfirmationInformation: sameDayConfirmationOnlyPointsEvenExchangeChange,
  sameDayConfirmationPagePlacement: sameDayConfirmationPlacement
};

const withOnlyPointsEvenExchangeStandbyProps = {
  location: {},
  match: { params: '' },
  passengerRequestDetails: {},
  retrieveSameDayPurchaseConfirmationPlacementFn: () => {},
  sameDayConfirmationInformation: sameDayConfirmationOnlyPointsEvenExchangeStandby,
  sameDayConfirmationPagePlacement: sameDayConfirmationPlacement
};

const withOnlyPointsCreditProps = {
  location: {},
  match: { params: '' },
  passengerRequestDetails: {},
  retrieveSameDayPurchaseConfirmationPlacementFn: () => {},
  sameDayConfirmationInformation: sameDayConfirmationOnlyPointsCredit,
  sameDayConfirmationPagePlacement: sameDayConfirmationPlacement
};

const defaultState = {
  app: {
    sameDay: {}
    },
  router: {
    location: {
      search: 'search'
    }
  }
};

storiesOf('pages/sameDay/SameDayPurchaseConfirmationPage', module)
  .addDecorator(StoryReduxProvider(configureMockStore()(defaultState)))
  .add('default', () => <EnhancedSameDayPurchaseConfirmationPage {...defaultProps} />)
  .add('with points and no tax amount due', () => <EnhancedSameDayPurchaseConfirmationPage {...withPointsAndNoTaxAmountDueProps} />)
  .add('with points and tax amount due', () => <EnhancedSameDayPurchaseConfirmationPage {...withPointsAndTaxAmountDueProps} />)
  .add('with points and no tax credit due', () => <EnhancedSameDayPurchaseConfirmationPage {...withPointsAndTaxCreditDueProps} />)
  .add('with points and tax due', () => <EnhancedSameDayPurchaseConfirmationPage {...withPointsAndTaxDueProps} />)
  .add('with points even exchange and tax credit due standby', () => <EnhancedSameDayPurchaseConfirmationPage {...withPointsEvenExchangeAndTaxCreditDueStandbyProps} />)
  .add('with points even exchange only standby', () => <EnhancedSameDayPurchaseConfirmationPage {...withOnlyPointsEvenExchangeStandbyProps} />)
  .add('with tax credit due and stand by', () => <EnhancedSameDayPurchaseConfirmationPage {...withTaxCreditDueAndStandByProps} />)
  .add('with points even exchange and tax credit due', () => <EnhancedSameDayPurchaseConfirmationPage {...withPointsEvenExchangeAndTaxCreditDueChangeProps} />)
  .add('with points even exchange only', () => <EnhancedSameDayPurchaseConfirmationPage {...withOnlyPointsEvenExchangeChangeProps} />)
  .add('with points credit and tax credit due', () => <EnhancedSameDayPurchaseConfirmationPage {...withPointsAndTaxCreditProps} />)
  .add('with points and tax credit due', () => <EnhancedSameDayPurchaseConfirmationPage {...withCreditDueProps} />)
  .add('with credit due and stand by', () => <EnhancedSameDayPurchaseConfirmationPage {...withCreditDueAndStandByProps} />)
  .add('with points even exchange and tax due', () => <EnhancedSameDayPurchaseConfirmationPage {...withPointsEvenExchangeAndTaxDueProps} />)
  .add('with no points due and tax credit', () => <EnhancedSameDayPurchaseConfirmationPage {...withNoPointsDueAndTaxCreditProps} />)
  .add('with points credit and tax due', () => <EnhancedSameDayPurchaseConfirmationPage {...withPointsCreditTaxDueProps} />)
  .add('with points due and tax credit due', () => <EnhancedSameDayPurchaseConfirmationPage {...withPointsDueAndTaxCreditProps} />)
  .add('with points due and no tax due', () => <EnhancedSameDayPurchaseConfirmationPage {...withPointsDueAndNoTaxDueChangeProps} />)
  .add('with points due only', () => <EnhancedSameDayPurchaseConfirmationPage {...withOnlyPointsDueChangeProps} />)
  .add('with amount due only', () => <EnhancedSameDayPurchaseConfirmationPage {...withOnlyAmountDueChangeProps} />)
  .add('with points credit only standby', () => <EnhancedSameDayPurchaseConfirmationPage {...withTaxCreditDueAndStandByProps} />)
  .add('with points credit only', () => <EnhancedSameDayPurchaseConfirmationPage {...withOnlyPointsCreditProps} />);
