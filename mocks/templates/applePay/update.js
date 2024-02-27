module.exports = (amount) => ({
  ErrorMessages: [],
  IpAddress: '65.170.41.5',
  PaymentMethods: [
    {
      CPDToken: 'NzA6ODA0Nzg0MDo1QTVCNUYwMUU2MUMyMjBDNjgxNDU3QkQxN0EwMUJGODA3RkEyQzEzRTk1MjYxNUQ5QjQ3OTc1NDgwMzQ3OUMy',
      PaymentMethod: 'ApplePay',
      Provider: 'CPD',
      MethodAvailable: true,
      Parameters: {},
      ProviderData: {
        '?xml': {
          '@version': '1.0',
          '@encoding': 'UTF-8'
        },
        root: {
          'client-config': {
            '@account': '100830',
            '@auto-capture': 'false',
            '@enable-cvv': 'false',
            '@id': '10083',
            '@max-stored-cards': '-1',
            '@mode': '1',
            '@store-card': '3',
            name: 'UATP5',
            'callback-url': 'https://hpp-uat-01.cellpointmobile.net/views/sign-test.php',
            'accept-url': 'http://mpoint.uat-01.cellpointmobile.net/_test/mmi/index.html',
            'cancel-url': 'https://hpp-uat-01.cellpointmobile.net/views/index.html',
            'app-url': null,
            'css-url': 'https://devcpmassets.s3-ap-southeast-1.amazonaws.com/marchant/amadeus/style.css',
            'logo-url': 'https://cpmassets.s3-ap-southeast-1.amazonaws.com/marchant/UATP/website_UATPLogo.png',
            'base-image-url': 'https://s3-ap-southeast-1.amazonaws.com/cpmassets/payment/icons',
            'additional-config': {
              property: [
                {
                  '@name': 'HPP_HOST_URL',
                  '#text': 'mobile.dev2.southwest.com'
                },
                {
                  '@name': 'APPLEPAY_JS_URL',
                  '#text': 'https://cpmassets.s3-ap-southeast-1.amazonaws.com/wn/1.2/applepay.js'
                },
                {
                  '@name': 'APPLEPAY_MERCHANT_DOMAIN',
                  '#text': 'mobile.dev2.southwest.com'
                }
              ]
            },
            accounts: {
              account: {
                '@id': '100830',
                '@markup': 'html5'
              }
            }
          },
          transaction: {
            '@auto-capture': 'false',
            '@eua-id': '-1',
            '@id': '8047840',
            '@language': 'us',
            '@mode': '1',
            '@order-no': '',
            '@type-id': '30',
            amount: {
              '@alpha2code': 'US',
              '@alpha3code': 'USA',
              '@code': '840',
              '@country-id': '200',
              '@currency': 'USD',
              '@currency-id': '840',
              '@decimals': '2',
              '@format': '{CURRENCY}{PRICE}',
              '@symbol': '',
              '#text': `${amount}`
            },
            'callback-url': 'https://hpp-uat-01.cellpointmobile.net/views/sign-test.php',
            'accept-url': 'http://mpoint.uat-01.cellpointmobile.net/_test/mmi/index.html',
            'cancel-url': 'https://hpp-uat-01.cellpointmobile.net/views/index.html'
          },
          session: {
            '@id': '168234',
            '@total-amount': `${amount}`,
            '@type': '1',
            amount: {
              '@alpha2code': 'US',
              '@alpha3code': 'USA',
              '@code': '840',
              '@country-id': '200',
              '@currency': 'USD',
              '@currency-id': '840',
              '@format': '{CURRENCY}{PRICE}',
              '@symbol': '',
              '#text': `${amount}`
            }
          },
          cards: {
            card: {
              '@cvc-length': '-1',
              '@cvcmandatory': 'false',
              '@dcc': 'false',
              '@enabled': 'true',
              '@id': '15',
              '@installment': '0',
              '@max-length': '-1',
              '@min-length': '-1',
              '@payment-type': '3',
              '@preferred': 'false',
              '@processor-type': '3',
              '@psp-id': '18',
              '@state-id': '1',
              '@type-id': '15',
              name: 'Apple Pay',
              prefixes: {
                prefix: {
                  min: '0',
                  max: '0'
                }
              },
              url: {
                '@method': 'overlay'
              },
              head: '<script type=\'text/javascript\'> var debug = false; var countryCode = "US"; var currencyCode = "USD"; var merchantIdentifier = \'merchant.com.southwest.iphone.qa\'; var displayName ="UATP5"; var totalAmount = "302.98"; var supportedNetword = [\'MASTERCARD\',\'VISA\',\'AMEX\',\'DISCOVER\']; </script> <script type="text/javascript" src="https://cpmassets.s3-ap-southeast-1.amazonaws.com/wn/1.2/applepay.js"></script> <style> #applePay{width:150px;height:50px;display:none;border-radius:5px;background-image:-webkit-named-image(apple-pay-logo-white);background-position:50% 50%;background-color:#000;background-size:60%;background-repeat:no-repeat} </style>',
              body: '<button type="button" id="applePay"></button>',
              '#text': 'Apple Pay'
            }
          },
          wallets: {
            card: {
              '@cvc-length': '-1',
              '@cvcmandatory': 'false',
              '@dcc': 'false',
              '@enabled': 'true',
              '@id': '15',
              '@installment': '0',
              '@max-length': '-1',
              '@min-length': '-1',
              '@payment-type': '3',
              '@preferred': 'false',
              '@processor-type': '3',
              '@psp-id': '18',
              '@state-id': '1',
              '@type-id': '15',
              name: 'Apple Pay',
              prefixes: {
                prefix: {
                  min: '0',
                  max: '0'
                }
              },
              url: {
                '@method': 'overlay'
              },
              head: '<script type=\'text/javascript\'> var debug = false; var countryCode = "US"; var currencyCode = "USD"; var merchantIdentifier = \'merchant.com.southwest.iphone.qa\'; var displayName ="UATP5"; var totalAmount = "302.98"; var supportedNetword = [\'MASTERCARD\',\'VISA\',\'AMEX\',\'DISCOVER\']; </script> <script type="text/javascript" src="https://cpmassets.s3-ap-southeast-1.amazonaws.com/wn/1.2/applepay.js"></script> <style> #applePay{width:150px;height:50px;display:none;border-radius:5px;background-image:-webkit-named-image(apple-pay-logo-white);background-position:50% 50%;background-color:#000;background-size:60%;background-repeat:no-repeat} </style>',
              body: '<button type="button" id="applePay"></button>',
              '#text': 'Apple Pay'
            }
          }
        }
      },
      IpAddress: '65.170.41.5',
      Status: 'OK',
      StatusCode: 200,
      ErrorMessages: null,
      TransactionId: 99591
    }
  ],
  Status: 'OK',
  StatusCode: 200
});
