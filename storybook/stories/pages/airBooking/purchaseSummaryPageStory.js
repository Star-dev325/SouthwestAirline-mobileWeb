import { storiesOf } from '@storybook/react';
import i18n from '@swa-ui/locale';
import _ from 'lodash';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import { PurchaseSummaryPage } from 'src/airBooking/pages/purchaseSummaryPage';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import EarlyBirdInPathPricesBuilder from 'test/builders/apiResponse/earlyBirdInPathPricesBuilder';
import PricesBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/pricesBuilder';
import BriefBoundBuilder from 'test/builders/model/briefBoundBuilder';
import chaseRecentFlightsPlacementBuilder from 'test/builders/model/chaseRecentFlightsPlacementBuilder';
import ContactMethodInfoBuilder from 'test/builders/model/contactMethodInfoBuilder';
import EarlyBirdEligibilityBuilder from 'test/builders/model/earlyBirdEligibilityBuilder';
import EarlyBirdPlacementBuilder from 'test/builders/model/earlyBirdPlacementBuilder';
import { getPassengerInfos } from 'test/builders/model/passengerInfosBuilder';
import PaymentSavedCreditCardsBuilder from 'test/builders/model/paymentSavedCreditCardsBuilder';
import PriceTotalBuilder from 'test/builders/model/priceTotalBuilder';
import { getParentOrGuardianFormData } from 'test/builders/model/youngTravelerPageBuilder';
import { promoBottom01, promoTop01 } from 'mocks/flexPlacement/purchaseSummaryPagePlacements';
import { get, noop } from 'src/shared/helpers/jsUtils';

const store = {
  app: {},
  router: {
    location: {
      search: 'search'
    }
  }
};
const webViewStore = {
  ...store,
  app: {
    ...store.app,
    account: {
      ...store.app.account,
      userInfo: {
        ...store.app.account.userInfo,
        customers: {
          ...store.app.account.userInfo.customers,
          UserInformation: {
            ...store.app.account.userInfo.customers.UserInformation,
            recentFlightDestinationAirport: 'Spokane'
          }
        }
      }
    },
    webView: {
      ...store.app.webView,
      isWebView: true
    }
  }
};

const earlyBirdStore = {
  ...store,
  app: {
    ...store.app,
    toggles: {
      ...store.app.toggles,
      EARLY_BIRD_AB_TESTING: true
    },
    airBooking: {
      ...store.app.airBooking,
      earlyBirdSelected: true
    }
  }
};

const earlyBirdWebViewStore = {
  ...store,
  app: {
    ...store.app,
    toggles: {
      ...store.app.toggles,
      EARLY_BIRD_AB_TESTING: true
    },
    airBooking: {
      ...store.app.airBooking,
      earlyBirdSelected: true
    },
    webView: {
      ...store.app.webView,
      isWebView: true
    }
  }
};
const outbound = new BriefBoundBuilder().build();
const inboundWithOvernight = new BriefBoundBuilder().withOvernightStops().build();
const inbound = new BriefBoundBuilder()
    .withDepartureAirportCode('OAK')
    .withArrivalAirportCode('LAS')
    .withDepartureDate('2017-11-28')
    .withDepartureDayOfWeek('Tuesday')
    .build();
