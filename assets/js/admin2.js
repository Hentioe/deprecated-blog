// Styles
import "../scss/admin.scss";
// Polyfills
import "mdn-polyfills/CustomEvent";
import "mdn-polyfills/String.prototype.startsWith";
import "mdn-polyfills/Array.from";
import "mdn-polyfills/NodeList.prototype.forEach";
import "mdn-polyfills/Element.prototype.closest";
import "mdn-polyfills/Element.prototype.matches";
import "child-replace-with-polyfill";
import "url-search-params-polyfill";
import "formdata-polyfill";
import "classlist-polyfill";
// Materialize
import "../node_modules/materialize-css/dist/js/materialize.min";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Header from "./admin2/components/Header";
import Sidenav from "./admin2/components/Sidenav";
import GlobalActionButtons from "./admin2/components/GlobalActionButtons";

import Dashboard from "./admin2/pages/Dashboard";
import AddArticle from "./admin2/pages/AddArticle";
import EditArticle from "./admin2/pages/EditArticle";

class AppPage extends React.Component {
  render() {
    return (
      <Router>
        <>
          <Header />
          <Sidenav />
          <GlobalActionButtons />
          <main>
            <Switch>
              <Route path="/admin2/articles/add">
                <AddArticle />
              </Route>
              <Route path="/admin2/articles/edit">
                <EditArticle />
              </Route>
              <Route path="/admin2">
                <Dashboard />
              </Route>
            </Switch>
          </main>
        </>
      </Router>
    );
  }
}

ReactDOM.render(<AppPage />, document.getElementById("app"));
