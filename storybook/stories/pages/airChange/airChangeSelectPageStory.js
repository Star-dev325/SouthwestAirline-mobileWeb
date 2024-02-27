import _ from 'lodash';
import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { AirChangeSelectPage } from 'src/airChange/pages/airChangeSelectPage';
import BoundSelectionBuilder from 'test/builders/model/boundSelectionBuilder';
import { noop } from 'src/shared/helpers/jsUtils';

const defaultProps = {
  changeFlightPage: {
    messages: [
      {
        note: 'none',
        icon: 'NONE',
        header: 'none',
        body: "Select the flight(s) you'd like to modify. We never charge change fees. You'll pay only the difference in fare.",
        textColor: 'DEFAULT',
        key: 'CHANGE_FEE_MESSAGE'
      }
    ],
    selectionMode: 'ALL',
    boundSelections: [
      new BoundSelectionBuilder()
        .withTo('Austin, TX (AUS)', 'AUS')
        .withFrom('Dallas (Love Field), TX (DAL)', 'DAL')
        .build(),
      new BoundSelectionBuilder()
        .withFrom('Austin, TX (AUS)', 'AUS')
        .withTo('Dallas (Love Field), TX (DAL)', 'DAL')
        .withFlightType('Return')
        .build()
    ],
    firstbound: false,
    secondbound: false,
    _links: { changeShopping: 'changeShopping' },
    dynamicWaivers: [],
    passengerDetails: {
      disclaimerTextWithLinks:
        'Flight changes apply to all passengers on this reservation. If you need to make changes to one person on your itinerary, please call , <a href="tel:18004359792">1 800 I FLY SWA( 1-800-435-9792)</a>.',
      title: 'PASSENGER(S)',
      passengerList: [{ displayName: 'Tesla Awesome' }, { displayName: 'Tesla Smart' }]
    },
    _meta: { hasSenior: false }
  },
  pnr: {
    confirmationNumber: 'AAAUOD',
    firstName: 'firstName',
    lastName: 'lastName'
  },
  saveSelectedBoundsFn: noop,
  showDialogFn: noop,
  hideDialogFn: noop,
  push: noop,
  selectedBounds: { firstbound: false, secondbound: false },
  isOpenJaw: false,
};

