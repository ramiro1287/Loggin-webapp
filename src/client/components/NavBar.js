import React, {useState} from "react"
import {Link, withRouter} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import {serverIP, serverPORT} from "../config.js"

function NavBar(props) {
	const dispatch = useDispatch()
	const isLogged = useSelector(state => state.auth.isLogged)
	const user = useSelector(state => state.auth.user)
	const [toggleMenu, setToggleMenu] = useState(false)

// ---------------------------------------------------------------------------------- handleSignOut()

	function handleSignOut() {
		fetch(`http://${serverIP}:${serverPORT}/users/logout`)
		.then(() => {
			setToggleMenu(false)
			dispatch({type: "SignOut"})
			props.history.push('/')
		})
		.catch(err => console.error(err))
	}

// ---------------------------------------------------------------------------------- render

	return(
		<div style={styles.navContainer}>
			<Link to="/" title="Home" style={styles.imgLinkStyle}>
				<img src='LennyThumbUp.png' style={{height: "8vh"}} />
			</Link>
			<div style={{display: "flex", alignItems: "center", marginRight: "1vw"}}>
				<Link to="/about" title="About" style={props.history.location.pathname === '/about' ? styles.selectedLinkStyle : styles.linkStyle}>About</Link>
				{isLogged ? null :
					<Link to="/loggin" title="Sign-In" style={props.history.location.pathname === '/loggin' ? styles.selectedLinkStyle : styles.linkStyle}>Sign-In</Link>
				}
				{isLogged ? null :
					<Link to="/create" title="Register" style={props.history.location.pathname === '/create' ? styles.selectedLinkStyle : styles.linkStyle}>Register</Link>
				}
				{isLogged ?
					<Link to="/calendar" title="Calendar" style={props.history.location.pathname === '/calendar' ? styles.selectedLinkStyle : styles.linkStyle}>Calendar</Link>
					: null
				}
				{isLogged ?
					<Link to="#" onClick={()=>{setToggleMenu(!toggleMenu)}} title="Menu" style={toggleMenu ? styles.selectedLinkStyle : styles.linkStyle}>
						<img src={user ? `/uploads/${user.avatar}` : '/uploads/defaultAvatar.png'} style={{height: "7vh", borderRadius: "50%"}} />
					</Link>
					: null
				}
				{toggleMenu ?
					<div style={styles.toggleMenuStyle}>
						<Link to="/user/profile" title="Profile" onClick={()=>{setToggleMenu(false)}} style={styles.menuLinkStyle}>
							<img src="/icons/Profile-Icon.png" style={{height: "3vh", margin: "0.3vh 1vw 0.3vh 0.8vw"}} />
							Profile
						</Link>
						<Link to="#" title="Sign-Out" onClick={()=>{handleSignOut()}} style={styles.menuLinkStyle}>
							<img src="/icons/Exit-Icon.png" style={{height: "3vh", margin: "0.3vh 1vw 0.3vh 0.8vw"}} />
							Sign-Out
						</Link>
					</div>
					: null
				}
			</div>
		</div>
	)
}
export default withRouter(NavBar)

// ---------------------------------------------------------------------------------- styles

const styles = {
	navContainer: {
		display: "flex",
		justifyContent: "space-between",
		width: "100%",
		height: "9vh",
		backgroundColor: "#2F2F2F"
	},
	linkStyle: {
		display: "flex",
		alignItems: "center",
		marginRight: "1vw",
		borderRadius: "15px 15px 0px 0px",
		textDecoration: "none",
		height: "60%",
		padding: "0 0.3vw 0 0.3vw",
		fontSize: 17,
		color: "white"
	},
	selectedLinkStyle: {
		display: "flex",
		alignItems: "center",
		marginRight: "1vw",
		backgroundColor: "#545454aa",
		borderBottom: "4px solid white",
		borderTop: "3px solid white",
		borderRadius: "15px 15px 0px 0px",
		textDecoration: "none",
		height: "60%",
		padding: "0 0.3vw 0 0.3vw",
		fontSize: 17,
		color: "white"
	},
	imgLinkStyle: {
		display: "flex",
		alignItems: "center",
		margin: "0 0 0 2vw"
	},
	toggleMenuStyle: {
		position: "absolute",
		top: "11vh",
		right: "3vw",
		width: "15vw",
		height: "auto",
		overflow: "hidden",
		backgroundColor: "#2F2F2F",
		borderRadius: 15
	},
	menuLinkStyle: {
		display: "flex",
		textDecoration: "none",
		color: "white",
		margin: "1.5vh 2vw 1.5vh 2vw",
		backgroundColor: "#6C6C6Caa",
		borderRadius: 8
	}
}