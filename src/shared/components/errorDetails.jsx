// @flow
import React, { useEffect, useState } from 'react';

type Props = {
  error: string,
  errorInfo: *
};

const ErrorDetails = (props: Props) => {
  const { error, errorInfo } = props;
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    window.addEventListener('keyup', displayOnShiftF10); // NOSONAR

    return () => {
      window.removeEventListener('keyup', displayOnShiftF10); // NOSONAR
    };
  }, []);

  return hidden ? null : (
    <pre style={{ whiteSpace: 'pre-wrap' }}>
      {error && error.toString()}
      {errorInfo?.componentStack}
    </pre>
  );

  function displayOnShiftF10(event) {
    if (event.keyCode === 121 && event.shiftKey) {
      setHidden((isHidden) => !isHidden);
    }
  }
};

export default ErrorDetails;
