// @flow
export type LoginFormDataType = {
  userNameOrAccountNumber: ?string,
  password: ?string,
  shouldRememberUser?: boolean
}

export type RapidRewardsInfoDataType = {
  product_feature: {
    product_heading: string,
    product_description: string,
    product_attributes: Array<*>,
    product_tagline: string
  }
}
