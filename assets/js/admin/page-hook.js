import Url from "url";
import Preload from "../lib/preload";

const preload = new Preload("#page-loading-progress");
preload.play();

const defaultOptions = {};
const defaultTitle = document.title;

class PageHook {
  constructor(options = defaultOptions) {
    this.options = Object.assign({ ...defaultOptions }, options);
    this.updateTitle = this.updateTitle.bind(this);
    this.pageName = this.pageName.bind(this);
    this.removeActive = this.removeActive.bind(this);
    this.navActive = this.navActive.bind(this);
  }
  mounted() {
    this.navActive();
    this.updateTitle();
    preload.display();
  }
  destroyed() {
    this.removeActive();
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = defaultTitle;
    preload.play();
  }

  disconnected() {
    preload.play();
  }
  reconnected() {
    preload.display();
  }
  updated() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    preload.display();
  }
  navActive(cache = true) {
    let pathname = this.options.pathname;
    if (!pathname || !cache) {
      const url = Url.parse(location.href);
      pathname = url.pathname;
    }
    if (cache) {
      this.options.pathname = pathname;
    }
    let elems = document.querySelectorAll(
      `.sidenav li > a[href="${pathname}"]`
    );
    elems.forEach(elem => {
      elem.parentNode.classList.add("active");
      let collapsibleElem = elem.closest(".collapsible");
      if (collapsibleElem) {
        M.Collapsible.getInstance(collapsibleElem).open();
      }
    });
  }

  removeActive(useCache = true) {
    let pathname = this.options.pathname;
    if (!useCache) {
      const url = Url.parse(location.href);
      pathname = url.pathname;
    }
    let elems = document.querySelectorAll(
      `.sidenav li > a[href="${pathname}"]`
    );
    elems.forEach(elem => {
      elem.parentNode.classList.remove("active");
    });
  }
  updateTitle() {
    let hookName = this.pageName();
    let container = document.querySelector(
      `.container[phx-hook='${hookName}']`
    );
    let title = defaultTitle;
    if (container != null) {
      let subtitle = container.getAttribute("bl-title");
      if (subtitle != null) {
        title = `${subtitle} · ${defaultTitle}`;
      }
    }
    document.title = title;
  }

  pageName() {
    return this.constructor.name;
  }
}

export default PageHook;
