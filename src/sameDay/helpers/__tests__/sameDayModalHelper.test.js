import { render } from '@testing-library/react';
import { getShowStandbyDialogOptions } from 'src/sameDay/helpers/sameDayModalHelper';
import SameDayShoppingPageResponseBuilder from 'test/builders/apiResponse/sameDayBuilder';

describe('getShowStandbyDialogOptions', () => {
  const sameDayShoppingPage = new SameDayShoppingPageResponseBuilder().build();
  const onButtonClick = jest.fn();
  const standbyListFaqsModalDetails = sameDayShoppingPage.sameDayShoppingInformation.standbyListFAQs.modalDetails;

  it('should render popup with correct details', () => {
    const standbyDialogOptions = getShowStandbyDialogOptions(standbyListFaqsModalDetails, onButtonClick);

    expect(standbyDialogOptions).toMatchSnapshot();
  });

  it('should render popup with contentView details when infoList is present', () => {
    const standbyDialogOptions = getShowStandbyDialogOptions(standbyListFaqsModalDetails, onButtonClick);
    const { container } = render(standbyDialogOptions.contentView);
    const contentViewIcons = container.getElementsByClassName('standby-faq-modal--modal-content-view_modal-info-icon');
    const contentViewTexts = container.getElementsByClassName('standby-faq-modal--modal-content-view_modal-info-text');

    expect(contentViewIcons).toHaveLength(6);
    expect(contentViewTexts).toHaveLength(6);
  });

  it('should render popup without contentView when infoList is undefined', () => {
    const standbyListFaqsModalDetailsMock = {
      ...standbyListFaqsModalDetails,
      infoList: undefined
    };
    const standbyDialogOptions = getShowStandbyDialogOptions(standbyListFaqsModalDetailsMock, onButtonClick);
    const { container } = render(standbyDialogOptions.contentView);
    const contentViewIcons = container.getElementsByClassName('standby-faq-modal--modal-content-view_modal-info-icon');
    const contentViewText = container.getElementsByClassName('standby-faq-modal--modal-content-view_modal-info-text');

    expect(contentViewIcons).toHaveLength(0);
    expect(contentViewText).toHaveLength(0);
  });

  it('should render popup without links in verticalLinks when buttons is undefined', () => {
    const standbyListFaqsModalDetailsMock = {
      ...standbyListFaqsModalDetails,
      buttons: undefined
    };
    const standbyDialogOptions = getShowStandbyDialogOptions(standbyListFaqsModalDetailsMock, onButtonClick);
    
    expect(standbyDialogOptions.verticalLinks.links).toBeUndefined();
    expect(standbyDialogOptions.verticalLinks.hideCloseButton).toBe(true);
  });
});