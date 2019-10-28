import React from "react";
import { connect } from "react-redux";
import { openGlobalFAB } from "../actions";
import { PageComponent } from "../lib/page";

class Dashboard extends PageComponent {
  componentDidMount() {
    super.componentDidMount();
    const { dispatch } = this.props;
    dispatch(openGlobalFAB());
  }

  render() {
    return (
      <div className="container">
        <div className="section">数据仪表盘页。</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(Dashboard);
