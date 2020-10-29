import React, {useEffect} from "react"
import {HashRouter, Switch, Route} from "react-router-dom"
import {serverIP, serverPORT} from "../config.js"

// ---------------------------------------------------------------------------------- Redux Imports

import {useSelector, useDispatch} from "react-redux"
// Actions
import loadUser from "../actions/LoadUser"

// ---------------------------------------------------------------------------------- Pages Imports

import ProtectedRoute from "./ProtectedRoute"
import NavBar from "./NavBar"
import Home from "./pages/Home"
import About from "./pages/About"
import Calendar from "./pages/Calendar"
import LogginUser from "./pages/LogginUser"
import CreateUser from "./pages/CreateUser"
import NotFoundPage from "./pages/NotFoundPage"
import UserProfile from "./pages/user/UserProfile"

// ---------------------------------------------------------------------------------- App Hook

export default function App(props) {
	const dispatch = useDispatch()
	useEffect(()=>{loadUser(dispatch)},[])
	const auth = useSelector(state => state.auth)
	return(
		<HashRouter>
			<div style={styles.mainContainer}>
				<NavBar />
				<div style={styles.bodyContainer}>
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/about" exact component={About} />
						<Route path="/loggin" exact component={LogginUser} />
						<Route path="/create" exact component={CreateUser} />
						<ProtectedRoute path="/calendar" exact component={Calendar} />
						<ProtectedRoute path="/user/profile" exact component={UserProfile} />
						<Route path="*" component={NotFoundPage} />
					</Switch>
				</div>
			</div>
		</HashRouter>
	)
}

// ---------------------------------------------------------------------------------- styles

const styles = {
	mainContainer: {
		display: "row",
		width: "100vw",
		minHeight: "100vh",
		backgroundColor: "#ABABABaa"
	},
	bodyContainer: {
		display: "flex",
		width: "100%",
		minHeight: "87vh"
	}
}