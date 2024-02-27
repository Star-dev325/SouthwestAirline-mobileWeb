// @flow

import _ from 'lodash';
import React from 'react';
import cx from 'classnames';
import Icon from 'src/shared/components/icon';
import AirportList from 'src/airports/components/airportList';
import withField from 'src/shared/form/enhancers/withField';
import ClickableDiv from 'src/shared/components/clickableDiv';
import FullScreenModal from 'src/shared/components/fullScreenModal/fullScreenModal';
import { getAirportFromCode, getAirportFromAirportGroupShortDisplayName } from 'src/airports/helpers/airportsHelpers';
import {
  showFullScreenModal,
  hideFullScreenModal
} from 'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper';

import type { FieldProps } from 'src/shared/form/flow-typed/form.types';
import type { AirportType, MultiSelectGroup } from 'src/shared/flow-typed/shared.types';

type Airport = {
  code: string,
  airportName: string,
  cityState: string,
  airportGroupShortDisplayName: string,
  airportGroupSubtitle: string
};

type Props = {
  allAirports: Array<AirportType>,
  clickableClassName: string,
  containerClassName?: string,
  dataForE2E?: string,
  description?: string,
  disabled: boolean,
  horizontalLayout?: boolean,
  iconRight: boolean,
  iconType: string,
  isMultiSelectGroupEnabled: boolean,
  isReaccomCoTerminalEligible?: boolean,
  isWebView?: boolean,
  modalId: string,
  multiSelectGroup: MultiSelectGroup,
  onClick?: () => void,
  placeholder: string,
  recentlySearched: Array<AirportType>,
  updateSelectedAirportInfoFn: (airportInfo: *) => void,
  usingNativeStyle?: boolean
} & FieldProps;

class AirportSelectorField extends React.Component<Props, *> {
  static defaultProps = {
    disabled: false,
    iconRight: false,
    clickableClassName: '',
    isMultiSelectGroupEnabled: false,
    multiSelectGroup: {}
  };

  _onAirportSelect = (airport: Airport, isCurrentLocation: boolean) => {
    const { name, modalId, onChange, updateSelectedAirportInfoFn } = this.props;

    const airportInfo = {
      [name]: {
        isCurrentLocation
      }
    };

    hideFullScreenModal(modalId);

    updateSelectedAirportInfoFn(airportInfo);
    onChange(airport.code);
  };

  _shouldReduceFontSize(code) {
    const MAX_WORD_CHAR = 8;

    return code.split(' ').find((word) => word.length > MAX_WORD_CHAR);
  }

  _renderFormattedAirport(airport: Airport) {
    const { name, isMultiSelectGroupEnabled, multiSelectGroup, containerClassName } = this.props;
    const { airportName, cityState, airportGroupShortDisplayName, airportGroupSubtitle } = airport;
    const { disabled, usingNativeStyle } = this.props;
    let code = airport.code;
    let labelText = `${airportName}, ${cityState}`;

    if (isMultiSelectGroupEnabled && multiSelectGroup[name] && multiSelectGroup[name].length > 1) {
      code = airportGroupShortDisplayName;
      labelText = airportGroupSubtitle;
    }

    if (usingNativeStyle) {
      return (
        <div className={cx("form-field--text-container", containerClassName)}>
          <div
            className={cx('form-field--text', {
              'form-field--long-text': this._shouldReduceFontSize(code)
            })}
          >
            {code}
          </div>
          <div className="form-field--description">{labelText}</div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-cross-center">
          <div
            className={cx('airport-selector--formatted-airport', {
              'airport-selector--formatted-airport_disabled': disabled
            })}
          >
            {code}
          </div>
          <span className="airport-selector--airport-description">{labelText}</span>
        </div>
      );
    }
  }

