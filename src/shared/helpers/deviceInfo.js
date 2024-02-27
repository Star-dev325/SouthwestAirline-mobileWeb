import UAParserFactory from 'ua-parser-js';

const UAParser = UAParserFactory();

export default {
  os: UAParser.os,
  device: UAParser.device,
  browser: UAParser.browser
};
