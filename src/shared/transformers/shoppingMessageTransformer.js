// @flow
import _ from 'lodash';
import SgaMessageConstants from 'src/shared/constants/sgaMessageConstants';

import type { MessageType } from 'src/shared/flow-typed/shared.types';

const { MESSAGE_GOVERNMENT_APPROVAL, MESSAGE_GOVERNMENT_APPROVAL_TITLE, MESSAGE_GOVERNMENT_APPROVAL_TEXT } =
  SgaMessageConstants;

export function transformToSGAMessage(shoppingMessages: Array<MessageType>) {
  const newMessageFormat = !!_.find(shoppingMessages, { key: MESSAGE_GOVERNMENT_APPROVAL });

  if (newMessageFormat) {
    return _.mergeWithoutUndefined(
      {},
      {
        title: _.get(_.find(shoppingMessages, { key: MESSAGE_GOVERNMENT_APPROVAL }), 'header'),
        text: _.get(_.find(shoppingMessages, { key: MESSAGE_GOVERNMENT_APPROVAL }), 'body')
      }
    );
  } else {
    return _.mergeWithoutUndefined(
      {},
      {
        title: _.get(_.find(shoppingMessages, { key: MESSAGE_GOVERNMENT_APPROVAL_TITLE }), 'header'),
        text: _.get(_.find(shoppingMessages, { key: MESSAGE_GOVERNMENT_APPROVAL_TEXT }), 'body')
      }
    );
  }
}
