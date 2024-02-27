// @flow
import _ from 'lodash';
import hawaiiNoRoutesErrorPopupResponse from 'mocks/templates/content-delivery/hawaiiNoRoutesErrorPopup';

export default class HawaiiNoRoutesPopupErrorBuilder {
  hawaiiNoRoutesPopupError = _.cloneDeep(hawaiiNoRoutesErrorPopupResponse);

  build() {
    return this.hawaiiNoRoutesPopupError;
  }
}
