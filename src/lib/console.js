import colors from 'colors';
// const weblogger = require('../webLog/logger');

// custom console
export const red = (...str) => {
  // weblogger.debug(str.join(' '));
  console.log(colors.red(str.join(' ')));
};

export const green = (...str) => {
  // weblogger.debug(str.join(' '));
  console.log(colors.green(str.join(' ')));
};

export const yellow = (...str) => {
  // weblogger.debug(str.join(' '));
  console.log(colors.yellow(str.join(' ')));
};

export const cyan = (...str) => {
  // weblogger.debug(str.join(' '));
  console.log(colors.cyan(str.join(' ')));
};

export const gray = (...str) => {
  // weblogger.debug(str.join(' '));
  console.log(colors.gray(str.join(' ')));
};

export const grey = (...str) => {
  // weblogger.debug(str.join(' '));
  console.log(colors.grey(str.join(' ')));
};
