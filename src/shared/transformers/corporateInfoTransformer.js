// @flow
import _ from 'lodash';
import dayjs from 'dayjs';
import type { Company } from 'src/airBooking/flow-typed/airBooking.types';
import { DAYJS_TIMESTAMP_FORMAT } from 'src/shared/constants/dayjsConstants';

export const transformToCorporateInfo = (
  oauthLoginResponse: *,
  CORPORATE_INFO_TIMEOUT_MIN: string,
  isWebView?: boolean,
  selectedCompany?: Company
) => {
  const unflattenedResponse = _.unflatten(oauthLoginResponse);
  const corporateInfo = {
    ..._.get(unflattenedResponse, 'corporate.customerUserInformation'),
    ..._.get(unflattenedResponse, 'corporate.corporateUserInformation'),
    ..._.get(unflattenedResponse, 'apiContext'),
    ..._.get(unflattenedResponse, 'corporate.companyUserInformation')
  };
  const companyName = _.get(corporateInfo, 'name', '');
  const companyId = _.get(corporateInfo, 'companyId') || _.get(corporateInfo, 'companyInformation.companyId');
  const nativeSelectedCompany = isWebView && companyId ? { companyName, companyId } : undefined;
  const expirationMinutes = _.toNumber(CORPORATE_INFO_TIMEOUT_MIN);
  const expirationDate = dayjs().add(expirationMinutes, 'minutes').format(DAYJS_TIMESTAMP_FORMAT);

  if (_.isEmpty(corporateInfo)) {
    return null;
  } else if (nativeSelectedCompany) {
    return { ...corporateInfo, selectedCompany: nativeSelectedCompany, expirationDate };
  } else if (selectedCompany) {
    return { ...corporateInfo, selectedCompany, expirationDate };
  } else {
    return { ...corporateInfo, expirationDate };
  }
};