  _renderPlaceholder = ({ placeholder, description }) => {
    const { usingNativeStyle, MWEB_HOMEPAGE_REDESIGN, containerClassName } = this.props;

    const placeholderClass = usingNativeStyle ? 'form-field--placeholder' : 'airport-selector--placeholder';
    const descriptionClass = usingNativeStyle ? 'form-field--description' : 'small';

    return (
      <div
        className={cx(
          {
            'form-field--text-container': usingNativeStyle,
            'airport-selector--placeholder-container py3': !usingNativeStyle
          },
          containerClassName
        )}
      >
        <div className={placeholderClass}>{placeholder}</div>
        {description && (
          <div className={descriptionClass}>
            {MWEB_HOMEPAGE_REDESIGN && (
              <Icon type="exclamation-circle" className="form-field--description-error-icon" />
            )}
            {description}
          </div>
        )}
      </div>
    );
  };

  _renderAirportLabel = () => {
    const { value, placeholder, description, allAirports, isMultiSelectGroupEnabled, multiSelectGroup, name } =
      this.props;

    if (value && allAirports !== null && allAirports.length > 0) {
      let airportData = getAirportFromCode(allAirports, value);

      if (isMultiSelectGroupEnabled && multiSelectGroup[name] && multiSelectGroup[name].length > 1) {
        airportData = getAirportFromAirportGroupShortDisplayName(allAirports, multiSelectGroup[name]);
      }

      return this._renderFormattedAirport(airportData);
    }

    return this._renderPlaceholder({ placeholder, description });
  };

  _handleSelectorClick = () => {
    const { onClick = _.noop, modalId, disabled } = this.props;

    onClick();
    !disabled && showFullScreenModal(modalId);
  };

  _renderClickableDiv = () => {
    const { iconType, iconRight, clickableClassName } = this.props;

    return (
      <ClickableDiv
        onClick={this._handleSelectorClick}
        iconType={iconType}
        iconRight={iconRight}
        className={clickableClassName}
        childClassName="ellipsis"
      >
        {this._renderAirportLabel()}
      </ClickableDiv>
    );
  };

  _renderNativeClickableDiv = () => {
    const { iconType, clickableClassName, horizontalLayout } = this.props;

    return (
      <div onClick={this._handleSelectorClick} className={cx(clickableClassName, 'form-field--container')}>
        {this._renderNativeIcon(iconType)}
        {this._renderAirportLabel()}
        {!horizontalLayout && (
          <div className="form-field--error-icon">
            <Icon type="exclamation-circle" />
          </div>
        )}
      </div>
    );
  };

  _renderNativeIcon = (iconType) => {
    if (iconType) {
      return (
        <div className="form-field--icon">
          <Icon type={iconType} />
        </div>
      );
    }

    return null;
  };

  _renderSelectorField = () => {
    const { usingNativeStyle } = this.props;

    if (usingNativeStyle) {
      return this._renderNativeClickableDiv();
    } else {
      return this._renderClickableDiv();
    }
  };

  _renderAirportList = (modalId?: string) => {
    const {
      allAirports,
      isMultiSelectGroupEnabled,
      isReaccomCoTerminalEligible,
      isWebView,
      multiSelectGroup,
      recentlySearched
    } = this.props;

    return (
      <AirportList
        allAirports={allAirports}
        disableInternationals={false}
        isMultiSelectGroupEnabled={isMultiSelectGroupEnabled}
        isReaccomCoTerminalEligible={isReaccomCoTerminalEligible}
        isWebView={isWebView}
        modalId={modalId}
        multiSelectGroup={multiSelectGroup}
        onAirportSelect={this._onAirportSelect}
        onCancel={() => hideFullScreenModal(modalId)}
        recentlySearched={recentlySearched}
        title="Select Airport"
      />
    );
  };

  render() {
    const { dataForE2E, modalId, usingNativeStyle, horizontalLayout } = this.props;

    return (
      <div
        className={`airport-selector${
          usingNativeStyle && horizontalLayout ? ' airport-selector_native-horizontal' : ''
        }`}
        data-qa={dataForE2E}
      >
        {this._renderSelectorField()}
        <FullScreenModal id={modalId}>{this._renderAirportList(modalId)}</FullScreenModal>
      </div>
    );
  }
}

export default withField()(AirportSelectorField);
