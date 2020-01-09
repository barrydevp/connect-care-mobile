import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import prepareReducers from "./prepareReducers";
import prepareRootSaga from "./prepareRootSaga";
import prepareInitialState from "./prepareInitialState";
import { is } from "~/utils";

import defaultRoot from "./defaultRoot";

const defaultOptions = { root: defaultRoot, reduxPersist: true };

export default function createStoreFul(models, options = defaultOptions) {
  let { root, reduxPersist } = options;
  root ||
    (root = {
      defaultRoot,
      ...root
    });

  reduxPersist = !!reduxPersist;

  const { persistConfig: rootPersistConfig } = root;
  const { storage, stateReconciler } = rootPersistConfig || {};

  if (is.object(rootPersistConfig)) {
    if (!storage || !stateReconciler) {
      reduxPersist = false;
    }
  } else {
    reduxPersist = false;
  }

  const reducers = prepareReducers(models, { root, reduxPersist });
  const rootSagas = prepareRootSaga(models);
  const initialState = prepareInitialState(models);

  // console.log("reducers:", reducers);
  // console.log("rootSagas:", rootSagas);
  // console.log("initialState:", initialState);

  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(sagaMiddleware)
  );

  if (reduxPersist) {
    const persistor = persistStore(store);
    sagaMiddleware.run(rootSagas);

    return { store, persistor };
  } else {
    sagaMiddleware.run(rootSagas);

    return { store };
  }
}
