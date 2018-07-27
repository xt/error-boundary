import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';

// a prefix for all the session storage keys to keep it unique and in scope for easy identification
const prefix = 'aso';

/**
 * Static class to do the read/write to session storage. Reading from cookies
 */
class Storage {
  constructor() {
    throw new Error('Cannot construct SessionStorage');
  }

  /**
   * This function sets the data to session storage per the key provided
   * @param {String} key The key to set into session storage
   * @param {Object} value The value to be set against the key in session storage
   */
  static setSessionStorage(key, value) {
    if (!ExecutionEnvironment.canUseDOM) return;
    window.sessionStorage.setItem(`${prefix}_${key}`, value);
  }

  /**
   * This function gets the value/data from session storage based on the key provided.
   * @param {String} key The key identifier to get data from session storage
   */
  static getSessionStorage(key) {
    if (!ExecutionEnvironment.canUseDOM) return;
    return window.sessionStorage.getItem(`${prefix}_${key}`); // eslint-disable-line
  }

  /**
   * This function removes the session storage key and its data
   * @param {String} key The key identifier to remove data from session storage
   */
  static removeSessionStorage(key) {
    if (!ExecutionEnvironment.canUseDOM) return;
    window.sessionStorage.removeItem(`${prefix}_${key}`);
  }

  /**
   * This function is able to get the cookie data based on the cookie name provided.
   * If the cookie name not found, it will return blank string.
   * @param {*} cName
   */
  static getCookie(cName) {
    if (!ExecutionEnvironment.canUseDOM) return '';
    const name = `${cName}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cArr = decodedCookie.split(';');
    for (let i = 0; i < cArr.length; i += 1) {
      let c = cArr[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }
/**
 * Function to set a cookie
 * @param {String} key
 * @param {String} value
 * @param {String} expiry
 */
  static setCookie(key, value, expiry) {
    if (!ExecutionEnvironment.canUseDOM) return;
    const expires = expiry ? `expires=${expiry}` : '';
    document.cookie = `${key}=${value};${expires};path=/`;
  }
}

export default Storage;
