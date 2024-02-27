// @flow

export type ChaseInstantCreditResponseType = {
  creditStatus: string,
  creditLimit: string,
  expirationDate: string,
  customer: {
    firstName: string,
    middleName: ?string,
    lastName: string,
    customerNumber: string,
    dateOfBirthFormatted: ?string,
    emailAddress: string,
    primaryAddress: {
      line1: string,
      line2: ?string,
      city: string,
      state: string,
      zipOrPostalCode: string,
      countryCode: string
    },
    phone: {
      homePhoneNumber: ?string,
      mobilePhoneNumber: ?string,
      businessPhoneNumber: ?string
    }
  }
};

export type ChasePrequalOffersParams = {
  userInfoRequired?: boolean
};

type BaseParameters = {
  SPID: string,
  CELL: string,
  chaseSessionId?: string
}

export type ChaseQueryParameters = BaseParameters & {
  clk?: string,
  datachannel?: string,
  f?: string,
  isChaseCombo?: string,
  isMwebBranchLink?: string,
  mcvid?: string,
  returnToURL?: string,
  RMID?: string,
  RR_NUMBER?: string,
  RRID?: string,
  RSD?: string,
  src?: string
}

export type ChasePrefillRequestType = BaseParameters & {
  returnToURL: string,
  isComboApp: boolean,
  appendToDAOURL: {
    clk?: string,
    datachannel: string,
    f?: string,
    mcvid: string,
    RMID?: string,
    RR_NUMBER?: string,
    RRID?: string,
    RSD?: string,
    src?: string
  }
}
