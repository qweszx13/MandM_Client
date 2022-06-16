import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import SignupPage from '../src/Page/SignupPage/SignupPage';
import HomePage from "./Page/HomePage/HomePage";
import './App.less';
import { useContext } from "react";

function App() {
  const [userToken,setUserToken] = ("");
  return(
    <div>
      <Router>
          <Routes>
            <Route path="/MandM" exact element={<HomePage/>} />
            <Route path="/" exact element={<SignupPage/>}/>
          </Routes>
      </Router>
    </div>
  ) 
}

export default App;
