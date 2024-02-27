// @flow
import mktgDataConstants from 'src/shared/constants/mktgDataConstants';

import type { FareProduct } from 'src/shared/flow-typed/shared.types';

const { NOT_AVAILABLE, NOT_SELECTED } = mktgDataConstants;

export type MKTGFareType = {
  priceDifference: {
    amount: string,
    sign: string
  }
} & FareProduct | typeof NOT_AVAILABLE | typeof NOT_SELECTED
export type FareValueParserType = (fare: MKTGFareType) => string | number
