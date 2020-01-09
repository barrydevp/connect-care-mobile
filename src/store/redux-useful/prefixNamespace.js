import { _, is, Log } from "~/utils";
import CONSTANTS from "./constants";

function prefix(value, namespace, type) {
  // if(!is.object(value)) return ;

  return Object.keys(value).reduce((memo, key) => {
    // Log.warn(
    //   `[prefixNamespace]: ${type} ${key} should not be prefixed with namespace ${namespace}`
    // );
    const newKey = `${namespace}${CONSTANTS.NAMESPACE_SEP}${key}`;
    memo[newKey] = value[key];
    return memo;
  }, {});
}

export default function prefixNamespace(model) {
  const newModel = _.clone(model);
  const { namespace, reducers, /* sagas, */ persistConfig } = newModel;
  let handles, beforeHandle;

  if (!namespace) {
    Log.error(`missing namespace of model: ${model}`);
    return;
  }

  if (is.object(reducers) || is.array(reducers)) {
    const cloneReducers = _.cloneDeep(reducers);

    if (is.object(reducers)) {
      handles = prefix(cloneReducers, namespace, "reducer");
      newModel.reducers = handles;
    } else {
      handles = prefix(cloneReducers[0], namespace, "reducer");
      beforeHandle = cloneReducers[1];
      // newModel.reducers[0] = handles;
      newModel.reducers = [handles, beforeHandle];
    }
  } else {
    Log.error(`reducers is not Object or Array`);
  }

  if (
    is.undef(persistConfig) ||
    !is.object(persistConfig) ||
    _.isEmpty(persistConfig)
  ) {
    newModel.persistConfig = undefined;
  } else {
    newModel.persistConfig.key = namespace;
  }

  // if (sagas && is.object(sagas)) {
  //   model.sagas = prefix(sagas, namespace, "sagas");
  // }

  return [newModel, handles, beforeHandle];
}
