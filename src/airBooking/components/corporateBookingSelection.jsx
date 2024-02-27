// @flow
import _ from 'lodash';
import * as AccountActions from 'src/shared/actions/accountActions';
import * as AirBookingActions from 'src/airBooking/actions/airBookingActions';
import { connect } from 'react-redux';
import React from 'react';
import { sitePaths } from 'src/shared/constants/siteLinks';
import ToggleSwitch from 'src/shared/components/toggleSwitch';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import { withRouter } from 'react-router';
import i18n from '@swa-ui/locale';

import type { Company, CorporateBookingSwitchInfo } from 'src/airBooking/flow-typed/airBooking.types';
import type { Push } from 'src/shared/flow-typed/shared.types';

type Props = {
  activeCompanyIdAssociations: Array<Company>,
  corporateBookingSwitchInfo: CorporateBookingSwitchInfo,
  push: Push,
  removeSelectedCompanyFn: (boolean) => void,
  saveSelectedCompanyFn: (Company) => void,
  selectedCompanyName: ?string,
  transitionToSelectCompanyPageFn: () => void,
  hasLapChild: boolean
};

export class CorporateBookingSelection extends React.Component<Props> {
  _handleToggleSwitchChange = (checked: boolean) => {
    const {
      activeCompanyIdAssociations,
      saveSelectedCompanyFn,
      removeSelectedCompanyFn,
      transitionToSelectCompanyPageFn
    } = this.props;

    if (checked) {
      if (activeCompanyIdAssociations.length === 1) {
        saveSelectedCompanyFn(activeCompanyIdAssociations[0]);
      } else if (activeCompanyIdAssociations.length > 1) {
        transitionToSelectCompanyPageFn();
      } else {
        this.props.push(`${sitePaths.learnMoreSwabizNotAssociated}?CLK=swabizomnitoggle`);
      }
    } else {
      removeSelectedCompanyFn(false);
    }
  };

  render() {
    const { corporateBookingSwitchInfo, selectedCompanyName, hasLapChild, removeSelectedCompanyFn } = this.props;

    if (!!selectedCompanyName && hasLapChild) {
      removeSelectedCompanyFn(false);
    }

    return (
      <div className="corporate-booking-selection flex p3">
        <div className="corporate-booking-selection--info-container flex">
          <img className="corporate-booking-selection--icon" src="/content/mkt/images/landing_pages/ic-bag.svg" />
          <div className="corporate-booking-selection--text-content">
            <div className="corporate-booking-selection--label bold">{corporateBookingSwitchInfo.label}</div>
            <div>
              {selectedCompanyName ? (
                <div className="corporate-booking-selection--company-name">{selectedCompanyName}</div>
              ) : (
                <div
                  className="corporate-booking-selection--learn-more"
                  onClick={() => this.props.push(`${sitePaths.learnMoreSwabiz}?CLK=swabizomnilearnmore`)}
                >
                  {i18n('AIR_BOOKING__CORPORATE_BOOKING__LEARN_MORE')}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="pr6 pt2">
          <ToggleSwitch
            onChange={this._handleToggleSwitchChange}
            checked={!!selectedCompanyName}
            disabled={hasLapChild}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  activeCompanyIdAssociations: _.get(state, 'app.account.corporateInfo.activeCompanyIdAssociations', []),
  selectedCompanyName: _.get(state, 'app.account.corporateInfo.selectedCompany.companyName')
});

const mapDispatchToProps = {
  saveSelectedCompanyFn: AccountActions.saveSelectedCompany,
  removeSelectedCompanyFn: AccountActions.removeSelectedCompany,
  transitionToSelectCompanyPageFn: AirBookingActions.transitionToSelectCompanyPage
};

const enhancers = _.flowRight(withRouter, withConnectedReactRouter, connect(mapStateToProps, mapDispatchToProps));

export default enhancers(CorporateBookingSelection);
