import { createStoreFul } from "./redux-useful";

import models, { rootModel } from "./models";

const { store, persistor } = createStoreFul(models, {
  root: rootModel,
  reduxPersist: true
});

export { store, persistor };
