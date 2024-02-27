# URL and VIP Routing Details

Below is a high level detail of the various URLS that are available to access the chapis / wapis and some details about each layer. Included in each title is the base error code number that is used in the middle 3 digits of the error to help indicate where an error might be occurring.

Additional error code details can be found in confluence at: https://confluence-tools.swacorp.com/pages/viewpage.action?pageId=174227549

### Akamai -

- Routes \*.southwest.com by DNS. Example: mobile.southwest.com/api/mobile-misc
- Add true-host. Adds x-offline (for mobile-offline).
- Translates urls from mobile.southwest.com/api/mobile-misc to api-mobile-misc.<env>.southwest.com.
- Load balances between PDC and SDC.

### External F5 (100-101) -

- Routes \*.swacorp.com urls (with no -int). Example: api-mobile-misc.<env>.swacorp.com
- Tokenizes credit cards (based on ITEST vs QA vs Prod) based on url called.

### Api-gateway (120) -

- Translates Authorization/X-API-IDTOKEN Headers to X-Account-Number

### Internal F5 (140) -

- Routes \*-int.<env>.swacorp.com urls. Example: api-mobile-misc-int.<env>.swacorp.com
- Requires client cert mutual auth.
- Load balances tcservers.

### Chapis (200-300) -

- Calls WAPIs via internal F5 VIPs.
- Requires client cert mutual auth.

### Wapis (400-500)

- Requires client cert mutual auth.

### Downstream (600)

- Most errors downstream from WAPIs will result in ???600??? errors.
- Calls going into Altea will detokenize credit cards based on environment called.
