import Login from "./LoginSign/Login";
import { Redirect, Route, Switch } from "react-router-dom";
import Welcome from "./Pages/Welcome";
import ProfilePage from "./Pages/ProfilePage";
import { useSelector} from "react-redux";

 


function App() {
 
  const isLoggedIn=useSelector((state)=>state.auth.token)
  console.log(isLoggedIn?true:false)


  return (
    <>
      <Switch>
        {!isLoggedIn && (
          <Route exact path="/">
            <Login />
          </Route>
        )}

        {isLoggedIn && (
          <Route exact  path="/">
           <Redirect to='/welcome' />
          </Route>
        )}
        {isLoggedIn && (
          <Route exact path="/welcome">
            <Welcome />
          </Route>
        )}
        {!isLoggedIn && (
          <Route exact path="/welcome">
          <Redirect to='/' />
          </Route>
        )}
        {isLoggedIn && (
          <Route exact path="/profile">
            <ProfilePage />
          </Route>
        )}
        {!isLoggedIn && (
          <Route exact path="/profile">
          <Redirect to='/' />
          </Route>
        )}
      </Switch>
    </>
  );
}

export default App;
