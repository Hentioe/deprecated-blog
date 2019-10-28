import React from "react";
import { Link } from "react-router-dom";

const progressStyle = {
  margin: 0,
  position: "fixed",
  top: 0,
  visibility: "hidden"
};

class Header extends React.Component {
  render() {
    return (
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
                <Link to="/admin/articles/add">写文</Link>
              </li>
              <li>
                <Link to="/admin/articles/edit">续更</Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
