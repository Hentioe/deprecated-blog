import React from "react";
import { connect } from "react-redux";
import {
  fetchCategories,
  fetchArticles,
  fetchArticle,
  createArticle,
  updateArticle
} from "../actions";

const textAreaStyles = {
  height: "380px",
  maxHeight: "380px",
  overflowY: "auto"
};

const ADD_ACTION = "send";
const EDIT_ACTION = "save";

class PushArticle extends React.Component {
  constructor(props) {
    super(props);
    this.categorySelect = React.createRef();
    this.articleSelect = React.createRef();
    this.state = {
      editingArticle: {
        id: 0,
        title: "",
        slug: "",
        content: "",
        category_id: 0,
        comment_permissions: 0
      }
    };
  }

  componentDidMount() {
    const { action, dispatch } = this.props;
    dispatch(fetchCategories());
  }

  componentDidUpdate(prevProps, prevState, _snapshot) {
    let {
      dispatch,
      action,
      isLoaded,
      isCategoriesLoaded,
      article
    } = this.props;
    let { editingArticle } = this.state;

    // 类别列表加载完毕再加载文章列表
    if (
      isCategoriesLoaded !== prevProps.isCategoriesLoaded &&
      isCategoriesLoaded
    ) {
      if (action == EDIT_ACTION) dispatch(fetchArticles());
    }

    if (isLoaded !== prevProps.isLoaded && isLoaded) {
      this.setState({
        editingArticle: Object.assign({}, article)
      });
    }
    if (editingArticle.id != prevState.editingArticle.id) {
      M.updateTextFields();
    }
    M.AutoInit();
  }

  handlePush = e => {
    let { editingArticle } = this.state;
    let { action, dispatch } = this.props;

    switch (action) {
      case ADD_ACTION:
        dispatch(createArticle(editingArticle));
        break;
      case EDIT_ACTION:
        dispatch(updateArticle(editingArticle));
        break;
      default:
      // 错误动作提示
    }
  };

  handleEditArticleIdChange = e => {
    const { dispatch } = this.props;
    dispatch(fetchArticle(parseInt(e.target.value)));
  };

  handleCategoryIdChange = e => {
    this.setState({
      editingArticle: Object.assign(this.state.editingArticle, {
        category_id: parseInt(e.target.value)
      })
    });
  };

  handleTitleChange = e => {
    this.setState({
      editingArticle: Object.assign(this.state.editingArticle, {
        title: e.target.value
      })
    });
  };

  handleSlugChange = e => {
    this.setState({
      editingArticle: Object.assign(this.state.editingArticle, {
        slug: e.target.value.toLowerCase()
      })
    });
  };

  handleContentChange = e => {
    this.setState({
      editingArticle: Object.assign(this.state.editingArticle, {
        content: e.target.value
      })
    });
  };

  render() {
    let { action, categories, articles } = this.props;
    let { editingArticle: e } = this.state;
    return (
      <form className="z-depth-1 white">
        <div className="row">
          {action == EDIT_ACTION ? (
            <div className="input-field col s12">
              <select
                value={e.id}
                onChange={this.handleEditArticleIdChange}
                refs={this.articleSelect}
              >
                <option value={-1}>待选择（总数：{articles.length}）</option>
                {articles.map(a => (
                  <option key={a.id} value={a.id}>
                    {a.title}
                  </option>
                ))}
              </select>
              <label>编辑目标</label>
            </div>
          ) : null}
          <div className="input-field col s12">
            <input
              id="title"
              type="text"
              value={e.title}
              onChange={this.handleTitleChange}
            />
            <label htmlFor="title">标题</label>
          </div>
          <div className="input-field col s12 m6">
            <input
              id="slug"
              type="text"
              value={e.slug}
              onChange={this.handleSlugChange}
            />
            <label htmlFor="slug">SLUG</label>
          </div>
          {/* 类别选择 */}
          <div className="input-field col s12 m6">
            <select
              value={e.category_id}
              onChange={this.handleCategoryIdChange}
              refs={this.categorySelect}
            >
              <option value={-1}>待选择（总数：{categories.length}）</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <label>类别</label>
          </div>
          <div className="col s12">
            <ul className="tabs">
              <li className="tab col s6">
                <a className="active" href="#edit">
                  编辑
                </a>
              </li>
              <li className="tab col s6">
                <a href="#preview">预览</a>
              </li>
            </ul>
          </div>
          <div id="edit" className="col s12">
            <div className="input-field">
              <textarea
                style={textAreaStyles}
                id="content"
                className="materialize-textarea"
                placeholder="请输入内容……"
                value={e.content}
                onChange={this.handleContentChange}
              ></textarea>
            </div>
          </div>
          <div id="preview" className="col s12">
            <div className="browser-default">
              <h3 className="browser-default">我是预览结果</h3>
              <p>我是预览内容。</p>
            </div>
          </div>
          <div className="input-field chips chips-initial col s12">
            <input className="input" placeholder="添加标签…" />
          </div>
          <div className="input-field col s6">
            <select multiple defaultValue={[0]}>
              <option value="0" disabled>
                选择附加
              </option>
              <option value="1">置顶</option>
              <option value="2">草稿</option>
            </select>
            <label>附加选项</label>
          </div>
          <div className="input-field col s6">
            <select defaultValue="0">
              <option value="0">未选择（开放）</option>
              <option value="1">审核匿名</option>
              <option value="2">审核所有</option>
              <option value="3">禁止匿名</option>
              <option value="4">禁止所有</option>
            </select>
            <label>评论权限</label>
          </div>
        </div>
        <div id="push-article-fab" className="fixed-action-btn">
          <a
            className="btn-floating btn-large waves-effect waves-light blue"
            onClick={this.handlePush}
          >
            <i className="material-icons">{this.props.action}</i>
          </a>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  const {
    isLoaded: isCategoriesLoaded,
    apiError: categoriesApiError,
    items: categories
  } = state.categories;
  const {
    isLoaded: isArticlesLoaded,
    apiError: articlesApiError,
    items: articles
  } = state.articles;

  let attachState = {
    isCategoriesLoaded,
    categoriesApiError,
    categories,
    isArticlesLoaded,
    articlesApiError,
    articles
  };
  return {
    ...state.pushArticle,
    ...attachState
  };
};

export default connect(mapStateToProps)(PushArticle);
