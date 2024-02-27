import _ from 'lodash';
import { getContactMethodContent } from 'src/shared/selectors/contactMethodSelectors';

const getCompanionContactMethodInfo = (state) => _.get(state, 'app.companion.contactMethodInfo');

export const getCompanionContactMethodContent = getContactMethodContent(getCompanionContactMethodInfo);
