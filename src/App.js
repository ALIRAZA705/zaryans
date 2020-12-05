import React, { Component } from "react";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import "./scss/style.scss";
import history from "./history";
import { connect } from "react-redux";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const ForgotPassword = React.lazy(() =>
  import("./views/pages/forgetPassword/forgetPassword")
);
const ForgetSuccess = React.lazy(() =>
  import("./views/pages/forgetPassword/forgetSuccess")
);
const ChangePassword = React.lazy(() =>
  import("./views/pages/resetPassword/ChangePassword")
);
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // if (!localStorage.getItem("token")) {
    //   this.props.history.push();
    // }
  }
  render() {
    return (
      <HashRouter history={history}>
        <React.Suspense fallback={loading}>
          {this.props.userReducer?.token ? (
            <Switch>
              <Route
                exact
                path="/login"
                name="Login Page"
                render={(props) => <Login {...props} />}
              />

              <Route
                exact
                path="/register"
                name="Register Page"
                render={(props) => <Register {...props} />}
              />
              <Route
                exact
                path="/404"
                name="Page 404"
                render={(props) => <Page404 {...props} />}
              />
              <Route
                exact
                path="/500"
                name="Page 500"
                render={(props) => <Page500 {...props} />}
              />
              <Route
                path="/"
                name="Home"
                render={(props) => <TheLayout {...props} />}
              />
              <Redirect from="/" to="/login" />
            </Switch>
          ) : (
            <Switch>
              <Route
                exact
                path="/login"
                name="Login Page"
                render={(props) => <Login {...props} />}
              />
              <Route
                exact
                path="/forgotpassword"
                name="ForgotPassword Page"
                render={(props) => <ForgotPassword {...props} />}
              />
              <Route
                path="/ChangePassword"
                name="ChangePassword Page"
                render={(props) => <ChangePassword {...props} />}
              />
              <Route
                path="/fogetSuccess"
                name="Forget Success"
                render={(props) => <ForgetSuccess {...props} />}
              />
              <Redirect from="/" to="/login" />
            </Switch>
          )}
        </React.Suspense>
      </HashRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userReducer: state.userReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setToken: () => dispatch(alert("")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
