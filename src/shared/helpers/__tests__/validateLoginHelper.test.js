import { validateLoginResponse } from 'src/shared/helpers/validateLoginHelper';

describe('validateLoginHelper', () => {
  it('should throw error', () => {
    const mockRequestOptions = {
      headers: {
        'X-User-Experience-ID': '122333'
      },
      body: {
        username: 'test-user'
      }
    };

    const mockResponse = {
      'customers.userInformation.credential': 'test-user1',
      'customers.userInformation.accountNumber': '123123'
    };

    const mockResponseOptions = {
      status: '200',
      headers: {
        get: jest.fn(() => '122334')
      }
    };

    try {
      validateLoginResponse(mockRequestOptions, mockResponseOptions, mockResponse);
      expect(true).toBe(false);
    } catch (err) {
      expect(err).toMatchObject({
        responseJSON: {
          code: 200003999,
          details: '{"customerIdInResp":"123123","experienceIdReceived":"122333","experienceIdInResp":"122334","requestId":"122333:122334:122334","usernameReceived":"test-user","usernameInResp":"test-user1"}',
          error: 'SERVER FAILURE'
        },
        status: '200'
      });
    }
  });

  it('should not throw any error', () => {
    const mockRequestOptions = {
      headers: {
        'X-User-Experience-ID': '122334'
      },
      body: {
        username: 'test-user'
      }
    };

    const mockResponse = {
      'customers.userInformation.credential': 'test-user',
      'customers.userInformation.accountNumber': '123123'
    };

    const mockResponseOptions = {
      status: '200',
      headers: {
        get: jest.fn(() => '122334')
      }
    };

    expect(validateLoginResponse(mockRequestOptions, mockResponseOptions, mockResponse)).toBe(undefined);
  });
});
