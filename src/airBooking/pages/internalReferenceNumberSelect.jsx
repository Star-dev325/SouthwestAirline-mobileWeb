// @flow
import i18n from '@swa-ui/locale';
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { updateSelectedIrn } from 'src/airBooking/actions/airBookingActions';
import { raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';
import type { ListItemType } from 'src/shared/components/searchableList';
import SearchableList from 'src/shared/components/searchableList';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import withHideGlobalHeader from 'src/shared/enhancers/withHideGlobalHeader';
import type { IrnInfoType, IrnType, Push } from 'src/shared/flow-typed/shared.types';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';

type Props = {
  irnInfo: IrnInfoType,
  updateSelectedIrnFn: (string, ?boolean) => void,
  goBack: () => void,
  push: Push
};

export class InternalReferenceNumberSelect extends React.Component<Props> {
  componentDidMount = () => {
    raiseSatelliteEvent('select irn');
  };

  _getIsoIrns = (irns: ?Array<IrnType>, isTravelerIrn: boolean) =>
    _.map(irns, (irn) => {
      const label = irn.description ? `${irn.name} - ${irn.description}` : irn.name;

      return { label, code: isTravelerIrn ? 'travelerIrn' : '', value: irn.name };
    });

  _getAllIrns = () => {
    const {
      irnInfo: { travelerInternalReferenceNumbers, companyInternalReferenceNumbers }
    } = this.props;

    // $FlowFixMe - .concat() Return Type Error - Need Babel Update
    return this._getIsoIrns(travelerInternalReferenceNumbers, true).concat(
      this._getIsoIrns(companyInternalReferenceNumbers, false)
    );
  };

  _groupSectionHeader = (item: ListItemType) =>
    (item && item.code === 'travelerIrn'
      ? i18n('AIR_BOOKING__CORPORATE_BOOKING__TRAVELER_IRN')
      : i18n('AIR_BOOKING__CORPORATE_BOOKING__COMPANY_IRN'));

  _getAlternateNavItemLinkProps = () => {
    const { push } = this.props;

    return {
      onClick: () => {
        push(getNormalizedRoute({ routeName: 'addManualIrn' }));
      },
      className: 'internal-reference-number-select--add-irn'
    };
  };

  _handleIrnSelection = (selectedIrn: ListItemType) => {
    const { goBack, updateSelectedIrnFn } = this.props;

    updateSelectedIrnFn(selectedIrn.value || '');
    goBack();
  };

  render() {
    const {
      irnInfo: { alternateIrnAllowed },
      goBack
    } = this.props;

    return (
      <div className="internal-reference-number-select">
        <SearchableList
          title={i18n('AIR_BOOKING__CORPORATE_BOOKING__IRN')}
          itemList={this._getAllIrns()}
          onItemSelect={this._handleIrnSelection}
          onCancel={goBack}
          codeFieldName={'irnName'}
          groupHeadersByFn={this._groupSectionHeader}
          groupsSortBy="[1]"
          alternateNavItemLinkProps={this._getAlternateNavItemLinkProps()}
          alternateNavItemTitle={i18n('AIR_BOOKING__CORPORATE_BOOKING__ADD_IRN')}
          alternateItemAllowed={alternateIrnAllowed}
          hideAlphabetSelector
          showSearchBar
          showSectionHeaders
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  irnInfo: _.get(state, 'app.airBooking.irnInfo')
});

const mapDispatchToProps = {
  updateSelectedIrnFn: updateSelectedIrn
};

export default _.flowRight(
  withConnectedReactRouter,
  withHideGlobalHeader,
  withBodyClass('internal-reference-number-select-page'),
  connect(mapStateToProps, mapDispatchToProps)
)(InternalReferenceNumberSelect);
