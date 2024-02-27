'use strict';

const _ = require('lodash');

const CheckInRetrieveBoardingPassBuilder = require('test/builders/apiResponse/v1/mobile-air-operations/page/check-in/checkInRetrieveBoardingPassBuilder');

let index = 1;

module.exports = {
  path: '/chapi/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass',
  method: 'POST',
  cache: false,
  render(req, res) {
    const { recordLocator } = req.body;
    const { travelerID } = req.body;

    if (recordLocator === 'VDWE69') {
      if (index % 2 === 0) {
        return res.send(new CheckInRetrieveBoardingPassBuilder().withMultipleBoardingPasses().build());
      }
      index++;
      res.status(400).send({
        code: 400511157,
        message: 'Your session has expired',
        messageKey: 'ERROR__AIR_TRAVEL__TOKEN__INVALID_OR_EXPIRED',
        httpStatusCode: 'BAD_REQUEST',
        requestId: '2613b2ce-a806-4a26-b499-c32f07602ded:ED8SW_gES-OU5qxumU6Faw:mweb',
        infoList: []
      });
    } else if (travelerID && travelerID[0] !== '123' && travelerID.length === 1) {
      const _travelerID = travelerID[0];

      if (_travelerID === '0000000000000001') {
        res.send(
          new CheckInRetrieveBoardingPassBuilder()
            .withMobileBoardingPass({
              passenger: {
                name: {
                  lastName: 'WANG',
                  firstName: 'HELEN',
                  middleName: null
                }
              }
            })
            .build()
        );
      } else if (_travelerID === '0000000000000002') {
        res.send(
          new CheckInRetrieveBoardingPassBuilder()
            .withMobileBoardingPass({
              passenger: {
                name: {
                  lastName: 'TERRIS',
                  firstName: 'ANDREW',
                  middleName: null
                }
              }
            })
            .build()
        );
      } else if (_travelerID === '0000000000000003') {
        res.send(
          new CheckInRetrieveBoardingPassBuilder()
            .withMobileBoardingPass({
              passenger: {
                name: {
                  lastName: 'Bobster',
                  firstName: 'Bob',
                  middleName: null
                }
              }
            })
            .build()
        );
      }
    } else if (travelerID && travelerID.length === 3) {
      res.send(
        new CheckInRetrieveBoardingPassBuilder()
          .withMobileBoardingPass({
            passenger: {
              name: {
                lastName: 'WANG',
                firstName: 'HELEN',
                middleName: null
              },
              travelerId: '0000000000000001'
            }
          })
          .withAdditionalMobileBoardingPass({
            passenger: {
              name: {
                lastName: 'TERRIS',
                firstName: 'ANDREW',
                middleName: null
              },
              travelerId: '0000000000000002'
            }
          })
          .withAdditionalMobileBoardingPass({
            passenger: {
              name: {
                lastName: 'Bobster',
                firstName: 'Bob',
                middleName: null
              },
              travelerId: '0000000000000003'
            }
          })
          .build()
      );
    } else if (travelerID && _.isEqual(travelerID, ['0000000000000001', '0000000000000003'])) {
      res.send(
        new CheckInRetrieveBoardingPassBuilder()
          .withMobileBoardingPass({
            passenger: {
              name: {
                lastName: 'WANG',
                firstName: 'HELEN',
                middleName: null
              },
              travelerId: '0000000000000001'
            }
          })
          .withAdditionalMobileBoardingPass({
            passenger: {
              name: {
                lastName: 'Bobster',
                firstName: 'Bob',
                middleName: null
              },
              travelerId: '0000000000000003'
            }
          })
          .build()
      );
    } else {
      res.send(new CheckInRetrieveBoardingPassBuilder().withMultipleBoardingPasses().build());
    }
  }
};
