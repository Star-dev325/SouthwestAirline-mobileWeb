// @flow
import _ from 'lodash';
import { getConfirmationPageContent } from 'src/shared/selectors/alternativeFormsOfPaymentSelector';

const earlyBirdConfirmationResponse = (state) => _.get(state, 'app.earlyBird.confirmationPage.response');

export const getEarlyBirdConfirmationPageResponse = getConfirmationPageContent(earlyBirdConfirmationResponse);
