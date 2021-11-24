import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import Quiz from './containeers/Quiz/Quiz';

class App extends Component {
  render () {
    return (
      <Layout>
        <Quiz></Quiz>
      </Layout>
    )
  }
}

export default App;
