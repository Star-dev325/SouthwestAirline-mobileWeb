import { Dayjs } from 'dayjs';
// @flow
export const BOTH = 'BOTH';
export const DEPART = 'DEPART';
export const RETURN = 'RETURN';

export type DateRangeType = 'RETURN' | 'DEPART' | 'BOTH';

export type SelectedDatesType = {
  newOutboundDate: ?Dayjs,
  newInboundDate: ?Dayjs
};
