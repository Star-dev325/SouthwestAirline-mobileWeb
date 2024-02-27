import { WEBVIEW_MESSAGE_KEYS } from '@swa-ui/hybrid';
import React, { useState } from 'react';
import Button from 'src/shared/components/button';
import Form from 'src/shared/form/components/form';
import Select from 'src/shared/components/select';
import hybridMessageForms from 'src/shared/simulateHybrid/hybridMessageForms';
import hybridMessageOptions from 'src/shared/simulateHybrid/hybridMessageOptions';

const SimulateHybridForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    messageType: WEBVIEW_MESSAGE_KEYS.ROUTE_CHANGE,
    ...hybridMessageForms[WEBVIEW_MESSAGE_KEYS.ROUTE_CHANGE].defaultFormData
  });
  const { component: Component, submitFn } = hybridMessageForms[formData.messageType];

  const getButtonProps = () => ({
    color: 'yellow',
    fluid: true,
    onClick: _handleSubmit,
    role: 'submit',
    size: 'larger',
    type: 'submit'
  });

  const _handleFormChange = (newFormData) => {
    setFormData({
      ...formData,
      ...newFormData
    });
  };

  const _handleSubmit = (e) => {
    e.preventDefault();

    submitFn && submitFn(formData);
    onSubmit && onSubmit(formData);
  };

  const _handleMessageTypeChange = (messageType) => {
    setFormData({
      ...formData,
      messageType
    });
  };

  return (
    <Form>
      <div className="my4">
        <label htmlFor="message">Message</label>
        <Select 
          id="message"
          name="message"
          onChange={_handleMessageTypeChange}
          options={hybridMessageOptions}
          value={formData.messageType} />
      </div>
      <Component formData={formData} onChange={_handleFormChange} />
      <Button {...getButtonProps()}>
        Send Message
      </Button>
    </Form>
  );
};

export default SimulateHybridForm;
