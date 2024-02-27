export default class EarlyBirdDetailFormDataBuilder {
  constructor() {
    this.formData = {
      bound_0_ebPaxCheckBox_0: false,
      bound_1_ebPaxCheckBox_0: true,
      bound_0_ebPaxCheckBox_1: true,
      bound_1_ebPaxCheckBox_1: false
    };
  }

  withOneWay() {
    this.formData = {
      bound_0_ebPaxCheckBox_0: true,
      bound_0_ebPaxCheckBox_1: false
    };

    return this;
  }

  withOnePaxSelected() {
    this.formData = {
      bound_0_ebPaxCheckBox_0: false,
      bound_1_ebPaxCheckBox_0: true,
      bound_0_ebPaxCheckBox_1: false,
      bound_1_ebPaxCheckBox_1: false
    };

    return this;
  }
  withNoEBSelected() {
    this.formData = {
      bound_0_ebPaxCheckBox_0: false,
      bound_1_ebPaxCheckBox_0: false,
      bound_0_ebPaxCheckBox_1: false,
      bound_1_ebPaxCheckBox_1: false
    };

    return this;
  }

  build() {
    return this.formData;
  }
}