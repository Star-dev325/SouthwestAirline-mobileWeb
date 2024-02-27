import { storiesOf } from '@storybook/react';
import React from 'react';
import Dialog from 'src/shared/components/dialog';
import { getShowDialogOptions } from 'src/viewReservation/helpers/viewReservationHelper';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { getModifyBaggageDetailsMockData } from 'test/builders/model/reservationDetailBuilder';
import { reviewParentOrGuardianDetails } from 'test/builders/model/youngTravelerPageBuilder';
import createMockStore from 'test/unit/helpers/createMockStore';

const onClick = () => {};
const defaultValues = {
  active: true,
  name: 'test-dialog',
  title: 'Dialog Title',
  message: 'This is a dialog message.'
};
const errorCode = '123456789';
const errorRequestId = '987654321';
const buttonOne = {
  label: 'Button One',
  onClick
};
const buttonTwo = {
  label: 'Button Two',
  onClick
};
const buttonOk = {
  label: 'OK',
  onClick
};

const mockStore = createMockStore();
const defaultStore = mockStore({
  app: {
    dialog: {
      ...defaultValues,
      contentView: null,
      buttons: [buttonOk]
    }
  }
});
const globalErrorStore = mockStore({
  app: {
    dialog: {
      ...defaultValues,
      buttons: [buttonOk],
      contentView: (
        <div>
          <p>Error {errorCode}</p>
          <p>({errorRequestId})</p>
        </div>
      )
    }
  }
});
const verticalLinksStore = mockStore({
  app: {
    dialog: {
      ...defaultValues,
      closeLabel: 'Cancel',
      verticalLinks: {
        links: [
          {
            label: 'Label One',
            onClick
          },
          {
            label: 'Label Two',
            onClick
          },
          {
            label: 'Label Three',
            onClick
          }
        ]
      }
    }
  }
});
const buttonPopupStore = mockStore({
  app: {
    dialog: {
      ...defaultValues,
      buttons: [buttonOne, buttonTwo],
      closeLabel: 'Cancel'
    }
  }
});
const baggageDetailsPopupStore = (additionalItems = [], onClick) =>
  mockStore({
    app: {
      dialog: {
        active: true,
        ...getShowDialogOptions(getModifyBaggageDetailsMockData(additionalItems), onClick)
      }
    }
  });

  const parentOrGuardianDetailsPopupStore = (onClick) =>
  mockStore({
    app: {
      dialog: {
        active: true,
        ...getShowDialogOptions(reviewParentOrGuardianDetails(), onClick)
      }
    }
  });

const additionalBaggageDetailsItems = [
  {
    icon: 'number-circle-four',
    text: 'Make sure you get to the airport on time and not miss your flight.'
  },
  {
    icon: 'number-circle-five',
    text: 'Always be on time to help ground staff.'
  }
];

storiesOf('components/dialog', module)
  .addDecorator(StoryReduxProvider(defaultStore))
  .add('default', () => {
    return <Dialog />;
  });
storiesOf('components/dialog', module)
  .addDecorator(StoryReduxProvider(globalErrorStore))
  .add('global error', () => {
    return <Dialog />;
  });
storiesOf('components/dialog', module)
  .addDecorator(StoryReduxProvider(verticalLinksStore))
  .add('vertical links', () => {
    return <Dialog />;
  });
storiesOf('components/dialog', module)
  .addDecorator(StoryReduxProvider(buttonPopupStore))
  .add('button popup', () => {
    return <Dialog />;
  });
storiesOf('components/dialog', module)
  .addDecorator(StoryReduxProvider(baggageDetailsPopupStore()))
  .add('baggage details popup', () => {
    return <Dialog />;
  });
storiesOf('components/dialog', module)
  .addDecorator(StoryReduxProvider(baggageDetailsPopupStore(additionalBaggageDetailsItems)))
  .add('baggage details popup with long text', () => {
    return <Dialog />;
  });
  storiesOf('components/dialog', module)
  .addDecorator(StoryReduxProvider(parentOrGuardianDetailsPopupStore()))
  .add('parent or guardian popup with information', () => {
    return <Dialog />;
  });
