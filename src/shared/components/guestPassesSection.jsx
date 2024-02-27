// @flow
import React from 'react';

type Props = {
  item: string,
  itemSubText: ?string,
  isConfirmationGuessPassesPage?: boolean
};

const renderRefundPreview = (props) => {
  const { item, itemSubText } = props;

  return (
    <div className="guest-passes-review">
      <p className="guest-passes-review--item">{item}</p>
      {itemSubText && (
        <div className="guest-passes-review--sub-item">
          <p className="guest-passes-review--sub-item_text">{itemSubText}</p>
        </div>
      )}
    </div>
  );
};

const renderRefundConfirmation = (props) => {
  const { item, itemSubText } = props;

  return (
    <div className="guest-passes-confirmation">
      <p className="guest-passes-confirmation--item">{item}</p>
      {itemSubText && (<p className="guest-passes-confirmation--sub-item_text">{itemSubText}</p>)}
    </div>
  );
};

const GuestPassesSection = ({ item, itemSubText, isConfirmationGuessPassesPage }: Props) =>
  (!isConfirmationGuessPassesPage
    ? renderRefundPreview({ item, itemSubText })
    : renderRefundConfirmation({ item, itemSubText }));

export default GuestPassesSection;
