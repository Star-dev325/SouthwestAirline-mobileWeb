// @flow
import dayjs from 'dayjs';
import _ from 'lodash';
import type { Node } from 'react';
import React from 'react';
import type { FlightProductSearchRequest } from 'src/airBooking/flow-typed/airBooking.types';
import environment from 'src/shared/api/apiRoutes';
import type { FlightPricingBound } from 'src/shared/flow-typed/shared.types';
import BrowserObject from 'src/shared/helpers/browserObject';
import { get } from 'src/shared/helpers/jsUtils';
import { buildPathWithParamAndQuery, buildPathWithQuery } from 'src/shared/helpers/pathUtils';
import { UTM_CONTENT, UTM_TERM_APP } from 'src/wcm/constants/flexPlacementConstants.js';

type Props = {
  children: Node,
  commandProps: { [key: string]: string },
  searchRequest: FlightProductSearchRequest,
  bounds: Array<FlightPricingBound>,
  isWebView: boolean
};

const SeePackagesCommand = (props: Props) => {
  const { bounds, isWebView, children, commandProps, searchRequest } = props;
  const getFlightDataString = (flightNumber, fareType) => {
    const southwestCarrierCode = 'WN';
    const paddedFlightNumber = `000${flightNumber}`.substr(-4);

    return `${southwestCarrierCode}${paddedFlightNumber}~${fareType}`;
  };

  const getPreferredFlightInfo = () => {
    const flightInfo = [];

    bounds.forEach((bound) => {
      const fareType = _.get(bound, 'fareProductDetails.fareProductId');
      const flights = _.get(bound, 'flights', []);

      flights.forEach((flight) => {
        const flightNumber = _.get(flight, 'number');

        flightNumber && flightInfo.push(getFlightDataString(flightNumber, fareType));
      });
    });

    return flightInfo.join('|');
  };

  const getPath = () => {
    const { swaVacationsUrl } = environment;
    const isInternationalFlight =
      !!get(bounds && bounds[0], 'departureAirport.country') || !!get(bounds && bounds[0], 'arrivalAirport.country');
    const utmContent = isWebView
      ? isInternationalFlight
        ? UTM_CONTENT.APP_INTERNATIONAL
        : UTM_CONTENT.APP_DOMESTIC
      : isInternationalFlight
        ? UTM_CONTENT.MWEB_INTERNATIONAL
        : UTM_CONTENT.MWEB_DOMESTIC;

    const utmTerm = isWebView ? UTM_TERM_APP : commandProps.utm_term;

    const updatedCommandProps = { ...commandProps, utm_content: utmContent, utm_term: utmTerm };

    return buildPathWithQuery(swaVacationsUrl, updatedCommandProps);
  };

  const getPostParams = () => {
    const isOriginationAirporInternational = !!_.get(bounds, '[0].departureAirport.country');
    const { departureDate, destination, numberOfAdults, origin, promoCode, returnDate } = searchRequest;

    return {
      cpmid: 'SWA-INPATH',
      currentculture: '',
      foPrefFlightInfo: getPreferredFlightInfo(),
      gsAge1: '',
      gsAge2: '',
      gsAge3: '',
      gsAge4: '',
      gsDepartureDate: departureDate,
      gsDestination: destination,
      gsLengthOfStay: dayjs(returnDate).diff(dayjs(departureDate), 'days'),
      gsNumberOfTravelers: numberOfAdults,
      gsOrigin: origin,
      gspromotioncode: promoCode,
      gsReturnDate: returnDate,
      gssourcecode: 'INPATH',
      gsVacationType: isOriginationAirporInternational ? 'AH01' : 'AH08',
      gsVendor: isOriginationAirporInternational ? 'WNI' : 'WNT',
      plcode: isOriginationAirporInternational ? 'SWAVINTL' : ''
    };
  };

  const handleClick = () => {
    const url = buildPathWithParamAndQuery(getPath(), null, getPostParams());
    const { window } = BrowserObject;

    window.open(url);
  };

  return (
    <div className="see-packages" onClick={handleClick}>
      {children}
    </div>
  );
};

export default SeePackagesCommand;
