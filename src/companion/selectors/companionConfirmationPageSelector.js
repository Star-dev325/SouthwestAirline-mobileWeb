// @flow
import _ from 'lodash';
import { getConfirmationPageContent } from 'src/shared/selectors/alternativeFormsOfPaymentSelector';

const companionConfirmationPage = (state) => _.get(state, 'app.companion.companionConfirmationPage');

export const getCompanionConfirmationPage = getConfirmationPageContent(companionConfirmationPage);
