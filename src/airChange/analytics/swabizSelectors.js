import _ from 'lodash';

export const getSwabiz = (state) => ({
  isSwabiz: _.get(state, 'app.airChange.changeFlightPage.response._meta.isSwabiz')
});
