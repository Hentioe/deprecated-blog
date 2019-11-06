import React from "react";
import { Link } from "react-router-dom";

class Sidenav extends React.Component {
  constructor(props) {
    super(props);
    this.sidenav = React.createRef();
  }

  componentDidMount() {
    M.Sidenav.init(this.sidenav.current, {});
    M.Collapsible.init(document.querySelectorAll(".collapsible"), {});
  }
  render() {
    return (
      <ul id="slide-out" ref={this.sidenav} className="sidenav sidenav-fixed">
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
          <Link className="sidenav-close" to="/admin">
            数据统计
            <i className="material-icons red-text">insert_chart</i>
          </Link>
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
                    <Link className="sidenav-close" to="/admin/articles/add">
                      新增文章
                      <i className="material-icons blue-text">note_add</i>
                    </Link>
                  </li>
                  <li>
                    <Link className="sidenav-close" to="/admin/articles/edit">
                      编辑文章
                      <i className="material-icons green-text">edit</i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="sidenav-close"
                      to="/admin/articles/operation"
                    >
                      附加操作
                      <i className="material-icons">view_headline</i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="sidenav-close"
                      to="/admin/articles/restore"
                    >
                      恢复文章
                      <i className="material-icons">restore</i>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </li>
        <li>
          <Link className="sidenav-close" to="/admin/categories">
            分类整理
            <i className="material-icons yellow-text">view_module</i>
          </Link>
        </li>
        <li>
          <Link className="sidenav-close" to="/admin/tags">
            标签整理
            <i className="material-icons">view_module</i>
          </Link>
        </li>
        <li>
          <a className="sidenav-close">
            评论管理
            <i className="material-icons teal-text text-accent-3">view_list</i>
          </a>
        </li>
        <li>
          <div className="divider"></div>
        </li>
        <li>
          <Link className="sidenav-close" to="/admin/redirections">
            重定向
            <i className="material-icons">view_list</i>
          </Link>
        </li>
        <li>
          <a className="sidenav-close">
            设置
            <i className="material-icons">settings</i>
          </a>
        </li>
      </ul>
    );
  }
}

export default Sidenav;
