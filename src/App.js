import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import SignupPage from '../src/Page/SignupPage/SignupPage';
import './App.css';

function App() {
  return(
    <div>
      <Router>
          <Routes>
            <Route path="/" exact element={<SignupPage/>}/>
          </Routes>
      </Router>
    </div>
  ) 
}

export default App;
