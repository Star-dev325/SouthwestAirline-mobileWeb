import { storiesOf } from '@storybook/react';
import React from 'react';
import PassengerPersonalInfoForm from 'src/airBooking/components/passengerPersonalInfoForm';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import { getLapChildPassengerInfos } from 'test/builders/model/passengerInfosBuilder';

const store = createMockedFormStore();
const EnhancedWebViewPassengerPersonalInfoForm = withBodyClass(['is-webview'])(PassengerPersonalInfoForm);
const passengerInfos = [{
  departureDate: '2022-01-01',
  passengerReference: 2,
  type: 'adult'
},
{
  departureDate: '2022-01-01',
  passengerReference: 2,
  type: 'lapChild'
}]

storiesOf('components/passengerPersonalInfoForm', module)
  .addDecorator(StoryReduxProvider(store))
  .add('domestic', () => {
    return <PassengerPersonalInfoForm onSubmit={() => {}} passengerInfos={passengerInfos} />;
  })
  .add('international', () => {
    return <PassengerPersonalInfoForm onSubmit={() => {}} isInternationalBooking passengerInfos={passengerInfos} />;
  })
  .add('lap child international', () => {
    return <PassengerPersonalInfoForm onSubmit={() => {}} isLapChild isInternationalBooking isLapChildInBooking disableContactInfo={true} passengerInfos={getLapChildPassengerInfos()} />;
  })
  .add('save frequent traveler checkbox', () => {
    return (
      <PassengerPersonalInfoForm
        onSubmit={() => {}}
        allowAddFrequentTraveler={true}
        addFrequentTravelerDisclaimerText={
          'Passenger information is encrypted and only accessible by the Southwest app on this device.'
        }
        passengerInfos={passengerInfos}
      />
    );
  })
  .add('save frequent traveler checkbox with disclaimer text', () => {
    return (
      <PassengerPersonalInfoForm
        onSubmit={() => {}}
        allowAddFrequentTraveler={true}
        initialFormData={{ saveAsFrequentTraveler: true }}
        addFrequentTravelerDisclaimerText={
          'Passenger information is encrypted and only accessible by the Southwest app on this device.'
        }
        passengerInfos={passengerInfos}
      />
    );
  })
  .add('edit domestic', () => {
    return <PassengerPersonalInfoForm onSubmit={() => {}} isEditMode passengerInfos={passengerInfos} />;
  })
  .add('edit international', () => {
    return <PassengerPersonalInfoForm onSubmit={() => {}} isEditMode isInternationalBooking passengerInfos={passengerInfos} />;
  })
  .add('edit with disabled contact information', () => {
    return <PassengerPersonalInfoForm onSubmit={() => {}} isEditMode disableContactInfo={true} passengerInfos={passengerInfos} />;
  })
  .add('edit lap child form', () => {
    return <PassengerPersonalInfoForm onSubmit={() => {}} isEditMode isLapChildInBooking disableContactInfo={true} passengerInfos={passengerInfos} paxNumber={2} paxTotalNumber={2} type={'lapChild'} />;
  })
  .add('edit adult form with lap child in booking', () => {
    return <PassengerPersonalInfoForm onSubmit={() => {}} isEditMode isLapChildInBooking disableContactInfo={true} passengerInfos={passengerInfos} paxNumber={1} paxTotalNumber={2} type={'adult'} />;
  })
  .add('frequent traveler edit instruction helper text', () => {
    return <PassengerPersonalInfoForm onSubmit={() => {}} initialFormData={{ frequentTravelerId: 'ACCOUNT' }} passengerInfos={passengerInfos} />;
  });

const isWebViewStore = {
  app: {
    webView: {
      isWebView: true
    }
  }
};

storiesOf('components/passengerPersonalInfoForm', module)
  .addDecorator(StoryReduxProvider(createMockedFormStore(isWebViewStore)))
  .add('web view domestic', () => {
    return <EnhancedWebViewPassengerPersonalInfoForm onSubmit={() => {}} isWebView passengerInfos={passengerInfos} />;
  })
  .add('web view international', () => {
    return <EnhancedWebViewPassengerPersonalInfoForm onSubmit={() => {}} isInternationalBooking isWebView passengerInfos={passengerInfos} />;
  })
  .add('edit web view domestic', () => {
    return <EnhancedWebViewPassengerPersonalInfoForm onSubmit={() => {}} isEditMode isWebView passengerInfos={passengerInfos} />;
  })
  .add('edit web view international', () => {
    return <EnhancedWebViewPassengerPersonalInfoForm onSubmit={() => {}} isEditMode isInternationalBooking isWebView passengerInfos={passengerInfos} />;
  })
    .add('edit web view adult form with lap child in booking', () => {
    return <EnhancedWebViewPassengerPersonalInfoForm onSubmit={() => {}} isEditMode isLapChildInBooking disableContactInfo={true} isWebView passengerInfos={passengerInfos} paxNumber={1} paxTotalNumber={2} type={'adult'} />;
  })
  .add('edit web view lap child form', () => {
    return <EnhancedWebViewPassengerPersonalInfoForm onSubmit={() => {}} isEditMode isLapChildInBooking disableContactInfo={true} isWebView passengerInfos={passengerInfos} paxNumber={2} paxTotalNumber={2} type={'lapChild'} />;
  });
