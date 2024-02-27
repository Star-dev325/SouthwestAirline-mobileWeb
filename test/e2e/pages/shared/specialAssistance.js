const page = {
  selectBlind() {
    return this.clickVisible('@blindCheckbox');
  },
  selectDeaf() {
    return this.clickVisible('@deafCheckbox');
  },
  selectCognitiveDisability() {
    return this.clickVisible('@cognitiveDisabilityCheckbox');
  },
  selectAssistanceAnimal() {
    return this.clickVisible('@assistanceAnimalCheckbox');
  },
  selectPeanutAllergy() {
    return this.clickVisible('@peanutCheckbox');
  },
  selectPortableOxygen() {
    return this.clickVisible('@oxygenCheckbox');
  },
  selectWheelchairAssistanceToGate() {
    return this.clickVisible('@gateAssistRadio');
  },
  selectWheelchairLiftAssistance() {
    return this.clickVisible('@liftAssistRadio');
  },
  selectManualWheelchairStowage() {
    return this.clickVisible('@manualStowageRadio');
  },
  selectSpillableBatteryWheelchair() {
    return this.clickVisible('@spillableStowageRadio');
  },
  selectNonSpillableBatteryWheelchair() {
    return this.clickVisible('@nonSpillableStowageRadio');
  },
  selectBatteryNumber(number) {
    return this.clickByText('li.battery-numbers--list-item', `${number}`);
  },
  saveSASelections() {
    return this.clickVisible('@mainSaveButton');
  },
  saveBatterySelection() {
    return this.clickByText('@batteryDoneButton', 'Done');
  }
};

module.exports = {

  elements: {
    blindCheckbox: 'div[name=BLIND]',
    deafCheckbox: 'div[name=DEAF]',
    cognitiveDisabilityCheckbox: 'div[name=COGNITIVE_AND_DEVELOPMENTAL_SSR]',
    assistanceAnimalCheckbox: 'div[name=ASSISTANCE_ANIMAL]',
    peanutCheckbox: 'div[name=PEANUT_DUST_ALLERGY]',
    oxygenCheckbox: 'div[name=PORTABLE_OXYGEN_CONCENTRATOR]',
    gateAssistRadio: 'div[name=AIRPORT_WHEELCHAIR]',
    liftAssistRadio: 'div[name=AISLE_CHAIR]',
    manualStowageRadio: 'div[name=MANUAL_WHEELCHAIR]',
    spillableStowageRadio: 'div[name=WET_CELL_BATTERY_WHEELCHAIR]',
    nonSpillableStowageRadio: 'div[name=DRY_CELL_BATTERY_WHEELCHAIR]',
    mainSaveButton: 'button[type=submit]',
    batteryDoneButton: 'ul.action-bar--right-buttons > li.action-bar-buttons--item > button[type=button]'
  },

  commands: [page]
};
