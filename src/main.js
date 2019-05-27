import Vue from "vue";
import App from "./App.vue";
import VueYoutube from "vue-youtube";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faSearch,
  faCaretLeft,
  faCaretRight
} from "@fortawesome/free-solid-svg-icons";

library.add(faSearch, faCaretLeft, faCaretRight);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(VueYoutube);

Vue.prototype.windowLoc = window.location.href;

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
