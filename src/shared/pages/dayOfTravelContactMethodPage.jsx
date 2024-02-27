// @flow
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import { CONTACT_METHODS } from 'src/shared/constants/contactMethodOptions';
import { DAY_OF_TRAVEL_CONTACT_METHOD_FORM } from 'src/shared/constants/formIds';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import withHideGlobalHeader from 'src/shared/enhancers/withHideGlobalHeader';
import { _addHyphenForUSPhoneNumber } from 'src/shared/helpers/contactMethodPageHelper';
import ContactMethodPage from 'src/shared/pages/contactMethodPage';
import * as ViewReservationActions from 'src/viewReservation/actions/viewReservationActions';

import type { ContactMethodInfo } from 'src/shared/flow-typed/shared.types';
import type {
  ReservationContactInformation,
  UpdateContactInfoType
} from 'src/viewReservation/flow-typed/viewReservation.types';

type Props = {
  customBackNavigation: () => void,
  dayOfTravelContactInfo: ?ReservationContactInformation,
  query: {
    searchToken?: string
  },
  goBack: () => void,
  location: HistoryLocationWithState<*>,
  retrieveDayOfTravelContactInformationFn: (*) => void,
  updateDayOfTravelContactInfoAndNavigateFn: (*, searchToken: string) => void,
  updateDayOfTravelContactInformationFn: (*) => void
};

export class DayOfTravelContactMethodPage extends React.Component<Props> {
  componentDidMount() {
    const { location, retrieveDayOfTravelContactInformationFn } = this.props;

    location.state && retrieveDayOfTravelContactInformationFn(location.state);
  }

  _updateContactMethodFn(data?: ?ContactMethodInfo) {
    const { dayOfTravelContactInfo, query: { searchToken } = {}, updateDayOfTravelContactInfoAndNavigateFn, updateDayOfTravelContactInformationFn } = this.props;
    const contactInformationLinks = _.get(dayOfTravelContactInfo, '_links.contactInformation');
    const request = { ...contactInformationLinks };
    const requestBody: UpdateContactInfoType = {
      contactInformation: {
        passengerSearchToken: _.get(request, 'body.passengerSearchToken'),
        contactInfoToken: _.get(request, 'body.contactInfoToken'),
        contactEmail: null,
        contactPhone: null,
        contactTextMessagePhone: null,
        internationalDeclineNotifications: _.get(data, 'declineNotifications')
      }
    };

    if (data && data.contactMethod === CONTACT_METHODS.EMAIL) {
      requestBody.contactInformation.contactEmail = {
        email: _.get(data, 'email')
      };

      if (data.preferredLanguage) {
        requestBody.contactInformation.contactEmail = {
          ...requestBody.contactInformation.contactEmail,
          preferredLanguage: _.get(data, 'preferredLanguage')
        };
      }
    } else if (data && data.contactMethod === CONTACT_METHODS.CALL) {
      requestBody.contactInformation.contactPhone = {
        countryCode: _.get(data, 'phoneCountryCode'),
        number: _.get(data, 'phoneNumber').replace(/-/g, '')
      };

      if (data.preferredLanguage) {
        requestBody.contactInformation.contactPhone = {
          ...requestBody.contactInformation.contactPhone,
          preferredLanguage: data.preferredLanguage
        };
      }
    } else if (data && data.contactMethod === CONTACT_METHODS.TEXT) {
      requestBody.contactInformation.contactTextMessagePhone = {
        countryCode: _.get(data, 'phoneCountryCode'),
        number: _.get(data, 'phoneNumber').replace(/-/g, '')
      };

      if (data.preferredLanguage) {
        requestBody.contactInformation.contactTextMessagePhone = {
          ...requestBody.contactInformation.contactTextMessagePhone,
          preferredLanguage: data.preferredLanguage
        };
      }
    }

    request.body = requestBody;

    searchToken? updateDayOfTravelContactInfoAndNavigateFn(request, searchToken): updateDayOfTravelContactInformationFn(request);
  }

  render() {
    const { customBackNavigation, dayOfTravelContactInfo, goBack } = this.props;
    let isInternationalBooking = false;
    let contactMethodInfo = {};

    if (dayOfTravelContactInfo) {
      const {
        primaryContactMethod,
        contactPhone,
        contactTextMessagePhone,
        contactEmail,
        isInternational,
        internationalDeclineNotifications
      } = dayOfTravelContactInfo;

      isInternationalBooking = isInternational;
      const primaryContactIsCall = primaryContactMethod === 'CALL';
      const phoneNumber = primaryContactIsCall
        ? _.get(contactPhone, 'number')
        : _.get(contactTextMessagePhone, 'number', '');
      const phoneCountryCode = primaryContactIsCall
        ? _.get(contactPhone, 'countryCode')
        : _.get(contactTextMessagePhone, 'countryCode', '1');
      const preferredLanguage = primaryContactIsCall
        ? _.get(contactPhone, 'preferredLanguage')
        : _.get(contactTextMessagePhone, 'preferredLanguage', 'EN');

      contactMethodInfo = {
        email: _.get(contactEmail, 'email'),
        contactMethod: primaryContactMethod,
        phoneCountryCode,
        phoneNumber: _addHyphenForUSPhoneNumber(phoneCountryCode, phoneNumber),
        preferredLanguage,
        declineNotifications: internationalDeclineNotifications,
        saveContactMethod: false
      };
    }

    return (
      <div>
        {dayOfTravelContactInfo && (
          <ContactMethodPage
            formId={DAY_OF_TRAVEL_CONTACT_METHOD_FORM}
            updateContactMethodFn={this._updateContactMethodFn.bind(this)}
            goBack={customBackNavigation? customBackNavigation: goBack}
            contactMethodInfo={contactMethodInfo}
            isInternationalBooking={isInternationalBooking}
            message={_.get(dayOfTravelContactInfo, 'messages[0].body')}
            asyncGoBack
          />
        )}
      </div>
    );
  }
}

const mapDispatchToProps = {
  retrieveDayOfTravelContactInformationFn: ViewReservationActions.retrieveDayOfTravelContactInformation,
  updateDayOfTravelContactInformationFn: ViewReservationActions.updateDayOfTravelContactInformation
};

const mapStateToProps = (state) => ({
  dayOfTravelContactInfo: _.get(state, 'app.viewReservation.dayOfTravelContactInfo.reservationContactInformation')
});

const enhancers = _.flowRight(
  withConnectedReactRouter,
  withHideGlobalHeader,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(DayOfTravelContactMethodPage);
