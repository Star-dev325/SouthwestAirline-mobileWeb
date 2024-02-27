module.exports = function() {
  this.accessToken = '02a3d308-27b2-4359-ad48-c7602293d602';
  this.idToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2Nlc3NfdG9rZW4iOiIwMmEzZDMwOC0yN2IyLTQzNTktYWQ0OC1jNzYwMjI5M2Q2MDIiLCJhdF9oYXNoIjoiLWxmbkhySG1MVm41OWVGWXVjYTFLZyIsImF1ZCI6Ijk5YWE2M2I5LTVhN2YtNGRmMi1iYjJmLTEwMGNkYTAwODRkZSIsImF1dGhfdGltZSI6MTQ4NTEzNDMwNCwiYXpwIjoiOTlhYTYzYjktNWE3Zi00ZGYyLWJiMmYtMTAwY2RhMDA4NGRlIiwiY3VzdG9tZXJTdW1tYXJ5Ijp7ImFjY291bnROdW1iZXIiOiI2MDA1OTcwNTYiLCJhY2NvdW50VHlwZSI6Ik1FTUJFUiIsImZpcnN0TmFtZSI6IkdyYWNlIiwibGFzdE5hbWUiOiJLZWxseSIsInByZWZlcnJlZE5hbWUiOiJHcmFjZUtlbGx5IiwicHJpbWFyeUVtYWlsIjoieDIwOTM2N0B3bmNvLmNvbSIsInJlZGVlbWFibGVQb2ludHMiOjAsInRpZXIiOiJOT05fRUxJVEUiLCJ0aWVyU3RhdHVzUGVuZGluZyI6dHJ1ZX0sImV4cCI6MTUwMDk3NDY4OSwiaWF0IjoxNDg1MTM0MzA0LCJpc3MiOiJodHRwczovL2FwaS1zZWN1cml0eS5pdGVzdC5zb3V0aHdlc3QuY29tIiwibm9uY2UiOiJTV0EyMDE2OjE0ODUxMzQzMDMiLCJzdWIiOiJSNTh1dDRDRmozOWxiU25ab24zN21FaHpsWjhFNXdkTWQxeEJOT1FwaHlnIiwianRpIjoiZmRjNTQ2YmItN2U1Yy00ZWUyLWJjNGMtNWRhZjIxMTczMjRkIn0.PY_ZBUEpMCAIqfiS78pJAg187ivFBK7XcDiIDOFrtYk';

  this.withAccessToken = function(accessToken) {
    this.accessToken = accessToken;

    return this;
  };

  this.withIdToken = function(idToken) {
    this.idToken = idToken;

    return this;
  };

  this.build = function() {
    return {
      access_token: this.accessToken,
      expires_in: 1800,
      id_token: this.idToken,
      scope: 'openid',
      token_type: 'Bearer'
    };
  };
};
