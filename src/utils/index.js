import * as Message from "./message";
import Validator from "./validator";
import request from "./request";
import * as is from "./is";
import * as Log from "./log";
import * as CP from "./convertPercent";

const returnTrue = () => true;
const returnUndef = () => {};

if (!__DEV__) {
  Object.keys(is).forEach(key => {
    is[key] = returnTrue;
  });
  Object.keys(Log).forEach(key => {
    Log[key] = returnUndef;
  });
}

export { Message, Validator, request, is, Log, CP };
