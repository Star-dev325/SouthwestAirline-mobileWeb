export default class sameDayPaymentBuilder {
  constructor() {
    this.sameDayPaymentPage = { selectedCardId: 'TEST123' };
  }

  build() {
    return {
      sameDayPaymentPage: this.sameDayPaymentPage
    };
  }
}
