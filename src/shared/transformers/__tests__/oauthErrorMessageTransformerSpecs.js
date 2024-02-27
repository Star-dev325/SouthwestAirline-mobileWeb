import { sandbox } from 'sinon';
import { transformToOAuthErrorMessage } from 'src/shared/transformers/oauthErrorMessageTransformer';
import * as BootstrapHelper from 'src/app/helpers/bootstrapHelper';
import BootstrapConstants from 'src/shared/constants/bootstrapConstants';

const { ERROR_CODE_MAP_PATH } = BootstrapConstants;

const sinon = sandbox.create();

describe('oauthErrorMessageTransformer', () => {
  let errorMessagesMapping;
  let fetchBootstrapDataStub;

  beforeEach(() => {
    errorMessagesMapping = {
      '400618201': 'message 1',
      '400618205': 'message 2',
      '400518024': 'message 3',
      '400518148': 'message 4',
      '400618202': 'message 5',
      '400518329': 'message 6',
      '400518002': 'message 7',
      '401615399': 'message 8'
    };
    fetchBootstrapDataStub = sinon.stub(BootstrapHelper, 'fetchBootstrapData').returns(errorMessagesMapping);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should use existing error message when mapping does not exist', () => {
    const errorMessage = 'Authentication Error (error relayed for downstream service)';
    const errorResponse = {
      responseJSON: {
        code: '400618201',
        message: errorMessage
      }
    };

    fetchBootstrapDataStub.returns(null);

    const error = transformToOAuthErrorMessage(errorResponse);

    expect(fetchBootstrapDataStub).to.have.been.calledWith(ERROR_CODE_MAP_PATH);
    expect(error.responseJSON.message).to.equal(errorMessage);
  });

  it('should set ERR_USERNAME_PASSWORD_INCORRECT message for 400618201 error code', () => {
    const errorResponse = {
      responseJSON: {
        code: '400618201',
        message: 'Authentication Error (error relayed for downstream service)'
      }
    };

    const error = transformToOAuthErrorMessage(errorResponse);

    expect(fetchBootstrapDataStub).to.have.been.calledWith(ERROR_CODE_MAP_PATH);
    expect(error.responseJSON.message).to.equal('message 1');
  });

  it('should set ERR_USERNAME_PASSWORD_INCORRECT message for 400618205 error code', () => {
    const errorResponse = {
      responseJSON: {
        code: '400618205',
        message: 'Authentication Error (error relayed for downstream service)'
      }
    };

    const error = transformToOAuthErrorMessage(errorResponse);

    expect(fetchBootstrapDataStub).to.have.been.calledWith(ERROR_CODE_MAP_PATH);
    expect(error.responseJSON.message).to.equal('message 2');
  });

  it('should set ERR_USERNAME_PASSWORD_INCORRECT message for 400518024 error code', () => {
    const errorResponse = {
      responseJSON: {
        code: '400518024',
        message: 'Authentication Error (error relayed for downstream service)'
      }
    };

    const error = transformToOAuthErrorMessage(errorResponse);

    expect(fetchBootstrapDataStub).to.have.been.calledWith(ERROR_CODE_MAP_PATH);
    expect(error.responseJSON.message).to.equal('message 3');
  });

  it('should set ERR_ACCOUNT_NUMBER_LONG message for 400518148 error code', () => {
    const errorResponse = {
      responseJSON: {
        code: '400518148',
        message: 'Authentication Error (error relayed for downstream service)'
      }
    };

    const error = transformToOAuthErrorMessage(errorResponse);

    expect(fetchBootstrapDataStub).to.have.been.calledWith(ERROR_CODE_MAP_PATH);
    expect(error.responseJSON.message).to.equal('message 4');
  });

  it('should set ERR_MAXIMUM_TRIES message for 400618202 error code', () => {
    const errorResponse = {
      responseJSON: {
        code: '400618202',
        message: 'Authentication Error (error relayed for downstream service)'
      }
    };

    const error = transformToOAuthErrorMessage(errorResponse);

    expect(fetchBootstrapDataStub).to.have.been.calledWith(ERROR_CODE_MAP_PATH);
    expect(error.responseJSON.message).to.equal('message 5');
  });

  it('should set ERR_PASSWORD_NOT_SET message for 400518329 error code', () => {
    const errorResponse = {
      responseJSON: {
        code: '400518329',
        message: 'Authentication Error (error relayed for downstream service)'
      }
    };

    const error = transformToOAuthErrorMessage(errorResponse);

    expect(fetchBootstrapDataStub).to.have.been.calledWith(ERROR_CODE_MAP_PATH);
    expect(error.responseJSON.message).to.equal('message 6');
  });

  it('should set ERR_ACCOUNT_DISABLED message for 400518002 error code', () => {
    const errorResponse = {
      responseJSON: {
        code: '400518002',
        message: 'Authentication Error (error relayed for downstream service)'
      }
    };

    const error = transformToOAuthErrorMessage(errorResponse);

    expect(fetchBootstrapDataStub).to.have.been.calledWith(ERROR_CODE_MAP_PATH);
    expect(error.responseJSON.message).to.equal('message 7');
  });

  it('should set ERR_SESSION_TIMEOUT message for 401615399 error code', () => {
    const errorResponse = {
      responseJSON: {
        code: '401615399',
        message: 'Authentication Error (error relayed for downstream service)'
      }
    };

    const error = transformToOAuthErrorMessage(errorResponse);

    expect(fetchBootstrapDataStub).to.have.been.calledWith(ERROR_CODE_MAP_PATH);
    expect(error.responseJSON.message).to.equal('message 8');
  });

  it('should not need message for unmapped error codes', () => {
    const errorResponse = {
      responseJSON: {
        code: '999999999',
        message: 'Authentication Error (error relayed for downstream service)'
      }
    };

    const error = transformToOAuthErrorMessage(errorResponse);

    expect(fetchBootstrapDataStub).to.have.been.calledWith(ERROR_CODE_MAP_PATH);
    expect(error.responseJSON.message).to.equal('Authentication Error (error relayed for downstream service)');
  });

  it('should return empty object if responseJSON is undefined (this will happen if call times out)', () => {
    const errorResponse = {
      responseJSON: undefined
    };

    const error = transformToOAuthErrorMessage(errorResponse);

    expect(fetchBootstrapDataStub).to.have.been.calledWith(ERROR_CODE_MAP_PATH);
    expect(error).to.deep.equal({});
  });
});
