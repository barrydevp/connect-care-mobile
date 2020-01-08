import { createTransform } from "redux-persist";
import traverse from "traverse";
import * as is from "./is";

const PERSIST_EXPIRE_DEFAULT_KEY = "persistExpiresAt";

function dateToUnix(date) {
  // console.log(date);
  return +(date.getTime() / 1000).toFixed(0);
}

export const keyIsProperty = function(config, transformOptions) {
  config = config || {};
  config.expireKey = config.expireKey || PERSIST_EXPIRE_DEFAULT_KEY;
  config.defaultState = config.defaultState || {};

  function inbound(state) {
    if (!state) return state;

    return state;
  }

  function outbound(state, key) {
    if (!state || key !== config.expireKey) return state;

    const expireDate = state;

    if (!expireDate || !is.date(expireDate)) {
      return state;
    }

    let validState = state;

    if (dateToUnix(new Date(expireDate)) < dateToUnix(new Date())) {
      validState =
        (is.func(config.defaultState) && config.defaultState(state)) ||
        config.defaultState;
    }

    return validState;
  }

  return createTransform(inbound, outbound, transformOptions);
};

export const keyInProperty = function(config, transformOptions) {
  config = config || {};
  config.expireKey = config.expireKey || PERSIST_EXPIRE_DEFAULT_KEY;
  config.defaultState = config.defaultState || {};

  function inbound(state) {
    if (!state) return state;

    return state;
  }

  function outbound(state) {
    // console.log(state);
    if (!state) return state;

    const validState = traverse(state).forEach(function(value) {
      if (!value || !is.object(value)) {
        return;
      }

      if (!value.hasOwnProperty(config.expireKey)) {
        return;
      }

      const expireDate = value[config.expireKey];

      if (!expireDate || !is.date(expireDate)) {
        return;
      }

      if (dateToUnix(new Date(expireDate)) < dateToUnix(new Date())) {
        // console.log(config.defaultState(state));
        this.update(
          (is.func(config.defaultState) && config.defaultState(state)) ||
            config.defaultState
        );
      }
    });

    // console.log(validState);

    return validState;
  }

  return createTransform(inbound, outbound, transformOptions);
};
