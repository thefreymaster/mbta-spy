import { Switch, Route, Redirect } from "react-router-dom";
import { LiveMap } from "../components/LiveMap";

const Router = () => {
  return (
    <Switch>
      <Route exact path="/:transit_type">
        <LiveMap />
      </Route>
      <Route exact path="/:transit_type/:route_id/:transit_id">
        <LiveMap />
      </Route>
      <Route exact path="/">
        <LiveMap />
      </Route>
      <Route exact path="/*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};

export default Router;
