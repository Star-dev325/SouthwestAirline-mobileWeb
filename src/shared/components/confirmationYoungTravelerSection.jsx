// @flow
import React from 'react';
import IconAndBriefInfo from 'src/shared/components/iconAndBriefInfo';

import type { ParentGuardianDetailsType, YoungTravelersDetailsType } from 'src/shared/flow-typed/shared.types';

type Props = {
  hideDialogFn: (*) => Promise<*>,
  parentGuardianDetails: ParentGuardianDetailsType,
  showDialogFn: (*) => Promise<*>,
  youngTravelersDetails: YoungTravelersDetailsType
};

const ConfirmationYoungTravelerSection = (props: Props) => {
  const { hideDialogFn, parentGuardianDetails, showDialogFn, youngTravelersDetails } = props;

  const _onParentOrGuardianDetailsClick = () => {
    const {
      body,
      buttonText,
      parentGuardianAddressLine1,
      parentGuardianAddressLine2,
      parentGuardianCountry,
      parentGuardianName,
      parentGuardianPhone,
      parentGuardianRelationship,
      parentLocation,
      title
    } = parentGuardianDetails.modalDetails;

    showDialogFn({
      buttons: [
        {
          label: buttonText,
          onClick: () => hideDialogFn()
        }
      ],
      contentView: (
        <div className="confirmation-parent-guardian-dialog">
          <ul className="confirmation-parent-guardian-dialog--body">
            <li className="confirmation-parent-guardian-dialog--name">{parentGuardianName}</li>
            <li>{parentGuardianRelationship}</li>
            <li>{parentGuardianPhone}</li>
            <li>{parentGuardianAddressLine1}</li>
            <li>{parentGuardianAddressLine2}</li>
            <li>{parentLocation}</li>
            <li>{parentGuardianCountry}</li>
          </ul>
          <div className="confirmation-parent-guardian-dialog--disclaimer" dangerouslySetInnerHTML={{ __html: body }} />
        </div>
      ),
      name: 'confirmation-parent-guardian-dialog',
      title,
      titleClassName: 'confirmation-parent-guardian-dialog--title'
    });
  };

  return (
    <div className="confirmation-young-traveler-section">
      <IconAndBriefInfo
        linkIcon={youngTravelersDetails.linkIcon}
        linkSuffixClickableText={youngTravelersDetails.linkSuffixClickableText}
        linkTitle={youngTravelersDetails.linkTitle}
        linkUrl={youngTravelersDetails.linkUrl}
      />
      <IconAndBriefInfo
        linkIcon={parentGuardianDetails.linkIcon}
        linkSuffixClickableText={parentGuardianDetails.linkSuffixClickableText}
        linkTitle={parentGuardianDetails.linkTitle}
        onIconAndBriefInfoClick={_onParentOrGuardianDetailsClick}
      />
    </div>
  );
};

export default ConfirmationYoungTravelerSection;
