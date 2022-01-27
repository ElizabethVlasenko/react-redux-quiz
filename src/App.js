import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import { Route, Routes } from "react-router-dom";
import Quiz from "./containeers/Quiz/Quiz";
import QuizCreator from "./containeers/QuizCreator/QuizCreator";
import Auth from "./containeers/Auth/Auth";
import QuizList from "./containeers/QuizList/QuizList";

class App extends Component {
  render() {
    return (
      <Layout>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/quiz-creator" element={<QuizCreator />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="/" element={<QuizList />} />
        </Routes>
      </Layout>
    );
  }
}

export default App;
