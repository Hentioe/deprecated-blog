import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class GlobalFAB extends React.Component {
  constructor(props) {
    super(props);
    this.fab = React.createRef();

    this.open = this.open.bind(this);
  }

  componentDidMount() {
    M.FloatingActionButton.init(this.fab.current, {});
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.opened) this.open();
    else this.close();
  }

  open() {
    M.FloatingActionButton.getInstance(this.fab.current).open();
  }

  close() {
    M.FloatingActionButton.getInstance(this.fab.current).close();
  }

  render() {
    return (
      <div
        ref={this.fab}
        className="fixed-action-btn"
        style={{ userSelect: "none", visibility: this.props.visibility }}
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
            <Link
              className="btn-floating yellow darken-1"
              to="/admin/categories"
            >
              <i className="material-icons">view_module</i>
            </Link>
          </li>
          <li>
            <Link className="btn-floating green" to="/admin/articles/edit">
              <i className="material-icons">edit</i>
            </Link>
          </li>
          <li>
            <Link className="btn-floating blue" to="/admin/articles/add">
              <i className="material-icons">note_add</i>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state.globalFAB;
};

export default connect(mapStateToProps)(GlobalFAB);
