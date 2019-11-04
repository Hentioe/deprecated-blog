import React from "react";
import { connect } from "react-redux";
import {
  fetchCategories,
  fetchArticles,
  fetchArticle,
  createArticle,
  updateArticle,
  previewArticle,
  fetchTags,
  createTag
} from "../actions";
import { pushingArticle } from "../slices/push-article";

const textAreaStyles = {
  height: "380px",
  maxHeight: "380px",
  overflowY: "auto"
};

const ADD_ACTION = "send";
const EDIT_ACTION = "save";

const DRAFTED_ATTACH = "DRAFT_ATTACH";
const PINNED_ATTACH = "PINNED_ATTACH";

class PushArticle extends React.Component {
  constructor(props) {
    super(props);
    this.categorySelect = React.createRef();
    this.articleSelect = React.createRef();
    this.attachSelect = React.createRef();
    this.tagChips = React.createRef();

    this.state = {
      editingArticle: {
        id: 0,
        title: "",
        slug: "",
        content: "",
        tags: [],
        category_id: 0,
        comment_permissions: 0
      }
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCategories());
    dispatch(fetchTags());
    M.Chips.init(this.tagChips.current, {
      autocompleteOptions: {
        data: {
          你好: null
        },
        limit: Infinity,
        minLength: 1
      },
      onChipAdd: this.handleTagChipAdd
    });
  }

