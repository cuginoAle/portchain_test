import React from "react";
import "style/base.css";
import Charts from "containers/Charts";
import Logo from "components/Logo";
import Layout from "./components/Layout";
function App() {
  return (
    <Layout>
      <Logo />
      <Charts />
    </Layout>
  );
}

export default App;
