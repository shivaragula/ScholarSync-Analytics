import React from "react";
import Routes from "./Routes";
import ConnectionBanner from "./components/ConnectionBanner";

function App() {
  return (
    <>
      <ConnectionBanner />
      <Routes />
    </>
  );
}

export default App;
