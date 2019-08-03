import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Login from "./Authentication/Login";
import Signup from "./Authentication/Signup";
import Dashboard from "./Components/UserDashboard";
import AdminDashboard from "./Components/AdminDashboard";
import AddChapter from "./Components/AddChapter";
import ViewVideo from "./Components/ViewVideo";
import ViewChapter from "./Components/ViewChapter";
import md5 from "md5";

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authed: true
    };
  }
  componentDidMount() {
    let userEmail = localStorage.getItem("userEmail");
    let users = JSON.parse(localStorage.getItem("users"));
    if (users && users.filter(d => d.email == userEmail).length == 1) {
      // console.log( "filterd" ,users.filter(d => d.email == userEmail));
      this.setState({
        authed: true
      });
    } else {
      // console.log("users",users)
      this.setState({
        authed: false
      });
    }
  }
  render() {
    let password = md5("Chaitnya123");
    let userEmail = localStorage.getItem("userEmail");
    let userPassword = localStorage.getItem("userPassword");
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" name="Signup" component={Signup} />
          <Route path="/login" name="Login" component={Login} />
          <PrivateRoute
            authed={this.state.authed}
            path="/dashboard"
            component={Dashboard}
          />
          {userEmail == "admin@admin.uk" && userPassword == password && (
            <Route
              path="/admin"
              name="AdminDashboard"
              component={AdminDashboard}
            />
          )}
          {userEmail == "admin@admin.uk" && userPassword == password && (
            <Route path="/course/:id" component={AddChapter} />
          )}
          <Route path="/view/:id" component={ViewChapter} />
          <Route path="/chepter/:id" component={ViewVideo} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
