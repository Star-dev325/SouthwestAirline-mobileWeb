// @flow
import React from 'react';

type Props = {
  body?: string,
  linkText?: string,
  onClick: () => void
};
class EditContactMethodMessage extends React.Component<Props> {
  render() {
    const { body, linkText, onClick } = this.props;

    return (
      <div className="large white contact-info-messages">
        <p data-qa="body-text" className="mt2">
          {body}
        </p>
        <p className="contact-info-messages--link">
          <a data-qa="link-text" onClick={onClick}>
            {linkText}
          </a>
        </p>
      </div>
    );
  }
}

export default EditContactMethodMessage;
