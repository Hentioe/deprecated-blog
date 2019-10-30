import React from "react";
import { connect } from "react-redux";
import { openGlobalFAB } from "../actions";
import { PageComponent } from "../lib/page";
import { fetchCategories, createCategory } from "../actions";

const initialEditCategory = {
  name: "",
  slug: "",
  description: ""
};

class Category extends PageComponent {
  constructor(props) {
    super(props);
    this.state = {
      editintAt: 0,
      editingCategory: Object.assign({}, initialEditCategory)
    };
  }

  componentDidMount() {
    super.componentDidMount();
    const { dispatch } = this.props;
    dispatch(fetchCategories());
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let { editintAt } = this.state;
    let { isCreating } = this.props;
    // 更新编辑区域
    if (prevState.editintAt !== editintAt) M.updateTextFields();
    // 重置正在编辑数据
    if (prevProps.isCreating !== isCreating && !isCreating) {
      this.setState({
        editintAt: editintAt - 1,
        editingCategory: Object.assign({}, initialEditCategory)
      });
    }
  }

  handleCancelEdit = e => {
    e.preventDefault();
    this.setState({
      editintAt: 0,
      editingCategory: Object.assign({}, initialEditCategory)
    });
  };
  handlePush = e => {
    e.preventDefault();
    let { editintAt, editingCategory } = this.state;
    let { dispatch } = this.props;
    if (editintAt <= 0) {
      // 添加
      dispatch(createCategory(editingCategory));
    }
  };

  handleNameChange = e => {
    this.setState({
      editingCategory: Object.assign(this.state.editingCategory, {
        name: e.target.value
      })
    });
  };

  handleSlugChange = e => {
    this.setState({
      editingCategory: Object.assign(this.state.editingCategory, {
        slug: e.target.value.toLowerCase()
      })
    });
  };

  handleDescriptionChange = e => {
    this.setState({
      editingCategory: Object.assign(this.state.editingCategory, {
        description: e.target.value
      })
    });
  };

  handleEdit = (editintAt, e) => {
    e.preventDefault();
    let editingCategory = Object.assign(
      {},
      this.props.items.filter(c => c.id == editintAt)[0]
    );
    this.setState({ editintAt, editingCategory });
    this.scrollToTop();
  };

  render() {
    let { isCompleted, isCreating, items } = this.props;
    let { editintAt, editingCategory } = this.state;
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
                        value={editingCategory.name}
                      />
                      <label htmlFor="edit_name">名称</label>
                    </div>
                    <div className="input-field col s6">
                      <input
                        id="edit_name"
                        type="text"
                        onChange={this.handleSlugChange}
                        value={editingCategory.slug}
                      />
                      <label htmlFor="edit_name">SLUG</label>
                    </div>
                    <div className="input-field col s12">
                      <textarea
                        id="textarea1"
                        className="materialize-textarea"
                        onChange={this.handleDescriptionChange}
                        value={editingCategory.description}
                      ></textarea>
                      <label htmlFor="textarea1">描述</label>
                    </div>
                  </div>
                </div>
                <div className="card-action white-text">
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
            {items.map(category => (
              <div key={category.id} className="col s12 m6">
                <div className="card blue-grey darken-1">
                  <div className="card-content white-text">
                    <span className="card-title">
                      {category.name} ({category.slug})
                    </span>
                    <p>{category.description}</p>
                  </div>
                  <div className="card-action white-text">
                    {isCompleted ? (
                      <>
                        <a
                          href="#"
                          onClick={e => this.handleEdit(category.id, e)}
                        >
                          编辑
                        </a>
                        <a href="#">删除</a>
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
  return state.category;
};

export default connect(mapStateToProps)(Category);