  componentDidUpdate(prevProps, prevState, _snapshot) {
    let {
      dispatch,
      action,
      apiError,
      isPushing,
      isLoaded,
      isCategoriesLoaded,
      isArticlesLoaded,
      isTagsLoaded,
      tags,
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
    // 标签列表加载完毕，重置 Chips 的自动完成数据
    if (isTagsLoaded != prevProps.isTagsLoaded && isTagsLoaded) {
      let data = {};
      tags.forEach(t => (data[`${t.name} (${t.slug})`] = null));

      M.Chips.init(this.tagChips.current, {
        autocompleteOptions: {
          data,
          limit: Infinity,
          minLength: 1
        },
        onChipAdd: this.handleTagChipAdd
      });
    }
    // 让标签列表和 Chips 组件数据同步
    if (editingArticle.tags.length != prevState.editingArticle.tags.length) {
      const tagIdList = editingArticle.tags.map(t => t.id);
      const data = editingArticle.tags.map(t => ({ tag: t.name, id: t.id }));
      let autocompleteData = {};
      tags
        .filter(t => !tagIdList.includes(t.id))
        .forEach(t => (autocompleteData[`${t.name} (${t.slug})`] = null));

      M.Chips.init(this.tagChips.current, {
        data,
        autocompleteOptions: {
          data: autocompleteData,
          limit: Infinity,
          minLength: 1
        },
        onChipAdd: this.handleTagChipAdd,
        onChipDelete: this.handleTagChipDelete
      });
    }

    // 文章列表加载完毕根据可能传递的 id 加载文章
    if (isArticlesLoaded !== prevProps.isArticlesLoaded && isArticlesLoaded) {
      const id = this.props.id;
      if (id) dispatch(fetchArticle(id));
    }

    // 文章加载完毕，赋给正在编辑的对象
    if (isLoaded !== prevProps.isLoaded && isLoaded) {
      this.setState({
        editingArticle: Object.assign({}, article)
      });
    }

    // 切换文章
    if (editingArticle.id != prevState.editingArticle.id) {
      M.updateTextFields();
    }

    // 推送失败
    if (!isPushing && apiError.type === pushingArticle.type) {
      console.log(apiError.errors);
      M.toast({ html: "文章推送失败了" });
    }

    M.FormSelect.init(this.categorySelect.current, {});
    M.FormSelect.init(this.articleSelect.current, {});
    M.FormSelect.init(this.attachSelect.current, {});
  }

  handleTagChipDelete = (chipsNode, chipNode) => {
    const tagChips = M.Chips.getInstance(this.tagChips.current);
    const tags = tagChips.chipsData.map(t => ({ id: t.id, name: t.tag }));
    const { editingArticle } = this.state;

    this.setState({
      editingArticle: Object.assign({}, editingArticle, { tags })
    });
  };

  handleTagChipAdd = (chipsNode, chipNode) => {
    const tagChips = M.Chips.getInstance(this.tagChips.current);
    const addedChip = tagChips.chipsData[tagChips.chipsData.length - 1];
    const mg = addedChip.tag.match(/ \(([^()]+)\)$/);
    if (mg) {
      const { tags } = this.props;
      const slug = mg[1];
      let findTags = tags.filter(t => t.slug == slug);
      if (findTags.length > 0) {
        const { editingArticle } = this.state;
        const pushedTags = [...editingArticle.tags];
        pushedTags.push(findTags[0]);
        this.setState({
          editingArticle: Object.assign({}, editingArticle, {
            tags: pushedTags
          })
        });
      }
    }
    tagChips.deleteChip(tagChips.chipsData.length - 1);
  };

  handleChangeAttach = e => {
    const selectInstance = M.FormSelect.getInstance(this.attachSelect.current);
    const values = selectInstance.getSelectedValues();
    const { editingArticle } = this.state;
    let { status, pinned_at } = editingArticle;
    if (values.includes(DRAFTED_ATTACH)) status = 0;
    else status = 1;
    if (values.includes(PINNED_ATTACH)) pinned_at = new Date().toISOString();
    else pinned_at = new Date(Date.UTC(1970, 0, 1));
    this.setState({
      editingArticle: Object.assign({}, editingArticle, { status, pinned_at })
    });
  };

  handlePreview = e => {
    const { dispatch, isPreviewing } = this.props;
    const { editingArticle } = this.state;
    const { content } = editingArticle;
    if (!isPreviewing) dispatch(previewArticle({ content: content }));
  };

  handlePush = e => {
    const { action, dispatch, isPushing } = this.props;
    if (isPushing) return;
    let { editingArticle } = this.state;

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
    const id = parseInt(e.target.value);
    history.pushState(null, null, `/admin/articles/edit/${id}`);
    dispatch(fetchArticle(id));
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
      editingArticle: Object.assign({}, this.state.editingArticle, {
        title: e.target.value
      })
    });
  };

  handleSlugChange = e => {
    this.setState({
      editingArticle: Object.assign({}, this.state.editingArticle, {
        slug: e.target.value.toLowerCase()
      })
    });
  };

  handleContentChange = e => {
    this.setState({
      editingArticle: Object.assign({}, this.state.editingArticle, {
        content: e.target.value
      })
    });
  };

  render() {
    let {
      action,
      categories,
      articles,
      isPreviewing,
      isPushing,
      preview
    } = this.props;
    let { editingArticle: e } = this.state;
    let attachValue = [
      Date.parse(e.pinned_at) > 0 && PINNED_ATTACH,
      e.status === 0 && DRAFTED_ATTACH
    ].filter(Boolean);

    if (attachValue.length == 0) attachValue = [0];

    let defaultBtnClass = [
      "btn-floating",
      "btn-large",
      "waves-effect",
      "waves-light",
      "blue"
    ];
    if (isPushing) {
      defaultBtnClass.push("icon-loading");
      defaultBtnClass = defaultBtnClass.filter(c => !c.startsWith("waves"));
    }

    defaultBtnClass = defaultBtnClass.join(" ");

    return (
      <form className="z-depth-1 white">
        <div className="row">
          {action == EDIT_ACTION ? (
            <div className="input-field col s12">
              <select
                value={e.id}
                onChange={this.handleEditArticleIdChange}
                ref={this.articleSelect}
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
              ref={this.categorySelect}
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
          {/* 编辑框 */}
          <div className="col s12">
            <ul className="tabs">
              <li className="tab col s6">
                <a className="active" href="#edit">
                  编辑
                </a>
              </li>
              <li className="tab col s6" onMouseEnter={this.handlePreview}>
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
              {isPreviewing ? (
                <p className="flow-text">生成预览中……</p>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: preview }} />
              )}
            </div>
          </div>
          {/* 标签整理 */}
          <div ref={this.tagChips} className="input-field chips col s12">
            <input className="input" placeholder="添加标签…" />
          </div>
          {/* 附加属性设置 */}
          <div className="input-field col s6">
            <select
              id="attach"
              multiple
              value={attachValue}
              ref={this.attachSelect}
              onChange={this.handleChangeAttach}
            >
              <option value={0} disabled>
                选择附加
              </option>
              <option value={PINNED_ATTACH}>置顶</option>
              <option value={DRAFTED_ATTACH}>草稿</option>
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
          <a className={defaultBtnClass} onClick={this.handlePush}>
            <i className="material-icons">
              {isPushing ? "sync" : this.props.action}
            </i>
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
  const {
    isLoaded: isTagsLoaded,
    apiError: tagsApiError,
    items: tags
  } = state.tags;

  let attachState = {
    isCategoriesLoaded,
    categoriesApiError,
    categories,
    isArticlesLoaded,
    articlesApiError,
    articles,
    isTagsLoaded,
    tagsApiError,
    tags
  };

  return {
    ...state.pushArticle,
    ...attachState
  };
};

export default connect(mapStateToProps)(PushArticle);
