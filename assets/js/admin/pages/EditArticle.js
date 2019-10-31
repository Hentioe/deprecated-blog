import React from "react";
import { connect } from "react-redux";
import { hiddenGFAB } from "../slices/global-fab";
import { PageComponent, Page } from "../lib/page";
import PushArticle from "../components/PushArticle";

class EditArticle extends PageComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    super.componentDidMount();
    const { dispatch } = this.props;
    dispatch(hiddenGFAB());
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
