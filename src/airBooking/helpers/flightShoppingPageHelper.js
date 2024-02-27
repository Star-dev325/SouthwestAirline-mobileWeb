import _ from 'lodash';
import { permutations } from 'src/shared/helpers/mathUtils';
import { INBOUND, OUTBOUND } from 'src/shared/constants/flightBoundTypes';
import PassengerTypes from 'src/shared/constants/passengerTypes';

const { ADULT } = PassengerTypes;

export const getNextFlightShoppingPageParams = (params, response) => {
  const { inboundPage } = response;
  const bounds = inboundPage ? [OUTBOUND, INBOUND] : [OUTBOUND];
  const paxTypes = [ADULT];

  const pages = permutations(paxTypes, bounds).map((paxAndBound) => ({
    paxType: paxAndBound[0],
    direction: paxAndBound[1]
  }));

  const index = _.findIndex(pages, params);

  return index === -1 ? undefined : _.get(pages, `[${index + 1}]`);
};

export const getFirstShoppingPageParams = () => ({
  paxType: ADULT,
  direction: OUTBOUND
});

export const generateFlightShoppingPages = (response) => {
  const { outboundPage, inboundPage } = response.flightShoppingPage;
  const isRoundTrip = !!inboundPage;
  let pages = [];

  const buildPages = () => {
    const result = [
      {
        direction: OUTBOUND,
        paxType: ADULT,
        ...outboundPage
      }
    ];

    if (isRoundTrip) {
      result.push({
        direction: INBOUND,
        paxType: ADULT,
        ...inboundPage
      });
    }

    return result;
  };

  pages = pages.concat(buildPages());

  return pages;
};
