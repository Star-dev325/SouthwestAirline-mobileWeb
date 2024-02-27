import _ from 'lodash';
import BrowserObject from 'src/shared/helpers/browserObject';

const { document } = BrowserObject;

const post = (formProps, params) => {
  const createForm = () => {
    const form = document.createElement('form');
    const { target } = formProps;

    form.setAttribute('method', formProps.method || 'POST');
    form.setAttribute('action', formProps.path);

    if (target) {
      form.setAttribute('target', target);
    }

    return form;
  };

  const createSubmitButton = () => {
    const submitButton = document.createElement('input');

    submitButton.setAttribute('type', 'submit');
    submitButton.setAttribute('style', 'display: none;');
    submitButton.setAttribute('value', 'submitButton');

    return submitButton;
  };

  const createInput = (key, value) => {
    const input = document.createElement('input');

    input.setAttribute('type', 'hidden');
    input.setAttribute('name', key);
    input.setAttribute('value', value);

    return input;
  };

  if (formProps && formProps.path) {
    const form = createForm();

    _.each(params, (value, key) => {
      form.appendChild(createInput(key, params[key]));
    });

    form.appendChild(createSubmitButton());
    document.body.appendChild(form);
    form.submit();
    form.parentNode.removeChild(form);
  }
};

export default post;
