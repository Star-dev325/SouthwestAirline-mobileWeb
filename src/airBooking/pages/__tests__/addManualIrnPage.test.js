import { integrationRender } from 'test/unit/helpers/testingLibraryUtils';
import { AddManualIrnPage as AddManualIrnPageClass } from 'src/airBooking/pages/addManualIrnPage';
import { AIR_BOOKING_ADD_MANUAL_IRN } from 'src/shared/constants/formIds';
import * as analyticsEventHelper from 'src/shared/analytics/helpers/analyticsEventHelper';
import * as AppSelector from 'src/shared/selectors/appSelector';
import React from 'react';

describe('AddManualIrn', () => {
  let pushMock;
  let goBackMock;
  let onSubmitMock;
  let updateSelectedIrnFnMock;

  describe('when _handleDone is called', () => {
    beforeEach(() => {
      pushMock = jest.fn();
      goBackMock = jest.fn();
      onSubmitMock = jest.fn();
      updateSelectedIrnFnMock = jest.fn();
      jest.spyOn(analyticsEventHelper, 'raiseSatelliteEvent');
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call push function', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow')
        .mockReturnValueOnce('air/booking');
      const instance = React.createRef();

      createComponent({ instance });

      instance.current._onSubmit({ manualIrn: 'ManualIrnName' });

      expect(updateSelectedIrnFnMock).toHaveBeenCalledWith('ManualIrnName', true);
      expect(pushMock).toHaveBeenCalledWith('/air/booking/purchase.html?clearFormData=false');
    });

    it('should fire the analytics satellite event with add irn', () => {
      const instance = React.createRef();

      createComponent({ instance });

      instance.current.componentDidMount();

      expect(analyticsEventHelper.raiseSatelliteEvent).toHaveBeenCalledWith('add irn');
    });
  });

  const createComponent = (props = {}) =>
    integrationRender()({}, AddManualIrnPageClass, {
      formId: AIR_BOOKING_ADD_MANUAL_IRN,
      goBack: goBackMock,
      onSubmit: onSubmitMock,
      push: pushMock,
      selectedIrn: { name: 'mockIrn', manuallyEntered: true },
      updateSelectedIrnFn: updateSelectedIrnFnMock,
      ...props
    });
});
