import React from 'react';
import ReactDOM from 'react-dom';
import proxyquire from 'proxyquire';
import { mount } from 'enzyme';

describe('deviceClassHelper', () => {
  let deviceClassHelper;

  beforeEach(() => {
    deviceClassHelper = proxyquire('src/shared/helpers/deviceClassHelper', {
      'src/shared/helpers/deviceInfo': {
        default: {
          os: {
            name: 'Android',
            version: '4.0.1'
          }
        }
      }
    }).default;
  });

  it(`should add class 'device device--version'for element`, () => {
    const elem = ReactDOM.findDOMNode(mount(<div>element</div>).instance());

    deviceClassHelper(elem);
    expect(elem.classList).to.deep.equal({ 0: 'android', 1: 'android--4.0.1' });
  });
});
