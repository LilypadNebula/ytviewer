import Vue from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSearch, faCaretDown } from "@fortawesome/free-solid-svg-icons";

library.add(faSearch, faCaretDown);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.prototype.windowLoc = window.location.origin;

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
