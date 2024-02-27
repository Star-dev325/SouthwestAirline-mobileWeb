// @flow
import React, { Component } from 'react';
import _ from 'lodash';

import PageHeader from 'src/shared/components/pageHeader';
import Select from 'src/shared/components/select';
import i18n from '@swa-ui/locale';

import MyTripType from 'src/myAccount/constants/myTripType';

const { SAVED_FLIGHTS, UPCOMING_TRIPS, PAST_FLIGHTS } = MyTripType;
const options = [UPCOMING_TRIPS, PAST_FLIGHTS, SAVED_FLIGHTS];

type Props = {
  currentView: string,
  onTripTypeSelectChange: (string) => void
};

export class MyTripTypePageHeader extends Component<Props> {
  _transitionToSelectedPage = (selectedPage: string) => {
    const selectedType = _.find(options, { value: selectedPage });

    process.nextTick(() => {
      this.props.onTripTypeSelectChange(_.get(selectedType, 'path'));
    });
  };

  render() {
    const e = (element) => `my-trips-header--${element}`; // e = the "element" in BEM

    return (
      <div className="my-trips-header">
        <PageHeader {...this.props}>
          <span className={e('title')}>{i18n('MY_ACCOUNT__MY_TRIPS')}</span>
          <span className={e('select-container')}>
            <Select
              className={e('select')}
              defaultValue={this.props.currentView}
              options={options}
              onChange={this._transitionToSelectedPage}
            />
          </span>
        </PageHeader>
      </div>
    );
  }
}

export default MyTripTypePageHeader;
