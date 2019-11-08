// Styles
import "../scss/admin.scss";
// Polyfills
import "mdn-polyfills/CustomEvent";
import "mdn-polyfills/String.prototype.startsWith";
import "mdn-polyfills/Array.from";
import "mdn-polyfills/NodeList.prototype.forEach";
import "mdn-polyfills/Element.prototype.closest";
import "mdn-polyfills/Element.prototype.matches";
import "mdn-polyfills/Object.assign";
import "child-replace-with-polyfill";
import "url-search-params-polyfill";
import "formdata-polyfill";
import "classlist-polyfill";
// Materialize
import "../node_modules/materialize-css/dist/js/materialize.min";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import reduxLogger from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { configureStore } from "redux-starter-kit";

import Header from "./admin/components/Header";
import Sidenav from "./admin/components/Sidenav";
import GlobalFAB from "./admin/components/GlobalFAB";

import Dashboard from "./admin/pages/Dashboard";
import AddArticle from "./admin/pages/AddArticle";
import EditArticle from "./admin/pages/EditArticle";
import RestoreArticle from "./admin/pages/RestoreArticle";
import OperationArticle from "./admin/pages/OperationArticle";
import Categories from "./admin/pages/Categories";
import Tags from "./admin/pages/Tags";
import Redirections from "./admin/pages/Redirections";
import Settings from "./admin/pages/Settings";

import Reducers from "./admin/reducers";
import api from "./admin/middleware/api";

const DEBUG = process.env.NODE_ENV == "development";
const middlewares = [thunkMiddleware, api, DEBUG && reduxLogger].filter(
  Boolean
);
const store = configureStore({
  reducer: Reducers,
  middleware: middlewares
});

class AppPage extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <>
            <Header />
            <Sidenav />
            <GlobalFAB />
            <main>
              <Switch>
                <Route path="/admin/articles/add">
                  <AddArticle />
                </Route>
                <Route
                  path="/admin/articles/edit/:id"
                  render={props => <EditArticle id={props.match.params.id} />}
                />
                <Route path="/admin/articles/edit">
                  <EditArticle />
                </Route>
                <Route path="/admin/articles/operation">
                  <OperationArticle />
                </Route>
                <Route path="/admin/articles/restore">
                  <RestoreArticle />
                </Route>
                <Route path="/admin/categories">
                  <Categories />
                </Route>
                <Route path="/admin/tags">
                  <Tags />
                </Route>
                <Route path="/admin/redirections">
                  <Redirections />
                </Route>
                <Route path="/admin/settings">
                  <Settings />
                </Route>
                <Route path="/admin">
                  <Dashboard />
                </Route>
              </Switch>
            </main>
          </>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<AppPage />, document.getElementById("app"));
