module.exports = {
  success: true,
  errors: [],
  results: {
    noRouteExistsHawaii: {
      modDate: 1534885518562,
      index: 'content-service-placements-idx-dev4-v8',
      id: 'jl2vkbfy',
      crDate: 1534884461062,
      type: 'mobile-error',
      lang: 'en',
      pubDate: 1534885493509,
      expDate: null,
      content: {
        displayType: 'mobile-error',
        errorTitle: 'Test: Trying to get to Hawaii?',
        errorDescription:
          "We'd love to get you there, but this route cannot be booked online. Call 1-800-I-FLY-SWA or tap below to learn more.",
        buttons: [
          {
            buttonText: 'Test: Learn More',
            target: 'https://www.southwest.com/html/air/newservicehawaii.html',
            linkType: 'webview'
          },
          {
            buttonText: 'Test: Call 1-800-I-FLY-SWA',
            target: 'tel:1-800-435-9792',
            linkType: 'tel'
          },
          {
            buttonText: 'OK',
            target: null,
            linkType: 'cancel'
          }
        ]
      },
      revision: 5
    }
  }
};