const tripSummary = {
  bounds: [outbound],
  passengerCountDescription: '1 Passenger Total',
  currency: {
    amount: '234.30',
    currencyCode: 'USD',
    currencySymbol: '$'
  }
};
const tripSummaryWithOvernight = {
  ...tripSummary,
  bounds: [inboundWithOvernight]
};
const contactInfo = {
  address: {
    addressLine1: 'Contact Info Lane',
    addressLine2: '',
    city: 'Dallas',
    stateProvinceRegion: 'TX',
    zipOrPostalCode: '12345',
    isoCountryCode: 'US'
  },
  phone: {
    number: '2155465465',
    countryCode: '1'
  }
};
const passengers = [
  {
    name: 'Ron Hackmann'
  }
];
const priceTotal = new PriceTotalBuilder().build();
const contactMethodInfo = new ContactMethodInfoBuilder().build();
const passengerInfos = getPassengerInfos();
const earlyBirdEligibility = new EarlyBirdEligibilityBuilder().build();
const defaultPageProps = {
  addHistoryBackToHomeFn: noop,
  checkSessionExpired: () => {},
  checkSessionWarm: noop,
  contactInfo,
  contactMethodContent: `${i18n('SHARED__CONTACT_METHOD_OPTION__DOMESTIC_OPTIONS_CALL')}, (123) 654-8973`,
  contactMethodInfo,
  currentState: {
    action: 'push',
    hash: '',
    key: 'as70fd',
    pathname: '/air/booking/review',
    search: ''
  },
  currencyType: 'USD',
  earlyBirdEligibility,
  fetchEarlybirdPricing: () => {},
  fetchSavedCreditCardsFn: noop,
  flightPricingPageResponse: new PricesBuilder().build(),
  fundsAppliedToken: null,
  generatePurchaseSummaryPageFn: () => {},
  gotoPayPalSignInFn: noop,
  hasSelectedAlternativeFormOfPaymentFn: noop,
  hideDialogBoxFn: () => {},
  history: {
    location: {
      pathname: 'path'
    }
  },
  initiateAlternativeFormOfPaymentFn: noop,
  isExpressCheckout: false,
  isInternationalBooking: false,
  isLoggedIn: false,
  isWebView: false,
  itineraryPricingToken: 'itinerary-token',
  loadPurchasePagePlacementsFn: () => {
    return Promise.resolve();
  },
  parentOrGuardianFormDataInfo: null,
  passengerInfos,
  paymentInfo: {},
  persistAppStateFn: noop,
  placements: {},
  prevState: {
    action: 'push',
    hash: '',
    key: '0h085k',
    pathname: '/air/booking/payment',
    search: ''
  },
  priceTotal,
  purchaseFlightFn: () => {},
  purchaseSummaryPage: {
    tripSummary,
    passengers,
    priceTotal
  },
  push: () => {},
  refetchPricingDataFn: noop,
  refreshFundsFn: noop,
  reloadAndSubmitAlternativeFormOfPaymentFn: noop,
  resetAirBookingPurchaseDataFn: () => {},
  resumeAppStateFn: noop,
  resumeDataFn: noop,
  savedCreditCards: new PaymentSavedCreditCardsBuilder().withRequireSecurityCode(false).build(),
  savePurchaseSummaryFormFn: () => {},
  setChaseBannerShownFn: noop,
  setExternalPaymentAuthorizedSearchStringFn: noop,
  setIsExpressCheckoutFn: noop,
  setPaymentInfoForChaseFn: noop,
  setWebViewDeepLinkContinueFn: noop,
  shouldGotoPayPalSignInFn: noop,
  shouldResumeAppStateFn: noop,
  shouldResumeDataFn: noop,
  shouldShowChasePlacement: false,
  showDialogBoxFn: () => {},
  showEarlyBirdInPath: true,
  splitPay: false,
  switchEarlyBirdInPathButtonFn: () => {},
  updatedPriceTotal: {
    moneyTotal: {
      amount: '233.98',
      currencyCode: 'USD',
      currencySymbol: '$'
    },
    pointsTotal: null
  },
  updateSelectedIrnFn: noop,
  webViewDeepLinkContinue: false
};
const moneyPageProps = defaultPageProps;
const pointsPageProps = {
  ...defaultPageProps,
  purchaseSummaryPage: {
    tripSummary: {
      bounds: [outbound, inbound],
      passengerCountDescription: '2 Passenger Total',
      currency: {
        amount: '49,000',
        currencyCode: 'PTS',
        currencySymbol: null
      }
    },
    passengers: [
      {
        name: 'Amber Awesomewithverylongnamelongnamelongnamexxxxxxx',
        rapidRewardsNumber: '8476374657'
      },
      {
        name: 'Ron Hackmann'
      }
    ]
  }
};

const chaseCardPageProps = {
  ...defaultPageProps,
  paymentInfo: {
    selectedCardId: 'RAPID_REWARDS_VISA_ID'
  }
};

