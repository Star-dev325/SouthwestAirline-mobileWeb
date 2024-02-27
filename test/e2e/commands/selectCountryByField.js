const selectCountryByField = function(field, countryNameAndCode) {
  return this
    .clickVisible(field)
    .clickByText('.country-list-item-container', countryNameAndCode);
};

module.exports.command = selectCountryByField;
