import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { AsyncStorage } from "react-native";

import { Log, is } from "~/utils";

const NAMESPACE_SEP = "/";

export default models => {
  const rootPersistConfig = {
    key: "root",
    storage: AsyncStorage
  };
  const reducers = createReducers(models);

  // return combineReducers({
  //   ...reducers
  // });
  return persistReducer(
    rootPersistConfig,
    combineReducers({
      ...reducers
    })
  );
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

function getReducerWithPersist(reducers, persistConfig) {
  return persistReducer(
    {
      storage: AsyncStorage,
      stateReconciler: autoMergeLevel2,
      ...persistConfig
    },
    (state = [], action) => {
      const { type } = action;

      const handleReducer = getHandleReducer(type, reducers);

      return (handleReducer && handleReducer(state, action)) || state;
    }
  );
}

function prefix(value, namespace, type) {
  // if(!is.object(value)) return ;

  return Object.keys(value).reduce((memo, key) => {
    Log.warn(
      `[prefixNamespace]: ${type} ${key} should not be prefixed with namespace ${namespace}`
    );
    const newKey = `${namespace}${NAMESPACE_SEP}${key}`;
    memo[newKey] = value[key];
    return memo;
  }, {});
}

function prefixNamespace(model) {
  const { namespace, reducers, sagas, persistConfig } = model;

  if (!namespace) {
    Log.error(`missing namespace of model: ${model}`);
    return;
  }

  if (reducers) {
    model.reducers = prefix(reducers, namespace, "reducer");
  }

  if (persistConfig) {
    model.persistConfig.key = namespace;
  } else {
    model.persistConfig = { key: namespace };
  }

  if (sagas) {
    model.sagas = prefix(sagas, namespace, "sagas");
  }

  return model;
}

function createReducers(models = []) {
  return Object.values(models).reduce((previos, model) => {
    const namespace = model.namespace;
    if (!namespace) {
      Log.error(`missing namespace of model: ${model}`);
      return previos;
    }

    const newModel = prefixNamespace(model);
    const { reducers, persistConfig } = newModel;

    Object.assign(previos, {
      // [namespace]: getReducer(reducers, persistConfig)
      [namespace]: getReducerWithPersist(reducers, persistConfig)
    });
  }, {});
}
