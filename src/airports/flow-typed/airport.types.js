// @flow

export type AirportInfoType = {
  id: string,
  display_name: string,
  airport_city_image: string,
  airport_city_alt_text: string,
  alert: AirportAlertType,
  body: Array<AirportBodyDataType>
}

type AirportAlertType = {
  active: boolean,
  icon?: string,
  title?: string,
  text?: string
}

type AirportBodyDataType = {
  title?: string,
  icon?: string,
  icon_alt_text?: string,
  heading?: string,
  text?: string
}