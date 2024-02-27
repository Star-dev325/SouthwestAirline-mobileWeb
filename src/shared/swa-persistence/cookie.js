// @flow
import BrowserObject from 'src/shared/helpers/browserObject';

const { document } = BrowserObject;

export const getValue = (name: string) => {
  const cookies = '; '.concat(document.cookie);
  const parts = cookies.split('; '.concat(name, '='));
  let value = null;

  if (parts.length === 2) {
    value = _decodedValue(parts.pop().split(';').shift());
  }

  return value;
};

export const setValue = (name: string, value: string, daysToExpire?: number) => {
  let expires = '';

  if (daysToExpire) {
    const date = new Date();

    date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }

  document.cookie = `${name}=${value}${expires}`;
};

const _decodedValue = (value: string) => decodeURIComponent(value.replace(/\+/g, ' '));

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; Domain=${window.location.hostname}; Max-Age=0; Path=/; Secure; Version=1;`;
};
