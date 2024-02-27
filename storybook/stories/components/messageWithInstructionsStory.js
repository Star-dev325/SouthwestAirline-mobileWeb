import { storiesOf } from '@storybook/react';
import React from 'react';
import MessageWithInstructions from 'src/shared/components/messageWithInstructions';

storiesOf('components/messageWithInstructions', module).add('default', () => {
  return (
    <div>
      <MessageWithInstructions
        status="success"
        title="Your trip is booked!"
        mainInstruction="Check in up to 24 hours in advance."
        subInstruction="The earlier you check in, the better your seat selection."
      >
        Some passengers are not checked in.
      </MessageWithInstructions>
    </div>
  );
});
