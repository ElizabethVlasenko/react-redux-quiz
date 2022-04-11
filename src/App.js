import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import { Route, Routes, Navigate } from "react-router-dom";
import Quiz from "./containers/Quiz/Quiz";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import Auth from "./containers/Auth/Auth";
import QuizList from "./containers/QuizList/QuizList";
import { connect } from "react-redux";
import Logout from "./components/Logout/Logout";
import withRouter from "./hoc/WithRouter/WithRouter";
import { autoLogin } from "./store/actions/auth";

class App extends Component {
  componentDidMount() {
    this.props.autoLogin();
  }

  render() {
    let routs = (
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/" exact element={<QuizList />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    );

    if (this.props.isAuthenticated) {
      routs = (
        <Routes>
          <Route path="/quiz-creator" element={<QuizCreator />} />
          <Route path="/quiz/:id" element={<Quiz />} />{" "}
          <Route path="/logout" element={<Logout />} />
          <Route path="/" exact element={<QuizList />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      );
    }

    return <Layout>{routs}</Layout>;
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin()),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
