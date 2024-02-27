export function CeptorWrapper() {
  this.confirm = jest.fn();
  this.error = jest.fn();
  this.getAvailablePaymentMethods = jest.fn().mockResolvedValue({});
  this.getUatpCard = jest.fn().mockResolvedValue({});
  this.retrieveParams = jest.fn().mockResolvedValue({});
  this.select = jest.fn();
  this.setAFPParams = jest.fn();
  this.setConfigParams = jest.fn();
  this.setupAvailablePaymentMethods = jest.fn();
  this.setupValidationCallback = jest.fn();
  this.update = jest.fn().mockResolvedValue({});
  this.validationErrors = jest.fn();
  this.voidTransaction = jest.fn().mockResolvedValue({});
}
