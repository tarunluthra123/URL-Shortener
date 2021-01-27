import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import 'bootstrap/dist/css/bootstrap.css'
import 'semantic-ui-css/semantic.min.css'
import {AuthProvider} from './contexts/AuthContext'

ReactDOM.render(
	<AuthProvider>
		<App />
	</AuthProvider>,
	document.getElementById("root")
);
