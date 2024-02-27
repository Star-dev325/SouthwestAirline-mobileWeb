// @flow

import * as CeptorJs from 'ceptor-js';

import type {
  CeptorAFPConfigWithValidationFn,
  CeptorConfig,
  CeptorExtensionResponse
} from 'src/shared/flow-typed/shared.types';

export default class CeptorWrapper {
  static instance = new CeptorJs.CeptorWrapper();

  static createInstance = ({
    ceptorConfigParams,
    requestedAFPParams,
    validationFn
  }: CeptorAFPConfigWithValidationFn = {}) => {
    const wrapper = new CeptorJs.CeptorWrapper();

    wrapper.setConfigParams(ceptorConfigParams);
    wrapper.setAFPParams(requestedAFPParams);
    wrapper.setupValidationCallback(validationFn);

    CeptorWrapper.instance = wrapper;

    return wrapper;
  };

  static createBaseInstance = ({ ceptorConfigParams }: CeptorConfig = {}) => {
    const wrapper = new CeptorJs.CeptorWrapper();

    wrapper.setConfigParams(ceptorConfigParams);

    CeptorWrapper.instance = wrapper;

    return wrapper;
  };

  static getInstance = () => {
    const wrapper = CeptorWrapper.instance;

    return wrapper;
  };

  static extension = {};

  static setExtension = (extension: CeptorExtensionResponse) => {
    CeptorWrapper.extension = extension;
  };

  static getExtension = () => CeptorWrapper.extension;
}
