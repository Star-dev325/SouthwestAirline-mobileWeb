# Error Logging Pattern

## Summary

We are able to log errors in the application to a central logging service via the `loggingApi`.
We should be periodically reviewing the resulting error logs in order to catch and address any concerning issues that are revealed.

## Logging API Call Failures (Automatic)

All failed API calls are logged automatically via the error handling in `restClient`

## Logging Javascript Errors (Automatic)

All Javascript errors are logged automatically via the `universalExceptionError` which adds an event listener to the Javascript `error` event when the app loads.
Anytime the `error` event fires, the `loggingApi` is called to log the error.

## Logging Custom Errors (Manual)

Any other custom errors can be logged by calling `sendErrorLog` in `loggingApi`. There is a `LogType` flow type to
understand the shape of the error object to be sent. Although we are not doing this much at the time of writing it's
suggested to do so when there might be value in logging a particular scenario.

An example can be found in `loginSessionHelper`:

```javascript
const decodeJwt = (token: string) => {
  try {
    return jwtDecode(token);
  } catch (e) {
    sendErrorLog([
      {
        action: '',
        component: 'loginSessionHelper',
        count: 1,
        details: `unable to decode token: ${token}`
        errorCode: null,
        httpCode: null,
        level: 'ERROR',
        location: window.location.pathname,
        message: 'unable to decode token',
        timestamp: 1234567890
      }
    ]);
    return {};
  }
};
```

## Reviewing errors in the error logs

When we use `loggingApi` to log errors, `api-logging` will write the details being sent to a log file which can be reviewed.

1. ssh into the appropriate server for api-logging in the environment you're testing.
   Find the name of the server for your environment on the [Environment Details page](https://confluence-tools.swacorp.com/display/BAMF/.com+Environment+Landscape).
2. Once ssh'ed into the server, the path can be found at `/opt/dotcom/api/logging/<build #>/audit-mobile-errors.<server name>.log`
   For example: `/opt/dotcom/api/logging/1.8.0013-13/audit-mobile-errors.xldwebapi59.log`
3. Example of command to search logs:
   Get a count of "UniversalException" errors
   `grep UniversalException /opt/dotcom/api/logging/1.8.0013-13/audit-mobile-errors.xldwebapi59.log | wc -l`
   output:
   `515`
