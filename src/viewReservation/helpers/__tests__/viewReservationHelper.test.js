import { getShowDialogOptions, modalInfoCallbackFunction } from 'src/viewReservation/helpers/viewReservationHelper';
import { getModifyBaggageDetailsMockData } from 'test/builders/model/reservationDetailBuilder';
import { reviewParentOrGuardianDetails } from 'test/builders/model/youngTravelerPageBuilder';

describe('viewReservationHelper', () => {
  describe('getShowDialogOptions', () => {
    it('should return correct showDialog options', () => {
      const {
        modalDetails: { buttonText, infoList, title }
      } = getModifyBaggageDetailsMockData();
      const onClick = () => {};
      const expectedShowDialogOptions = {
        buttons: [{ label: buttonText, onClick }],
        className: 'align-left',
        contentView: infoList.map(modalInfoCallbackFunction),
        hasStickyFooterButton: true,
        name: 'baggage-details',
        title
      };

      expect(getShowDialogOptions(getModifyBaggageDetailsMockData(), onClick)).toEqual(expectedShowDialogOptions);
    });

    it('should return correct showDialog options with contentView if it exists', () => {
      const {
        modalDetails: { contentView, buttonText, title }
      } = reviewParentOrGuardianDetails();
      const onClick = () => {};
      const expectedShowDialogOptions = {
        buttons: [{ label: buttonText, onClick }],
        className: 'align-left',
        contentView,
        hasStickyFooterButton: true,
        name: 'baggage-details',
        title
      };

      expect(getShowDialogOptions(reviewParentOrGuardianDetails(), onClick)).toEqual(expectedShowDialogOptions);
    });
  });
});
