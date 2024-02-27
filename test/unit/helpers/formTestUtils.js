import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import formDataReducer from 'src/shared/reducers/formDataReducer';
import withForm from 'src/shared/form/enhancers/withForm';
import errorHeaderReducer from 'src/shared/reducers/errorHeaderReducer';
import webViewReducer from 'src/shared/reducers/webViewReducer';

const TEST_FORM_ID = 'TEST_FORM_ID';

export function createMockedFormStore(initialState = {}) {
  const initialLocation = {
    pathname: '/',
    search: '',
    hash: ''
  };
  const router = (state = { location: initialLocation }) => state;
  const reducers = combineReducers({
    app: combineReducers({
      formData: formDataReducer,
      errorHeader: errorHeaderReducer,
      webView: webViewReducer
    }),
    router
  });

  return createStore(reducers, initialState);
}

export const createMockedForm = (store, options = {}) => {
  const defaultProps = {
    formData: {},
    formId: TEST_FORM_ID
  };
  const FormComponent = (props) => (
    <form
      onSubmit={props.onSubmit}
    >
      {props.children}
    </form>
  );

  FormComponent.propTypes = {
    onSubmit: PropTypes.func.isRequired
  };
  const ConnectedForm = withForm(options)(FormComponent);

  return class MockedForm extends React.Component {
    render() {
      return (
        <Provider store={store}>
          <ConnectedForm {..._.assign(defaultProps, this.props)}>
            {this.props.children}
          </ConnectedForm>
        </Provider>
      );
    }
  };
};
