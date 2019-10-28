import React from "react";
import { PageComponent, Page } from "../lib/page";

class EditArticle extends PageComponent {
  render() {
    return (
      <Page id={this.constructor.name}>
        编辑文章
      </Page>
    );
  }
}

export default EditArticle;
