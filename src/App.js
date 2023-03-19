import Form from "./LoginSign/Login";
import { Route, Redirect,Switch } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./store/context";
import Welcome from "./Welcome";
function App() {
  const AuthCtx = useContext(AuthContext);
  console.log(AuthCtx.isLoggedIn)
  return (
    <>
    <Switch>
    {!AuthCtx.isLoggedIn && 
        <Route path="/" exact>
          <Form />
        </Route>
      }
      {AuthCtx.isLoggedIn && <Route path='/welcome'>
        <Welcome/>
      </Route>}
     
      
      
      </Switch>
    </>
  );
}

export default App;
