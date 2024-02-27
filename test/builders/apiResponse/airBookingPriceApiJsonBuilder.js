const FlightProductItemBuilder = require('test/builders/model/flightProductItemBuilder');

export default class AirBookingPriceApiJsonBuilder {
  constructor() {
    this.discountApplied = false;
    this.products = [];
    this.promoCode = '';
    this.promoCodeApplied = false;
    this.warnings = [];
  }

  withOneProduct(productId = 'TkxBMFZOUk98QW1lcmljYS9OZXdfWW9ya3wyMDE2MDUwNDA1NDAsMjAxNjA1MDQwODI1fEFUTC1EQUwsREFMLUFVU3xXTjc0NCxXTjEwN3xOfE5SRnw3M1csNzNX') {
    this.products = [
      new FlightProductItemBuilder().withProductId(productId).build()
    ];

    return this;
  }

  withTwoProducts(outboundProductId = 'TkxBMFZOUk98QW1lcmljYS9OZXdfWW9ya3wyMDE2MDUwNDA1NDAsMjAxNjA1MDQwODI1fEFUTC1EQUwsREFMLUFVU3xXTjc0NCxXTjEwN3xOfE5SRnw3M1csNzNX',
    inboundProductId = 'TkxBMFZOUk98QW1lcmljYS9DaGljYWdvfDIwMTYwNTA3MDYxNSwyMDE2MDUwNzEyMjB8QVVTLUFUTHxXTjI3Mzh8TnxOUkZ8NzNX') {
    this.products = [
      new FlightProductItemBuilder().withProductId(outboundProductId).build(),
      new FlightProductItemBuilder().withProductId(inboundProductId).build()
    ];

    return this;
  }

  build() {
    return {
      discountApplied: this.discountApplied,
      products: this.products,
      promoCode: this.promoCode,
      promoCodeApplied: this.promoCodeApplied,
      warnings: this.warnings
    };
  }
}