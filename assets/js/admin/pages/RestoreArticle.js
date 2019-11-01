import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { initGFAB } from "../slices/global-fab";
import { PageComponent, Page } from "../lib/page";
import {
  NON_NORMAL_STATUS,
  DRAFT_OPERATION,
  RECYCLE_OPERATION,
  RESTORE_OPERATION,
  fetchArticles,
  changeArticle,
  deleteArticle
} from "../actions";

class RestoreArticle extends PageComponent {
  constructor(props) {
    super(props);
    this.state = {
      status: NON_NORMAL_STATUS
    };
  }

  componentDidMount() {
    super.componentDidMount();
    const { dispatch } = this.props;
    const { status } = this.state;
    dispatch(initGFAB());
    dispatch(fetchArticles(status));
    this.initMaterializeEvent();
  }

  componentDidUpdate(prevProps, prevState, _snapshot) {
    let { dispatch, items, isChanging } = this.props;
    const { status } = this.state;
    if (prevProps.items != items) this.initMaterializeEvent();
    if (isChanging !== prevProps.isChanging && !isChanging)
      dispatch(fetchArticles(status));
  }

  componentWillUnmount() {
    super.componentWillUnmount();
  }

  handleNormal = (id, e) => {
    const { dispatch } = this.props;
    dispatch(changeArticle(id, RESTORE_OPERATION));
  };
  handleDelete = (id, e) => {
    const { dispatch } = this.props;
    dispatch(deleteArticle(id));
  };

  handleDraft = (id, e) => {
    const { dispatch } = this.props;
    dispatch(changeArticle(id, DRAFT_OPERATION));
  };

  handleRecycle = (id, e) => {
    const { dispatch } = this.props;
    dispatch(changeArticle(id, RECYCLE_OPERATION));
  };

  initMaterializeEvent = () => {
    M.Dropdown.init(
      document.querySelectorAll(`#${this.constructor.name} .dropdown-trigger`),
      {}
    );
  };

  render() {
    let { items } = this.props;
    return (
      <Page className="container" id={this.constructor.name}>
        <div className="section">
          <div className="z-depth-1 white">
            <div>
              <span>过滤器：</span>
              <label>
                <input
                  name="location"
                  type="radio"
                  className="with-gap"
                  defaultChecked
                />
                <span>全部（非正常状态）</span>
              </label>
              <label>
                <input name="location" type="radio" className="with-gap" />
                <span>草稿箱</span>
              </label>
              <label>
                <input name="location" type="radio" className="with-gap" />
                <span>回收站</span>
              </label>
            </div>
            <table className="highlight responsive-table">
              <thead>
                <tr>
                  <th>标题</th>
                  <th>SLUG</th>
                  <th>位置</th>
                  <th>菜单</th>
                </tr>
              </thead>

              <tbody>
                {items.map(a => (
                  <tr key={a.id}>
                    <td>{a.title}</td>
                    <td>{a.slug}</td>
                    <td>
                      {a.status === -1 ? "回收站" : ""}
                      {a.status === 0 ? "草稿箱" : ""}
                      {a.status !== 0 && a.status !== -1 ? "未知" : ""}
                    </td>
                    <td>
                      <a
                        className="dropdown-trigger btn"
                        href="#"
                        data-target={`menu-${a.id}`}
                      >
                        操作
                      </a>
                      <ul id={`menu-${a.id}`} className="dropdown-content">
                        <li>
                          <Link to={`/admin/articles/edit/${a.id}`}>编辑</Link>
                        </li>
                        <li>
                          <a href="#" onClick={e => this.handleNormal(a.id, e)}>
                            还原
                          </a>
                        </li>
                        <li>
                          {a.status !== 0 ? (
                            <a
                              href="#"
                              onClick={e => this.handleDraft(a.id, e)}
                            >
                              草稿箱
                            </a>
                          ) : null}
                          {a.status === 0 ? (
                            <a
                              href="#"
                              onClick={e => this.handleRecycle(a.id, e)}
                            >
                              回收站
                            </a>
                          ) : null}
                        </li>
                        <li className="divider" tabIndex="-1"></li>
                        <li>
                          <a href="#" onClick={e => this.handleDelete(a.id, e)}>
                            删除
                          </a>
                        </li>
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return state.articles;
};

export default connect(mapStateToProps)(RestoreArticle);
