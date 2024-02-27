import React from 'react';
import { storiesOf } from '@storybook/react';
import ToastDialog from 'src/shared/components/toastDialog';
import Button from 'src/shared/components/button';

const props = {
  message: 'Something went wrong, call 1-800-555-1212 immediately'
};

storiesOf('components/toastDialog', module)
  .add('default', () => {
    return (
      <div id={'wrapper'} style={{ backgroundColor: '#0076a5', height: '700px' }} className="flex flex-cross-center">
        <Button onClick={() => {}} color="yellow" size="larger" fluid>
          Continue
        </Button>
        <ToastDialog {...props} isVisible />
      </div>
    );
  })
  .add('not visible', () => {
    return <ToastDialog {...props} isVisible={false} />;
  });
