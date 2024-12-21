import {Dimensions, PixelRatio} from 'react-native';

const {width, height} = Dimensions.get('window');

const deviceWidth = number => {
  let givenWidth = typeof number === 'number' ? number : parseFloat(number);
  return PixelRatio.roundToNearestPixel((width * givenWidth) / 100);
};

const deviceHeight = number => {
  let givenHeight = typeof number === 'number' ? number : parseFloat(number);
  return PixelRatio.roundToNearestPixel((height * givenHeight) / 100);
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const assignValue = (obj, keyPath, value, isPush) => {
  let lastKeyIndex = keyPath.length - 1;
  for (var i = 0; i < lastKeyIndex; ++i) {
    let key = keyPath[i];
    if (!(key in obj)) {
      obj[key] = {};
    }
    obj = obj[key];
  }
  if (isPush) {
    obj[keyPath[lastKeyIndex]].push(value);
  } else {
    obj[keyPath[lastKeyIndex]] = value;
  }
};

const log = (...args) => {
  if (config.debug) {
    console.log(...args);
  }
};

const logJson = (...args) => {
  if (config.debug) {
    console.log(JSON.stringify(...args, null, 2));
  }
};

const isValidUrl = urlString => {
  var urlPattern = new RegExp(
    '^(https?:\\/\\/)?' + // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // validate fragment locator
  return !!urlPattern.test(urlString);
};

const getValidUrl = (url = '') => {
  let newUrl = window.decodeURIComponent(url);
  newUrl = newUrl.trim().replace(/\s/g, '');

  if (/^(:\/\/)/.test(newUrl)) {
    return `http${newUrl}`;
  }
  if (!/^(f|ht)tps?:\/\//i.test(newUrl)) {
    return `http://${newUrl}`;
  }
  return newUrl;
};

export {
  sleep,
  assignValue,
  log,
  logJson,
  getValidUrl,
  isValidUrl,
  deviceWidth,
  deviceHeight,
};
