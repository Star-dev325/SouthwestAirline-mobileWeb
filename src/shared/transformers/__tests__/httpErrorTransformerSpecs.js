import { transformToHttpRequestError } from 'src/shared/transformers/httpErrorTransformer';

describe('httpErrorTransformer', () => {
  it('should transform xmlhttp object to HttpRequestError for normal api error', () => {
    const error = {
      responseJSON: {
        code: 400520187,
        httpStatusCode: 'BAD_REQUEST',
        infoList: [
          {
            key: 'passengers[0].birthDate',
            value: '1980-01-01'
          }
        ],
        message: 'Default message.',
        messageKey: 'SOME_MESSAGE_KEY',
        requestId: 'c56d38ec-3ebd-4f02-9905-633f6b6785fa:ndw0Fa0pQ-yqhYazwOm1zg:mweb'
      }
    };

    expect(transformToHttpRequestError(error)).to.contains({
      message: 'Default message.',
      requestId: 'c56d38ec-3ebd-4f02-9905-633f6b6785fa:ndw0Fa0pQ-yqhYazwOm1zg:mweb',
      code: 400520187,
      httpStatusCode: 'BAD_REQUEST'
    });
  });

  it('should transform xmlhttp object to customized HttpRequestError for customized api error', () => {
    const error = {
      responseJSON: {
        code: 400520187,
        httpStatusCode: 'BAD_REQUEST',
        infoList: [
          {
            key: 'passengers[0].birthDate',
            value: '1980-01-01'
          }
        ],
        message: 'customized message.',
        messageKey: 'SOME_MESSAGE_KEY',
        requestId: 'c56d38ec-3ebd-4f02-9905-633f6b6785fa:ndw0Fa0pQ-yqhYazwOm1zg:mweb'
      },
      $customized: true
    };

    expect(transformToHttpRequestError(error)).to.contains({
      message: 'customized message.',
      requestId: 'c56d38ec-3ebd-4f02-9905-633f6b6785fa:ndw0Fa0pQ-yqhYazwOm1zg:mweb',
      code: 400520187,
      httpStatusCode: 'BAD_REQUEST',
      $customized: true
    });
  });

  it('should return empty object when error is empty', () => {
    const error = new Error();

    expect(transformToHttpRequestError(error)).to.deep.equal({});
  });
});
