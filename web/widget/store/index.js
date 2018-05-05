import * as actions from "./actions";
import database from "./modules/database";
export
default new Vuex.Store({
    actions,
    modules: {
        database,
    },
});