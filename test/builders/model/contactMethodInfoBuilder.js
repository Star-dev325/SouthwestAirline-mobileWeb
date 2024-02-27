class ContactMethodInfoBuilder {
  constructor() {
    this.contactMethod = 'CALL';
    this.phoneNumber = '123-654-8973';
    this.phoneCountryCode = '1';
    this.email = 'fisher@king.com';
    this.declineNotifications = undefined;
    this.preferredLanguage = undefined;
    this.saveContactMethod = false;
  }

  withInternational(declineNotifications = false, preferredLanguage = 'EN') {
    this.declineNotifications = declineNotifications;
    this.preferredLanguage = preferredLanguage;

    return this;
  }

  withDomestic() {
    this.declineNotifications = undefined;
    this.preferredLanguage = undefined;

    return this;
  }

  withMailMe() {
    this.contactMethod = 'MAIL';
    this.email = 'fisher@king.com';

    return this;
  }

  withTextMe() {
    this.contactMethod = 'TEXT';
    this.phoneNumber = '123-654-8973';
    this.phoneCountryCode = '1';

    return this;
  }

  withCallMe() {
    this.contactMethod = 'CALL';
    this.phoneNumber = '123-654-8973';
    this.phoneCountryCode = '1';

    return this;
  }

  withSaveContactMethod(saveContactMethod = true) {
    this.saveContactMethod = saveContactMethod;

    return this;
  }

  build() {
    return {
      contactMethod: this.contactMethod,
      phoneCountryCode: this.phoneCountryCode,
      phoneNumber: this.phoneNumber,
      preferredLanguage: this.preferredLanguage,
      declineNotifications: this.declineNotifications,
      saveContactMethod: this.saveContactMethod
    };
  }
}

export default ContactMethodInfoBuilder;