const reaccomProps = {
  reaccomFlightPage: {
    messages: [
      {
        key: 'REACCOM_CHANGE_FLIGHT',
        header: null,
        body: 'The selected flight(s) may be modified at no additional cost.',
        icon: 'NONE',
        textColor: 'DEFAULT'
      },
      {
        key: 'REACCOM_CONTACT_US_TO_CHANGE_FLIGHT',
        header: null,
        body: 'The flight(s) below is not eligible for this type of change. It will remain booked, and can be modified after you complete the eligible changes(s) above. Have questions? <a href="https://www.southwest.com/contact-us/contact-us.html?clk=GFOOTER-CUSTOMER-CONTACT-US">Contact Us</a>.',
        icon: 'NONE',
        textColor: 'DEFAULT'
      }
    ],
    boundSelections: [
      {
        flightType: 'Departure',
        originalDate: '2019-10-17',
        fromAirport: 'Austin, TX - AUS',
        fromAirportCode: 'AUS',
        toAirport: 'Dallas (Love Field), TX - DAL',
        toAirportCode: 'DAL',
        flight: '2395',
        timeDeparts: '06:00',
        timeArrives: '07:00',
        boundFlown: false,
        isSelectable: true
      },
      {
        flightType: 'Return',
        originalDate: '2019-10-19',
        fromAirport: 'Dallas (Love Field), TX - DAL',
        fromAirportCode: 'DAL',
        toAirport: 'Austin, TX - AUS',
        toAirportCode: 'AUS',
        flight: '4434',
        timeDeparts: '20:20',
        timeArrives: '21:20',
        boundFlown: false,
        isSelectable: false
      }
    ],
    _links: {
      reaccomProducts: {
        href: '/v1/mobile-air-booking/page/flights/reaccom/shopping',
        method: 'POST',
        body: {
          outbound: {
            date: '2019-10-17',
            'origin-airport': 'AUS',
            'destination-airport': 'DAL',
            isChangeBound: true
          },
          inbound: null,
          shareDataToken:
            'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..QDTU1LnDH_va62-ggc3FDA._3GoXokHGUx3hMAf-4kO_9TUo_M_imvJAmHJt5vxGp3p73DeHIAdaPyc42HrrN2baATcBkJ-snvEvFDnrK5JqBnx5DG6QzPaJ0_BUp1KpSRyVFuUf9fxALNmDhqlP5lzsG9GZqJtWuLFI4qcY6z1rRvf-gC9wPrMOoGEm5rjfwVxnaJUxYBisnVEd-QDoVV_mNizjzTJY3CF9rzesvdsKLoY6zrVDkHU0wFZB_6vVLsC9yfioYvK3lbxRBdcQqeTizg3A2dakfEzuMdgqz0Ey0b5Vdj0yLFgJh2Jkv3410G6S0BLQ57WNsJ-jwwjtsj-THXjTHmTFvvVabXJSTxGtGnM1CPqII5CDcpK1c2v_mdksF4JhpaJuawwXIVCtmJZTW4E2zjZukeeEV2Bt4uVnD42oN-oe5RLVrKDGeDkNNIgiiv-34OrtjcdBdlniqsh6Lkn3jzWDYBiNjgyHV8YD-pf608AGA7CrbsgHjeJZiHhJzHIvUWPFn9GKDKLzfgQ-ZWTvqDnSed0hziS7QPlSqKZ3B8qZUVo-N3XWCzCGzJpFiYf0H5qj-7cIYPppnxajTmG5p13rsOI-Mkhoj1_jTzgJp1UfwdNLVuR_-rroMX3vgPFIxT0FNt5LE2jpPOyxE6zccmXIlcAXxg16kjOi_L_lzTWhjxbRGRhBFJJ61uzqJNFyEWwRwCpTZxjxGNBp5A5DlNqBKsFm91UFHpLIz4LolmguM_A5CsI_224zpYTEnCTBcpuYirfW7FLyBeXIAVxmIPyIndyLPZKlARgqO5J94ZeEy2Ou1IvWI2SBB0zfUIddhwTz0TUzYfuoa3pn0vebKVwms1yCkz5iy2nrWfuJyYdi2-WsRQFB4r8ECKmv22d0xplPJEuxQ8-eimvHOolWy6tSl0lPApmk9Lh0xVUJZlk4Dpdc8kddFG2D7SIVsHx1O22TredIPEZ_TO4uGXx9TiQ7ctns5pF033lskCliEKUf5yl2J2YXICIx_z7fWQt9GJ1sa3hVvdgPqsZnO1EnuSmJPWiWG20N9ifkvo5cNjTlu4c9w99Q_0fjiTlT24w1_hE-UQEaYCP1t864uW-bg536EJHYPO1glQdwn2V02X2HrjM40Dxv7k9KaBiQIzZ7-ts3O9ldGbJpLSv8BsoIcAtm79td21jwSv2HqnDAustHdhKTaTcOtgeewjhQL-telosM9n7xab8SqIQmhMHNxG9Ou2cLV1GbVtDbpETKQ8cSGs2_xOJM50T9By_s-9h4qqDvkkXV1uGeTGzjKzEfIaVLpxC9NGDvvbVbH30Puqmnx9KOTSpZ6KI1wUEF8QJYtMBdGpDz37fQcvfUw0khRu9NojaMz2NgQ-TYkI29XnnPvycMx9DtzZbTvWLYgz0D1cHqVlYywLVmOTO_OMXMpeUtm1kSR7_QbfGPL5IkT8Cm_wwcnUNkDU_aOicQ2ccS3vAH4qsuX-21MLW49ReJcF_sivWdxdcfKeAguRDjSU_sqDqiy5iIgJ5YaLBUV4TsNF3EskeZJ4I2Hr7pvhVw3f7pM3zLXjECQzVyEE4ICNgUufCIotpEbNIJPYOvMblKWduCY0vTsX9qwY4Yhqu2NEIyNWS2GQEo8tfQcNOdvvGaT6wiMplqkZsEzZH2lF9DkGZmiXHRgqDtl4Hk3xMWjCWn2gU2l32MHUSe6aunNk97EuAQbcpDcVbLiMJCWCPns3g0CmM7d0lK5PVbmB-j117g8OTpnGY1zr3MZLFyeYZ2pmE7yKA4F5_6OaJr5YVT1DSz4nvEwuo2cJ-e210TfwzbBi5_or5Z-fKwHWWW0d8SJQudiDryO6D8cmCTj7aBCQdG0fvKDVGKrMc3sVd7fumAsc90cS2CyGH1KfO5vGsP9sSbyOodSZdVSRsD5mJfYNGtapdHKKP2ZORpuOfwYHeLGBzGxbvgR6r4GsvTw3a3-Vp7GnLTG4F3CFfLbvj0x_Nzt7jm5hT7Rb-yPBzBVOukdFeM9fpg9zBxEjO7PAszmlkOHSdqZg5wmQUiI0kzPQPUj5XTowaDVmUEDM3Jia30Of3m29VYX6vDqOwoQQQlUJS9l4bbU-K3bXczpK5peWbpDWbEi7slA8m_WSO4J0VMrLbwkzwN_YvvJKE_7gfE5dtsfnS1cbR9qyQoTe4wkcvBqHgluT_qcLctIZr36KZP1cdDnmu4H-BmQQXYgbE3XMFgWl68E0Xv8t7AFe9E0TnWT3FhHXNLxNrA73IIU87iYwGa9hu-gdW-q1iXkQpWu8HlLkACPm2WGJXyRC0Ce7DoRdYkYafQkBZAQSd8zb3IC1aXWbKIS2P5qU9GGam7ZaugYVKgsbtoUs.mscYXt4gdX04B-3befyntg'
        }
      }
    },
    _meta: {
      hasUnaccompaniedMinor: false,
      isSwabiz: false
    }
  },
  pnr: {
    confirmationNumber: 'AAAUOD',
    firstName: 'firstName',
    lastName: 'lastName'
  },
  saveSelectedBoundsFn: _.noop,
  showDialogFn: _.noop,
  hideDialogFn: _.noop,
  push: _.noop,
  selectedBounds: {},
  isOpenJaw: false,
  isReaccom: true
};
const splitPnrGdsBannerProps = {
  ...defaultProps,
  changeFlightPage: {
    ...defaultProps.changeFlightPage,
    messages: [
      ...defaultProps.changeFlightPage.messages,
      {
        icon: 'INFO',
        header: 'Your new confirmation number # 4927D7',
        body: null,
        textColor: 'DEFAULT',
        key: 'CHANGE_SPLIT_PNR_CONFIRMATION',
        primaryThemeColor: 'neutral-white',
        inverseThemeColor: 'primary-dark-blue'
      }
    ]
  }
}