const wcmPlacementsProps = {
  ...defaultPageProps,
  ENABLE_BOOKING_PLACEMENT: true,
  shouldCallPlacement: true,
  placements: {
    ...defaultPageProps.placements,
    bottomPromo1: {
      linkType: 'linkType',
      promoImageBackground: '/content/mkt/images/landing_pages/__tests__/chase-placement.png',
      target: 'target',
      displayType: 'block-placement'
    },
    promoBottom01,
    promoTop01
  },
  shouldShowChasePlacement: true
};
const applePayCardProps = {
  ...defaultPageProps,
  paymentInfo: {
    ...defaultPageProps.paymentInfo,
    selectedCardId: 'APPLE_PAY_CARD_ID'
  }
};
const upliftCardProps = {
  ...defaultPageProps,
  paymentInfo: {
    ...defaultPageProps.paymentInfo,
    selectedCardId: 'UPLIFT_CARD_ID'
  },
  upliftAdditionalMessaging: 'Pay Monthly from $1/mo'
};
const payPalCardProps = {
  ...defaultPageProps,
  paymentInfo: {
    ...defaultPageProps.paymentInfo,
    selectedCardId: 'PAY_PAL_CARD_ID'
  }
};
const earlyBirdFromPlacementProps = {
  EARLY_BIRD_AB_TESTING: true,
  earlyBirdSelected: true,
  earlyBirdEligibility: new EarlyBirdInPathPricesBuilder().build(),
  loadOffersPagePlacementsFn: () => Promise.resolve(),
  placements: {
    earlyBirdUpsell: new EarlyBirdPlacementBuilder().build()
  }
};
const corporateProps = {
  selectedCompanyName: 'Dunder Mifflin Paper Company'
};
const corporatePropsWithOneRequiredGhostCard = {
  selectedCompanyName: 'Dunder Mifflin Paper Company',
  savedCreditCards: {
    ghostCards: [
      {
        savedCreditCardId: 'First Ghost Card',
        type: 'GHOST_CARD',
        name: 'First Ghost Card',
        isExpired: false
      }
    ],
    ghostCardRequired: true
  }
};
const corporatePropsWithMultipleRequiredGhostCard = {
  selectedCompanyName: 'Dunder Mifflin Paper Company',
  savedCreditCards: {
    ghostCards: [
      {
        savedCreditCardId: 'First Ghost Card',
        type: 'GHOST_CARD',
        name: 'First Ghost Card',
        isExpired: false
      },
      {
        savedCreditCardId: 'Second Ghost Card',
        type: 'GHOST_CARD',
        name: 'Second Ghost Card',
        isExpired: false
      }
    ],
    ghostCardRequired: true
  }
};
const corporatePropsWith1GhostCardAndNotRequired = {
  selectedCompanyName: 'Dunder Mifflin Paper Company',
  savedCreditCards: {
    ghostCards: [
      {
        savedCreditCardId: 'First Ghost Card',
        type: 'GHOST_CARD',
        name: 'First Ghost Card',
        isExpired: false
      }
    ]
  }
};
const corporatePropsWithMultipleGhostCardAndNotRequired = {
  selectedCompanyName: 'Dunder Mifflin Paper Company',
  savedCreditCards: {
    ghostCards: [
      {
        savedCreditCardId: 'First Ghost Card',
        type: 'GHOST_CARD',
        name: 'First Ghost Card',
        isExpired: false
      },
      {
        savedCreditCardId: 'Second Ghost Card',
        type: 'GHOST_CARD',
        name: 'Second Ghost Card',
        isExpired: false
      }
    ]
  }
};
const WebViewPurchaseSummaryPage = withBodyClass(['is-webview', 'purchase-summary-page'])(PurchaseSummaryPage);
const webViewProps = {
  ...moneyPageProps,
  placements: {
    bottomPromo1: new chaseRecentFlightsPlacementBuilder().build()
  },
  shouldShowChasePlacement: true
};
const corporatePropsWithOneIrn = {
  selectedCompanyName: 'Dunder Mifflin Paper Company',
  selectedIrn: 'IRN name',
  irnInfo: {
    irnRequired: true,
    alternateIrnAllowed: false,
    preselectedInternalReferenceNumber: { name: 'IRN name', description: 'Description' },
    companyInternalReferenceNumbers: [{ name: 'IRN name', description: 'Description' }]
  },
  onIrnInfoClick: () => {}
};
const corporatePropsWithMultipleIrn = {
  selectedCompanyName: 'Dunder Mifflin Paper Company',
  irnInfo: {
    irnRequired: true,
    alternateIrnAllowed: false,
    companyInternalReferenceNumbers: [
      { name: 'IRN name', description: 'Description' },
      { name: 'IRN2 name', description: 'Description 2' }
    ]
  },
  onIrnInfoClick: () => {}
};
const corporatePropsWithMultipleIrnAndPreselectedObject = {
  selectedCompanyName: 'Dunder Mifflin Paper Company',
  irnInfo: {
    irnRequired: true,
    alternateIrnAllowed: false,
    preselectedInternalReferenceNumber: { name: 'IRN name', description: 'Description' },
    companyInternalReferenceNumbers: [
      { name: 'IRN name', description: 'Description' },
      { name: 'IRN2 name', description: 'Description 2' }
    ]
  },
  selectedIrn: 'IRN name',
  onIrnInfoClick: () => {}
};
const corporatePropsWithNoIrn = {
  selectedCompanyName: 'Dunder Mifflin Paper Company',
  irnInfo: {
    irnRequired: false,
    alternateIrnAllowed: true
  },
  onIrnInfoClick: () => {}
};
const corporatePropsWithMultipleOptionalIrn = {
  selectedCompanyName: 'Dunder Mifflin Paper Company',
  irnInfo: {
    irnRequired: false,
    alternateIrnAllowed: true,
    companyInternalReferenceNumbers: [
      { name: 'IRN name', description: 'Description' },
      { name: 'IRN2 name', description: 'Description 2' }
    ]
  },
  onIrnInfoClick: () => {}
};
const internationalPageProps = {
  ...moneyPageProps,
  declineNotifications: true,
  isInternationalBooking: true,
  contactMethodContent: ''
};

