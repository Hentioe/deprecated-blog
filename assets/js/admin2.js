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

import React from "react";
import ReactDOM from "react-dom";

const progressStyle = {
  margin: 0,
  position: "fixed",
  top: 0,
  visibility: "hidden"
};

class AppPage extends React.Component {
  render() {
    return (
      <div>
        <header>
          <div
            id="page-loading-progress"
            className="progress"
            style={progressStyle}
          >
            <div className="indeterminate"></div>
          </div>
          <nav>
            <div className="nav-wrapper">
              <a className="brand-logo right">
                <i className="material-icons">notifications</i>
              </a>
              <ul id="nav-mobile">
                <li>
                  <a data-target="slide-out" className="sidenav-trigger">
                    <i className="material-icons">menu</i>
                  </a>
                </li>
                <li>
                  <a>写文</a>
                </li>
                <li>
                  <a>续更</a>
                </li>
              </ul>
            </div>
          </nav>
        </header>
        <ul id="slide-out" className="sidenav sidenav-fixed">
          <li>
            <div className="user-view blue lighten-1">
              <a>
                <img className="circle" src="/images/avatar.png" />
              </a>
              <a>
                <span className="name white-text">Hentioe</span>
              </a>
              <a>
                <span className="email white-text">me@bluerain.com</span>
              </a>
            </div>
          </li>
          <li>
            <a className="sidenav-close">
              数据统计
              <i className="material-icons red-text">insert_chart</i>
            </a>
          </li>
          <li>
            <div className="divider"></div>
          </li>
          <li className="no-padding">
            <ul className="collapsible collapsible-accordion">
              <li>
                <a className="collapsible-header">
                  文章管理<i className="material-icons">folder</i>
                </a>
                <div className="collapsible-body">
                  <ul>
                    <li>
                      <a className="sidenav-close">
                        新增文章
                        <i className="material-icons blue-text">note_add</i>
                      </a>
                    </li>
                    <li>
                      <a className="sidenav-close">
                        编辑文章
                        <i className="material-icons green-text">edit</i>
                      </a>
                    </li>
                    <li>
                      <a href="#!">
                        恢复文章
                        <i className="material-icons">restore</i>
                      </a>
                    </li>
                    <li>
                      <a href="#!">
                        附加操作
                        <i className="material-icons">view_headline</i>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </li>
          <li>
            <a className="sidenav-close">
              分类整理
              <i className="material-icons yellow-text">view_module</i>
            </a>
          </li>
          <li>
            <a className="sidenav-close">
              标签整理
              <i className="material-icons">view_module</i>
            </a>
          </li>
          <li>
            <a className="sidenav-close">
              评论管理
              <i className="material-icons teal-text text-accent-3">
                view_list
              </i>
            </a>
          </li>
          <li>
            <div className="divider"></div>
          </li>
          <li>
            <a className="sidenav-close">
              设置
              <i className="material-icons">settings</i>
            </a>
          </li>
        </ul>
        <div
          id="global-action-btn"
          className="fixed-action-btn"
          style={{ userSelect: "none" }}
        >
          <a className="btn-floating btn-large">
            <i className="large material-icons deep-orange lighten-1">
              restaurant_menu
            </i>
          </a>
          <ul>
            <li>
              <a className="btn-floating teal accent-3">
                <i className="material-icons">view_list</i>
              </a>
            </li>
            <li>
              <a className="btn-floating yellow darken-1">
                <i className="material-icons">view_module</i>
              </a>
            </li>
            <li>
              <a className="btn-floating green">
                <i className="material-icons">edit</i>
              </a>
            </li>
            <li>
              <a className="btn-floating blue">
                <i className="material-icons">note_add</i>
              </a>
            </li>
          </ul>
        </div>
        <main>内容。</main>
      </div>
    );
  }
}

ReactDOM.render(<AppPage />, document.getElementById("app"));
