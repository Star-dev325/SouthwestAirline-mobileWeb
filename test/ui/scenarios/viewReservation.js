module.exports = [
  {
    label: 'view reservation page (default)',
    selectedKind: 'pages/viewReservation/viewReservationPage',
    type: 'default'
  },
  {
    label: 'view reservation page (loggedIn)',
    selectedKind: 'pages/viewReservation/viewReservationPage',
    type: 'loggedIn'
  },
  {
    label: 'view reservation page (car)',
    selectedKind: 'pages/viewReservation/viewReservationPage',
    type: 'car'
  },
  {
    label: 'view reservation details page (default)',
    selectedKind: 'pages/viewReservation/viewReservationDetailsPage',
    type: 'default'
  },
  {
    label: 'view reservation details page (earlyBird)',
    selectedKind: 'pages/viewReservation/viewReservationDetailsPage',
    type: 'withEarlyBird'
  },
  {
    label: 'view reservation details page (earlyBirdAndCOS)',
    selectedKind: 'pages/viewReservation/viewReservationDetailsPage',
    type: 'withEarlyBirdAndCOS'
  },
  {
    label: 'view reservation details page (with delayed flights)',
    selectedKind: 'pages/viewReservation/viewReservationDetailsPage',
    type: 'withDelayedTimes'
  },
  {
    label: 'view reservation details page (with delayed stops)',
    selectedKind: 'pages/viewReservation/viewReservationDetailsPage',
    type: 'withDelayedStops'
  },
  {
    label: 'view reservation details page (within 24 hours on time)',
    selectedKind: 'pages/viewReservation/viewReservationDetailsPage',
    type: 'withIn24HoursOnTime'
  },
  {
    label: 'view reservation details page (with companion)',
    selectedKind: 'pages/viewReservation/viewReservationDetailsPage',
    type: 'withCompanion'
  },
  {
    label: 'view reservation details page (with international)',
    selectedKind: 'pages/viewReservation/viewReservationDetailsPage',
    type: 'withInternational'
  },
  {
    label: 'view reservation details page (withDynamicWaiverAndChangeLink)',
    selectedKind: 'pages/viewReservation/viewReservationDetailsPage',
    type: 'withDynamicWaiverAndChangeLink'
  },
  {
    label: 'view reservation details page (withDynamicWaiverNoChangeNoReaccomLinks)',
    selectedKind: 'pages/viewReservation/viewReservationDetailsPage',
    type: 'withDynamicWaiverNoChangeNoReaccomLinks'
  },
  {
    label: 'view reservation details page (withUpsellDetails)',
    selectedKind: 'pages/viewReservation/viewReservationDetailsPage',
    type: 'withUpsellDetails'
  },
  {
    label: 'view reservation details page (withLapChild)',
    selectedKind: 'pages/viewReservation/viewReservationDetailsPage',
    type: 'withLapChild'
  },
  {
    label: 'view reservation details page (withSameDayStandBy)',
    selectedKind: 'pages/viewReservation/viewReservationDetailsPage',
    type: 'withSameDayStandBy'
  },
  {
    label: 'view reservation details page (withOvernightIndicator)',
    selectedKind: 'pages/viewReservation/viewReservationDetailsPage',
    type: 'withOvernightIndicator'
  },
  {
    label: 'view reservation details page (withOptionsAndNextSteps)',
    selectedKind: 'pages/viewReservation/viewReservationDetailsPage',
    type: 'withOptionsAndNextSteps'
  },
  {
    label: 'view reservation details page (withGreyBoxMessage)',
    selectedKind: 'pages/viewReservation/viewReservationDetailsPage',
    type: 'withGreyBoxMessage'
  },
  {
    label: 'view reservation details page (withEarlyBirdPurchased)',
    selectedKind: 'pages/viewReservation/viewReservationDetailsPage',
    type: 'withEarlyBirdPurchased'
  },
  {
    label: 'view reservation details page (withEarlyBirdPurchasedWithAircraftTypeViewResToggleOn)',
    selectedKind: 'pages/viewReservation/viewReservationDetailsPage',
    type: 'withEarlyBirdPurchasedWithAircraftTypeViewResToggleOn'
  },
  {
    label: 'view reservation details page (withOvernightIndicator expanded)',
    selectedKind: 'pages/viewReservation/viewReservationDetailsPage',
    type: 'withOvernightIndicator',
    clickSelector: '.panel-anchor.collapsed'
  },
  {
    label: 'view reservation details page (with reaccom)',
    selectedKind: 'pages/viewReservation/viewReservationDetailsPageReaccom',
    type: 'withReaccom'
  },
  {
    label: 'view reservation details page (withReaccomAndNoCancelLink)',
    selectedKind: 'pages/viewReservation/viewReservationDetailsPageReaccom',
    type: 'withReaccomAndNoCancelLink'
  },
  {
    label: 'view reservation details page (withDynamicWaiverAndReaccomLink)',
    selectedKind: 'pages/viewReservation/viewReservationDetailsPageReaccom',
    type: 'withDynamicWaiverAndReaccomLink'
  },
  {
    label: 'view reservation details page (withEditNameSuccessMessage)',
    selectedKind: 'pages/viewReservation/viewReservationDetailsPage',
    type: 'withEditNameSuccessMessage'
  },
  {
    label: 'view reservation details page (withDisruptedFLIXBoundMessage)',
    selectedKind: 'pages/viewReservation/viewReservationDetailsPageReaccom',
    type: 'withDisruptedFLIXBoundMessage'
  },
  {
    label: 'view reservation details page (withDisruptedOPRBoundMessage)',
    selectedKind: 'pages/viewReservation/viewReservationDetailsPageReaccom',
    type: 'withDisruptedOPRBoundMessage'
  },
  {
    label: 'view car reservation details page (default)',
    selectedKind: 'pages/viewReservation/viewCarReservationDetailsPage',
    type: 'default'
  },
  {
    label: 'Domestic',
    selectedKind: 'pages/viewReservation/travelInformationPage',
    type: 'Domestic',
    clickSelector: '.button--yellow'
  },
  {
    label: 'Domestic all field pre-filled',
    selectedKind: 'pages/viewReservation/travelInformationPage',
    type: 'Domestic all field pre-filled'
  },
  {
    label: 'Domestic with no form errors, all fields optional',
    selectedKind: 'pages/viewReservation/travelInformationPage',
    type: 'Domestic',
    clickSelector: '.button--yellow'
  },
  {
    label: 'International',
    selectedKind: 'pages/viewReservation/travelInformationPage',
    type: 'International'
  },
  {
    label: 'International all fields pre-filled',
    selectedKind: 'pages/viewReservation/travelInformationPage',
    type: 'International all fields pre-filled'
  },
  {
    label: 'International with form errors (Passport)',
    selectedKind: 'pages/viewReservation/travelInformationPage',
    type: 'International partial passport data for error',
    clickSelector: '.button--yellow'
  },
  {
    label: 'International with form errors (Emergency Contact)',
    selectedKind: 'pages/viewReservation/travelInformationPage',
    type: 'International partial emergency contact data for error',
    clickSelector: '.button--yellow'
  },
  {
    label: 'Travel info form flight in progress (Special Assistance Disabled)',
    selectedKind: 'pages/viewReservation/travelInformationPage',
    type: 'Special Assistance Disabled'
  }
];
