// @flow
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import withHideGlobalHeader from 'src/shared/enhancers/withHideGlobalHeader';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import * as CarBookingActions from 'src/carBooking/actions/carBookingActions';
import i18n from '@swa-ui/locale';

type Props = {
  query: {
    productId: string
  },
  termsAndConditions: Array<string>,
  retrieveVendorTermsAndConditionsFn: (string) => void
};

export class VendorTermsAndConditionsPage extends React.Component<Props> {
  componentDidMount() {
    const {
      query: { productId },
      retrieveVendorTermsAndConditionsFn
    } = this.props;

    retrieveVendorTermsAndConditionsFn(productId);
  }

  render() {
    const { termsAndConditions } = this.props;

    return (
      <div>
        <PageHeaderWithButtons titleInCenter title={i18n('CAR_BOOKING__VENDORS_TERMS_AND_CONDITIONS__HEADER')} />
        <div>
          {_.map(termsAndConditions, (condition, index: number) => (
            <div key={index} className="terms-and-conditions p4 larger gray5">
              {condition}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  termsAndConditions: _.get(state, 'app.carBooking.carVendorTermsAndConditions.termsAndConditions', [])
});

const mapDispatchToProps = {
  retrieveVendorTermsAndConditionsFn: CarBookingActions.retrieveVendorTermsAndConditions
};

const enhancers = _.flowRight(
  withConnectedReactRouter,
  withHideGlobalHeader,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(VendorTermsAndConditionsPage);
