// @flow
import i18n from '@swa-ui/locale';
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as sameDayActions from 'src/sameDay/actions/sameDayActions';
import FareProductList from 'src/shared/components/fareProductList';
import FlightHeader from 'src/shared/components/flightHeader';
import Footnotes from 'src/shared/components/footnotes';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import { fetchFareDetailsJson } from 'src/wcm/actions/wcmActions';

import type { FareProductionSelection, FlightDetails } from 'src/airChange/flow-typed/airChange.types';
import type { SameDayShoppingInformation } from 'src/sameDay/flow-typed/sameDay.types';
import type { FareProduct, ProductDefinitions } from 'src/shared/flow-typed/shared.types';

type Props = FlightDetails & {
  disclaimerWithLinks: string,
  fareDetailsLink: { href: HttpMethod, labelText: string },
  fareSelectedFn: (FareProductionSelection: FareProductionSelection) => void,
  fetchFareDetailsJsonFn: (href: string, route: string) => void,
  goBack: () => void,
  productDefinitions: ProductDefinitions,
  retrieveSameDayPricingDetailsInformationFn: *,
  sameDayShoppingInformation: SameDayShoppingInformation
};

export const SameDaySelectFarePage = ({
  card: { arrivalTime, departureTime, fares, flightNumbers, isNextDayArrival, isOvernight, stopDescriptionOnSelect },
  disclaimerWithLinks,
  fareDetailsLink,
  fetchFareDetailsJsonFn,
  goBack,
  productDefinitions,
  retrieveSameDayPricingDetailsInformationFn,
  sameDayShoppingInformation
}: Props) => {
  const { disclaimers } = productDefinitions;
  const { href: fareDetailsHREF, labelText: fareDetailsLabel } = fareDetailsLink ?? {};

  const _onClickCancel = () => {
    goBack();
  };

  const _transitionToFareDetails = () => {
    fetchFareDetailsJsonFn(fareDetailsHREF, '/same-day/shopping/fare-details');
  };

  const _handleFareSelected = (productCard: FareProduct) => {
    const {
      _links: { sameDayPricing = {} }
    } = sameDayShoppingInformation;
    const {
      _meta: { productId = '' }
    } = productCard;

    retrieveSameDayPricingDetailsInformationFn({
      ...sameDayPricing,
      ...{ body: { ...sameDayPricing.body, productId: productId } }
    });
  };

  const renderFooter = () => (
    <div className="py5 bdt large">
      <a data-qa="fare-details-link" className="block pblue" onClick={_transitionToFareDetails}>
        {fareDetailsLabel}
      </a>
    </div>
  );

  return (
    <div className="flight-select-fare--container">
      <PageHeaderWithButtons
        rightButtons={[{ name: i18n('SHARED__BUTTON_TEXT__CANCEL'), className: 'cancel', onClick: _onClickCancel }]}
        title={i18n('SAME_DAY__SELECT_FARE__TITLE')}
      />
      <FlightHeader
        arrivalTime={arrivalTime}
        departureTime={departureTime}
        flightNumbers={flightNumbers}
        isNextDay={isNextDayArrival}
        isOvernight={isOvernight}
        stopDescription={stopDescriptionOnSelect}
      />
      <div className="flight-select-fare--container-header">
        {disclaimerWithLinks && (
          <div className="flight-select-fare--container-header-disclaimer" data-qa="disclaimerWithLinks">
            <p dangerouslySetInnerHTML={{ __html: disclaimerWithLinks }} />
          </div>
        )}
        <FareProductList
          fares={fares}
          isPromoCodeApplied={false}
          onFareSelected={_handleFareSelected}
          productDefinitions={productDefinitions}
          showPriceDifference
        />
        {renderFooter()}
      </div>
      <div className="flight-select-fare--container-footer">
        <Footnotes footnotes={disclaimers} />
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  card: _.get(state, 'app.sameDay.sameDaySelectFarePage'),
  disclaimerWithLinks: _.get(state, 'app.sameDay.sameDayShoppingPage.sameDayShoppingInformation.expandedDetails.disclaimerWithLinks'),
  fareDetailsLink: _.get(state, 'app.sameDay.sameDayShoppingPage.sameDayShoppingInformation._links.fareDetailsJson'),
  productDefinitions: _.get(state, 'app.sameDay.sameDayShoppingPage.sameDayShoppingInformation.productDefinitions'),
  sameDayShoppingInformation: _.get(state, 'app.sameDay.sameDayShoppingPage.sameDayShoppingInformation', {})
});

const mapDispatchToProps = {
  fetchFareDetailsJsonFn: fetchFareDetailsJson,
  retrieveSameDayPricingDetailsInformationFn: sameDayActions.retrieveSameDayPricingDetailsInformation
};

const enhancers = _.flowRight(withRouter, withConnectedReactRouter, connect(mapStateToProps, mapDispatchToProps));

export default enhancers(SameDaySelectFarePage);
