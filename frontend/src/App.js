import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsIndex from "./components/SpotsIndex";
import SpotById from "./components/SpotById";
import SpotForm from "./components/SpotForm";
import ManageSpots from "./components/ManageSpots";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Switch>
        <Route exact path='/' component={SpotsIndex}/>
        <Route path='/spots/new' component={SpotForm}/>
        <Route path='/spots/currrent' component={ManageSpots}/>
        <Route path='/spots/:spotId' component={SpotById}/>
        </Switch>}
    </>
  );
}

export default App;
