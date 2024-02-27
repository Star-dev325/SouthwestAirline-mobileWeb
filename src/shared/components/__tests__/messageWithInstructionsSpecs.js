import React from 'react';
import { mount } from 'enzyme';
import MessageWithInstructions from 'src/shared/components/messageWithInstructions';

describe('messageWithInstructions', () => {
  it('should render with title and instruction', () => {
    const messageWithInstructions = createComponent({
      title: 'Monopoly',
      mainInstruction: 'Go straight to jail.',
      subInstruction: 'Do not pass Go.'
    });

    expect(messageWithInstructions).to.contain.text('Monopoly');
    expect(messageWithInstructions).to.contain.text('Go straight to jail.');
    expect(messageWithInstructions).to.contain.text('Do not pass Go.');
    expect(messageWithInstructions.find('Message')).to.have.prop('status', 'success');
  });

  it('should render with message with correct status', () => {
    const messageWithInstructions = createComponent({
      title: 'Monopoly',
      mainInstruction: 'Go straight to jail.',
      subInstruction: 'Do not pass Go.',
      status: 'error'
    });

    expect(messageWithInstructions.find('Message')).to.have.prop('status', 'error');
  });

  const createComponent = (props = {}) => mount(<MessageWithInstructions {...props} />);
});
