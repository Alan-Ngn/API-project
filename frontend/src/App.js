import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsIndex from "./components/SpotsIndex";
import SpotById from "./components/SpotById";
import SpotForm from "./components/SpotForm";
import ManageSpots from "./components/ManageSpots";
import UpdateSpotForm from "./components/UpdateSpotForm";
import CreateSpotForm from "./components/CreateSpotForm";
import ManageBookings from "./components/ManageBookings";
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
        <Route path='/spots/new' component={CreateSpotForm}/>
        <Route path='/spots/current' component={ManageSpots}/>
        <Route path='/spots/:spotId/edit' component={UpdateSpotForm}/>
        <Route path='/spots/:spotId' component={SpotById}/>
        <Route path='/bookings/current' component={ManageBookings}/>
        </Switch>}
    </>
  );
}

export default App;
