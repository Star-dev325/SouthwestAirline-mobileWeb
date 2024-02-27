library identifier: 'jenkins-library-continuous-integration', changelog: false

if (!env.BRANCH_NAME?.startsWith('feature/fb-') && !env.CHANGE_BRANCH?.startsWith('feature/fb-')) {
  executeSpaBuildMobile([
    dockerImage  : 'dcom/docker/javascript-build-node12:1.7.0',
    /*
     *  Uncomment the below line to disable screenshot and functional testing temporarily. This feature will only work
     *    on feature branch builds, and will throw an error for non-feature branch builds and MR builds
     */
//     disableTests: true,
    cyTestRun    : false,
    cyTestVersion: [
      'cy-test-mobile-web-air-booking': '0.4.0',
      'cy-test-mobile-web-air-cancel'  : '0.7.0',
      'cy-test-mobile-web-air-change'  : '0.4.0',
      'cy-test-mobile-web-air-checkin': '0.2.0',
      'cy-test-mobile-web-air-flight-status': '0.2.0',
      'cy-test-mobile-web-air-manage': '0.5.0',
      'cy-test-mobile-web-air-upgrade': '0.2.0',
      'cy-test-mobile-web-car-booking':'0.2.0',
      'cy-test-mobile-web-early-bird'  : '0.5.0',
      'cy-test-mobile-web-travel-funds': '0.4.0',
      'cy-test-mobile-web-upgraded-boarding':'0.1.0'
    ]
  ])
}
