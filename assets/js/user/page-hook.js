import Progress from "../lib/progress";
const bar = new Progress("#progressbar");
bar.connecting(0.1);
const defaultOptions = {
  // 选中的导航栏子项
  navbar_item: null
};
const defaultTitle = document.title;

class PageHook {
  constructor(options = defaultOptions) {
    this.options = Object.assign({ ...defaultOptions }, options);
    this.updateTitle = this.updateTitle.bind(this);
  }
  mounted() {
    if (this.options.navbar_item) {
      let items = document.querySelectorAll(
        `.navbar-item[href='${this.options.navbar_item}']`
      );
      items.forEach(item => item.classList.add("is-active"));
    }
    this.updateTitle();
    bar.finished();
  }
  destroyed() {
    bar.connecting(0.5);
    if (this.options.navbar_item) {
      let items = document.querySelectorAll(
        `.navbar-item[href='${this.options.navbar_item}']`
      );
      items.forEach(item => item.classList.remove("is-active", "breathe"));
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = defaultTitle;
  }

  disconnected() {
    bar.connecting(0.25);
  }
  reconnected() {
    bar.finished();
  }
  updated() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    bar.finished();
  }
  updateTitle() {
    const container = this.getContainer();
    let title = defaultTitle;
    if (container != null) {
      let subtitle = container.getAttribute("bl-title");
      if (subtitle != null) {
        title = `${subtitle} · ${defaultTitle}`;
      }
    }
    document.title = title;
  }

  getContainer = () => {
    return document.querySelector(
      `.container[phx-hook='${this.constructor.name}']`
    );
  };
}

export default PageHook;
