import "./App.css";
import PageHome from "./Page/PageHome";
import { BrowserRouter, Route, Link, Router, Redirect } from "react-router-dom";
import LoginPage from "./Page/LoginPage";
import SeletedItemBed from "./Page/SelectedItemBed"
import SeletedItemChair from "./Page/SelectedItemChair";
import SeletedItemOxygen from "./Page/SelectedItemOxygen";
import Account from "./Component/Account"
import DamagedBed from "./Page/DamagedBed";

function App() {
 
  return (
    <div>
      <BrowserRouter>
        <Route exact path="/" component={LoginPage} />
        <Route path="/PageHome" component={PageHome} />
        <Route path="/Account" component={Account} />
        <Route path="/SelectedItemBed/:id" component={SeletedItemBed} />
        <Route path="/DamagedBed/:id" component={DamagedBed} />
        <Route path="/SelectedItemChair/:id" component={SeletedItemChair} />
        <Route path="/SelectedItemOxygen/:id" component={SeletedItemOxygen} />
      </BrowserRouter>
    </div>
  );
}

export default App;
