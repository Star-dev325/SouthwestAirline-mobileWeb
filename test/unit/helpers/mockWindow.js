import _ from 'lodash';

export class Geolocation {
  constructor() {
    this.geolocation = {};
  }

  getCurrentPosition() {
    const current = this;

    return {
      success(latitude, longitude) {
        _.set(current.geolocation, 'getCurrentPosition', success => success({
          coords: {
            latitude,
            longitude
          }
        }));

        return current;
      },
      failed() {
        _.set(current.geolocation, 'getCurrentPosition', (success, failed) => failed());

        return current;
      }
    };
  }

  build() {
    return { ...this.geolocation };
  }
}

export class Navigator {
  constructor() {
    this.navigator = {};
  }

  geolocation(geolocation) {
    _.set(this.navigator, 'geolocation', geolocation);

    return this;
  }

  build() {
    return { ...this.navigator };
  }
}

export class Window {
  constructor() {
    this.window = {};
  }

  navigator(navigator) {
    _.set(this.window, 'navigator', navigator);

    return this;
  }

  google(google) {
    _.set(this.window, 'google', google);

    return this;
  }

  build() {
    return { ...this.window };
  }
}
