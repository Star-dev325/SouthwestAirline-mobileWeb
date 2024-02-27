import React from 'react';
import Icon from 'src/shared/components/icon';

export const getShowStandbyDialogOptions = (standbyListFaqsModalDetails, onButtonClick) => {
  const { buttons, infoList, title } = standbyListFaqsModalDetails;

  const contentView = (
    <>
      {infoList?.map(({ icon, text }, index) => (
        <div className="standby-faq-modal--modal-content-view" key={`contentView-${index}`}>
          {icon && <Icon className="standby-faq-modal--modal-content-view_modal-info-icon" type={icon} />}
          {text && (
            <span
              className="standby-faq-modal--modal-content-view_modal-info-text"
              dangerouslySetInnerHTML={{ __html: text }}
            />
          )}
        </div>
      ))}
    </>
  );

  return {
    bodyClassName: 'standby-faq-modal',
    className: 'same-day-shopping-page',
    contentView,
    headClassName: 'head-faq-modal',
    name: 'sameday-standby-list-faqs',
    title,
    titleClassName: 'title-faq-modal',
    verticalLinks: {
      hideCloseButton: true,
      links: buttons?.map((button) => ({
        label: button.buttonText,
        onClick: () => onButtonClick(button),
        style: button.type.toLowerCase()
      }))
    }
  };
};
