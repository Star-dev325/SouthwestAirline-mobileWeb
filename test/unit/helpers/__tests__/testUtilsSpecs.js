import React from 'react';
import sinonModule from 'sinon';
import { integrationMount } from 'test/unit/helpers/testUtils';

const sinon = sinonModule.sandbox.create();

describe('testUtils', () => {
  context('integrationMount', () => {
    let FakeComponent;
    let initialState;

    beforeEach(() => {
      FakeComponent = () => (<div />);
      initialState = {};
    });

    afterEach(() => {
      sinon.restore();
    });

    context('Dialog for Redux', () => {
      it('should mount with Dialog when with dialog is true', () => {
        const wrapper = integrationMount({ withDialog: true })(initialState, FakeComponent);

        expect(wrapper.find('Dialog')).to.be.present();
      });

      it('should mount with Dialog when with dialog is true', () => {
        const wrapper = integrationMount({ withDialog: false })(initialState, FakeComponent);

        expect(wrapper.find('Dialog')).to.not.be.present();
      });

      it('should render Provider with initialState', () => {
        const wrapper = integrationMount()(initialState, FakeComponent);

        expect(wrapper.find('Provider').prop('store')).to.exist;
      });

      it('should render given component', () => {
        const wrapper = integrationMount()(initialState, FakeComponent);

        expect(wrapper.find('FakeComponent')).to.be.present();
      });

      it('should render Router with history', () => {
        const wrapper = integrationMount()(initialState, FakeComponent);

        expect(wrapper.find('Router').prop('history')).to.exist;
      });

      it('should have customized initial location when given location arg', () => {
        const wrapper = integrationMount({ location: '/customized/path' })(initialState, FakeComponent);

        expect(wrapper.find('FakeComponent').prop('location').pathname).to.equal('/customized/path');
      });

      it('should have correct params when given path name', () => {
        const wrapper = integrationMount({
          location: '/customized/path/fisher',
          path: '/customized/path/:name'
        })(initialState, FakeComponent);

        expect(wrapper.find('FakeComponent').prop('match').params).to.deep.equal({
          name: 'fisher'
        });
      });
    });
  });
});
