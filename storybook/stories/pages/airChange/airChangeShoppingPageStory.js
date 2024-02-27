import { storiesOf } from '@storybook/react';
import _ from 'lodash';
import React from 'react';
import { AirChangeShoppingPage } from 'src/airChange/pages/airChangeShoppingPage';
import { isReaccomScenario } from 'src/airChange/selectors/airChangeSelectPageSelector';
import {
  getCurrentPage,
  getCardsSortedBy,
  getCalendarStrip,
  getDynamicWaiver,
  getSelectedProducts
} from 'src/airChange/selectors/airChangeShoppingPageSelectors';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withShowOnlyLoginButton from 'src/shared/enhancers/withShowOnlyLoginButton';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { withFakeClock } from 'storybook/libs/withFakeClock';
import ChangeShoppingPageReaccomResponseBuilder from 'test/builders/apiResponse/changeShoppingPageReaccomResponseBuilder';
import ChangeShoppingPageResponseBuilder from 'test/builders/apiResponse/changeShoppingPageResponseBuilder';
import BoundSelectionBuilder from 'test/builders/model/boundSelectionBuilder';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

const EnhancedAirChangeShoppingPage = _.flowRight(
  withBodyClass('flight-shopping-page'),
  withShowOnlyLoginButton
)(AirChangeShoppingPage);

const defaultState = {
  app: {
    airChange: {
      changeShoppingPage: {
        response: new ChangeShoppingPageResponseBuilder().build(),
        sortBy: {
          outbound: 'departureTime',
          inbound: 'departureTime'
        },
        selectedProducts: {}
      },
      changeFlightPage: {
        response: {
          selectionMode: 'ALL',
          boundSelections: [
            new BoundSelectionBuilder().build(),
            new BoundSelectionBuilder().withFlightType('RETURN').build()
          ],
          _links: { changeShopping: 'changeShopping' },
          _meta: { hasSenior: false }
        }
      },
      selectedBounds: {
        firstbound: true,
        secondbound: false
      }
    },
    formData: {
      AIR_CHANGE_SHOPPING_SEARCH_FORM: {
        data: {
          departureAndReturnDate: {
            departureDate: '2018-05-04',
            returnDate: '2018-05-11'
          }
        }
      }
    },
    lastBookableDate: '2018-06-01'
  }
};

const defaultStateWithBanners = {
  app: {
    airChange: {
      changeShoppingPage: {
        response: new ChangeShoppingPageResponseBuilder()
          .withSGAMessage()
          .withValidPromoCode()
          .withDynamicWaiverMessage()
          .build(),
        sortBy: {
          outbound: 'departureTime',
          inbound: 'departureTime'
        },
        selectedProducts: {}
      },
      changeFlightPage: {
        response: {
          selectionMode: 'ALL',
          boundSelections: [
            new BoundSelectionBuilder().build(),
            new BoundSelectionBuilder().withFlightType('RETURN').build()
          ],
          _links: { changeShopping: 'changeShopping' },
          _meta: { hasSenior: false }
        }
      },
      selectedBounds: {
        firstbound: true,
        secondbound: false
      }
    },
    formData: {
      AIR_CHANGE_SHOPPING_SEARCH_FORM: {
        data: {
          departureAndReturnDate: {
            departureDate: '2018-05-04',
            returnDate: '2018-05-11'
          }
        }
      }
    },
    lastBookableDate: '2018-06-01'
  }
};

const defaultStateDifferenceUSD = {
  app: {
    airChange: {
      changeShoppingPage: {
        response: new ChangeShoppingPageResponseBuilder().withFareDifferenceInUSD().build(),
        sortBy: {
          outbound: 'departureTime',
          inbound: 'departureTime'
        },
        selectedProducts: {}
      },
      changeFlightPage: {
        response: {
          selectionMode: 'ALL',
          boundSelections: [
            new BoundSelectionBuilder().build(),
            new BoundSelectionBuilder().withFlightType('RETURN').build()
          ],
          _links: { changeShopping: 'changeShopping' },
          _meta: { hasSenior: false }
        }
      },
      selectedBounds: {
        firstbound: true,
        secondbound: false
      }
    },
    formData: {
      AIR_CHANGE_SHOPPING_SEARCH_FORM: {
        data: {
          departureAndReturnDate: {
            departureDate: '2018-05-04',
            returnDate: '2018-05-11'
          }
        }
      }
    },
    lastBookableDate: '2018-06-01'
  }
};

