import React from 'react';
import FlightsPurchasePageBuilder from 'test/builders/apiResponse/flightsPurchasePageBuilder';

export const getPassengerValidationDetails = () => ({
  passengerValidationDetails: {
    youngTraveler: {
      modalDetails: {
        body: {
          additionalText:
            'To add an accompanying traveler to the reservation please book travel on Southwest.com on a computer.\n\nSee <a href="https://www.southwest.com/help/flying-with-children/young-travelers-terms-and-conditions" target="_blank">Young Traveler rules</a> for more information.',
          informationText:
            'If the Young Traveler(s) will be traveling alone continue to add parent/guardian information.\n\n'
        },
        buttons: [
          {
            buttonText: 'Cancel',
            type: 'neutral-gray1'
          },
          {
            buttonText: 'Continue',
            type: 'primary-yellow'
          }
        ],
        title: 'Young Traveler'
      },
      youngTravelerPageInfo: {
        body: 'You must complete the form entirely including a phone number your parent/guardian contact can be reached in case of emergency. Once you have completed this purchase, any changes to the parent/guardian information must be completed at the airport.',
        disclaimerText:
          'I confirm the accuracy of this contact information and the person is someone other than their purchaser. Southwest Airlines&reg may contact them.\n\nI acknowledge and confirm the',
        linkText: 'Young Traveler parent consent'
      }
    }
  }
});

export const getParentOrGuardianFormData = () => ({
  addressLine1: '83 Main St',
  addressLine2: '',
  city: 'Brooklyn',
  firstName: 'John',
  isoCountryCode: 'US',
  lastName: 'Doe',
  phoneCountryCode: 'US',
  phoneNumber: '123-456-7890',
  relationship: 'father',
  stateProvinceRegion: 'NY',
  zipOrPostalCode: '87516'
});

export const reviewParentOrGuardianDetails = () => {
  const response = new FlightsPurchasePageBuilder().withYoungTravelerParentGuardianPnr().build();
  const {
    body,
    parentGuardianName,
    parentGuardianRelationship,
    parentGuardianPhone,
    parentGuardianAddressLine1,
    parentGuardianAddressLine2,
    parentLocation,
    parentGuardianCountry
  } = response.flightConfirmationPage.pnrs[0].parentGuardianDetails.modalDetails;

  return {
    modalDetails: {
      buttonText: 'Got it',
      infoList: [],
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
      title: 'Parent/guardian'
    }
  };
};
