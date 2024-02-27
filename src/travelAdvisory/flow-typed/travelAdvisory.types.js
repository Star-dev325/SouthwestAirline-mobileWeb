// @flow

export type TravelAdvisoryType = {
  id: string,
  advisoryTitle: string,
  advisoryInfo: string,
  stationInfo?: Array<StationInfoType>
};

export type StationInfoType = {
  station: string,
  stationDetails: string
}
