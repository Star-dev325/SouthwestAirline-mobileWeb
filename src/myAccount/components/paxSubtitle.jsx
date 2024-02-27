// @flow
import React, { Component } from 'react';
import pluralize from 'pluralize';
import i18n from '@swa-ui/locale';

type Props = {
  numberOfAdult: number
};

export class PaxSubtitle extends Component<Props> {
  render() {
    const { numberOfAdult } = this.props;

    return (
      <div className={'saved-flight--passengers'}>
        <span data-qa="passengers-only">
          {numberOfAdult} {pluralize(i18n('MY_ACCOUNT__PAX_SUB_TITLE__PAX_TYPE_PASSENGER'), numberOfAdult)}
        </span>
      </div>
    );
  }
}

export default PaxSubtitle;
