import React from "react";
import { connect } from "react-redux";
import { initGFAB } from "../slices/global-fab";
import { PageComponent } from "../lib/page";
import { fetchSettings, syncCounter } from "../actions";

class Settings extends PageComponent {
  componentDidMount() {
    super.componentDidMount();
    const { dispatch } = this.props;
    dispatch(initGFAB());
    dispatch(fetchSettings());
  }

  handleSyncCounter = e => {
    const { dispatch } = this.props;
    dispatch(syncCounter());
  };

  render() {
    const { settings, isLoaded, isSyncingCounter } = this.props;
    const { counter_sync_time } = settings;

    const syncBtnClass = ["btn", "waves-effect", "waves-light"];
    if (isSyncingCounter) {
      syncBtnClass.push("icon-loading");
    }

    return (
      <div className="container">
        <div className="section">
          <div className="z-depth-1 white row valign-wrapper">
            <div className="col s4">
              <p>上次计数器同步时间：</p>
            </div>
            <div className="col s4">
              <b>
                {isLoaded
                  ? new Date(counter_sync_time).toLocaleTimeString()
                  : counter_sync_time}
              </b>
            </div>
            <div className="col s4">
              <button
                className={syncBtnClass.join(" ")}
                onClick={this.handleSyncCounter}
              >
                立即同步
                <i className="material-icons right">sync</i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state.settings;
};

export default connect(mapStateToProps)(Settings);
