import _ from 'lodash';
import { sandbox } from 'sinon';

const sinon = sandbox.create();

describe('backToCustomPageSpecs', () => {
  const backToCustomPage = require('src/shared/helpers/backToCustomPage').default;
  let configurations, mockHandler, mockReplaceWith, mockState;

  beforeEach(() => {
    configurations = [
      {
        fromPath: 'flightShoppingConfirmation',
        toPath: 'home'
      },
      {
        fromPath: 'recentShoppingSearches',
        toPath: 'home'
      }
    ];
    mockReplaceWith = sinon.spy();
    mockState = {
      action: 'pop'
    };
  });

  context('#backToCustomPage', () => {
    it('should not hack browser go back if not configured', () => {
      mockHandler = {
        replaceWith: mockReplaceWith
      };

      backToCustomPage(mockHandler, mockState, configurations);

      expect(mockReplaceWith).not.to.have.been.called;
    });

    it('should hack browser go back if configured', () => {
      mockHandler = {
        replaceWith: mockReplaceWith
      };

      backToCustomPage(
        mockHandler,
        _.merge({}, mockState, {
          routes: [
            {
              name: 'flightShoppingConfirmation'
            }
          ]
        }),
        configurations
      );

      expect(mockReplaceWith).to.have.been.calledWith('home');
    });
  });
});
