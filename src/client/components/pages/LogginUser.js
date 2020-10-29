import React, {useState} from "react"
import {Redirect} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import {serverIP, serverPORT} from "../../config.js"
import loadUser from "../../actions/LoadUser"

export default function LogginUser(props) {
	const dispatch = useDispatch()
	const isLogged = useSelector(state => state.auth.isLogged)
	const [state, setState] = useState({
		email: "user1@gmail.com",
		password: "123456",
		wrongInputEmail: false,
		wrongInputPassword: false,
		wrongTextPassword: "",
		wrongTextEmail: ""
	})

// ---------------------------------------------------------------------------------- handleLogginUser()

	function handleLogginUser() {
		fetch(`http://${serverIP}:${serverPORT}/users/login`,{
		"method": "post",
		"headers": {
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			email: state.email,
			password: state.password
		})
		})
		.then(res => res.json())
		.then(data => {
			if (!data.body.wrongData && data.body.usrLogged) {
				setState({
					...state,
					email: "",
					password: "",
					wrongInputEmail: false,
					wrongInputPassword: false,
					wrongTextPassword: "",
					wrongTextEmail: ""
				})
				loadUser(dispatch)
				props.history.push('/')
			}
			else {
				setState({
					...state,
					password: "",
					wrongTextPassword: "E-mail o Password incorrectos...",
					wrongInputPassword: true
				})
			}
		})
		.catch(err => console.error(err))
	}

// ---------------------------------------------------------------------------------- inputsValidate()

	function inputsValidate() {
		const emailExpression = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
		const emailResult = emailExpression.test(state.email)
		if (emailResult) {
			handleLogginUser()
		}
		else {
			setState({
				...state,
				wrongTextEmail: "E-mail no valido...",
				wrongInputEmail: true
			})
		}
	}

// ---------------------------------------------------------------------------------- render

	return(
		<div style={styles.mainContainer}>
		{isLogged ?
			<Redirect to='/' />
			:
			<div style={styles.marcoStyle}>
				<div style={{display: "row", justifyContent: "center", marginTop: "5vh"}}>
					<div style={{display: "flex", justifyContent: "center"}}>
						<p style={{fontSize: 25}}> Sign In </p>
					</div>
					<div style={{display: "flex", justifyContent: "center"}}>
						<input style={state.wrongInputEmail ? styles.inputWrongStyle : styles.inputStyle} placeholder="E-mail" name="email" onChange={e => setState({...state, email: e.target.value})} type="text" value={state.email} />
					</div>
					{state.wrongInputEmail ? <div style={styles.wrongText}>{state.wrongTextEmail}</div> : null}
					<div style={{display: "flex", justifyContent: "center", marginTop: "7vh"}}>
						<input style={state.wrongInputPassword ? styles.inputWrongStyle : styles.inputStyle} placeholder="Password" name="password" onChange={e => setState({...state, password: e.target.value})} type="password" value={state.password} />
					</div>
					{state.wrongInputPassword ? <div style={styles.wrongText}>{state.wrongTextPassword}</div> : null}
					{!state.wrongInputEmail && !state.wrongInputPassword
						?
						<div style={{display: "flex", justifyContent: "center", marginTop: "4vh"}}>
							<button onClick={()=>{inputsValidate()}} style={styles.btnStyle}>Sign-In</button>
						</div>
						: 
						<div style={{display: "flex", justifyContent: "center", marginTop: "4vh"}}>
							<button onClick={()=>{setState({...state, wrongInputEmail: false, wrongInputPassword: false, wrongTextEmail: '', wrongTextPassword: ''})}} style={styles.btnWrongStyle}>OK!</button>
						</div>
					}
				</div>
			</div>
		}
		</div>
	)
}

// ---------------------------------------------------------------------------------- styles

const styles = {
	mainContainer: {
		display: "flex",
		width: "100%",
		justifyContent: "center",
		marginTop: "10vh",
		marginBottom: "10vh"
	},
	marcoStyle: {
		display: "flex",
		width: "50%",
		justifyContent: "center",
		borderWidth: 4,
		borderColor: "black",
		borderRadius: 20,
		borderStyle: "solid",
		backgroundColor: "#5E5E5Eaa"
	},
	inputStyle: {
		padding: 10,
		fontSize: 15,
		width: "25vw",
		borderRadius: 15,
		borderColor: "black",
		borderStyle: "solid",
		borderWidth: 3,
		textAlign: "center"
	},
	inputWrongStyle: {
		padding: 10,
		fontSize: 15,
		width: "25vw",
		borderRadius: 15,
		borderColor: "black",
		borderStyle: "solid",
		borderWidth: 3,
		textAlign: "center",
		backgroundColor: "#EB3737aa"
	},
	wrongText: {
		display: "flex",
		justifyContent: "center",
		paddingTop: 5,
		fontSize: 15,
		color: "red"
	},
	btnStyle: {
		color: "black",
		borderWidth: 3,
		borderColor: "black",
		borderRadius: 8,
		borderStyle: "solid",
		backgroundColor: "white",
		fontSize: 15,
		paddingTop: "1vh",
		paddingBottom: "1vh",
		paddingLeft: "1.5vw",
		paddingRight: "1.5vw"
	},
	btnWrongStyle: {
		color: "red",
		borderWidth: 3,
		borderColor: "red",
		borderRadius: 8,
		borderStyle: "solid",
		backgroundColor: "white",
		fontSize: 15,
		paddingTop: "1vh",
		paddingBottom: "1vh",
		paddingLeft: "1.5vw",
		paddingRight: "1.5vw"
	}
}