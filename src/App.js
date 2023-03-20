import Login from "./LoginSign/Login";
import { Route, Switch } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./store/context";
import Welcome from "./Pages/Welcome";
import ProfilePage from "./Pages/ProfilePage";
function App() {
  const AuthCtx = useContext(AuthContext);

  return (
    <>
      <Switch>
        {!AuthCtx.isLoggedIn && (
          <Route path="/">
            <Login />
          </Route>
        )}
       
        {AuthCtx.isLoggedIn && (
          <Route path="/welcome">
            <Welcome />
          </Route>
        )}
        {AuthCtx.isLoggedIn && (
          <Route path="/profile">
            <ProfilePage />
          </Route>
        )}
      </Switch>
    </>
  );
}

export default App;
