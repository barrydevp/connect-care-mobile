import * as sagaEffects from "redux-saga/effects";
import { Log, is } from "~/utils";

const defaultOnError = error => {
  Log.error(error);
};

const defaultType = "takeEvery";

export default function prepareRootSaga(models = [], { onError, onEffect } = { onError: defaultOnError }) {
  return function*() {
    const allSagas = createRootSagas();

    // console.log(allSagas);

    yield sagaEffects.all(allSagas);
  };

  function createWatcherSaga(saga) {
    let type, effect;

    if(is.array(saga)) {
      effect = saga[0];
      type = saga[1];
    } else {
      effect = saga;
      type = defaultType;
    }
    
    switch(type) {
      case "takeLast":
    }
  }

  function createRootSagas() {
    return Object.values(models).reduce((previous, model) => {
      console.log(model);
      const sagas = model.sagas;

      if (!is.object(sagas) && !is.array(sagas)) {
        Log.warn(`sagas is not object or array`);

        return previous;
      }

      const activeSagas = Object.values(sagas).map(saga => saga());

      return previous.concat(activeSagas);
    }, []);
  }
}
