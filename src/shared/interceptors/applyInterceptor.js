// @flow
const applyInterceptor = (interceptorContext: InterceptorContext) => {
  const { interceptor, next, action } = interceptorContext;

  let result = next(action);

  interceptor && (result = interceptor());

  return result;
};

export default applyInterceptor;
