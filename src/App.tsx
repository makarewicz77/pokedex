import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <header>POKEDEX</header>
      <BrowserRouter>
        <Switch>
          <Route path="/page1">{/* display components */}</Route>
          <Route path="/page2">{/* display components */}</Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
