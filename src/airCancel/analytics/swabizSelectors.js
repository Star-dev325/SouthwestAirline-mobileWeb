import _ from 'lodash';

export const getSwabiz = (state) => ({ isSwabiz: _.get(state, 'app.airCancel.cancelSummaryPage.response.isSwabiz') });
