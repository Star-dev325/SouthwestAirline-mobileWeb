'use strict';

class PromotionBuilder {
  constructor() {
    this.id = '16berr6';
    this.title = '';
    this.description = '';

    this.registrationDates = {
      startDate: '2013-12-22T18:00:00.000',
      endDate: '2015-10-30T19:00:00.000'
    };
    this.usageDates = {};
    this.register = null;
  }

  withId(promotionId) {
    this.id = promotionId;

    return this;
  }

  withTitle(title) {
    this.title = title;

    return this;
  }

  withDescription(description) {
    this.description = description;

    return this;
  }

  withUsageDates(startDate, endDate) {
    this.usageDates = {
      startDate,
      endDate
    };

    return this;
  }

  withRegister(isRegistered, accountNumber) {
    this.register = isRegistered ? null : {
      href: `/v1/accounts/account-number/${accountNumber}/registered-promotions`,
      method: 'POST'
    };

    return this;
  }

  build() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      registrationDates: this.registrationDates,
      usageDates: this.usageDates,
      _links: {
        register: this.register
      }
    };
  }
}

module.exports = PromotionBuilder;
