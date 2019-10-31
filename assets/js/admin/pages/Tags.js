import React from "react";
import { connect } from "react-redux";
import { initGFAB } from "../slices/global-fab";
import { PageComponent } from "../lib/page";
import { fetchTags, createTag, updateTag, deleteTag } from "../actions";

const initialEditTag = {
  id: 0,
  name: "",
  slug: "",
  description: "",
  color: ""
};

class Tags extends PageComponent {
  constructor(props) {
    super(props);
    this.state = {
      editintAt: 0,
      editingTag: Object.assign({}, initialEditTag)
    };
  }

  componentDidMount() {
    super.componentDidMount();
    const { dispatch } = this.props;
    dispatch(initGFAB());
    dispatch(fetchTags());
  }

  componentDidUpdate(prevProps, prevState, _snapshot) {
    let { editintAt } = this.state;
    let { isCreating } = this.props;
    // 更新编辑区域
    if (prevState.editintAt !== editintAt) M.updateTextFields();
    // 重置正在编辑数据
    if (prevProps.isCreating !== isCreating && !isCreating) {
      this.setState({
        editintAt: editintAt - 1,
        editingTag: Object.assign({}, initialEditTag)
      });
    }
  }

  cardClass = color => {
    return color ? "card" : "card blue-grey darken-1";
  };

  handleColorChange = e => {
    this.setState({
      editingTag: Object.assign(this.state.editingTag, {
        color: e.target.value
      })
    });
  };

  handleDelete = (id, e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(deleteTag(id));
  };

  handleCancelEdit = e => {
    e.preventDefault();
    this.setState({
      editintAt: 0,
      editingTag: Object.assign({}, initialEditTag)
    });
  };

  handlePush = e => {
    e.preventDefault();
    let { editintAt, editingTag } = this.state;
    let { dispatch } = this.props;
    if (editintAt <= 0) {
      // 添加
      dispatch(createTag(editingTag));
    } else {
      dispatch(updateTag(editingTag));
    }
  };

  handleNameChange = e => {
    this.setState({
      editingTag: Object.assign(this.state.editingTag, {
        name: e.target.value
      })
    });
  };

  handleSlugChange = e => {
    this.setState({
      editingTag: Object.assign(this.state.editingTag, {
        slug: e.target.value.toLowerCase()
      })
    });
  };

  handleDescriptionChange = e => {
    this.setState({
      editingTag: Object.assign(this.state.editingTag, {
        description: e.target.value
      })
    });
  };

  handleEdit = (editintAt, e) => {
    e.preventDefault();
    let editTarget = this.props.items.filter(c => c.id == editintAt)[0];
    let color = editTarget.color;
    if (!color) color = "";
    let editingTag = Object.assign({}, editTarget, { color });
    this.setState({ editintAt, editingTag });
    this.scrollToTop();
  };

  render() {
    let { isLoaded, isCreating, deletingAt, items } = this.props;
    let { editintAt, editingTag } = this.state;
    return (
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col s12 m6">
              <div className="card">
                <div className="card-conent">
                  <div className="row">
                    <div className="input-field col s6">
                      <input
                        id="edit_name"
                        type="text"
                        onChange={this.handleNameChange}
                        value={editingTag.name}
                      />
                      <label htmlFor="edit_name">名称</label>
                    </div>
                    <div className="input-field col s6">
                      <input
                        id="edit_name"
                        type="text"
                        onChange={this.handleSlugChange}
                        value={editingTag.slug}
                      />
                      <label htmlFor="edit_name">SLUG</label>
                    </div>
                    <div className="input-field col s12">
                      <textarea
                        id="textarea1"
                        className="materialize-textarea"
                        onChange={this.handleDescriptionChange}
                        value={editingTag.description}
                      ></textarea>
                      <label htmlFor="textarea1">描述</label>
                    </div>
                    <div className="col s6 center-align">
                      <p
                        className="flow-text"
                        style={{ color: editingTag.color }}
                      >
                        预览色
                      </p>
                    </div>
                    <div className="input-field col s6">
                      <input
                        id="edit_color"
                        type="text"
                        onChange={this.handleColorChange}
                        value={editingTag.color}
                      />
                      <label htmlFor="edit_color">颜色</label>
                    </div>
                  </div>
                </div>
                <div className="card-action">
                  {!isCreating ? (
                    <>
                      <a href="#" onClick={this.handlePush}>
                        {editintAt <= 0 ? "添加" : "更新"}
                      </a>
                      {editintAt > 0 ? (
                        <a href="#" onClick={this.handleCancelEdit}>
                          取消
                        </a>
                      ) : null}
                    </>
                  ) : (
                    <span>创建中……</span>
                  )}
                </div>
              </div>
            </div>
            {/* 生成列表 */}
            {items.map(c => (
              <div key={c.id} className="col s12 m6">
                <div
                  className={this.cardClass(c.color)}
                  style={{ backgroundColor: c.color }}
                >
                  <div className="card-content white-text">
                    <span className="card-title">
                      {c.name} ({c.slug})
                    </span>
                    <p>{c.description}</p>
                  </div>
                  <div className="card-action white-text">
                    {isLoaded && deletingAt != c.id ? (
                      <>
                        <a href="#" onClick={e => this.handleEdit(c.id, e)}>
                          编辑
                        </a>
                        <a href="#" onClick={e => this.handleDelete(c.id, e)}>
                          删除
                        </a>
                      </>
                    ) : (
                      <span>操作按钮不可用</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state.tags;
};

export default connect(mapStateToProps)(Tags);
