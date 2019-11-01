import React from "react";
import { connect } from "react-redux";
import { initGFAB } from "../slices/global-fab";
import { PageComponent, Page } from "../lib/page";
import {
  NORMAL_STATUS,
  PIN_OPERATION,
  UNPIN_OPERATION,
  DRAFT_OPERATION,
  RECYCLE_OPERATION,
  fetchArticles,
  changeArticle
} from "../actions";

class OperationArticle extends PageComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    super.componentDidMount();
    const { dispatch } = this.props;
    dispatch(initGFAB());
    dispatch(fetchArticles(NORMAL_STATUS));
    this.initMaterializeEvent();
  }

  componentDidUpdate(prevProps, prevState, _snapshot) {
    let { dispatch, items, isChanging } = this.props;
    if (prevProps.items != items) this.initMaterializeEvent();
    if (isChanging !== prevProps.isChanging && !isChanging)
      dispatch(fetchArticles(NORMAL_STATUS));
  }

  componentWillUnmount() {
    super.componentWillUnmount();
  }

  handlePin = (id, e) => {
    const { dispatch } = this.props;
    dispatch(changeArticle(id, PIN_OPERATION));
  };

  handleUnpin = (id, e) => {
    const { dispatch } = this.props;
    dispatch(changeArticle(id, UNPIN_OPERATION));
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
            <table className="highlight responsive-table">
              <thead>
                <tr>
                  <th>标题</th>
                  <th>SLUG</th>
                  <th>类别</th>
                  <th>菜单</th>
                </tr>
              </thead>

              <tbody>
                {items.map(a => (
                  <tr key={a.id}>
                    <td>{a.title}</td>
                    <td>{a.slug}</td>
                    <td>{a.category.name}</td>
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
                          <a href="#">编辑</a>
                        </li>
                        <li>
                          {Date.parse(a.pinned_at) === 0 ? (
                            <a href="#" onClick={e => this.handlePin(a.id, e)}>
                              置顶
                            </a>
                          ) : (
                            <a
                              href="#"
                              onClick={e => this.handleUnpin(a.id, e)}
                            >
                              取消置顶
                            </a>
                          )}
                        </li>
                        <li className="divider" tabIndex="-1"></li>
                        <li>
                          <a href="#" onClick={e => this.handleDraft(a.id, e)}>
                            草稿箱
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            onClick={e => this.handleRecycle(a.id, e)}
                          >
                            回收站
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

export default connect(mapStateToProps)(OperationArticle);
