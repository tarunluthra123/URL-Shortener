import React,{useEffect, useState} from "react";
import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import Dashboard from "./Dashboard";
import LoginPage from "./LoginPage";
import Signup from "./Signup";
import { useAuth } from './../contexts/AuthContext';
import '../assets/css/app.css'

function App() {

	return (
		<div className="App">
			<Router>
				<Switch>
					<Route path="/login" component={LoginPage}></Route>
					<Route path="/signup" component={Signup}></Route>
					<Route path="/" component={Dashboard}></Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
