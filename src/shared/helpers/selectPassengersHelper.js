// @flow
import _ from 'lodash';
import type { CancelBoundRefundQuoteRequestType } from 'src/airCancel/flow-typed/airCancel.types';
import type { PassengerSelectionType } from 'src/shared/flow-typed/shared.types';
import type { FormData } from 'src/shared/form/flow-typed/form.types';

export const getSelectedPassengerIds = (formData: FormData): Array<string> => {
  const allPassengerIdsObject = _.omit(formData, 'receiptEmail');

  return _.keys(_.pickBy(allPassengerIdsObject));
};

export const getShowEmailFieldWithTexts = (
  passengerSelections: Array<PassengerSelectionType>,
  selectedPassengerIds: Array<string>
): boolean => selectedPassengerIds.length !== passengerSelections.length && selectedPassengerIds.length !== 0;

export const getSplitPnrLinkObjWithSelectedIdsAndEmail = (
  { receiptEmail }: FormData,
  linkObject: Link,
  selectedPassengerIds: Array<string>
): Link => ({
  ...linkObject,
  body: {
    ...linkObject.body,
    passengerIds: selectedPassengerIds,
    receiptEmail
  }
});

export const getRefundQuoteRequestData = (
  refundQuoteLinkObject: *
): CancelBoundRefundQuoteRequestType => ({
  ...refundQuoteLinkObject,
  body: {
    ...refundQuoteLinkObject.body,
    refundRequested: null
  }
});