const reaccomSwappedBoundsProps = _.cloneDeep(reaccomProps);
const reaccomOneBoundFlownProps = _.cloneDeep(reaccomProps);
const reaccomBlockMultiBoundsProps = _.cloneDeep(reaccomProps);

const store = createMockedFormStore();

storiesOf('pages/airChange/AirChangeSelectPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return <AirChangeSelectPage {...defaultProps} />;
  })
  .add('reaccom', () => {
    return <AirChangeSelectPage {...reaccomProps} />;
  })
  .add('reaccom swapped bounds', () => {
    _.set(reaccomSwappedBoundsProps, 'reaccomFlightPage.boundSelections.0.isSelectable', false);
    _.set(reaccomSwappedBoundsProps, 'reaccomFlightPage.boundSelections.1.isSelectable', true);
    return <AirChangeSelectPage {...reaccomSwappedBoundsProps} />;
  })
  .add('reaccom outbound flow', () => {
    _.set(reaccomOneBoundFlownProps, 'reaccomFlightPage.boundSelections.0.boundFlown', true);
    _.set(reaccomOneBoundFlownProps, 'reaccomFlightPage.boundSelections.0.isSelectable', false);
    _.set(reaccomOneBoundFlownProps, 'reaccomFlightPage.boundSelections.1.isSelectable', true);
    _.set(reaccomOneBoundFlownProps, 'reaccomFlightPage.boundSelections.1.boundFlown', false);
    return <AirChangeSelectPage {...reaccomOneBoundFlownProps} />;
  })
  .add('reaccom block multi bounds (1 bound eligible)', () => {
    _.set(reaccomBlockMultiBoundsProps, 'reaccomFlightPage._meta.isBlockMultiBoundSelection', true);
    _.set(reaccomBlockMultiBoundsProps, 'reaccomFlightPage.boundSelections.1.isSelectable', false);
    return <AirChangeSelectPage {...reaccomBlockMultiBoundsProps} />;
  })
  .add('reaccom block multi bounds (2 bounds eligible)', () => {
    _.set(reaccomBlockMultiBoundsProps, 'reaccomFlightPage._meta.isBlockMultiBoundSelection', true);
    _.set(reaccomBlockMultiBoundsProps, 'reaccomFlightPage.boundSelections.1.isSelectable', true);
    _.set(reaccomBlockMultiBoundsProps, 'reaccomFlightPage.messages', [
      {
        body: 'You may modify one flight at a time at no additional cost. Please select the flight you would like to change first.',
        header: null,
        icon: 'NONE',
        key: 'REACCOM_CHANGE_FLIGHT_BOTH_ELIGIBLE',
        textColor: 'DEFAULT'
      }
    ]);
    return <AirChangeSelectPage {...reaccomBlockMultiBoundsProps} />;
  })
  .add('with split pnr GDS banner', () => {
    return <AirChangeSelectPage {...splitPnrGdsBannerProps} />;
  });