const defaultStateDifferencePts = {
  app: {
    airChange: {
      changeShoppingPage: {
        response: new ChangeShoppingPageResponseBuilder().withFareDifferenceInPts().build(),
        sortBy: {
          outbound: 'departureTime',
          inbound: 'departureTime'
        },
        selectedProducts: {}
      },
      changeFlightPage: {
        response: {
          selectionMode: 'ALL',
          boundSelections: [
            new BoundSelectionBuilder().build(),
            new BoundSelectionBuilder().withFlightType('RETURN').build()
          ],
          _links: { changeShopping: 'changeShopping' },
          _meta: { hasSenior: false }
        }
      },
      selectedBounds: {
        firstbound: true,
        secondbound: false
      }
    },
    formData: {
      AIR_CHANGE_SHOPPING_SEARCH_FORM: {
        data: {
          departureAndReturnDate: {
            departureDate: '2018-05-04',
            returnDate: '2018-05-11'
          }
        }
      }
    },
    lastBookableDate: '2018-06-01'
  }
};

const defaultStateWithDynamicWaiver = {
  app: {
    airChange: {
      changeShoppingPage: {
        response: new ChangeShoppingPageResponseBuilder().withDynamicWaiver().withDynamicWaiverMessage().build(),
        sortBy: {
          outbound: 'departureTime',
          inbound: 'departureTime'
        },
        selectedProducts: {}
      },
      changeFlightPage: {
        response: {
          selectionMode: 'ALL',
          boundSelections: [
            new BoundSelectionBuilder().build(),
            new BoundSelectionBuilder().withFlightType('RETURN').build()
          ],
          _links: { changeShopping: 'changeShopping' },
          _meta: { hasSenior: false }
        }
      },
      selectedBounds: {
        firstbound: true,
        secondbound: false
      }
    },
    formData: {
      AIR_CHANGE_SHOPPING_SEARCH_FORM: {
        data: {
          departureAndReturnDate: {
            departureDate: '2018-05-04',
            returnDate: '2018-05-11'
          }
        }
      }
    },
    lastBookableDate: '2018-06-01'
  }
};

const defaultStateWithNextDay = {
  ...defaultState,
  app: {
    ...defaultState.app,
    airChange: {
      ...defaultState.app.airChange,
      changeShoppingPage: {
        ...defaultState.app.airChange.changeShoppingPage,
        response: new ChangeShoppingPageResponseBuilder().withNextDay().build(),
      }
    }
  }
}

const defaultStateWithOvernight = {
  ...defaultState,
  app: {
    ...defaultState.app,
    airChange: {
      ...defaultState.app.airChange,
      changeShoppingPage: {
        ...defaultState.app.airChange.changeShoppingPage,
        response: new ChangeShoppingPageResponseBuilder().withOvernight().build(),
      }
    }
  }
}

const defaultStateWithDoubleConnects = {
  ...defaultState,
  app: {
    ...defaultState.app,
    airChange: {
      ...defaultState.app.airChange,
      changeShoppingPage: {
        ...defaultState.app.airChange.changeShoppingPage,
        response: new ChangeShoppingPageResponseBuilder().widthDoubleConnects().build(),
      }
    }
  }
}

const defaultProps = {
  params: {
    direction: 'outbound',
    paxType: 'adult'
  }
};

const reaccomState = {
  app: {
    airChange: {
      reaccomShoppingPage: {
        response: new ChangeShoppingPageReaccomResponseBuilder().build(),
        sortBy: {
          outbound: 'departureTime',
          inbound: 'departureTime'
        },
        selectedProducts: {}
      },
      reaccomFlightPage: {
        response: {
          messages: [],
          boundSelections: [
            new BoundSelectionBuilder().withReaccomBound().build(),
            new BoundSelectionBuilder().withReaccomBound().withFlightType('RETURN').build()
          ],
          _links: { reaccomProducts: 'reaccomProducts' },
          _meta: { hasSenior: false }
        },
        pnr: {}
      },
      selectedBounds: {
        firstbound: true,
        secondbound: false
      }
    },
    formData: {
      AIR_CHANGE_SHOPPING_SEARCH_FORM: {
        data: {
          departureAndReturnDate: {
            departureDate: '2018-05-04',
            returnDate: '2018-05-11'
          }
        }
      }
    },
    lastBookableDate: '2020-06-01'
  }
};

const reaccomStateWithNextDay = {
  ...reaccomState,
  app: {
    ...reaccomState.app,
    airChange: {
      ...reaccomState.app.airChange,
      reaccomShoppingPage: {
        ...reaccomState.app.airChange.reaccomShoppingPage,
        response: new ChangeShoppingPageReaccomResponseBuilder().withNextDay().build(),
      }
    }
  }
};

