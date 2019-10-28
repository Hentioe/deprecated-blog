import React from "react";
import { connect } from "react-redux";
import { hiddenGlobalFAB, showGlobalFAB } from "../actions";
import { PageComponent, Page } from "../lib/page";
import PushArticle from "../components/PushArticle";

class EditArticle extends PageComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    super.componentDidMount();
    const { dispatch } = this.props;
    dispatch(hiddenGlobalFAB());
  }

  componentWillUnmount() {
    super.componentWillUnmount();
  }

  render() {
    return (
      <Page className="container" id={this.constructor.name}>
        <div className="section">
          <PushArticle action="save" />
        </div>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(EditArticle);