const dutyOfCareContactInfoOptional = {
  ...corporatePropsWithMultipleOptionalIrn
};

const dutyOfCareContactInfo = {
  ...dutyOfCareContactInfoOptional,
  contactTravelManagerInfo: {
    contactMethod: 'CALL_ME',
    contactPhone: {
      countryCode: '1',
      number: '1234567890'
    },
    contactEmail: null,
    legalVerbiage: 'In case of an emergency, {companyName} may also contact you during your day(s) of travel.',
    disclaimerText:
        'By providing your contact information in the field below, you are authorizing and instructing Southwest Airlines to share this contact information with your Company and your SWABIZ Company Travel Manager(s).\nSouthwest Airlines is not responsible for how your Company or Travel Manager(s) use this contact information or with whom they share this information.\nIf you do not want your contact information shared with your Company and your Travel Manager(s), simply leave the field below blank.'
  }
};

const parentOrGuardianProps = {
  ...moneyPageProps,
  clearFormDataByIdFn:()=>{},
  parentOrGuardianFormDataInfo: {
    data: getParentOrGuardianFormData()
  }
};

storiesOf('pages/airBooking/purchaseSummary', module)
    .addDecorator(StoryReduxProvider(configureMockStore()(store)))
    .add('money', () => {
      return <PurchaseSummaryPage {...moneyPageProps} />;
    })
    .add('eb ineligible', () => {
      return <PurchaseSummaryPage {...{ ...moneyPageProps, showEarlyBirdInPath: false }} />;
    })
    .add('points', () => {
      return <PurchaseSummaryPage {...pointsPageProps} />;
    })
    .add('cvvRequiredButMissing', () => {
      return (
          <PurchaseSummaryPage
              {...{
                ...moneyPageProps,
                savedCreditCards: new PaymentSavedCreditCardsBuilder()
                    .withRequireSecurityCode(true)
                    .withPrimaryCardNotCvvVerified()
                    .build()
              }}
          />
      );
    })
    .add('contactMethodMissing', () => {
      return <PurchaseSummaryPage {...{ ...moneyPageProps, contactMethodContent: '' }} />;
    })
    .add('international', () => {
      return <PurchaseSummaryPage {...internationalPageProps} />;
    })
    .add('cvvAndContactMethodMissing', () => {
      return (
          <PurchaseSummaryPage
              {...{
                ...moneyPageProps,
                savedCreditCards: new PaymentSavedCreditCardsBuilder()
                    .withRequireSecurityCode(true)
                    .withPrimaryCardNotCvvVerified()
                    .build(),
                contactMethodContent: ''
              }}
          />
      );
    })
    .add('chaseCardPresent', () => {
      return <PurchaseSummaryPage {...chaseCardPageProps} />;
    })
    .add('wcm placements', () => {
      const Component = withBodyClass(['purchase-summary-page'])(PurchaseSummaryPage);

      return (
          <div className="booking">
            <Component {...wcmPlacementsProps} />
          </div>
      );
    })
    .add('PayPal selected', () => {
      return <PurchaseSummaryPage {...payPalCardProps} />;
    })
    .add('apple pay selected', () => {
      return <PurchaseSummaryPage {...applePayCardProps} />;
    })
    .add('uplift selected', () => {
      return <PurchaseSummaryPage {...upliftCardProps} />;
    })
    .add('paymentMethodMissing', () => {
      return (
          <PurchaseSummaryPage
              {...{
                ...moneyPageProps,
                savedCreditCards: {
                  otherCards: null,
                  primaryCard: null,
                  requireSecurityCode: true
                }
              }}
          />
      );
    })
    .add('Travel Funds partially paying', () => {
      return (
          <PurchaseSummaryPage
              {...{
                ...moneyPageProps,
                fundsAppliedToken: 'funds-token',
                totalAppliedTravelFunds: {
                  amount: '123.98',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                travelFundsBalanceRemaining: {
                  amount: '110.00',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                }
              }}
          />
      );
    })
    .add('Travel Funds completely paying', () => {
      return (
          <PurchaseSummaryPage
              {...{
                ...moneyPageProps,
                fundsAppliedToken: 'funds-token',
                totalAppliedTravelFunds: {
                  amount: '233.98',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                travelFundsBalanceRemaining: {
                  amount: '0.00',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                }
              }}
          />
      );
    })
    .add('Split Pay available', () => {
      return (
          <PurchaseSummaryPage
              {...{
                ...moneyPageProps,
                isSplitPayVisible: true,
                splitPayLink: {
                  body: {
                    itineraryPricingToken: 'test',
                    offerId: 'abc123',
                    promoCodeToken: null
                  }
                }
              }}
          />
      );
    })
    .add('Split Pay applied', () => {
      return (
          <PurchaseSummaryPage
              {...{
                ...moneyPageProps,
                isSplitPayVisible: true,
                selectedSplitPay: 426,
                splitPayLink: {
                  body: {
                    itineraryPricingToken: 'test',
                    offerId: 'abc123',
                    promoCodeToken: null
                  }
                },
                totalPointsApplied: {
                  pointsApplied: {
                    amount: '33,289',
                    currencyCode: 'PTS',
                    currencySymbol: 'PTS'
                  },
                  moneyApplied: {
                    amount: '426.77',
                    currencyCode: 'USD',
                    currencySymbol: '$'
                  }
                },
                travelFundsBalanceRemaining: {
                  amount: '0.00',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                }
              }}
          />
      );
    })
    .add('Parent or Guardian', () => {
      return (
          <PurchaseSummaryPage
              {...parentOrGuardianProps}
          />
      );
    })
    .add('billing address incomplete', () => {
      return (
          <PurchaseSummaryPage
              {...{
                ...moneyPageProps,
                fundsAppliedToken: 'funds-token',
                totalAppliedTravelFunds: {
                  amount: '233.98',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                travelFundsBalanceRemaining: {
                  amount: '0.00',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                contactInfo: null
              }}
          />
      );
    })
    .add('corporateBooking', () => {
      return <PurchaseSummaryPage {...{...moneyPageProps, ...corporateProps}} />;
    })
    .add('corporate booking with 1 required ghost card', () => {
      return <PurchaseSummaryPage {...{...moneyPageProps, ...corporatePropsWithOneRequiredGhostCard}} />;
    })
    .add('corporate booking with multiple required ghost card', () => {
      return <PurchaseSummaryPage {...{...moneyPageProps, ...corporatePropsWithMultipleRequiredGhostCard}} />;
    })
    .add('corporate booking with 1 ghost card and not required', () => {
      return <PurchaseSummaryPage {...{...moneyPageProps, ...corporatePropsWith1GhostCardAndNotRequired}} />;
    })
    .add('corporate booking with multiple ghost card and not required', () => {
      return <PurchaseSummaryPage {...{...moneyPageProps, ...corporatePropsWithMultipleGhostCardAndNotRequired}} />;
    })
    .add('corporate booking with one IRN', () => {
      return <PurchaseSummaryPage {...{...moneyPageProps, ...corporatePropsWithOneIrn}} />;
    })
    .add('corporate booking with multiple IRN', () => {
      return <PurchaseSummaryPage {...{...moneyPageProps, ...corporatePropsWithMultipleIrn}} />;
    })
    .add('corporate booking with multiple IRN and preselected object', () => {
      return <PurchaseSummaryPage {...{...moneyPageProps, ...corporatePropsWithMultipleIrnAndPreselectedObject}} />;
    })
    .add('corporate booking with no IRN', () => {
      return <PurchaseSummaryPage {...{...moneyPageProps, ...corporatePropsWithNoIrn}} />;
    })
    .add('corporate booking with multiple optional IRN', () => {
      return <PurchaseSummaryPage {...{...moneyPageProps, ...corporatePropsWithMultipleOptionalIrn}} />;
    })
    .add('corporate booking with DOC information optional', () => {
      return <PurchaseSummaryPage {...{...moneyPageProps, ...dutyOfCareContactInfoOptional}} />;
    })
    .add('corporate booking with DOC information', () => {
      return <PurchaseSummaryPage {...{...moneyPageProps, ...dutyOfCareContactInfo}} />;
    })
    .add('with overnight indicator', () => {
      return (
          <PurchaseSummaryPage
              {...{
                ...defaultPageProps,
                purchaseSummaryPage: {
                  ...defaultPageProps.purchaseSummaryPage,
                  tripSummary: tripSummaryWithOvernight
                }
              }}
          />
      );
    })
    .add('with review messages', () => {
      return (
          <PurchaseSummaryPage
              {...{
                ...defaultPageProps,
                purchaseSummaryPage: {
                  ...defaultPageProps.purchaseSummaryPage,
                  reviewMessages: new PricesBuilder().withReviewMessages().build().flightPricingPage.reviewMessages
                }
              }}
          />
      );
    });

storiesOf('pages/airBooking/purchaseSummary', module)
    .addDecorator(StoryReduxProvider(configureMockStore()(webViewStore)))
    .add('ipad webview', () => {
      return (
          <div className="booking">
            <WebViewPurchaseSummaryPage {...webViewProps} />
          </div>
      );
    });

storiesOf('pages/airBooking/purchaseSummary', module)
    .addDecorator(StoryReduxProvider(configureMockStore()(earlyBirdStore)))
    .add('load early bird from placement', () => {
      return <PurchaseSummaryPage {..._.merge({}, moneyPageProps, earlyBirdFromPlacementProps)} />;
    });

storiesOf('pages/airBooking/purchaseSummary', module)
    .addDecorator(StoryReduxProvider(configureMockStore()(earlyBirdWebViewStore)))
    .add('load early bird from placement iPad', () => {
      return (
          <div className="booking">
            <WebViewPurchaseSummaryPage {..._.merge({}, webViewProps, earlyBirdFromPlacementProps)} />
          </div>
      );
    });
