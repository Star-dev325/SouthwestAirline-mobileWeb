import React from 'react';
import { sandbox } from 'sinon';

import { integrationMount } from 'test/unit/helpers/testUtils';

const sinon = sandbox.create();

describe('WithRecentTripSearches', () => {
  let withRecentTripSearches;
  let SubComponent;
  let SharedActions;

  before(() => {
    SubComponent = () => <div />;
  });

  beforeEach(() => {
    SharedActions = require('src/shared/actions/sharedActions');

    withRecentTripSearches = require('src/shared/enhancers/withRecentTripSearches').default;

    sinon.stub(SharedActions, 'saveRecentTripSearch').returns({ type: 'mockAction' });
    sinon.stub(SharedActions, 'fetchRecentTripSearches').returns({ type: 'mockAction' });
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should pass recent trip search data prop to sub component', () => {
    const wrapper = createComponent();

    expect(wrapper.find('SubComponent'))
      .to.have.prop('recentTripSearches')
      .deep.equal([
        {
          recordLocator: 'ABC123',
          firstName: 'Andy',
          lastName: 'Smith'
        },
        {
          recordLocator: 'DEF456',
          firstName: 'Tom',
          lastName: 'Jones'
        }
      ]);
  });

  it('should pass the saveRecentTripSearch and fetchRecentTripSearch functions to sub component', () => {
    const wrapper = createComponent();

    expect(wrapper.find('SubComponent')).to.have.prop('saveRecentTripSearchFn');
    expect(wrapper.find('SubComponent')).to.have.prop('fetchRecentTripSearchesFn');
  });

  it('should call fetchRecentTripSearchFn when component did mount', () => {
    createComponent();

    expect(SharedActions.fetchRecentTripSearches).to.be.called;
  });

  function createComponent() {
    const Wrapper = withRecentTripSearches('checkIn')(SubComponent);

    return integrationMount()(
      {
        app: {
          checkIn: {
            recentTripSearches: [
              {
                recordLocator: 'ABC123',
                firstName: 'Andy',
                lastName: 'Smith'
              },
              {
                recordLocator: 'DEF456',
                firstName: 'Tom',
                lastName: 'Jones'
              }
            ]
          }
        }
      },
      Wrapper
    );
  }
});
