import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import prefixNamespace from "./prefixNamespace";
import { is } from "~/utils";

let init = 0;

let memoModels = [];

export default function prepareReducers(
  models = [],
  { root, reduxPersist } = {}
) {
  const { persistConfig: rootPersistConfig } = root;
  const { storage: defaultStorage, stateReconciler: defaultStateReconciler } =
    rootPersistConfig || {};
  // console.log(models);

  const [reducers, newModels] = createReducers(models);
  memoModels = newModels;
  console.log(models);
  console.log(newModels);
  // console.log(reducers);
  // return combineReducers({
  //   ...reducers
  // });

  if (reduxPersist)
    return persistReducer(
      rootPersistConfig,
      combineReducers({
        ...reducers
      })
    );
  else
    return combineReducers({
      ...reducers
    });

  function getHandleReducer(type, handles) {
    // console.log(handles);
    // console.log(type);
    if (!handles || !is.object(handles) || is.undef(type)) {
      Log.warn(`reducers is not object and type is undefined`);
      return;
    }
    return handles[type];
  }

  function getReducer(handles, beforeHandle) {
    return (state = [], action) => {
      const { type } = action;
      const handleReducer = getHandleReducer(type, handles);

      is.func(beforeHandle) && (state = beforeHandle(state, action));

      return (handleReducer && handleReducer(state, action)) || state;
    };
  }

  function getReducerWithPersist(handles, beforeHandle, persistConfig) {
    return persistReducer(
      {
        storage: defaultStorage,
        stateReconciler: defaultStateReconciler,
        ...persistConfig
      },
      (state = [], action) => {
        const { type } = action;
        const handleReducer = getHandleReducer(type, handles);

        is.func(beforeHandle) && (state = beforeHandle(state, action));

        return (handleReducer && handleReducer(state, action)) || state;
      }
    );
  }

  function createReducers() {
    const newModels = {};
    init++;

    return [
      Object.values(models).reduce((previos, model) => {
        const namespace = model.namespace;
        if (!namespace) {
          Log.error(`missing namespace of model: ${model}`);
          return previos;
        }

        const [newModel, handles, beforeHandle] = prefixNamespace(model);
        newModels[namespace] = newModel;
        const { persistConfig } = newModel;

        if (!reduxPersist || is.undef(persistConfig))
          return Object.assign(previos, {
            [namespace]: getReducer(handles, beforeHandle)
          });

        return Object.assign(previos, {
          [namespace]: getReducerWithPersist(
            handles,
            beforeHandle,
            persistConfig
          )
        });
      }, {}),
      newModels
    ];
  }
}

export const getMemoModels = () => [memoModels, init > 0];
