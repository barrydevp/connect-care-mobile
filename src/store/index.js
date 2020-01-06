import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import prepareReducers from "./prepareReducers";
import prepareRootSaga from "./prepareRootSaga";

import models from "./models";

const reducers = prepareReducers(models);
const rootSagas = prepareRootSaga(models);

const sagaMiddleware = createSagaMiddleware();

export default createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSagas);