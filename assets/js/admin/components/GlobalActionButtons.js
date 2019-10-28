import React from "react";

class GlobalActionButtons extends React.Component {
  constructor(props) {
    super(props);
    this.buttons = React.createRef();
  }

  componentDidMount() {
    M.FloatingActionButton.init(this.buttons.current, {});
  }
  render() {
    return (
      <div
        ref={this.buttons}
        id="global-action-btn"
        className="fixed-action-btn"
        style={{ userSelect: "none" }}
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
            <a className="btn-floating yellow darken-1">
              <i className="material-icons">view_module</i>
            </a>
          </li>
          <li>
            <a className="btn-floating green">
              <i className="material-icons">edit</i>
            </a>
          </li>
          <li>
            <a className="btn-floating blue">
              <i className="material-icons">note_add</i>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default GlobalActionButtons;
