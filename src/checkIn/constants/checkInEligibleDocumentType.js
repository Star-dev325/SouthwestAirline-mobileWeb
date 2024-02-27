import _ from 'lodash';

const CheckInEligibleDocumentType = {
  isEligible(documentType) {
    return _.includes(CheckInEligibleDocumentType.list, documentType);
  },
  list: {
    BOARD_PASS: 'boardingPass',
    SPECIAL_SECURITY_DOCUMENT: 'specialSecurityDocument',
    SECURITY_DOCUMENT: 'securityDocument',
    CLEARED: 'cleared'
  }
};

export default CheckInEligibleDocumentType;
