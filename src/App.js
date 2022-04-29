import "./App.css";
import PageHome from "./Page/PageHome";
import { BrowserRouter, Route, Link, Router, Redirect } from "react-router-dom";
import LoginPage from "./Page/LoginPage";
import SeletedItemBed from "./Page/SelectedItemBed"
import SeletedItemChair from "./Page/SelectedItemChair";
import SeletedItemOxygen from "./Page/SelectedItemOxygen";
import Account from "./Component/Account"
import DamagedBed from "./Page/DamagedBed";
import DAdmin from "./Component/DAdmin";
import Items from "./Component/Item";
import SeletedItem from "./Page/SelectItem"
function App() {
 
  return (
    <div>
      <BrowserRouter>
        <Route exact path="/" component={LoginPage} />
        <Route path="/PageHome" component={PageHome} />
        <Route path="/PageHome/:name" component={Items} />
        <Route path="/Account" component={Account} />
        <Route path="/SelectedItemBed/:id" component={SeletedItemBed} />
        <Route path="/DamagedBed/:id" component={DamagedBed} />
        <Route path="/SelectedItemChair/:id" component={SeletedItemChair} />
        <Route path="/SelectedItemOxygen/:id" component={SeletedItemOxygen} />
        <Route path="/SelectedItem/:type/:id" component={SeletedItem} />
        <Route path="/Delete" component={DAdmin} />
      </BrowserRouter>
    </div>
  );
}

export default App;
