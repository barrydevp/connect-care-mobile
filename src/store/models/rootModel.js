import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { AsyncStorage } from "react-native";
import { createExpirationTransform } from "~/utils";

export default {
  persistConfig: {
    key: "root",
    storage: AsyncStorage,
    transforms: [
      createExpirationTransform.keyInProperty(
        {
          expireKey: "expiresAt",
          defaultState: () => ({
            // status: true
          })
        },
        {
          whitelist: ["auth"]
        }
      )
    ],
    stateReconciler: autoMergeLevel2,
    whitelist: ["login", "auth"]
  }
};
