




import {init_app} from "./common/init-app.js";
import { toggleBtn} from "./common/export-nodes.js";
import { modeChange } from "./__light-dark-mode-change/__light-dark-mode-change__btn.js";


/* initialize application with default features */
init_app();


toggleBtn.addEventListener("click", () => {

  modeChange();

})
