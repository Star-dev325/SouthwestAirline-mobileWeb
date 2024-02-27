import { splitRequestIdIntoTokens } from 'src/shared/api/helpers/errorHelper';

describe('errorHelper', () => {
  it('should split an error request ID into 3 tokens', () => {
    const mockChannel = 'channel';
    const mockExperienceId = 'experienceId';
    const mockRequestId = 'requestId';
    const mockResponseRequestId = `${mockExperienceId}:${mockRequestId}:${mockChannel}`;

    expect(splitRequestIdIntoTokens(mockResponseRequestId))
      .toEqual([mockExperienceId, mockRequestId, mockChannel]);
  });

  it('should return an empty list if the request ID is not provided', () => {
    expect(splitRequestIdIntoTokens()).toEqual([]);
  });
});
