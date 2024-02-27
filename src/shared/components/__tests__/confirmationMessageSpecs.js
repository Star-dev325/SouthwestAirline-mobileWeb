import React from 'react';
import { mount } from 'enzyme';

import { possibleIconStates } from 'src/checkIn/constants/possibleIconStates';
import ConfirmationMessage from 'src/shared/components/confirmationMessage';

describe('ConfirmationMessage', () => {
  it('should consume a "Checked In" state', () => {
    const title = {
      key: 'CHECKIN__YOURE_CHECKEDIN',
      body: "You're checked in!",
      icon: possibleIconStates.SUCCESS,
      textColor: 'NORMAL'
    };
    const wrapper = mount(<ConfirmationMessage body={title.body} icon={title.icon} />);

    expect(wrapper.find('.swa-message.success')).to.exist;
    expect(wrapper.find('.swa-message.success .message--text').text()).to.be.equal(title.body);
  });

  it('should consume a "Some Passengers Not Checked In" state', () => {
    const title = {
      key: 'CHECKIN__SOME_PAX_NOT_CHECKEDIN',
      body: 'Some passengers are not checked in.',
      icon: possibleIconStates.WARNING,
      textColor: 'NORMAL'
    };
    const wrapper = mount(<ConfirmationMessage body={title.body} icon={title.icon} />);

    expect(wrapper.find('.swa-message.error')).to.exist;
    expect(wrapper.find('.swa-message.error .message--text').text()).to.be.equal(title.body);
  });

  it('should consume an "On Standby" state', () => {
    const title = {
      key: 'CHECKIN__YOURE_ON_STANDBY',
      body: "You're on standby.",
      icon: possibleIconStates.SUCCESS,
      textColor: 'NORMAL'
    };
    const wrapper = mount(<ConfirmationMessage body={title.body} icon={title.icon} />);

    expect(wrapper.find('.swa-message.success')).to.exist;
    expect(wrapper.find('.swa-message.success .message--text').text()).to.be.equal(title.body);
  });

  it('should consume a "Not Checked In" state', () => {
    const title = {
      key: 'CHECKIN__YOURE_NOT_CHECKEDIN',
      body: "You're not checked in!",
      icon: possibleIconStates.WARNING,
      textColor: 'NORMAL'
    };
    const wrapper = mount(<ConfirmationMessage body={title.body} icon={title.icon} />);

    expect(wrapper.find('.swa-message.error')).to.exist;
    expect(wrapper.find('.swa-message.error .message--text').text()).to.be.equal(title.body);
  });

  it('should consume a "No Passengers Checked In" state', () => {
    const title = {
      key: 'CHECKIN__NO_PAX_CHECKEDIN',
      body: 'No passengers are checked in.',
      icon: possibleIconStates.WARNING,
      textColor: 'NORMAL'
    };
    const wrapper = mount(<ConfirmationMessage body={title.body} icon={title.icon} />);

    expect(wrapper.find('.swa-message.error')).to.exist;
    expect(wrapper.find('.swa-message.error .message--text').text()).to.be.equal(title.body);
  });
});
