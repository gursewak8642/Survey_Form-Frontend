import Survey from "./page/survey";
import User from "./page/User";
import Quiz from "./page/QuizPage";
import Response from "./page/ResponsePage";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers";
import PrivateRoute from "./PrivateRoute";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const store = createStore(rootReducer);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = localStorage.getItem('UserID');
  useEffect(() => {
    console.log("token is " + token);

  if (token) {
    setIsAuthenticated(true);
  } else {
    setIsAuthenticated(false);
  }
}, []);
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/survey" element={<PrivateRoute Component={Survey} user={isAuthenticated} />} />
          <Route path="/survey/quiz" element={<PrivateRoute Component={Quiz} user={isAuthenticated}/>} />
          <Route path="/survey/quiz/response" element={<PrivateRoute Component={Response} user={isAuthenticated}/>} />
          <Route path="/" element={<User />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
