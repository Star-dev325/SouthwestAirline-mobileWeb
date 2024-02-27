// @flow
import React from 'react';

type Props = {
  itemDescription: string,
  itemDetail: string,
  ctaText: string,
  ctaLink: string
};

const ContactUsItem = ({ itemDescription, itemDetail, ctaText, ctaLink }: Props) => (
  <li className="contact-us-item">
    <div className="contact-us-item-info">
      <div className="contact-us-item-info--description">{itemDescription}</div>
      <strong className="contact-us-item-info--number">{itemDetail}</strong>
    </div>
    <div className="contact-us--call-to-action">
      <a href={ctaLink}>{ctaText}</a>
    </div>
  </li>
);

export default ContactUsItem;
