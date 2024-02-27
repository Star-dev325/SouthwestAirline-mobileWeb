import { getSpinnerMessage } from 'src/shared/selectors/spinnerSelectors';

describe('spinnerSelectors', () => {
  it('should get the spinner message', () => {
    const mockMessage = 'Message';
    const mockState = {
      app: {
        spinner: {
          asyncChain: false,
          spinnerMessage: mockMessage
        }
      }
    };

    expect(getSpinnerMessage(mockState)).toEqual(mockMessage);
  });

  it('should get the spinner chain message', () => {
    const mockMessage = 'Message';
    const mockState = {
      app: {
        spinner: {
          asyncChain: true,
          chainMessageCount: 0,
          chainMessages: [mockMessage]
        }
      }
    };

    expect(getSpinnerMessage(mockState)).toEqual(mockMessage);
  });

  it('should get the last spinner chain message when the count exceeds the length of provided messages', () => {
    const mockLastMessage = 'Message2';
    const mockState = {
      app: {
        spinner: {
          asyncChain: true,
          chainMessageCount: 9,
          chainMessages: ['Message1', mockLastMessage]
        }
      }
    };

    expect(getSpinnerMessage(mockState)).toEqual(mockLastMessage);
  });

  it('should get the spinner message if the async chain message count is invalid', () => {
    const mockMessage = 'Message';
    const mockState = {
      app: {
        spinner: {
          asyncChain: true,
          chainMessageCount: 'invalid',
          chainMessages: ['This should not be pulled'],
          spinnerMessage: mockMessage
        }
      }
    };

    expect(getSpinnerMessage(mockState)).toEqual(mockMessage);
  });
});