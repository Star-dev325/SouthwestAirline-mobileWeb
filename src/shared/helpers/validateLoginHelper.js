import { rememberOauthLoginSession } from './accountInfoHelper';

const REQUEST_EXPERIENCE_ID_KEY = 'X-User-Experience-ID';
const RESPONSE_EXPERIENCE_ID_KEY = 'x-user-experience-id';
const RESPONSE_REQUEST_ID_KEY = 'x-request-id';
const RESPONSE_CHANNEL_ID_KEY = 'x-channel-id';

export const LOGIN_RR_MISMATCH_ERROR_CODE = 200003999;

const getResponseCredential = (response) => response['customers.userInformation.credential'];

const isResponseCredentialValid = (requestCredential, responseCredential) =>
  !!requestCredential && !!responseCredential && requestCredential.toLowerCase() === responseCredential.toLowerCase();

const areExperienceIdHeadersValid = (requestExperienceId, responseExperienceId) =>
  !!requestExperienceId && !!responseExperienceId && requestExperienceId === responseExperienceId;

const getErrorDetails = (responseOptions, requestOptions, resultJson) => {
  const accountNumber = resultJson['customers.userInformation.accountNumber'];
  const experienceIdReceived = requestOptions.headers?.[REQUEST_EXPERIENCE_ID_KEY];
  const experienceIdInResp = responseOptions.headers?.get(RESPONSE_EXPERIENCE_ID_KEY);
  const requestIdInResp = responseOptions.headers?.get(RESPONSE_REQUEST_ID_KEY);
  const channelIdInResp = responseOptions.headers?.get(RESPONSE_CHANNEL_ID_KEY);
  const requestId = `${experienceIdReceived}:${requestIdInResp}:${channelIdInResp}`;

  return {
    customerIdInResp: accountNumber,
    experienceIdReceived,
    experienceIdInResp: experienceIdInResp,
    requestId,
    usernameReceived: requestOptions.body.username,
    usernameInResp: resultJson['customers.userInformation.credential']
  };
};

export const validateLoginResponse = (requestOptions, responseOptions, resultJson) => {
  const responseCredential = getResponseCredential(resultJson);

  rememberOauthLoginSession(resultJson);
  const experienceIdReceived = responseOptions.headers.get(RESPONSE_EXPERIENCE_ID_KEY);
  const { headers: { [REQUEST_EXPERIENCE_ID_KEY]: experienceIdSent } } = requestOptions;
  const responseCredentialValid = isResponseCredentialValid(requestOptions.body?.username, responseCredential);
  const experienceIdValid = areExperienceIdHeadersValid(experienceIdSent, experienceIdReceived);

  if (!responseCredentialValid || !experienceIdValid) {
    throw {
      responseJSON: {
        code: LOGIN_RR_MISMATCH_ERROR_CODE,
        error: 'SERVER FAILURE',
        details: JSON.stringify(getErrorDetails(responseOptions, requestOptions, resultJson))
      },
      status: responseOptions.status
    };
  }
};
