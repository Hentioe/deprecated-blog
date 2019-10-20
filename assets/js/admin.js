// Styles
import "../scss/admin.scss";
// Polyfills
import "mdn-polyfills/CustomEvent";
import "mdn-polyfills/String.prototype.startsWith";
import "mdn-polyfills/Array.from";
import "mdn-polyfills/NodeList.prototype.forEach";
import "mdn-polyfills/Element.prototype.closest";
import "mdn-polyfills/Element.prototype.matches";
import "child-replace-with-polyfill";
import "url-search-params-polyfill";
import "formdata-polyfill";
import "classlist-polyfill";
// Materialize
import "../node_modules/materialize-css/dist/js/materialize.min";
// Phoenix
import "phoenix_html";
import { Socket } from "phoenix";
import LiveSocket from "phoenix_live_view";
// ./admin/
import "./admin/materialize-event";
import PageHook from "./admin/page-hook";

class DashboardPage extends PageHook {}
class ArticlePage extends PageHook {
  mounted() {
    super.mounted();
    let navLink = document.querySelector(
      `nav li > a[href="${this.options.pathname}"]`
    );
    if (navLink) {
      navLink.parentNode.classList.add("active");
    }
  }
  
  destroyed(){
    super.destroyed();
    let navLink = document.querySelector(
      `nav li > a[href="${this.options.pathname}"]`
    );
    if (navLink) {
      navLink.parentNode.classList.remove("active");
    }
  }
}
class AddArticlePage extends ArticlePage {}
class EditArticlePage extends ArticlePage {}

const Hooks = {
  DashboardPage: new DashboardPage(),
  AddArticlePage: new AddArticlePage(),
  EditArticlePage: new EditArticlePage()
};

let liveSocket = new LiveSocket("/live", Socket, { hooks: Hooks });
liveSocket.connect();
