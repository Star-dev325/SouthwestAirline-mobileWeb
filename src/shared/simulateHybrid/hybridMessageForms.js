import { WEBVIEW_MESSAGE_KEYS } from '@swa-ui/hybrid';
import RouteChangeForm from 'src/shared/simulateHybrid/components/routeChangeForm';
import { simulateRouteChange } from 'src/shared/simulateHybrid/webViewSimulator';

export default {
  [WEBVIEW_MESSAGE_KEYS.ROUTE_CHANGE]: {
    component: RouteChangeForm,
    defaultFormData: { payload: '', route: '' },
    submitFn: (formData) => simulateRouteChange(formData.route, formData.payload)
  }
};
