import React from "react";
import Url from "url";

class PageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.options = {};
  }

  componentDidMount() {
    this.navActive();
    this.headerNavAction();
    this.materializeInit();
  }
  componentWillUnmount() {
    this.removeActive();
    this.removeHeaderAction();
  }

  headerNavAction() {
    let navLink = document.querySelector(
      `nav li > a[href="${this.options.pathname}"]`
    );
    if (navLink) {
      navLink.parentNode.classList.add("active");
    }
  }

  removeHeaderAction() {
    let navLink = document.querySelector(
      `nav li > a[href="${this.options.pathname}"]`
    );
    if (navLink) {
      navLink.parentNode.classList.remove("active");
    }
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

  materializeInit() {
    let pageSelect = `#${this.constructor.name}`;
    M.FormSelect.init(document.querySelectorAll(`${pageSelect} select`), {});
    M.Tabs.init(document.querySelectorAll(`${pageSelect} .tabs`), {});
    M.Chips.init(document.querySelectorAll(`${pageSelect} .chips`), {});
    M.FloatingActionButton.init(
      document.querySelectorAll(`${pageSelect} .fixed-action-btn`),
      {}
    );
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function Page(props) {
  return (
    <div className={props.className} id={props.id}>
      {props.children}
    </div>
  );
}

export { PageComponent, Page };
