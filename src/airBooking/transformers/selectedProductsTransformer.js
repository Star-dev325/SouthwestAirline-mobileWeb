// @flow
import _ from 'lodash';
import type { SelectedProducts } from 'src/airBooking/flow-typed/airBooking.types';
import type { PassengerType } from 'src/shared/flow-typed/passenger.types';
import type { BoundType } from 'src/shared/flow-typed/flightBound.types';

type ParamsType = {
  selectedProducts: SelectedProducts,
  paxType: PassengerType,
  direction: BoundType,
  fareProductId: string,
  flightCardIndex: number
};
export const transformToSelectedProducts = ({
  selectedProducts,
  paxType,
  direction,
  fareProductId,
  flightCardIndex
}: ParamsType): SelectedProducts =>
  _.merge({}, selectedProducts, {
    [paxType]: {
      [direction]: {
        fareProductId,
        flightCardIndex
      }
    }
  });
