// @flow
import _ from 'lodash';
import * as AccountActions from 'src/shared/actions/accountActions';
import { connect } from 'react-redux';
import type { Company } from 'src/airBooking/flow-typed/airBooking.types';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import React from 'react';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import i18n from '@swa-ui/locale';

type Props = {
  activeCompanyIdAssociations: Array<Company>,
  goBack: () => void,
  saveSelectedCompanyFn: (Company) => Promise<*>
};

export class SelectCompanyPage extends React.Component<Props> {
  _handleItemClick = (event: SyntheticInputEvent<*>) => {
    const { activeCompanyIdAssociations, goBack, saveSelectedCompanyFn } = this.props;
    const selectedCompany = _.find(activeCompanyIdAssociations, { companyId: event.target.id });

    selectedCompany && saveSelectedCompanyFn(selectedCompany).then((options) => !options?.stopNextAction && goBack());
  };

  _handleCancel = () => {
    this.props.goBack();
  };

  _renderCompanyCard = (company: Company, index: number) => {
    const { companyName, companyId } = company;

    return (
      <label
        key={index}
        className="select-company-page--company-selection-card"
        id={companyId}
        onClick={this._handleItemClick}
      >
        <div className="select-company-page--company-selection-text">
          <div className="select-company-page--company-name">{companyName}</div>
          <div className="select-company-page--company-id">{companyId}</div>
        </div>
      </label>
    );
  };

  render() {
    const { activeCompanyIdAssociations: companies } = this.props;
    const leftButton = {
      name: i18n('AIR_BOOKING__CORPORATE_BOOKING__CANCEL'),
      onClick: this._handleCancel
    };

    return (
      <div className="select-company-page">
        <PageHeaderWithButtons
          title={i18n('AIR_BOOKING__CORPORATE_BOOKING__SELECT_COMPANY_TITLE')}
          leftButtons={[leftButton]}
        />
        <div className="select-company-page--list">{companies.map(this._renderCompanyCard)}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  activeCompanyIdAssociations: _.get(state, 'app.account.corporateInfo.activeCompanyIdAssociations', [])
});

const mapDispatchToProps = {
  saveSelectedCompanyFn: AccountActions.saveSelectedCompany
};

const enhancers = _.flowRight(
  withConnectedReactRouter,
  withBodyClass('hide-header'),
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(SelectCompanyPage);
