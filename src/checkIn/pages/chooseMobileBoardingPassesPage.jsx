// @flow

import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import SubHeader from 'src/shared/components/subHeader';
import ChooseMobileBoardingPassesForm from 'src/checkIn/components/chooseMobileBoardingPassesForm';
import { CHECK_IN_CHOOSE_MOBILE_BOARDING_PASSES } from 'src/shared/constants/formIds';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import ChooseMobileBoardingPassesConstants from 'src/checkIn/constants/chooseMobileBoardingPassesConstants';
import { goDirectlyToBoardingPasses } from 'src/checkIn/actions/checkInActions';
import i18n from '@swa-ui/locale';

import type { ViewBoardingPass, ViewBoardingPassTravelerIdsSegmentIdsType } from 'src/shared/flow-typed/shared.types';
import type { FormData } from 'src/shared/form/flow-typed/form.types';

type Props = {
  flights: Array<*>,
  viewAllBoardingPasses: ViewBoardingPass,
  goDirectlyToBoardingPassesFn: ({
    viewBoardingPassesLink: ?ViewBoardingPass,
    recordLocator: string,
    firstName?: string,
    lastName?: string
  }) => void
};

export class ChooseMobileBoardingPassesPage extends React.Component<Props> {
  _onSubmit = (formData: FormData) => {
    const { viewAllBoardingPasses, goDirectlyToBoardingPassesFn } = this.props;
    const viewBoardingPassesLink = _.cloneDeep(viewAllBoardingPasses);

    _.set(viewBoardingPassesLink.body, 'travelerID', this._getTravelerAndSegmentIds(formData).travelerID);
    _.set(
      viewBoardingPassesLink.body,
      'travelerSegmentIdentifier',
      this._getTravelerAndSegmentIds(formData).travelerSegmentIdentifier
    );

    const recordLocator = _.get(viewAllBoardingPasses, 'href', '').split('/').pop();
    const labelText = _.get(viewBoardingPassesLink, 'labelText');
    const queryParams =
      labelText && labelText.toLowerCase() === 'view all security documents' ? { clk: 'secdoc_boardingdetails' } : null;

    goDirectlyToBoardingPassesFn({ viewBoardingPassesLink, queryParams, recordLocator });
  };

  _getTravelerAndSegmentIds = (formData: FormData): ViewBoardingPassTravelerIdsSegmentIdsType => {
    const fieldNamesArray = _.chain(formData)
      .omit(ChooseMobileBoardingPassesConstants.ALL_PASSES_FIELD_NAME)
      .pickBy()
      .keys()
      .value();

    const travelerIds = [];
    const travelerSegmentIdentifier = [];

    _.forEach(fieldNamesArray, (fieldName) => {
      const parts = fieldName.split('-');

      travelerIds.push(parts[1]);
      travelerSegmentIdentifier.push(parts[2]);
    });

    return {
      travelerID: _.uniq(travelerIds),
      travelerSegmentIdentifier
    };
  };

  render() {
    const { flights } = this.props;

    return (
      <div>
        <SubHeader title={i18n('CHECK_IN__MOBILE_BOARDING_PASS__PAGE_SUB_HEADER_LABEL')} />
        <ChooseMobileBoardingPassesForm
          formId={CHECK_IN_CHOOSE_MOBILE_BOARDING_PASSES}
          onSubmit={this._onSubmit}
          flights={flights}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  flights: _.get(state, 'app.checkIn.checkInConfirmationPage.flights'),
  viewAllBoardingPasses: _.get(state, 'app.checkIn.checkInConfirmationPage._links.viewAllBoardingPasses')
});

const mapDispatchToProps = {
  goDirectlyToBoardingPassesFn: goDirectlyToBoardingPasses
};

const enhancers = _.flowRight(withConnectedReactRouter, connect(mapStateToProps, mapDispatchToProps));

export default enhancers(ChooseMobileBoardingPassesPage);
