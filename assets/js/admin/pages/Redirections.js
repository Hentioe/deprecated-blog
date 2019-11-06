import React from "react";
import { connect } from "react-redux";
import { initGFAB } from "../slices/global-fab";
import { PageComponent } from "../lib/page";
import {
  fetchArticlesRedirected,
  createRedirection,
  updateRedirection,
  deleteRedirection
} from "../actions";

class Redirections extends PageComponent {
  constructor(props) {
    super(props);
    this.redirectionsColl = React.createRef();
  }

  componentDidMount() {
    super.componentDidMount();
    const { dispatch } = this.props;
    dispatch(initGFAB());
    dispatch(fetchArticlesRedirected());

    this.initCollapaible();
    M.updateTextFields();
  }

  componentDidUpdate(prevProps, prevState) {
    const { dispatch, isChanging } = this.props;

    if (isChanging !== prevProps.isChanging && !isChanging)
      dispatch(fetchArticlesRedirected());

    this.initCollapaible();
    M.updateTextFields();
  }

  handleUpdateRedirection = (id, dest_id, e) => {
    if (e.keyCode != 13) return;

    const { dispatch } = this.props;
    dispatch(
      updateRedirection({
        id,
        dest_id,
        source_slug: e.target.value
      })
    );
  };

  handleAddRedirection = (dest_id, e) => {
    if (e.keyCode != 13) return;

    const { dispatch } = this.props;
    dispatch(createRedirection({ dest_id, source_slug: e.target.value }));
  };

  deleteRedirection = id => {
    const { dispatch } = this.props;
    dispatch(deleteRedirection(id));
  };

  initCollapaible = () => {
    M.Collapsible.init(
      document.querySelectorAll(`#${this.constructor.name} .collapsible`),
      {}
    );
  };

  render() {
    const { items } = this.props;
    return (
      <div className="container" id={this.constructor.name}>
        <div className="section">
          {items.map(a => (
            <ul key={a.id} className="collapsible">
              <li className={a.redirections.length > 0 ? "active" : null}>
                <div className="collapsible-header">{a.title}</div>
                <div className="collapsible-body">
                  {a.redirections.map(r => (
                    <div key={r.id} className="row valign-wrapper">
                      <div className="col s10 input-field">
                        <input
                          defaultValue={r.source_slug}
                          type="text"
                          onKeyDown={e =>
                            this.handleUpdateRedirection(r.id, a.id, e)
                          }
                        />
                      </div>
                      <button
                        className="btn waves-effect waves-light"
                        onClick={e => this.deleteRedirection(r.id, e)}
                      >
                        删除
                        <i className="material-icons right">delete</i>
                      </button>
                    </div>
                  ))}
                  <div className="input-field">
                    <input
                      placeholder="SLUG"
                      type="text"
                      onKeyDown={e => this.handleAddRedirection(a.id, e)}
                    />
                    <label>添加重定向</label>
                  </div>
                </div>
              </li>
            </ul>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state.redirections;
};

export default connect(mapStateToProps)(Redirections);
