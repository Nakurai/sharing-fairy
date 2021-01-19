import { createStore } from "vuex";
import app from "./app.store";
import peers from "./peers.store";
import files from "./files.store";
import groups from "./groups.store";
export default createStore({
  modules: {
    app,
    peers,
    files,
    groups,
  },
});
