// @flow
import { FlexPlacement } from '@swa-ui/placements/FlexPlacement';
import { getScaleAdjustedStyles } from '@swa-ui/placements/getScaleAdjustedStyles';
import _ from 'lodash';
import React, { useLayoutEffect, useRef } from 'react';
import { connect } from 'react-redux';
import ChaseInstantCredit from 'src/airBooking/components/chase/chaseInstantCredit';
import { fetchBootstrapData } from 'src/app/helpers/bootstrapHelper';
import LoadingShimmer from 'src/shared/components/loadingShimmer';
import BootstrapConstants from 'src/shared/constants/bootstrapConstants';
import withViewPortObserver from 'src/shared/enhancers/withViewPortObserver';
import { get } from 'src/shared/helpers/jsUtils';
import { handlePlacementLink } from 'src/wcm/actions/wcmActions';
import ImagePlacement from 'src/wcm/components/imagePlacement';
import {
  configuredCommands,
  configuredLoadingStates,
  notAbsolutelyPositioned,
  supportedElements
} from 'src/wcm/constants/flexPlacementConstants';
import { BLOCK_PLACEMENT, FLEX_PLACEMENT, LEGACY_CHASE_AD, MOBILE_HERO } from 'src/wcm/constants/wcmConstants';
import type { ChaseInstantCreditProps, FlexPlacementProps, ImagePlacementProps } from 'src/wcm/flow-typed/wcm.types';
import { getAugmentedTemplateData, getBaseTemplateData } from 'src/wcm/selectors/templateDataSelector';

type DynamicPlacementProps = FlexPlacementProps | ImagePlacementProps | ChaseInstantCreditProps;

export const DynamicPlacement = (props: DynamicPlacementProps) => {
  const [state, setState] = React.useState({ scaleFactor: 1 });
  const ref = useRef();

  useLayoutEffect(() => {
    window.addEventListener('resize', _calculateScaleFactor);

    return () => window.removeEventListener('resize', _calculateScaleFactor);
  }, []);

  useLayoutEffect(() => {
    _calculateScaleFactor();
  });

  const _getBoundingClientRect = () => {
    let boundingClientRect;

    if (ref.current && ref.current.getBoundingClientRect) {
      boundingClientRect = ref.current.getBoundingClientRect();
    }

    return boundingClientRect;
  };

  const _calculateScaleFactor = () => {
    const boundingClientRect = _getBoundingClientRect();
    const elementWidth = boundingClientRect?.width || 0;
    const placementWidth = props?.placement?.styles?.width || _getBootstrapData()?.placement?.styles?.width || '';
    const placementWidthIsInPixels = placementWidth.includes('px');

    let scaleFactor = 1;

    if (placementWidthIsInPixels) {
      const parsedPlacementWidth = parseFloat(placementWidth);

      if (parsedPlacementWidth > 0) {
        scaleFactor = elementWidth / parsedPlacementWidth || 1;
      }
    }

    if (state.scaleFactor !== scaleFactor) {
      setState({ scaleFactor });
    }
  };

  const _getBootstrapData = () =>
    (props.shouldCheckBootstrapData
      ? _.get(
        fetchBootstrapData(BootstrapConstants.CONTENT_PATH),
        `mobile-web.results.${props.placementKey ?? ''}.content`,
        {}
      )
      : {});

  const _renderDynamicPlacement = () => {
    let component = null;
    const restProps = _.omit(props, ['className, placementKey, shouldCheckBootstrapData']);

    const bootstrapPlacementProps = _getBootstrapData();
    const {
      displayType: bootstrapDisplayType,
      placement: {
        styles: bootstrapPlacementStyles,
        flexSettings: { shouldScalePlacement: bootstrapShouldScalePlacement = false } = {}
      } = {},
      placementData: { contentLoadingState: bootstrapContentLoadingState } = {}
    } = bootstrapPlacementProps;

    const shouldShowSkeletonLoading = bootstrapContentLoadingState === configuredLoadingStates.SKELETON;
    const shouldShowLoadingShimmer =
      !!props.shouldCheckBootstrapData && _.isUndefined(props.displayType) && shouldShowSkeletonLoading;

    const flexPlacementVisibilityClassName = shouldShowLoadingShimmer ? 'invisible' : 'visible';
    const flexPlacementClassName = shouldShowSkeletonLoading
      ? shouldShowLoadingShimmer
        ? 'invisible--animated'
        : 'visible--animated'
      : flexPlacementVisibilityClassName;

    const adjustedStyles = shouldShowLoadingShimmer
      ? getScaleAdjustedStyles(state.scaleFactor, bootstrapShouldScalePlacement, bootstrapPlacementStyles)
      : {};

    switch (!props.hidePlacement && (props.displayType ?? bootstrapDisplayType)) {
      case MOBILE_HERO:
      case BLOCK_PLACEMENT:
        component = <ImagePlacement {...bootstrapPlacementProps} {...restProps} />;
        break;
      case LEGACY_CHASE_AD:
        component = <ChaseInstantCredit {...bootstrapPlacementProps} {...restProps} />;
        break;
      case FLEX_PLACEMENT:
        component = (
          <FlexPlacement
            {...bootstrapPlacementProps}
            {...restProps}
            supportedElements={supportedElements}
            notAbsolutelyPositioned={notAbsolutelyPositioned}
            configuredCommands={configuredCommands}
            additionalProps={{
              templateData: getAugmentedTemplateData(
                _.isEmpty(props.baseTemplateData) ? bootstrapPlacementProps.baseTemplateData : props.baseTemplateData,
                props.additionalTemplateData,
                _.isEmpty(props.placementData) ? bootstrapPlacementProps.placementData : props.placementData
              ),
              scaleFactor: state.scaleFactor
            }}
            className={flexPlacementClassName}
          />
        );
        break;
    }

    return (
      <LoadingShimmer shouldDisplay={shouldShowLoadingShimmer} styles={adjustedStyles}>
        {component}
      </LoadingShimmer>
    );
  };

  return (
    <div className={props.className || 'dynamic-placement'} ref={ref} data-qa={props.placementName}>
      {_renderDynamicPlacement()}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  baseTemplateData: getBaseTemplateData(state),
  isWebView: ownProps.isWebView ? ownProps.isWebView : get(state, 'app.webView.isWebView')
});

const mapDispatchToProps = {
  handlePlacementLinkFn: handlePlacementLink
};

const enhancers = _.flowRight(withViewPortObserver, connect(mapStateToProps, mapDispatchToProps));

export default enhancers(DynamicPlacement);
