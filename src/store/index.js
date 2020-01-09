import createStoreFul from "./redux-useful/createStoreFul";

import models from "./models";

const { store, persistor } = createStoreFul(models)

export { store, persistor };
