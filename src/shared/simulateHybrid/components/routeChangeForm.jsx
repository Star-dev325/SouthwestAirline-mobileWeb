import React from 'react';
import Input from 'src/shared/components/input';
import TextArea from 'src/shared/components/textArea';

const RouteChangeForm = ({
  formData: { payload, route },
  onChange
}) => {
  const _handleRouteChange = (e) => {
    const newRoute = e.target.value;

    onChange && onChange({
      route: newRoute,
      payload
    });
  };

  const _handlePayloadChange = (e) => {
    const newPayload = e.target.value;

    onChange && onChange({
      route,
      payload: newPayload
    });
  };

  return (
    <>
      <div className="my4">
        <label htmlFor="route">Route</label>
        <Input id="route" name="route" onChange={_handleRouteChange} value={route} />
      </div>
      <div className="my4">
        <label htmlFor="payload">Payload</label>
        <TextArea id="payload" name="payload" onChange={_handlePayloadChange} value={payload} />
      </div>
    </>
  );
};

export default RouteChangeForm;
