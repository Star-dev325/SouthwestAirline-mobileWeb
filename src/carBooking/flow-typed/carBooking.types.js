// @flow

import type { CurrencyType } from 'src/shared/flow-typed/shared.types';
import type {
  CarReservationItineraryType,
  CarReservationDetailType
} from 'src/viewReservation/flow-typed/viewReservation.types';

export type CarCompanyType = {
  name: string,
  vendorId?: string,
  isSelected: boolean
};

export type CarVendorType = {
  name: string,
  vendorId: string,
  isRapidRewardsPartner: boolean,
  acceptedDiscounts: {
    promotionalCode?: {name: string},
    frequentRenterNumber?: {name: string},
    corporateRate?: {name: string},
  }
};

export type CarLocationResponseType = {
  airport: {
    code: string,
    airportName: string
  },
  city: string,
  state: string
};

export type PromoType = {
  vendor: string,
  type: string,
  code: string
};

export type VendorDiscountType = {
  code: string,
  type: string | Array<string>,
  vendor: string | Array<string>,
  vendorName?: string
};

export type CompanyVendorType = {
  vendorId: string,
  vendorName: string
};

type BaseSearchRequestType = {
  pickUp: string,
  dropOff: string,
  vehicleType?: string,
  vendors?: string | Array<string>
};

type SearchRequestDateTimeType = {
  pickUpDate: string,
  dropOffDate: string,
  pickUpTime: string,
  dropOffTime: string,
};

export type SearchRequestType = BaseSearchRequestType & SearchRequestDateTimeType;
export type PartialSearchRequestType = BaseSearchRequestType & $Shape<SearchRequestDateTimeType>;

export type FindCarsRequestType = SearchRequestType & {
  carCompany: string | Array<CompanyVendorType>,
  discount: Array<VendorDiscountType>,
};

export type FindCarsQueryRequestType = {
  carCode: string | Array<string>,
  carCodeType: string | Array<string>,
  carCodeVendor: string | Array<string>,
  carType: string,
  pickUpDate: string,
  pickUpLocation: string,
  pickUpTime: string,
  returnDate: string,
  returnLocation: string,
  returnTime: string,
  vendors: string | Array<CompanyVendorType>
};

export type PromoResponseType = {
  vendor: string,
  type: string,
  code: string,
  promoCodeApplied: boolean
};

export type PromoCodeType = {
  numberOfAppliedPromoCodes: number,
  notAppliedPromoCodes: Array<NotAppliedPromoType>
};

export type NotAppliedPromoType = {
  vendor: string,
  code: string,
  message: string,
  numberOfPromoCode: number
};

export type CarVendorImageType = {
  vendorName: string,
  logoImage: string,
  logoImageAltText: string
};

export type CarProductsType = {
  additionalCharges: AdditionalChargeType,
  appliedDiscounts: Array<AppliedDiscountType>,
  name: ?string,
  price: PriceType,
  productId: string,
  vehicleType: string,
  vendor: string
};

export type AdditionalChargeType = {
  dropOffChargeCents: number,
  mileage: MileageType,
  noShowFeeCents: number
};

export type MileageType = {
  cents?: string | number,
  amount?: CurrencyType,
  freeMileage: string,
  per: string
}

export type PriceType = {
  dailyRateCents: number,
  rates: Array<RateType>,
  totalCents: number,
  totalCentsWithTaxes: number
};

export type RateType = {
  cents: number,
  per: string,
  quantity: number
};

export type GroupedCarResultMapType = {[string]: CarClassResultType};

export type CarClassResultType = {
  allVehicles: Array<CarResultVehicleType>,
  isAllVendorUnavailable: boolean,
  lowestPrice: number,
  lowestPriceWithCurrencyCode: CurrencyType
};

export type CarResultVehicleType = {
  appliedDiscount: ?AppliedDiscountType,
  imageUrl: string,
  incentiveText?: ?string,
  isRapidRewardsPartner: boolean,
  isUnavailable: boolean,
  pricePerDayCents: number,
  productId: ?string,
  promoCodeApplied: boolean,
  totalCentsWithTaxes: number,
  vendorName: string,
  dailyRateWithCurrencyCode: CurrencyType,
  totalWithTaxesAndCurrencyCode: CurrencyType
};

export type AppliedDiscountType = {
  code: string,
  type: string
};

export type CarReservationType = {
  carReservationItinerary: CarReservationItineraryType,
  carReservationDetail: CarReservationDetailType
};

export type CarExtraProductType = {
  type: string,
  description: string
};

export type DriverInfoType = {
  firstName: string,
  middleName: ?string,
  lastName: string,
  accountNumber: ?string,
  type?: string
}

export type CarBookingContactInfoType = {
  confirmationEmail: ?string,
  driverIsoCountryCode: ?string,
  driverPhoneNumber: ?string
};

export type GetCarBookingLinkQueryType = {
  'pickup-location': string,
  'pickup-datetime': string,
  'return-location': string,
  'return-datetime': string
};

export type CarBookingSearchPageQueryType = {
  'carCode-0'?: string,
  'carCode-1'?: string,
  'carCodeType-0'?: string,
  'carCodeType-1'?: string,
  'carCodeVendor-0'?: string,
  'carCodeVendor-1'?: string,
  carType?: string,
  pickUpLocation?: string,
  pickUpDate?: string,
  pickUpTime?: string,
  returnLocation?: string,
  returnDate?: string,
  returnTime?: string,
  vehicleType?: string,
  vendors?: string | Array<string>
}