import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { AsyncStorage } from "react-native";
import { Log, is, createExpirationTransform } from "~/utils";
import _ from "lodash";

const NAMESPACE_SEP = "/";

let init = 0;

let memoModels = [];

export default function(models = []) {
  // console.log(models);
  const rootPersistConfig = {
    key: "root",
    storage: AsyncStorage,
    transforms: [
      createExpirationTransform.keyInProperty(
        {
          expireKey: "expiresAt",
          defaultState: () => ({
            status: true
          })
        },
        {
          whitelist: ["login"]
        }
      )
    ],
    // whitelist: ["x-auth-key"],
    // blacklist: ["login"],
    stateReconciler: autoMergeLevel2
  };
  const [reducers, newModels] = createReducers(models);
  memoModels = newModels;
  console.log(models);
  console.log(newModels);
  // console.log(reducers);
  // return combineReducers({
  //   ...reducers
  // });
  return persistReducer(
    rootPersistConfig,
    combineReducers({
      ...reducers
    })
  );
}

export const getMemoModels = () => [memoModels, init > 0];

function getHandleReducer(type, reducers) {
  // console.log(reducers);
  // console.log(type);
  if (!reducers || !is.object(reducers) || is.undef(type)) {
    Log.warn(`---reducers is undefined or not object and type is undefined`);
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
    // Log.warn(
    //   `[prefixNamespace]: ${type} ${key} should not be prefixed with namespace ${namespace}`
    // );
    const newKey = `${namespace}${NAMESPACE_SEP}${key}`;
    memo[newKey] = value[key];
    return memo;
  }, {});
}

function prefixNamespace(model) {
  const newModel = _.clone(model);
  const { namespace, reducers, /* sagas, */ persistConfig } = newModel;

  if (!namespace) {
    Log.error(`missing namespace of model: ${model}`);
    return;
  }

  if (reducers && is.object(reducers)) {
    const cloneReducers = _.cloneDeep(reducers);
    newModel.reducers = prefix(cloneReducers, namespace, "reducer");
  }

  if (persistConfig) {
    newModel.persistConfig.key = namespace;
  } else {
    newModel.persistConfig = { key: namespace };
  }

  // if (sagas && is.object(sagas)) {
  //   model.sagas = prefix(sagas, namespace, "sagas");
  // }

  return newModel;
}

function createReducers(models = []) {
  const newModels = {};
  init++;

  return [
    Object.values(models).reduce((previos, model) => {
      // console.log(previos);
      // console.log(model);
      const namespace = model.namespace;
      if (!namespace) {
        Log.error(`missing namespace of model: ${model}`);
        return previos;
      }

      const newModel = prefixNamespace(model);
      newModels[namespace] = newModel;
      const { reducers, persistConfig } = newModel;

      if (is.undef(persistConfig) || !is.object(persistConfig))
        return Object.assign(previos, {
          [namespace]: getReducer(reducers)
        });

      return Object.assign(previos, {
        [namespace]: getReducerWithPersist(reducers, persistConfig)
      });
    }, {}),
    newModels
  ];
}
