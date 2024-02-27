# Token Conversion Pattern

## Summary

When a user logs in the `/token` response includes an access_token which is scoped for leisure use on the site as
indicated by `scope: "openid dotcom:mobile:web"` in the response (note the "dotcom"). Later a user can choose to perform
corporate activity on the site by turning on the "corporate switch" but in doing so we need to request that api-gateway
grant us a new token with corporate scope. In order to do this we make a call to the `/token` endpoint (same as initial
login but with some differences in the request to indicate we're granting a corporate token) and the response will include
a new access_token which is scoped for corporate use as indicated by `scope: "openid swabiz:mobile:web"` in the response
(note the "swabiz"). Once the user's corporate activity is complete (whether that's a conscious decision or not - see
below) we need to convert their corporate token back to leisure by making another call to the `/token` endpoint this time
with some differences in the request to indicate granting a leisure token.

## Converting Leisure To Corporate

`AccountActions.saveSelectedCompany` -> `OAuthApi.grantCorporateToken`

### Trigger Points

- When turning ON corporate switch

## Converting Corporate To Leisure

`AccountActions.removeSelectedCompany` -> `OAuthApi.grantLeisureToken`

## Trigger Points

- When turning OFF corporate switch
- When landing on booking confirmation page
- When reacting to gateway scope mismatch error (401120359)
  - To support this api-gateway has rules which can be seen [here](https://confluence-tools.swacorp.com/pages/viewpage.action?pageId=378667076)
    dictating which CHAPI endpoints allow and don't allow corporate scope.
- When exiting web view
