const _ = require('lodash');

export default class HttpErrorResponseBuilder {
  constructor() {
    this.code = '404599104';
    this.message = `Hmm. We can't find this reservation. Please double-check your information.`;
    this.httpStatusCode = 'NOT_FOUND';
    this.requestId = 'ZHJqZ8V2TAy_KtaR02Mgow-API';
    this.customFields = {};
  }

  withCode(code) {
    this.code = code;

    return this;
  }

  withMessage(message) {
    this.message = message;

    return this;
  }

  withHttpStatusCode(httpStatusCode) {
    this.httpStatusCode = httpStatusCode;

    return this;
  }

  withRequestId(requestId) {
    this.requestId = requestId;

    return this;
  }

  withCustomField(key, value) {
    this.customFields[key] = value;

    return this;
  }

  build() {
    const response = {
      code: this.code,
      message: this.message,
      httpStatusCode: this.httpStatusCode,
      requestId: this.requestId
    };

    if (!_.isEmpty(this.customFields)) {
      _.forEach(this.customFields, (value, key) => {
        response[key] = value;
      });
    }

    return response;
  }
}