const reaccomStateWithOvernight = {
  ...reaccomState,
  app: {
    ...reaccomState.app,
    airChange: {
      ...reaccomState.app.airChange,
      reaccomShoppingPage: {
        ...reaccomState.app.airChange.reaccomShoppingPage,
        response: new ChangeShoppingPageReaccomResponseBuilder().withOvernight().build(),
      }
    }
  }
};

function createProps(state, props) {
  return {
    page: getCurrentPage(state, props),
    cardsSortedBy: getCardsSortedBy(state, props),
    calendarStrip: getCalendarStrip(state, props),
    dynamicWaiver: getDynamicWaiver(state, props),
    selectedBounds: _.get(state, 'app.airChange.selectedBounds'),
    shouldForbidForward: _.get(state, 'app.airChange.shouldForbidForward'),
    selectedProducts: getSelectedProducts(state),
    feeDisclaimerText:
      'Award travel is subject to payment of the government-imposed September 11th Security fee, up to $5.60 one-way, $11.20 roundtrip.',
    push: _.noop,
    sortAirChangeShoppingPageFn: _.noop,
    saveSelectedProductsFn: _.noop,
    searchForFlightsFn: _.noop,
    goToPricingFn: _.noop,
    isReaccom: isReaccomScenario(state),
    trackCalendarStripFn: _.noop
  };
}

const store = createMockedFormStore();

storiesOf('pages/airChange/AirChangeShoppingPage', module)
  .addDecorator(withFakeClock('2018-05-23'))
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => <EnhancedAirChangeShoppingPage {...createProps(defaultState, defaultProps)} />)
  .add('default with banners', () => (
    <EnhancedAirChangeShoppingPage {...createProps(defaultStateWithBanners, defaultProps)} />
  ))
  .add('default with price diff in usd', () => (
    <EnhancedAirChangeShoppingPage {...createProps(defaultStateDifferenceUSD, defaultProps)} />
  ))
  .add('default with price diff in pts', () => (
    <EnhancedAirChangeShoppingPage {...createProps(defaultStateDifferencePts, defaultProps)} />
  ))
  .add('default with dynamic waiver', () => (
    <EnhancedAirChangeShoppingPage {...createProps(defaultStateWithDynamicWaiver, defaultProps)} />
  ))
  .add('default with next day', () => (
    <EnhancedAirChangeShoppingPage {...createProps(defaultStateWithNextDay, defaultProps)} />
  ))
  .add('default with overnight', () => (
    <EnhancedAirChangeShoppingPage {...createProps(defaultStateWithOvernight, defaultProps)} />
  ))
  .add('default with reservation as double connect', () => (
    <EnhancedAirChangeShoppingPage {...createProps(defaultStateWithDoubleConnects, defaultProps)} />
  ))
  .add('reaccom', () => <EnhancedAirChangeShoppingPage {...createProps(reaccomState, defaultProps)} />)
  .add('reaccom with next day', () => <EnhancedAirChangeShoppingPage {...createProps(reaccomStateWithNextDay, defaultProps)} />)
  .add('reaccom with overnight', () => <EnhancedAirChangeShoppingPage {...createProps(reaccomStateWithOvernight, defaultProps)} />)
  .add('reaccom no flights available', () => {
    const messages = [
      {
        key: 'ERROR__REACCOM_NO_FLIGHTS_AVAILABLE',
        header: 'Sorry! No available flights for this date.',
        body:
          'Please select a new date using the date selector above.' +
          'You may also ' +
          '<a href = "https://www.southwest.com/contact-us/contact-us.html?clk=GFOOTER-CUSTOMER-CONTACT-US">' +
          'Contact Us</a> or speak with a Southwest Customer Service Agent at the airport.',
        icon: 'WARNING',
        textColor: 'DEFAULT',
        note: null
      }
    ];
    const stateWithMessage = _.cloneDeep(reaccomState);
    _.set(stateWithMessage, 'app.airChange.reaccomShoppingPage.response.flights.outboundPage.messages', messages);
    _.set(stateWithMessage, 'app.airChange.reaccomShoppingPage.response.flights.outboundPage.cards', []);
    _.set(stateWithMessage, 'app.airChange.reaccomShoppingPage.response.flights.inboundPage', null);

    return <EnhancedAirChangeShoppingPage {...createProps(stateWithMessage, defaultProps)} />;
  });
