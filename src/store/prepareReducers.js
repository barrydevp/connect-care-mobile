import { combineReducers } from "redux";

const NAMESPACE_SEP = "/";

export default models => {
  const reducers = createReducers(models);

  return combineReducers({
    ...reducers
  });
};

function getHandleReducer(type, reducers) {
  if (!reducers) {
    Log.warn(`reducers is undefined`);
    return;
  }
  return reducers[type];
}

function getReducer(reducers) {
  return (state = [], action) => {
    const { type } = action;

    const handleReducer = getHandleReducer(type, reducers);

    return (handleReducer && handleReducer(state, action)) || state;
  };
}

function prefix(obj, namespace, type) {
  return Object.keys(obj).reduce((memo, key) => {
    Log.warn(
      `[prefixNamespace]: ${type} ${key} should not be prefixed with namespace ${namespace}`
    );
    const newKey = `${namespace}${NAMESPACE_SEP}${key}`;
    memo[newKey] = obj[key];
    return memo;
  }, {});
}

function prefixNamespace(model) {
  const { namespace, reducers, sagas } = model;

  if (reducers) {
    model.reducers = prefix(reducers, namespace, "reducer");
  }

  if (sagas) {
    model.sagas = prefix(sagas, namespace, "sagas");
  }

  return model;
}

function createReducers(models = []) {
  return Object.values(models).reduce(
    (previos, model) => {
      const namespace = model.namespace;
      if (namespace) {
        Log.error(`missing namespace of model: ${model}`);
        return previos;
      }

      Object.assign(previos, {
        [namespace]: getReducer(prefixNamespace(model))
      });
    },

    {}
  );
}
