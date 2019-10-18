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
  }
  destroyed() {
    if (this.options.navbar_item) {
      let items = document.querySelectorAll(
        `.navbar-item[href='${this.options.navbar_item}']`
      );
      items.forEach(item => item.classList.remove("is-active"));
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = defaultTitle;
  }
  updated() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  updateTitle() {
    let hookName = this.constructor.name;
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
}

export default PageHook;
