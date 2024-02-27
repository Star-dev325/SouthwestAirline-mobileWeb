// @flow
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import i18n from '@swa-ui/locale';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import IncrementDecrementButtons from 'src/shared/components/incrementDecrementButtons/incrementDecrementButtons';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import withHideGlobalHeader from 'src/shared/enhancers/withHideGlobalHeader';
import _ from 'lodash';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import URLS from 'src/shared/bootstrap/urls';
import ContentLink from 'src/shared/components/contentLink';
import * as AirBookingActions from 'src/airBooking/actions/airBookingActions';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import { AIR_BOOKING_SHOPPING_SEARCH_FORM } from 'src/shared/constants/formIds';

import type {
  PassengerCountValue
} from 'src/airBooking/flow-typed/airBooking.types';

const MAX_PASSENGERS_COUNT = 8;

const MIN_PASSENGERS_COUNT = 1;
const MIN_LAP_CHILD_COUNT = 0;

type Props = {
  goBack: () => void,
  updateFormFieldDataValueFn: (string, string, *) => void,
  passengerCountData: PassengerCountValue,
  savePassengerCountFn: ({ adultCount: number, lapChildCount: number, valueUpdated?: boolean }) => void
};

export const SelectPassengersCountPage = ({ goBack, passengerCountData, savePassengerCountFn, updateFormFieldDataValueFn }: Props) => {
  const [passengerCount, setAdultCount] = useState(1);
  const [lapChildCount, setLapChildCount] = useState(0);

  const handleDone = () => {
    updateFormFieldDataValueFn(AIR_BOOKING_SHOPPING_SEARCH_FORM, "numberOfLapInfants", lapChildCount);
    updateFormFieldDataValueFn(AIR_BOOKING_SHOPPING_SEARCH_FORM, "numberOfAdults", passengerCount);
    savePassengerCountFn({ adultCount: passengerCount, lapChildCount: lapChildCount, valueUpdated: true });
    goBack();
  };

  const doneButtons = [
    {
      name: 'Done',
      onClick: handleDone
    }
  ];

  useEffect(() => {
    if (passengerCountData) {
      setAdultCount(passengerCountData?.adultCount);
      setLapChildCount(passengerCountData?.lapChildCount);
    }
  }, []);

  const handleSelectionCountForPassengerAndLapChild = (count: number, isPassenger: boolean) => {
    if (isPassenger) {
      setAdultCount(count);
      lapChildCount > count && setLapChildCount(count);
    } else {
      setLapChildCount(count);
    }
  };

  const { lapChildFAQ } = URLS;

  return (
    <div className="select-passengers-count-page--wrapper">
      <PageHeaderWithButtons title={i18n('SHARED__LAP_CHILD__TITLE_SELECT_PASSENGERS')} showBackButton rightButtons={doneButtons} />
      <div className="select-passengers-count-page--list-item">
        <div className="text-wrapper">
          <div className="select-passengers-count-page--list-item-title">{i18n('SHARED__LAP_CHILD__LIST_ITEM_PASSENGERS_TITLE')}</div>
          <span className="select-passengers-count-page--list-item-desc">{i18n('SHARED__LAP_CHILD__LIST_ITEM_PASSENGERS_DESCRIPTION')}</span>
        </div>
        <IncrementDecrementButtons
          onIncrementDecrement={(count)=>handleSelectionCountForPassengerAndLapChild(count, true)}
          isCircular
          value={passengerCount}
          minValue={MIN_PASSENGERS_COUNT}
          maxValue={MAX_PASSENGERS_COUNT}
        />
      </div>
      <div className="select-passengers-count-page--list-item-divider" />
      <div className="select-passengers-count-page--list-item">
        <div className="text-wrapper">
          <div className="select-passengers-count-page--list-item-title">{i18n('SHARED__LAP_CHILD__LIST_ITEM_LAP_CHILD_TITLE')}</div>
          <span className="select-passengers-count-page--list-item-desc">{i18n('SHARED__LAP_CHILD__LIST_ITEM_LAP_CHILD_DESCRIPTION')}</span>
        </div>
        <IncrementDecrementButtons
          onIncrementDecrement={(count)=>handleSelectionCountForPassengerAndLapChild(count, false)}
          isCircular
          value={lapChildCount}
          minValue={MIN_LAP_CHILD_COUNT}
          maxValue={passengerCount}
        />
      </div>
      {
        lapChildCount > MIN_LAP_CHILD_COUNT && (
          <div className="baby-on-board--details">
            <div className="baby-on-board--icon" />
            <div className="baby-on-board--text-wrapper">
              <h4 className="baby-on-board--title">
                {i18n('SHARED__LAP_CHILD__LIST_ITEM_BABY_ONBOARD_TITLE')}
              </h4>
              <p className="baby-on-board--desc">
                {i18n('SHARED__LAP_CHILD__LIST_ITEM_BABY_ONBOARD_DESCRIPTION')}
              </p>
              <ContentLink className={'baby-on-board--content-link'} href={lapChildFAQ}>
                {i18n('SHARED__LAP_CHILD__LIST_ITEM_BABY_ONBOARD_DESCRIPTION_LINK')}
              </ContentLink>
            </div>
          </div>
        )
      }
    </div>
  );
};

const mapStateToProps = (state) => ({
  passengerCountData: state.app.airBooking.savePassengerCount
});
const mapDispatchToProps = {
  savePassengerCountFn: AirBookingActions.savePassengerCount,
  updateFormFieldDataValueFn: FormDataActions.updateFormFieldDataValue
};
const enhancers = _.flowRight(
  withConnectedReactRouter,
  withHideGlobalHeader,
  connect(mapStateToProps, mapDispatchToProps),
  withBodyClass('select-passengers-count-page')
);

export default enhancers(SelectPassengersCountPage);