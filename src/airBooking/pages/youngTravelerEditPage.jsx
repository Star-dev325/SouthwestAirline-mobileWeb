// @flow
import React from 'react';
import { connect } from 'react-redux';
import ParentOrGuardianForm from 'src/airBooking/components/parentOrGuardianForm';
import { AIR_BOOKING_PARENT_OR_GUARDIAN_FORM } from 'src/shared/constants/formIds';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import { flowRight } from 'src/shared/helpers/jsUtils';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';

import type { YoungTravelerPageInfoType } from 'src/airBooking/flow-typed/airBooking.types';

type Props = {
  history: {
    push: (string) => void
  },
  youngTravelerPageInfo: YoungTravelerPageInfoType
};

export const YoungTravelerEditPage = ({
  history,
  youngTravelerPageInfo: { body, disclaimerText, linkText }
}: Props) => {
  const onClickYoungTravelerParentConsent = (e) => {
    e.preventDefault();
    history.push(getNormalizedRoute({ routeName: 'youngTravelerParentConsent' }));
  };
  const _onSubmit = () => history.push(getNormalizedRoute({ routeName: 'purchase' }));

  return (
    <>
      <ParentOrGuardianForm
        disclaimerText={disclaimerText}
        formId={AIR_BOOKING_PARENT_OR_GUARDIAN_FORM}
        infoText={body}
        isEditMode
        linkText={linkText}
        onClickYoungTravelerParentConsent={onClickYoungTravelerParentConsent}
        onSubmit={_onSubmit}
      />
    </>);
};

const mapStateToProps = (state) => ({
  youngTravelerPageInfo: state?.app?.airBooking?.passengerValidationDetails?.youngTraveler?.youngTravelerPageInfo
});

const enhancers = flowRight(withConnectedReactRouter, connect(mapStateToProps, {}));

export default enhancers(YoungTravelerEditPage);
